import { computed , inject} from 'vue';
import useValidation from './useValidation';
import { FormControl } from '@/components/form/types';

type Options = {
    name: string;
}

export default function({ name }: Options) {
    const { validClass } = useValidation({name});

    const formModel = inject<Record<string, string> | null>('formModel', null);
    const formControl = inject<FormControl | null>('formControl', null);

    const inputValue = computed({
        get: () => formModel?.[name] || '',
        set: (value) => {
            formControl && formControl.change([name , value]);
        }
    })

    const className = computed(() => ['form-control', validClass.value]);
    
    return {
        className,
        inputValue
    }
}