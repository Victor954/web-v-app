import { tokensSchema } from '@/scripts/joi/schemas/tokens.schemas';
import { bodyValidate } from '@/middleware/validations.middleware';
import { Router } from 'express';

import auth from '@/middleware/authorize.middleware';

import * as tokensService from '@/services/tokens/tokens.service';


const router = Router();

router.post('/tokens/refresh' , bodyValidate(tokensSchema) , async (req , res , next) => {
	try {
		const response = await tokensService.refreshTokenAsync(req.body);
		res.json(response);
	}
	catch(error) {
		next(error);
	}
});

router.route('/tokens/divide')
	.post(auth.authenticate(), async (req , res, next) => {
		try {
			await tokensService.divideTokenAsync(req.body.refreshToken , req.user?.login);
			res.status(200).send('divided');
		}
		catch(error) {
			next(error);
		}
	});

export default router;