import jwt from 'jsonwebtoken';
import { connectAsync , closeAsync, db} from '@/mongo';

import * as tokensService from './tokens.service';
import { registerAsync } from '../authorize.service';

import { TokenClaims } from '@/domain/types/tokens.types';
import ServerError from '@/domain/errors/ServerError';

let accessToken = '';
let refreshToken = '';

jest.mock('./factory.service' , () => {
    const originalModule = jest.requireActual('./factory.service');

    return {
        __esModule: true,
        ...originalModule,
        generateTokens: () => ({
            refreshToken,
            accessToken
        }),
      };
});

beforeAll(async () => {
    await connectAsync();
});

afterAll(async () => {
    jest.resetModules();
    await closeAsync();
});

describe('testing refreshTokenAsync' , () => {

    test('testing with obsolete accessToken' , async () => {

        const user = { login: 'userTokens' , password: 'qwerty1234' ,repeatedPassword: 'qwerty1234' , roles: [] };

        const oldAccessToken = createAccessToken(user , '-5 min');

        accessToken = oldAccessToken;
        refreshToken = createRefreshToken(user, '7 days');

        const registerResult = await registerAsync(user);

        accessToken = createAccessToken(user , '5 min');
        refreshToken = createRefreshToken(user, '7 days');

        const result = await tokensService.refreshTokenAsync({ 
            accessToken: registerResult.accessToken, 
            refreshToken: registerResult.refreshToken, 
            login: user.login 
        });

        expect(registerResult.accessToken).not.toBe(oldAccessToken);
        expect(result).toBeValidTokens(user.login);
    });

    test('testing with normal accessToken' , async () => {

        const user = { login: 'userTokens3' , password: 'qwerty1234' ,repeatedPassword: 'qwerty1234' , roles: [] };

        const oldAccessToken = createAccessToken(user , '5 min');

        accessToken = oldAccessToken;
        refreshToken = createRefreshToken(user, '7 days');


        const registerResult = await registerAsync(user);

        accessToken = createAccessToken(user , '5 min');
        refreshToken = createRefreshToken(user, '7 days');

        const result = await tokensService.refreshTokenAsync({ 
            accessToken: registerResult.accessToken, 
            refreshToken: registerResult.refreshToken, 
            login: user.login 
        });

        const nextRefreshToken = await findRefreshTokenAsync(user.login);

        expect(registerResult.refreshToken).toBe(nextRefreshToken);
        expect(registerResult.accessToken).toBe(oldAccessToken);

        expect(result).toBeValidTokens(user.login);
    });

    test('testing with obsolete refreshToken' , async () => {

        try {
            const user = { login: 'userTokens2' , password: 'qwerty1234' ,repeatedPassword: 'qwerty1234' , roles: [] };

            accessToken = createAccessToken(user , '-5 min');
            refreshToken = createRefreshToken(user, '-1 days');
    
            const registerResult = await registerAsync(user);
    
            await tokensService.refreshTokenAsync({ 
                accessToken: registerResult.accessToken, 
                refreshToken: registerResult.refreshToken, 
                login: user.login 
            });
        } catch(error) {
            expect(error).toEqual(
                new ServerError({
                    message: 'token is invalid',
                    code: 'token_error',
                    statusCode: 400
                })
            );
        }
    });

    test('testing with custom tokens' , async () => {

        const claims = { login: 'hacker_2005' , roles: [] }

        const refreshToken = jwt.sign(claims, 'HACK_KEY');
        const accessToken = jwt.sign(claims , 'HACK_KEY');
        
        try {
            await tokensService.refreshTokenAsync({ 
                accessToken: accessToken, 
                refreshToken: refreshToken, 
                login: claims.login 
            });
        } catch(error) {
            expect(error).toEqual(
                new ServerError({
                    message: 'token is invalid',
                    code: 'token_error',
                    statusCode: 400
                })
            );
        }
    });
});

function createAccessToken({ login , roles }: TokenClaims , expiresIn: string) {
    return jwt.sign({ login , roles } , process.env.ACCESS_SECRET_KEY , { expiresIn: expiresIn });
}

function createRefreshToken({ login , roles }: TokenClaims, expiresIn: string) {
    return jwt.sign({ login , roles } , process.env.REFRESH_SECRET_KEY , { expiresIn: expiresIn });
}

async function findRefreshTokenAsync(login: string) {
    const result =  await db.UserModel.findOne({ login: login } , {
        refreshToken: 1
    });

    return result!.refreshToken;
}