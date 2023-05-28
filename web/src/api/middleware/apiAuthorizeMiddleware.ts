import { useAuthorizeStore } from "@/store/authorizeStore";
import { Axios, AxiosError } from "axios";

export default function apiAuthorizeMiddleware(instance: Axios) {

    /**
    * Перед каждым запросом выставляем токен авторизации
    */
    instance.interceptors.request.use((config) => {

        const authorizeStore = useAuthorizeStore();
        config.headers.Authorization = `Bearer ${authorizeStore.accessToken}`;
    
        return config;
    } , (error) => Promise.reject(error))


    /**
    * В случае прихода 401 ошибки пытаемся обновить токен , логика дейсвия на валидность токена в plugins/authorize
    */
    instance.interceptors.response.use(
        (response) => response, 
        async (error) => {
    
            if(error instanceof AxiosError) {
    
                if(error.response?.status === 401) {
                    const authorizeStore = useAuthorizeStore();
                    const refreshed = await authorizeStore.fetchRefreshToken();
    
                    if(refreshed.data && error.config) {
                        error.config.headers.Authorization = `Bearer ${refreshed.data.accessToken}`;
                        instance.request(error.config);
                    } else {
                        authorizeStore.resetUser();
                    }
                }
            }
    
        return Promise.reject(error);
    });
}