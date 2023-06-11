import AuthorizeError from '@/domain/errors/AuthorizeError';
import { Handler} from 'express';
import passport from 'passport';

function inRoles(accessRoles: string[] = []) {
	const handle: Handler = (req , res , next) => {

		if(!req.user) return next(new AuthorizeError('unauthorize'));

		const userRoles = req.user.roles || [];
		const hasAccess = userRoles.some(role => accessRoles.includes(role)) || userRoles.length === 0 && accessRoles.length === 0;

		if(!hasAccess) return next(new AuthorizeError('forbidden'));

		next();
	}; 

	return handle;
}

function authenticate(accessRoles: string[] = []) {
	return [
		passport.authenticate('bearer' , { 
			session: false,
		}),
		inRoles(accessRoles)
	];
}

export default authenticate;