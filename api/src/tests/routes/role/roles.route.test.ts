import { RoleResDTO } from 'ts-domain-types/response/role.type';
import RoleModel from '@/scripts/mongo/models/identity/RoleModel';
import { useFakeMongo  } from '@/tests/helpers/hooks';
import { makeGetRequestAsync } from '@/tests/helpers/requestExpress';

useFakeMongo();

describe('testing /api/v1/roles' , () => {
	const url = '/api/v1/roles';

	beforeAll(async () => {
		const roles:RoleResDTO[] = [
			{
				code: 'admin',
				name: 'Админ'
			},
			{
				code: 'manager',
				name: 'Юзлес челик'
			},
		];

		await RoleModel.insertMany(roles);
	});

	afterAll(async () => {
		await RoleModel.deleteMany({});
	}); 

	test('testing get roles with executed all roles' , async () => {

		const response = await makeGetRequestAsync({ url , params: new URLSearchParams([ ['code[exc]', 'admin'] , ['code[exc]', 'manager'] ])});

		await expect(response.statusCode).toBe(200);
		await expect(response.body).toEqual([]);
	});

	test('testing get roles with executed one roles' , async () => {

		const response = await makeGetRequestAsync({ url , params: new URLSearchParams([ ['code[exc]', 'admin'] ])});

		await expect(response.statusCode).toBe(200);

		const managerModel = JSON.stringify(await RoleModel.findOne({ code: 'manager' }));
		await expect(response.body).toEqual([JSON.parse(managerModel)]);
	});
});