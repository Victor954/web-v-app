export type ErrorForm = { 
    hasError: boolean, 
    message: string
}

export type RuleFn = (value:string) => false | string;

export type FormExpose = {
    trySubmitForm: () => void;
}