import { connectAsync , closeAsync} from '@/scripts/mongo';

function useFakeMongo() {

	beforeAll(async () => {
		await connectAsync();
	});
    
	afterAll(async () => {
		await closeAsync();
	});
}

export default useFakeMongo;