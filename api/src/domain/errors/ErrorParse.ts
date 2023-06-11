import { ErrorResponse } from 'ts-domain-types/server.types';

export interface ErrorParse {
    toJSON: () => ErrorResponse
}

export function isErrorParse(arg: any): arg is ErrorParse {

	const isObject = typeof arg === 'object';
	const toJSONpropIsFn = typeof arg.toJSON === 'function';

	return isObject && toJSONpropIsFn;
}
