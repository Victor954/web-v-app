
/**
 * Модель логина пользователя
 */
export type LoginReqDTO = {
    login: string;
    password: string;
}

/**
 * Модель регистрации пользователя
 */
export type RegisterReqDTO = {
    login: string;
    password: string;
    name: string;
    surname: string;
    patronymic?: string | null;
    roles?: string[];
    repeatedPassword: string;
}