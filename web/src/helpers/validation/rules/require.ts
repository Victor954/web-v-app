export function required(msg: string) {
    return (value: string): string | false => {

        if(value.length > 0) return false;

        return msg;
    }
}
