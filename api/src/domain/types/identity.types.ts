export type PersonInfo = {
    name: string;
    surname: string;
    patronymic?: string | null;
}

export type User = {
    login: string;
    personInfo: PersonInfo;
    passwordHash: string;
    salt: string;
    refreshToken: string;
    roles?: string[];
    rolesArrayLength?: number;
}

export type Role = {
    code: string;
    name: string;
}