import { computed} from 'vue';
import { defineStore } from 'pinia'; 
import jwtDecode from "jwt-decode";

import { Tokens, User } from '../types/authorize.res.types';
import { LoginReq, RegisterReq } from '@/types/request/authorize.req.types';
import { useQuery } from "@/helpers/store";

export const useAuthorizeStore = defineStore('authorize', () => {
    const tokensQuery = useQuery<Tokens>('tokensQuery' , {
        mutate: mutateTokensHandler
    });
    
    const accessToken = computed(() => tokensQuery.data?.accessToken);
    const refreshToken = computed(() => tokensQuery.data?.refreshToken);
    const user = computed(() => accessToken.value ? jwtDecode(accessToken.value) as User : null);

    function mutateTokensHandler(state: {data?: Tokens}) {
        if(state.data) {
            localStorage.setItem('accessToken' , state.data.accessToken);
            localStorage.setItem('refreshToken' , state.data.refreshToken);    
        } else {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');    
        }  
    }

    /**
    * Ставим креды из кеша при запуске
    */
    function recoveryCachedUser() {
        const refreshToken = localStorage.getItem('refreshToken');
        const accessToken = localStorage.getItem('accessToken');

        if(refreshToken && accessToken) {
            tokensQuery.data = {refreshToken , accessToken};
        }
    }
    
    async function fetchLogin(loginData: LoginReq) {

        await tokensQuery.request({
            method: 'POST',
            url: 'authorize/login/casual',
            contentType: 'urlencoded',
            data: loginData,
        });
    }

    async function fetchManagementLogin(loginData: LoginReq) {

        await tokensQuery.request({
            method: 'POST',
            url: 'authorize/login/manager',
            contentType: 'urlencoded',
            data: loginData
        });
    }

    async function fetchRegister(registerData: RegisterReq) {

        await tokensQuery.request({
            method: 'POST',
            url: 'authorize/register',
            contentType: 'urlencoded',
            data: registerData,
        });
    }

    async function fetchRefreshToken() : Promise<{ data: false | Tokens }> {
        if(accessToken.value && refreshToken.value && user.value !== null) {
            
            const result = await tokensQuery.request({
                method: 'POST',
                url: '/tokens/refresh',
                data: tokensQuery.data
            });

            if(!result) return { data: false };

            return { data: result.data };
        }

        return { data: false };
    }

    async function fetchLogout() {
        const result = await tokensQuery.request({
            method: 'POST',
            url: '/tokens/divide',
            data: tokensQuery.data,
            transformResponse: (response) => response === 'divided' ? null : tokensQuery.data
        });

        return result;
    }

    function resetUser() {
        tokensQuery.data = undefined;
    }

    return { 
        user: user, 
        accessToken: accessToken,
        refreshToken: refreshToken,
        tokens: tokensQuery,
        fetchLogin,
        fetchLogout,
        fetchManagementLogin,
        fetchRegister,
        fetchRefreshToken,
        recoveryCachedUser,
        resetUser
    }
  });
