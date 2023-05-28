import { DeepReadonly } from 'vue';

export type ValidationFn = (value: string , formState: DeepReadonly<Record<string , string>>) => boolean;
export type Validation = [ValidationFn , string];

export type ValidationState = {
    rules: Validation[],
    bindings: string[]
}

type RulesEnum = 'required' | 'alphanumeric' | 'cyrillic';

export type Rules = Record<RulesEnum , Validation> & {
    length: (min?: number, max?: number) => Validation
}
