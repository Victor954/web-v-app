import AuthorizeError from '@/domain/errors/AuthorizeError';

export default {
	authorizeError: new AuthorizeError('unauthorize'),
	forbiddenError: new AuthorizeError('forbidden')
};