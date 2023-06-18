export type Nullable<T extends Object> = {
    [key in keyof T]: T[key] | null
}