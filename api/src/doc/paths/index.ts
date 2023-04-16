import { requireDir } from '@/scripts/require';

export default requireDir<object>(module , {
	mapFromResult: (modules) => {

		return modules.reduce((acc , curr) => ({
			...acc,
			...curr
		}) , {});
	}
});