import request from 'supertest';
import qs from 'qs';

type OptionsPost<T extends object> = {
	body: T, 
	url: string,
    bearerToken?: string
	contentType: 'application/json' | 'application/x-www-form-urlencoded'
}

type OptionsGet = {
	url: string,
	params?: URLSearchParams,
    bearerToken?: string
}

export async function makePostRequestAsync<T extends object>(options: OptionsPost<T>) {

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

export async function makeGetRequestAsync(options: OptionsGet) {
	
	let url = options.url;

	if(options.params) {
		url = `${url}/?${options.params.toString()}`;
	}

	const adapter = request(global.app)
		.get(url)
		.set('Accept', 'application/json');

	return await adapter.send();
}