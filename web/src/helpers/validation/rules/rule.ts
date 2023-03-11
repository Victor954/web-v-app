export function rule(validFn: (value: string) => boolean , msg: string): (value: string) => string | false {

    return (value: string): string | false => !validFn(value) && msg
}