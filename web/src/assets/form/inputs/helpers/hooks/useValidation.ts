import { FormStateModel } from '@/assets/form/types';
import { inject, computed } from 'vue';

type Options = {
    name: string;
}

export default function({name}: Options) {
    const formStateModel = inject<FormStateModel | null>('formStateModel', null);

    const validClass = computed(() => {
        const state = formStateModel?.[name];

        if(state === 'sended')  return 'is-valid';
        
        if(typeof state !== 'string' && Array.isArray(state))  return 'is-invalid';

        return null;
    });

    return {
        validClass: validClass
    }
}