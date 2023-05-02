import { defineStore } from 'pinia'; 
import { api } from '../api';
import { Tokens, User } from '../types/authorize.res.types';
import jwtDecode from "jwt-decode";
import { ref , Ref, readonly , computed} from 'vue';
import { LoadError, LoadState } from '@/types/store/asyncState.types';
import { AxiosRequestConfig } from 'axios';
import { LoginReq } from '@/types/request/authorize.req.types';

type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};

function useFetchAsync<TResponse>() {

    const data = ref<TResponse | null>(null) as Ref<TResponse | null>;
    const error = ref<LoadError>(null);
    const state = ref<LoadState>('initialized');
    
    async function fetchAsync(apiConfig: AxiosRequestConfig): Promise<TResponse | null> {
        try {
            state.value = 'pending';
            const { data: responseData } = await api.request<TResponse>(apiConfig);
            data.value = responseData;
            state.value = 'fulfilled';

            return responseData;
        } catch (err) {
            error.value = err as Error;
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
}

export const useAuthorizeStore = defineStore('authorize', () => {

    const tokensQuery = useFetchAsync<Tokens>();

    const accessToken = computed(() => tokensQuery.data.value?.accessToken);
    const refreshToken = computed(() => tokensQuery.data.value?.refreshToken);
    const user = computed(() =>  accessToken.value ? jwtDecode(accessToken.value) as User : null);

    /**
    * Ставим креды из кеша при запуске
    */
    function recoveryCachedUser() {
        const refreshToken = localStorage.getItem('refreshToken');
        const accessToken = localStorage.getItem('accessToken');

        if(refreshToken && accessToken) {
            tokensQuery.setData({refreshToken , accessToken});
        }
    }

    async function fetchLogin(loginData: LoginReq) {

        await tokensQuery.fetchAsync({
            method: 'POST',
            url: 'authorize/login',
            data: loginData
        });

        cacheTokens();
    }

    async function fetchRefreshToken() {
        if(accessToken.value && refreshToken.value && user.value !== null) {
            
            const result = await tokensQuery.fetchAsync({
                method: 'POST',
                url: '/tokens/refresh',
                data: tokensQuery.data
            });

            if(!result) return false;

            cacheTokens();
            return result;
        }

        return false;
    }
  
    function cacheTokens() {
        if(refreshToken.value && accessToken.value) {
            localStorage.setItem('accessToken' , accessToken.value);
            localStorage.setItem('refreshToken' , refreshToken.value);    
        }
    }

    return { 
        user: user, 
        accessToken: accessToken,
        refreshToken: refreshToken,
        query: tokensQuery,
        fetchLogin,
        fetchRefreshToken,
        recoveryCachedUser
    }
  });