import { PersonInfo } from '../identity.types';
import { User } from '../identity.types';

export type Login = {
    login: string;
    password: string;
}

export type Register = {
    password: string;
    repeatedPassword: string;
} & Pick<User , 'login' | 'roles'> & PersonInfo