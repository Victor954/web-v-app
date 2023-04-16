import { connectAsync , closeAsync, db} from '@/scripts/mongo';

function useFakeMongo() {

	beforeAll(async () => {
		await connectAsync();
	});
    
	afterAll(async () => {
		await closeAsync();
	});

	return () => db;
}

export default useFakeMongo;