import { computed} from 'vue';
import { defineStore } from 'pinia'; 
import jwtDecode from "jwt-decode";

import { TokensResDTO } from 'ts-domain-types/response/tokens.types';
import { TokenClaimsDTO } from 'ts-domain-types/server.types';
import { LoginReqDTO , RegisterReqDTO } from 'ts-domain-types/request/authorize.types';
import { useQuery } from "@/helpers/store";

export const useAuthorizeStore = defineStore('authorize', () => {
    const tokensQuery = useQuery<TokensResDTO>('tokensQuery' , {
        mutate: mutateTokensHandler
    });
    
    const accessToken = computed(() => tokensQuery.data?.accessToken);
    const refreshToken = computed(() => tokensQuery.data?.refreshToken);
    const user = computed(() => accessToken.value ? jwtDecode(accessToken.value) as TokenClaimsDTO : null);

    function mutateTokensHandler(state: {data?: TokensResDTO}) {
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
    
    async function fetchLogin(loginData: LoginReqDTO) {

        await tokensQuery.request({
            method: 'POST',
            url: 'authorize/login/casual',
            contentType: 'urlencoded',
            data: loginData,
        });
    }

    async function fetchManagementLogin(loginData: LoginReqDTO) {

        await tokensQuery.request({
            method: 'POST',
            url: 'authorize/login/manager',
            contentType: 'urlencoded',
            data: loginData
        });
    }

    async function fetchRegister(registerData: RegisterReqDTO) {

        await tokensQuery.request({
            method: 'POST',
            url: 'authorize/register',
            contentType: 'urlencoded',
            data: registerData,
        });
    }

    async function fetchRefreshToken() : Promise<{ data: false | TokensResDTO }> {
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
