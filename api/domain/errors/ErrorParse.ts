export interface ErrorParse {
    toJSON: () => { code: string , message: string }
}

export function isErrorParse(arg: any): arg is ErrorParse {

    const isObject = typeof arg === 'object';
    const toJSONpropIsFn = typeof arg.toJSON === 'function';

    return isObject && toJSONpropIsFn;
}
