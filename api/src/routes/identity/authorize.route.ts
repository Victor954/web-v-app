import { Router , Request , Response , NextFunction} from 'express';
import * as authorizeService from '@/services/authorize.service';
import { bodyValidate, paramsValidate } from '@/middleware/validations.middleware';
import { loginParamsSchema, loginSchema, registerSchema } from '@/scripts/joi/schemas/authorize.schemas';
import { Login } from '@/domain/types/request/authorize.types';
import { Tokens } from '@/domain/types/response/tokens.types';
const router = Router();

router.post('/authorize/login/:type' , 
	bodyValidate(loginSchema) , 
	paramsValidate(loginParamsSchema)  , 
	async (req:Request<{ type: 'manager' | 'casual' } , Tokens , Login> , res: Response<Tokens> , next: NextFunction) => {
		try {
			
			const response = await authorizeService.loginAsync(req.body , { 
				withRolesOnly: req.params.type === 'manager' 
			});

			res.json(response);
		}
		catch(error) {
			next(error);
		}
	});

router.post('/authorize/register' , bodyValidate(registerSchema) , async (req , res , next) => {
	try {
		const response = await authorizeService.registerAsync(req.body);
		res.json(response);
	}
	catch(error) {
		next(error);
	}
});

export default router;