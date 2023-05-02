import { Rules, Validation } from "./types";
import validator from 'validator';
const rules: Rules = {
    required: [(str) => str.length > 0 , 'Поле обязательно для заполнения'],
    alphanumeric: [(str) => validator.isAlphanumeric(str) , 'Только разрешенные символы'],
    length
}

function length(min?: number , max?: number): Validation {

    let msg = '';

    if(min === undefined && max !== undefined) {
        min = 0;
        msg = `Только меньше ${max} символов`;
    }

    if(max === undefined && min !== undefined) {
        msg = `Только больше ${max} символов`;
    }

    if(max !== undefined && min !== undefined) {
        msg = `Только от ${min} до ${max} символов`
    }

    return [(str: string) => validator.isLength(str , { min : min, max: max }) , msg];
}

export default rules;