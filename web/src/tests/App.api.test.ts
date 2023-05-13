import App from '../App.vue';
import { shallowMount } from '@vue/test-utils';

import { createPlugins } from './helpers/plugins';
import { api } from '../api';
import MockAdapter from 'axios-mock-adapter';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { Router } from 'vue-router';
import LocalStorageMock from './mocks/localStorageMock';

const mock = new MockAdapter(api.instance);

let plugins!:ReturnType<typeof createPlugins>;
let router: Router;

beforeEach(() => {
    plugins = createPlugins();
    router = plugins[1];
});

describe('testing api authorize' , () => {
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibG9naW4iOiJKb2huIERvZSIsInJvbGVzIjpbXSwiaWF0IjoxNTE2MjM5MDIyfQ.ki6HTdW9q1FVC1M_LeXPeJqoGq-GqBLFhMsVkve9UlI';
    const authHeader = `Bearer ${accessToken}`;

    const localStorageMock = new LocalStorageMock();

    afterEach(() => {
        localStorageMock.reset();
        mock.reset();
    });

    test('testing get authorize without user' , async () => {
        mock.onGet('/books').reply(401, 'Unauthorize');
        mock.onPost('/authorize/login').reply(200 , { });

        shallowMount(App , {
            global: { plugins },
        });

        const push = jest.spyOn(router, 'push')

        try {
            await api.instance.get('/books');
        } catch (error) {
            expect(error instanceof AxiosError && error.response?.status === 401).toBe(true);
        }

        await router.isReady();

        expect(push).toBeCalledWith('/login');
    });

    test('testing get authorize with tokens in cache' , async () => {
        const bookReqMock = jest.fn((a: AxiosRequestConfig) => [200 , []]);
        
        localStorageMock.setLocalStore({
            accessToken,
            refreshToken: 'some_refresh_token1'
        });

        mock.onGet('/books').reply(bookReqMock);

        shallowMount(App , {
            global: { plugins },
        });

        try {
            await api.instance.get('/books');
        } catch (error) {
            expect(error instanceof AxiosError && error.response?.status === 401).toBe(true);
        }

        expect(bookReqMock.mock.calls[0]?.at(0)?.headers?.Authorization).toBe(authHeader);
    });

    test('testing re-request when 401' , async () => {
        const oldAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkoiLCJyb2xlcyI6W10sImlhdCI6MTUxNjIzOTAyMn0.E3sHUv6djdqLfVcHfcTGBDlfFUZvBcXoeModycoWPjY';
        const bookReqMock = jest.fn(({ headers }: AxiosRequestConfig) => {
            const isNotEquals = headers?.Authorization !== authHeader;
            return isNotEquals ? [401 , 'Unauthorize'] : [200 , []]
        });

        localStorageMock.setLocalStore({
            accessToken: oldAccessToken,
            refreshToken: 'some_refresh_token1'
        });
       
        mock.onGet('/books').reply(bookReqMock);
        mock.onPost('/authorize/login').reply(200 , { });
        mock.onPost('/tokens/refresh').reply(200 , {  
            accessToken: accessToken,
            refreshToken: 'some_refresh_token1'
        });

        shallowMount(App , {
            global: { plugins },
        });

        try {
            await api.instance.get('/books');
        } catch (error) {
            expect(error instanceof AxiosError && error.response?.status === 401).toBe(true);
        }
        expect(bookReqMock).toBeCalledTimes(2);
        expect(bookReqMock.mock.calls[1]?.at(0)?.headers?.Authorization).toBe(authHeader);
    });
});