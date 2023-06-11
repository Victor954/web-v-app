import { Router } from 'express';
import { findAsync } from '@/services/roles.service';
import authenticate from '@/middleware/authorize.middleware';
import { queryValidate } from '@/middleware/validations.middleware';
import { rolesQuerySchema } from '@/scripts/joi/schemas/roles.schemas';
import { ReqQuery } from '@/domain/types/express.types';
import { RolesReqDTO } from 'ts-domain-types/request/role.types';

const router = Router();

router.route('/roles')
	.get(
		...authenticate(['admin']),
		queryValidate(rolesQuerySchema), 
		async (req: ReqQuery<RolesReqDTO> , res , next) => {
			try {
				const result = await findAsync(req.query);
				res.json(result);
			} catch(error) {
				next(error);
			}
		});

export default router;