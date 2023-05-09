export interface User {
    login: string;
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