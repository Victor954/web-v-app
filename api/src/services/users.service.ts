import UserModel from '@/scripts/mongo/models/identity/UserModel';
import RoleModel from '@/scripts/mongo/models/identity/RoleModel';

import { PaginationResDTO } from 'ts-domain-types/response/pagination.types';
import { UserRolesResDTO } from 'ts-domain-types/response/user.types';
import { UsersReqDTO } from 'ts-domain-types/request/user.types';
import { createPipelines } from '@/scripts/profiles/user.profiles';

export async function findAsync(query: UsersReqDTO): Promise<PaginationResDTO<UserRolesResDTO>> {
	const pagination = createPipelines(query);

	const users = await UserModel.aggregate<UserRolesResDTO>([ 
		...pagination,
		{
			$lookup: {
				from: RoleModel.collection.name,
				localField: 'roles',
				foreignField: 'code',
				as: 'roles'
			},
		},
		{
			$project: {
				'password':  { $concat: [ { $substr: ['$passwordHash' , 0 , 20] } , '...' ]  },
				'login': 1,
				'personInfo': 1,
				'roles': 1
			}
		}
	]);

	const totalCount = await UserModel.count({});
    
	return {
		entities: users,
		totalCount
	}; 
}