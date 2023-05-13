import { PersonInfo } from './identity.types';

export type TokenClaims = {
    login: string , 
    personInfo: PersonInfo,
    roles?: string[]
}