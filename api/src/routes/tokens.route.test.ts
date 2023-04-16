import { generateAccessToken } from '@/test/helpers/tokensFactory';
import { useFakeMongo , useFakeExpress } from '@/test/hooks';

const getDb = useFakeMongo();
const getAgent = useFakeExpress();

describe('testing /tokens/divide' , () => {

	const url = '/api/v1/tokens/divide';

	test('testing without authorize' , async () => {
		const response = await getAgent()
			.post(url);

		expect(response.text).toEqual('Unauthorized');
		expect(response.status).toEqual(401);
		expect(response.body).toEqual({});
	});

	test('testing with bearer token' , async () => {

		const db =  getDb();
		const claims =  { login: 'User' };
		const token = generateAccessToken({ claims });

		await db.UserModel.collection.insertOne({
			login: claims.login
		});

		const response = await getAgent()
			.post(url)
			.set('Authorization' ,  `Bearer ${token}`);

		expect(response.body).toEqual([]);
		expect(response.status).toEqual(200);
	});
});