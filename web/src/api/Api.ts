import axios , { AxiosInstance, AxiosRequestConfig } from "axios"
import { apiAuthorizeMiddleware } from "./middleware";
import { Method } from "axios";
import qs from "qs";

type ContentTypes = 'urlencoded' | 'json';

export type ApiConfig = {
    url: string,
    data: any,
    method: Method,
    contentType?: ContentTypes
} & Omit<AxiosRequestConfig , 'url' | 'data' | 'method'> 

export default class Api {

    instance: AxiosInstance;

    constructor(baseURL: string) {

        this.instance =  axios.create({
            baseURL: baseURL,
            timeout: 30000
        });

        this.registerMiddleware();
    }

    request<TResponse extends any>(config: ApiConfig) {

        return this.instance.request<TResponse>(this.toAxiosConfig(config));
    }

    get<TResponse extends any>(url: string, config?: AxiosRequestConfig<any> | undefined) {
        return this.instance.get<TResponse>(url , config);
    }
    
    private registerMiddleware() {
        apiAuthorizeMiddleware(this.instance);
    }

    private toAxiosConfig(config: ApiConfig): AxiosRequestConfig {
        const axiosConfig:AxiosRequestConfig = {...config};

        if (config.contentType === 'urlencoded') {
            axiosConfig.headers = { 'content-type': 'application/x-www-form-urlencoded' };
            axiosConfig.data = qs.stringify(config.data);
        }

        return axiosConfig;
    }
}