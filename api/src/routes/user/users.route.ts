import { Request, Response, NextFunction , Router } from 'express';
import auth from '@/middleware/authorize.middleware';
import { bodyValidate, queryValidate } from '@/middleware/validations.middleware';
import { usersReqSchema } from '@/scripts/joi/schemas/users.schemas';
import { UserInfo } from '@/domain/types/identity.types';
import { Pagination } from '@/domain/types/response/pagination.types';
import { UserQuery } from '@/domain/types/request/user.types';

const router = Router();

const users:UserInfo[] = Array.from(Array(200).keys()).map((i) => ({
	id: i.toString(),
	login: `Login ${i}`,
	personInfo: {
		name: `Name ${i}`,
		surname: `Surname ${i}`
	},
	roles: [{
		code: 'test',
		name: 'Админ'
	}]
}));

router.use('/' , auth.authenticate() , auth.inRoles(['admin']))
	.route('/users')
	.get(queryValidate(usersReqSchema) , async (req: Request<object, object, object, UserQuery> , res: Response<Pagination<UserInfo>> , next: NextFunction) => {
		try {
	
			const skip = Number.parseInt(req.query.skip);
			const top = Number.parseInt(req.query.top);

			const paginationResult: Pagination<UserInfo> = {
				entities: users.slice(skip, top + skip),
				totalCount: users.length
			};

			res.json(paginationResult);
		}
		catch(error) {
			next(error);
		}
	});


export default router;