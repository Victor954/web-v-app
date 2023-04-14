import ServerError from "@/domain/errors/ServerError";
import { User } from "@/domain/types/identity.types";
import { Login, Register } from "@/domain/types/request/authorize.types";
import { Tokens } from "@/domain/types/response/tokens.types";
import { db } from "@/mongo";
import { pbkdf2, randomBytes } from "crypto";
import { generateTokens } from "./tokens/factory.service";

export async function loginAsync({ login , password }: Login): Promise<Tokens> {
    
    const user = await db.UserModel.findOne({ login });
    const loginError = new ServerError({
        code: 'authorize_error',
        message: 'not valid login or password',
        statusCode: 400
    });

    if(!user) throw loginError;
    
    const passwordHash = await encodePasswordAsync(password , user.salt);

    if(passwordHash !== user.passwordHash) throw loginError;

    const tokens = generateTokens(user);

    await user.updateOne({
        $set: {
            refreshToken: tokens.refreshToken
        }
    });

    return tokens;
}

export async function registerAsync({
    login,
    password,
    repeatedPassword,
    roles
}: Register): Promise<Tokens> {
    
    if(password !== repeatedPassword) throw new ServerError({
        code: 'authorize_error',
        message: 'passwords is not equals',
        statusCode: 400
    });

    const sameLoginUsersCount = await db.UserModel.count({ login });

    if(sameLoginUsersCount > 0) {

        throw new ServerError({
            code: 'authorize_error',
            message: 'user with same login is exist',
            statusCode: 400
        });
    }

    const salt = randomBytes(225).toString('hex');
    const passwordHash = await encodePasswordAsync(password, salt);

    const tokens = generateTokens({ login: login , roles: roles });

    const user:User = {
        login: login,
        refreshToken: tokens.refreshToken,
        passwordHash: passwordHash,
        salt: salt,
        roles: roles
    }

    const userModel = new db.UserModel(user);
    await userModel.save();

    return tokens;
}

async function encodePasswordAsync(password: string , salt: string) {
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