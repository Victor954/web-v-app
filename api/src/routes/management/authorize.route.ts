import { Router } from 'express';
import * as authorizeService from '@/services/authorize.service';
import bodyValidate from '@/middleware/bodyValidate.middleware';
import { loginSchema } from '@/scripts/joi/schemas/authorize.schemas';
const router = Router();

router.post('/management/authorize/login' , bodyValidate(loginSchema) , async (req , res , next) => {
	try {
		const response = await authorizeService.loginAsync(req.body , { withRolesOnly: true });
		res.json(response);
	}
	catch(error) {
		next(error);
	}
});

export default router;