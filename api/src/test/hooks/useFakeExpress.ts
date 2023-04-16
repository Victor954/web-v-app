
import { SuperTest , Test } from 'supertest';
import { createExpress } from '@/app';

import { IncomingMessage, Server, ServerResponse } from 'http';
import request from 'supertest';

function useFakeExpress() {

	let server: Server<typeof IncomingMessage, typeof ServerResponse>;
	let agent: SuperTest<Test>;

	beforeAll((done) => {
		server = createExpress().listen(0, () => {
			agent = request(server);
			done();
		});
	});
    
	afterAll(() => {
		server.close();
	});

	return () => agent;
}

export default useFakeExpress;