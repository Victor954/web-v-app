import { defineStore } from 'pinia'; 
import { User } from '../types/authorize.res.types';
import jwtDecode from "jwt-decode";
import { computed} from 'vue';
import { LoginReq, RegisterReq } from '@/types/request/authorize.req.types';
import { useFetchTokens } from './queries/authorizeStore';
import { mapQueryResult } from '@/helpers/store';

export const useAuthorizeStore = defineStore('authorize', () => {
    const tokensQuery = useFetchTokens();
    
    const accessToken = computed(() => tokensQuery.data?.accessToken);
    const refreshToken = computed(() => tokensQuery.data?.refreshToken);
    const user = computed(() =>  accessToken.value ? jwtDecode(accessToken.value) as User : null);

    tokensQuery.$subscribe((mutation , state) => {
        if(mutation.storeId === 'queryTokens' && state.data) {
            localStorage.setItem('accessToken' , state.data.accessToken);
            localStorage.setItem('refreshToken' , state.data.refreshToken);    
        }
    });

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
    }

    async function fetchManagementLogin(loginData: LoginReq) {

        await tokensQuery.fetchAsync({
            method: 'POST',
            url: 'management/authorize/login',
            data: loginData
        });
    }

    async function fetchRegister(registerData: RegisterReq) {

        await tokensQuery.fetchAsync({
            method: 'POST',
            url: 'authorize/register',
            data: registerData
        });
    }

    async function fetchRefreshToken() {
        if(accessToken.value && refreshToken.value && user.value !== null) {
            
            const result = await tokensQuery.fetchAsync({
                method: 'POST',
                url: '/tokens/refresh',
                data: tokensQuery.data
            });

            if(!result) return false;

            return result;
        }

        return false;
    }

    return { 
        user: user, 
        accessToken: accessToken,
        refreshToken: refreshToken,
        query: mapQueryResult(tokensQuery) ,
        fetchLogin,
        fetchManagementLogin,
        fetchRegister,
        fetchRefreshToken,
        recoveryCachedUser
    }
  });