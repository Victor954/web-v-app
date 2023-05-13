import { ref , Ref, readonly, DeepReadonly, computed } from 'vue';
import { LoadError, LoadState } from '@/types/store/asyncState.types';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { api } from '@/api';
import { StoreDefinition, defineStore } from 'pinia';
import { ErrorResponse } from '@/types/response/error.res.types';
import { ApiConfig } from '@/api/Api';

type Options = {
    name: string  
}

export type QueryState<T> = {
    data: DeepReadonly<T | null>,
    error: DeepReadonly<LoadError>,
    state: DeepReadonly<LoadState>
}

export type QueryActions<T> = {
    fetchAsync: (op: ApiConfig) => Promise<T | null>,
    setData: (data: T) => void
}

export type QueryStoreDefinition<TResponse> = StoreDefinition<string , QueryState<TResponse> , {} , QueryActions<TResponse>>;

export default function queryStoreFactory<TResponse>(options : Options): QueryStoreDefinition<TResponse> {
    return defineStore(options.name, () => {
        const data = ref<TResponse | null>(null) as Ref<TResponse | null>;
        const error = ref<LoadError>(null);
        const state = ref<LoadState>('initialized');
        
        async function fetchAsync(apiConfig: ApiConfig): Promise<TResponse | null> {
            try {
                state.value = 'pending';
                const { data: responseData } = await api.request<TResponse>(apiConfig);
    
                data.value = responseData;
                state.value = 'fulfilled';
    
                return responseData;
            } catch (err) {

                if(err instanceof AxiosError<ErrorResponse>) {
                    error.value = err;
                    state.value = 'rejected';
                    return null;
                }

                if(err instanceof Error) {
                    error.value = err;
                    state.value = 'rejected';
                    return null;
                }

                error.value = null;
                state.value = 'rejected';
                return null;
            }
        }
    
        function setData(recoveredData: TResponse) {
            data.value = recoveredData;
        }
    
        return {
            data: readonly(data),
            error: readonly(error),
            state: readonly(state),
            fetchAsync,
            setData
        }
});
}