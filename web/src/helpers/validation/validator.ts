import { RuleFn } from "@/domain/client/form.types";

export function validator(value: string , rules: RuleFn[]): string | false {
    for(const rule of rules) {

        const valid = rule(value);

        if(typeof valid === 'string') return valid;
    }

    return false;
}