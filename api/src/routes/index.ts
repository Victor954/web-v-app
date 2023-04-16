import { requireDir } from '@/scripts/require';
import { Router } from 'express';

export default requireDir<Router[]>(module , {
	exclude: /\.test\.ts$/,
	mapFromResult: (routes) => {

		return routes.reduce((acc , curr) => [
			...acc,
			curr.default
		] , []);
	}
});
