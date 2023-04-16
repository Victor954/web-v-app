import { useFakeMongo , useFakeExpress } from '@/test/hooks';

useFakeMongo();
const getAgent = useFakeExpress();

describe('testing /books/types' , () => {

	test('testing valid response' , (done) => {
		getAgent()
			.get('/api/v1/books/types')
			.expect('Content-Type' , 'application/json; charset=utf-8')
			.expect(200)
			.end(done);
	});
});