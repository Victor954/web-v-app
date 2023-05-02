import { ValidationState } from "./validation/types";

export type FormStateModel = Record<string, ['error' , string] | 'sended' | 'pending'>;
export type FormValidationModel = Record<string, ValidationState>;
export type FormControl = {
    change: (args: [string, string]) => void
}