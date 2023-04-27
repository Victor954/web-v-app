import { defineStore } from 'pinia'; 
import { api } from '../api';
import { Tokens, User } from '../types/authorize.res.types';
import jwtDecode from "jwt-decode";
import { ref } from 'vue';

type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};

export const useAuthorizeStore = defineStore('authorize', () => {
    const user = ref<User | null>(null);
    const error = ref<Error | null>(null);
    const accessToken = ref<string | null>(null);
    const refreshToken = ref<string | null>(null);

    /**
    * Ставим креды из кеша при запуске
    */
    function recoveryCachedUser() {
        const refreshToken = localStorage.getItem('refreshToken');
        const accessToken = localStorage.getItem('accessToken');

        setTokens({refreshToken , accessToken});
    }

    async function fetchLogin(loginData: { login:string , password: string }) {
        try {
            const tokens = await api.post<Tokens>('/authorize/login' , loginData).then((response) => response.data);

            setTokens(tokens);
        } catch (err) {
            error.value = err as Error;
        }

    }

    async function fetchRefreshToken() {
        if(accessToken.value && refreshToken.value && user.value !== null) {
            
            try {
                const tokens = await api.post<Tokens>('/tokens/refresh' , {
                    accessToken: accessToken.value,
                    refreshToken: refreshToken.value
                }).then((response) => response.data);

                setTokens(tokens);

                return { accessToken: accessToken.value , refreshToken: refreshToken.value }

            } catch(err) {
                error.value = err as Error;
            }
        }

        return false;
    }
  
    function setTokens(tokens: Nullable<Tokens>) {
        if(tokens.refreshToken && tokens.accessToken) {
            accessToken.value  = tokens.accessToken;
            refreshToken.value = tokens.refreshToken;

            localStorage.setItem('accessToken' , tokens.accessToken);
            localStorage.setItem('refreshToken' , tokens.refreshToken);    

            user.value = jwtDecode(tokens.accessToken );
        }
    }

    return { 
        user: user, 
        error: error ,
        accessToken: accessToken,
        refreshToken: refreshToken,
        fetchLogin,
        fetchRefreshToken,
        recoveryCachedUser
    }
  });