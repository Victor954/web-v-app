import { tokensSchema } from '@/domain/schemas/tokens.schemas';
import bodyValidate from '@/middleware/bodyValidate.middleware';
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
		res.json([]);
	});

export default router;