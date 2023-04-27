export type Tokens = {
    accessToken: string;
    refreshToken: string;
}

export type User = {
    login: string;
    roles?: string[];
}