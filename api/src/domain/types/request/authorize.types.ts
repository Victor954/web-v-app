import { User } from '../identity.types';

export type Login = {
    login: string;
    password: string;
}

export type Register = {
    password: string;
    repeatedPassword: string;
} & Omit<User , 'passwordHash' | 'salt' | 'refreshToken'>