import { ResponseResult } from "@/domain/client/fetch.types";
import { User } from "@/domain/client/user.types";
import { defineStore } from "pinia";

type State = {
    userResponse: ResponseResult<User>
}

type Actions = {
    fetchAuthorize: () => void
}

async function getUserAsync(): Promise<User> {
    return new Promise((resolve , reject) => {
        setTimeout(() => {
            resolve({
                login: '',
                info: {
                    name: 'name',
                    surname: 'surname',
                },
                role: 'user'
            })
        } , 3000);
    })
} 

async function fetchPinia<T>(response: ResponseResult<T> , callback: () => Promise<T>) {
    try {
        response.fetching = 'fetching';
        response.data = await callback();
        response.fetching = 'success';
    } catch (er) {
        const error = er as Error;

        response.error = error;
        response.fetching = 'error';
    }
}

export const useAuthorizeStore = defineStore<'authorize', State , {} , Actions>('authorize' , {
    state: () => ({
        userResponse: {
            fetching: 'init',
        }
    }),
    actions: {
        async fetchAuthorize() {
            await fetchPinia(this.userResponse , async () => await getUserAsync());
        }
    }
});