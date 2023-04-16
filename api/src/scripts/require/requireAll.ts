import fs from 'fs';
import path from 'path';

type Options = {
    exclude?: RegExp,
    mapFromResult?: <T>(modules: any[]) => T
}

type LoopModulesArg = {
    dir:string , 
    excludeFileName: string,
    options?: Options
}

export default function requireDir<T = any>(module: NodeJS.Module , options?: Options): T | any[] {

	const excludeFileName = path.basename(module.filename);
	const dir = path.dirname(module.filename);

	const modules = loopModules({dir, excludeFileName , options});

	return options?.mapFromResult ? options?.mapFromResult(modules) : modules;
}

function loopModules(args: LoopModulesArg): any[] {
	const filesList = fs.readdirSync(args.dir, { withFileTypes: true });

	const modules = filesList
		.filter(dirent => filterExclude({ ...args , fileName: dirent.name }))
		.map((dirent) => {
			const res = path.resolve(args.dir, dirent.name);
			return dirent.isDirectory() ? loopModules(args) : require(res);
		});

	return [...modules];
}

function filterExclude({ excludeFileName , fileName ,options }: Omit<LoopModulesArg ,'dir'> & { fileName: string }) {

	const excluded = options?.exclude ? options.exclude.test(fileName) : false;

	return fileName !== excludeFileName && !excluded;
}