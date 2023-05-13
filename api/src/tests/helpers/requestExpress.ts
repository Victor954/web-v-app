import request from 'supertest';
import qs from 'qs';

type Options<T extends object> = {
	body: T, 
	url: string,
    bearerToken?: string
	contentType: 'application/json' | 'application/x-www-form-urlencoded'
}

export async function makePostRequestAsync<T extends object>(options: Options<T>) {

	const adapter = request(global.app)
		.post(options.url)
		.set('Accept', 'application/json');

	if(options.bearerToken) {
		adapter.set('Authorization', `Bearer ${options.bearerToken}`);
	}  

	if(options.contentType === 'application/x-www-form-urlencoded') {
		return await adapter
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.send(qs.stringify(options.body));
	}

	if(options.contentType === 'application/json') {
		return await adapter
			.set('Content-Type', 'application/json')
			.send(options.body);
	}

	throw Error(`unexpected contentType of options.contentType ${options.contentType}`);
}