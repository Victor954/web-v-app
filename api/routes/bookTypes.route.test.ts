import { connectAsync , closeAsync} from '@/mongo';
import request from 'supertest';

beforeAll(async () => {
    await connectAsync();
});

afterAll(async () => {
    await closeAsync();
});


describe('testing /api/v1/books/types' , () => {

    test('testing valid response' , (done) => {
        request(global.app)
            .get('/api/v1/books/types')
            .expect('Content-Type' , 'application/json; charset=utf-8')
            .expect(200)
            .end(done)
    })
})