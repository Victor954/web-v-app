import { requireDir } from '@/scripts/require';

const components = requireDir<object>(module , {
	mapFromResult: (modules) => {
        
		return modules.reduce((acc , curr) => ({
			...acc,
			...curr
		}) , {});
	}
});

export default components;