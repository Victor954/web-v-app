import { api } from "@/api";
import { ApiConfig } from "@/api/Api";
import { LoadError, LoadState } from "@/types/store/async.types";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { defineStore } from "pinia";
import { UnwrapRef, computed, ref } from "vue";

type Options<TResponse> = {
    mutate: (state: {
        data?: UnwrapRef<TResponse>,
    }) => void
}

export default function useQuery<TResponse>(name: string , options?: Options<TResponse>) {
    const useStore = defineStore(name, () => {

        const data = ref<TResponse>();
        const error = ref<LoadError>(null);
        const state = ref<LoadState>('initialized');

        const isLoading = computed(() => ['pending' , 'initialized'].includes(state.value) );
        const isFetching = computed(() => state.value === 'pending');
        const isError = computed(() => state.value === 'rejected');
        const isSuccess = computed(() => state.value === 'fulfilled');
    
        async function get(url: string, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<TResponse, any> | null> {

        try {
            state.value = 'pending';
            const response =  await api.get<TResponse>(url , config)

            data.value = response.data;
            state.value = 'fulfilled';

            return response;
        } catch (err) {

            if(err instanceof AxiosError) {
                error.value = err;
            }

            else if(err instanceof Error) {
                error.value = err;
            }

            else {
                error.value = null;
            }

            state.value = 'rejected';

            return null;
        }

    }

    async function request(config: ApiConfig): Promise<AxiosResponse<TResponse, any> | null> {

        try {
            state.value = 'pending';
            const response =  await api.request<TResponse>(config)

            data.value = response.data;
            state.value = 'fulfilled';

            return response;
        } catch (err) {

            if(err instanceof AxiosError) {
                error.value = err;
            }

            else if(err instanceof Error) {
                error.value = err;
            }

            else {
                error.value = null;
            }

            state.value = 'rejected';

            return null;
        }

    }

    return {
        data,
        error,
        isLoading,
        isFetching,
        isSuccess,
        isError,
        get,
        request
    }
    })

    const store = useStore();

    store.$subscribe((mutation , state) => {
        if(mutation.storeId === name) 
        {
            options?.mutate(state);
        }
    });

    return store;
}