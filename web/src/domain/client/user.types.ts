export type Role = 'admin' | 'user' | null

export type User = {
    login: string;
    info: {
        name: string,
        surname: string,
        patronymic?: string
    },
    role: Role
}