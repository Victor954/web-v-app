import { Router } from 'express';
import authenticate from '@/middleware/authorize.middleware';
import { queryValidate } from '@/middleware/validations.middleware';
import { usersReqSchema } from '@/scripts/joi/schemas/users.schemas';
import { findAsync } from '@/services/users.service';
import { ReqQuery } from '@/domain/types/express.types';

import { UsersReqDTO } from 'ts-domain-types/request/user.types';

const router = Router();

router.route('/users')
	.get(
		...authenticate(['admin']),
		queryValidate(usersReqSchema), 
		async (req: ReqQuery<UsersReqDTO> , res , next) => {
			try {
				const result = await findAsync(req.query);
				res.json(result);
			}
			catch(error) {
				next(error);
			}
		});


export default router;