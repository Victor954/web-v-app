import { RolesReqDTO } from 'ts-domain-types/request/role.types';
import RoleModel from '@/scripts/mongo/models/identity/RoleModel';


export async function findAsync(query: RolesReqDTO) {

	const filter = queryToFilter(query);
	const roles = await RoleModel.find(filter);

	return roles.map(role => role.toObject());
}

function queryToFilter(query: RolesReqDTO) {
	const filterQuery: Record<string , object> = {};

	if(query.code) {

		const code:Record<string , any> = {};

		if(query.code.exc) {
			code['$nin'] =  query.code.exc;
		}

		filterQuery.code = code;
	}

	return filterQuery;
}