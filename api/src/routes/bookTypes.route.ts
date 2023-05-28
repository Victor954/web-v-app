import { Router } from 'express';
import { bookTypeSchema } from '@/scripts/joi/schemas/book.schemas';
import { bodyValidate } from '@/middleware/validations.middleware';

import * as bookTypesService from '@/services/bookTypes.service';
import auth from '@/middleware/authorize.middleware';

const router = Router();

router.route('/books/types/:code')
	.get(auth.authenticate() , auth.inRoles(), async (req, res , next) => {
		try {
			const response = await bookTypesService.findOneAsync(req.params.code);
			res.json(response);
		}
		catch(error) {
			next(error);
		}
	})
	.put(bodyValidate(bookTypeSchema), async (req, res , next) => {
		try {
			const response = await bookTypesService.updateAsync(req.params.code ,req.body);
			res.json(response);
		}
		catch(error) {
			next(error);
		}
	})
	.delete(async (req, res , next) => {
		try {
			const response = await bookTypesService.deleteAsync(req.params.code);
			res.json(response);
		}
		catch(error) {
			next(error);
		}
	});

router.route('/books/types')
	.get(async (req, res , next) => {
		try {
			const response = await bookTypesService.findAsync();
			res.json(response);
		}
		catch(error) {
			next(error);
		}
	})
	.post(bodyValidate(bookTypeSchema), async (req, res , next) => {
		try {
			const response = await bookTypesService.insertOneAsync(req.body);
			res.json(response);
		}
		catch(error) {
			next(error);
		}
	})
	.delete(async (req, res , next) => {
		try {
			const response = await bookTypesService.deleteManyAsync(req.query.codes as string[]);
			res.json(response);
		}
		catch(error) {
			next(error);
		}
	});

export default router;