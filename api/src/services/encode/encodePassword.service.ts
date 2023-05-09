import { pbkdf2 , randomBytes} from 'crypto';

export async function encodeAsync(password: string , salt: string) {
	return await new Promise<string>(
		(resolve ,reject) => pbkdf2(
			password , salt , 10000 , 225 , 'sha256' , 
			(err , buffer) => {
				if(err) {
					reject(err);
				} else {
					resolve(buffer.toString('hex'));
				}
			}
		)
	);
}

export function generateSalt() {
	return randomBytes(225).toString('hex');
}