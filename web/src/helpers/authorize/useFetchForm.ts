import { computed, watchEffect, ref } from 'vue';
import { storeToRefs } from 'pinia';
import _ from 'lodash';

import { useAuthorizeStore } from '@/store/authorizeStore';
import { useRouter } from 'vue-router';
import { FromRef } from '@/assets/form/types';
import { AxiosError } from 'axios';
import { ErrorResponse } from 'ts-domain-types/server.types';
import { LoadError } from '@/types/store/async.types';

type Options<TFormModel> = {
    successRedirect: string,
    fetchAsync: (formModel: TFormModel , store: ReturnType<typeof useAuthorizeStore>) => Promise<void> 
}

export default function<TFormModel> (options: Options<TFormModel>) {
    const authStore = useAuthorizeStore();
    const router = useRouter();
    
    const formRef = ref<FromRef>();
    const disabledForm = ref<boolean>(false);
    
    const queryError = computed(() => authStore.tokens.error);
    
    watchEffect(() => {
        if (authStore.tokens?.isSuccess) {
            router.push(options.successRedirect);
        }
    
        if (authStore.tokens.isError && queryError.value) {
            setFailedFetchError(queryError.value);
        }
    })
    
    async function submitHandler(formModel: TFormModel) {
        disabledForm.value = true;
        fetchLogin(formModel);
    }
    
    function setFailedFetchError(error: NonNullable<LoadError>) {
    
        if (error instanceof AxiosError<ErrorResponse>) {
            formRef.value?.setErrors(error.response?.data.message || error.message);
            return;
        }
    
        if (error instanceof Error) {
            formRef.value?.setErrors(error.message);
        }
    }
    
    const fetchLogin = _.debounce(async (formModel: TFormModel) => {
        await options.fetchAsync(formModel , authStore);
        disabledForm.value = false;
    }, 1000);

    return {
        formRef,
        disabledForm,
        submitHandler
    }
}