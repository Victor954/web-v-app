export type User = {
    login: string;
    passwordHash: string;
    salt: string;
    refreshToken: string;
    roles?: string[];
}

export type Role = {
    code: string;
    name: string;
}