import { ErrorForm } from "@/domain/client/form.types";
import { defineStore } from "pinia";

type ModelField = { value: string , error: ErrorForm }

type State = {
    model: Record<string, ModelField>
}

type Getters = {
    hasAnyError: (state: State) => boolean,
    formModel: (state: State) =>  Record<string, string>
}

type Actions = {
    setField: (name: string, value: ModelField) => void,
}

export const useFromStore = defineStore<'form', State , Getters , Actions>('form',
{
    state: () => ({
        model: {}
    }),
    getters: {
        hasAnyError: (state) => Object
            .values(state.model)
            .some(({error}) => error.hasError),
        formModel: (state) => {
            return Object.entries(state.model)
                .reduce<Record<string, string>>((obj , [key , model]) => {
                    obj[key] = model.value;
                    return obj; 
                } , {})
        }
    },
    actions: {
        setField(name: string, field: ModelField) {
            this.model[name] = field;
        }
    }
});