import { Nullable } from '@/types/mapTypes';

export function createEmptyObject<T extends object>(keys: (keyof T)[] ): Nullable<T> {
    return keys.reduce((obj , key) => ({
        ...obj,
        [key]: null
    }) , {}) as Nullable<T>;
}