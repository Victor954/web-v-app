import * as bookTypesService from './bookTypes.service';
import { connectAsync , closeAsync} from '../mongo';

beforeAll(async () => {
    await connectAsync();
});

afterAll(async () => {
    await closeAsync();
});

describe('testing without data' , () => {

    test('testing findAsync' , async () => {
        const result = await bookTypesService.findAsync();

        expect(result).toEqual([]);
    }); 
});

describe('testing insertOneAsync' , () => {

    const code = 'TestCode'

    test('testing insert with TestCode' , async () => {
        const insert = { 
            code: code ,  
            name: 'TestName' , 
            category: 'TestCategory'
        };

        const result = await bookTypesService.insertOneAsync(insert);

        expect(result).toMatchObject(insert);
    });

    test('testing insert width some exist code' , async () => {
        const insert = { 
            code: code ,  
            name: 'TestName2' , 
            category: 'TestCategory2'
        };

        try {
            await bookTypesService.insertOneAsync(insert);
        } catch(error) {
            expect((error as Error).message).toMatch('E11000 duplicate key error collection');
        }
    });
});

describe('testing findOneAsync' , () => {

    test('testing with non-exist code' , async () => {
        const code = 'TestCode2';

        const result = await bookTypesService.findOneAsync(code);

        expect(result).toBeNull();
    });

    test('testing with exist code' , async () => {
        const expectModel = { 
            code: 'TestCode' ,  
            name: 'TestName' , 
            category: 'TestCategory'
        };

        const result = await bookTypesService.findOneAsync(expectModel.code);

        expect(result).toMatchObject(expectModel);
    });
});

describe('testing findAsync' , () => {

    test('testing findAsync' , async () => {
        const insert = { 
            code: 'TestCode' ,  
            name: 'TestName' , 
            category: 'TestCategory'
        };

        const result = await bookTypesService.findAsync();

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining(insert)
            ])
        );
    });

});

describe('testing updateAsync' , () => {

    test('testing with exist code' , async () => {

        const code = 'TestCode';

        const modifyData = {
            code,
            name: 'TestName2',
            category: 'TestCategory2'
        }

        const modifyResult = await bookTypesService.updateAsync(code , modifyData);

        const modified = await bookTypesService.findOneAsync(code);

        expect(modifyResult).toEqual({
            acknowledged: true,
            matchedCount: 1,
            modifiedCount: 1,
            upsertedCount: 0,
            upsertedId: null,
        });

        expect(modified).toMatchObject(modifyData);
    });

    test('testing with new code' , async () => {

        const newCode = 'TestCode2';
        const code = 'TestCode';

        const modifyData = {
            code: newCode,
            name: 'TestName2',
            category: 'TestCategory2'
        }

        const modifyResult = await bookTypesService.updateAsync(code , modifyData);

        const modified = await bookTypesService.findOneAsync(newCode);

        expect(modifyResult).toEqual({
            acknowledged: true,
            matchedCount: 1,
            modifiedCount: 1,
            upsertedCount: 0,
            upsertedId: null,
        });

        expect(modified).toMatchObject(modifyData);
    });

    test('testing updateAsync with some existed code' , async () => {

        const code = 'TestCode2';

        const modifyData = {
            code: code,
            name: 'TestName2',
            category: 'TestCategory2'
        }

        const modifyResult = await bookTypesService.updateAsync(code , modifyData);

        expect(modifyResult).toEqual({
            acknowledged: true,
            matchedCount: 1,
            modifiedCount: 0,
            upsertedCount: 0,
            upsertedId: null,
        });
    });

    test('testing try updateAsync by non-exist code' , async () => {

        const code = 'SuperSpecifedTestCode2';

        const modifyData = {
            name: 'TestName3',
            category: 'TestCategory3'
        }

        const modifyResult = await bookTypesService.updateAsync(code , modifyData);

        expect(modifyResult).toEqual({
            acknowledged: true,
            matchedCount: 0,
            modifiedCount: 0,
            upsertedCount: 0,
            upsertedId: null,
        });
    });
});

describe('testing deleteAsync' , () => {


    test('testing with non-exist code' , async () => {
        const code = 'SuperSpecifedTestCode2';

        const result = await bookTypesService.deleteAsync(code);

        expect(result).toEqual({
            acknowledged: true,
            deletedCount: 0,
        });
    });

    test('testing delete with exist code' , async () => {
        const code = 'TestCode2';

        const result = await bookTypesService.deleteAsync(code);

        expect(result).toEqual({
            acknowledged: true,
            deletedCount: 1,
        });
    });
});

describe('testing deleteManyAsync' , () => {


    test('testing with non-exist codes' , async () => {
        const code = 'SuperSpecifedTestCode2';

        const result = await bookTypesService.deleteManyAsync([code]);

        expect(result).toEqual({
            acknowledged: true,
            deletedCount: 0,
        });
    });

    test('testing delete with exist codes' , async () => {
        const codes = ['TestCode2' , 'TestCode3'];

        await bookTypesService.insertOneAsync({
            code: codes[0],
            name: 'TestName3',
            category: 'TestCategory2'
        });

        await bookTypesService.insertOneAsync({
            code: codes[1],
            name: 'TestName4',
            category: 'TestCategory3'  
        });

        const result = await bookTypesService.deleteManyAsync(codes);

        expect(result).toEqual({
            acknowledged: true,
            deletedCount: 2,
        });
    });
});