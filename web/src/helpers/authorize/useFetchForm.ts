import { computed, watchEffect, ref } from 'vue';
import { storeToRefs } from 'pinia';
import _ from 'lodash';

import { useAuthorizeStore } from '@/store/authorizeStore';
import { LoginReq } from '@/types/request/authorize.req.types';
import { useRouter } from 'vue-router';
import { FromRef } from '@/components/form/types';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/types/response/error.res.types';
import { LoadError } from '@/types/store/asyncState.types';

type Options<TFormModel> = {
    successRedirect: string,
    fetchAsync: (formModel: TFormModel , store: ReturnType<typeof useAuthorizeStore>) => Promise<void> 
}

export default function<TFormModel> (options: Options<TFormModel>) {
    const authStore = useAuthorizeStore();
    const { query } = storeToRefs(authStore);

    const router = useRouter();
    
    const formRef = ref<FromRef>();
    const disabledForm = ref<boolean>(false);
    
    const queryState = computed(() => query?.value?.state);
    const queryError = computed(() => query.value.error);
    
    watchEffect(() => {
        if (queryState.value === 'fulfilled') {
            router.push(options.successRedirect);
        }
    
        if (queryState.value === 'rejected' && queryError.value) {
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