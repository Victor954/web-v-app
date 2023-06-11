export type UserModelDTO = {
    login: string;
    personInfo: PersonInfoModelDTO;
    passwordHash: string;
    salt: string;
    refreshToken: string;
    roles?: string[];
    rolesArrayLength?: number;
}

export type PersonInfoModelDTO = {
    name: string;
    surname: string;
    patronymic?: string | null;
}