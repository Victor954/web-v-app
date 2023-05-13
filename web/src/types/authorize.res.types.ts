export type Tokens = {
    accessToken: string;
    refreshToken: string;
}

export type PersonInfo = {
    name: string;
    surname: string;
    patronymic?: string | null;
}

export type User = {
    login: string;
    personInfo: PersonInfo;
    roles?: string[];
}