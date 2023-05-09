import App from '../App.vue';
import { shallowMount } from '@vue/test-utils';
import { createPlugins } from './helpers/plugins';
import tokens from './helpers/tokens';
import { Router } from 'vue-router';
import LocalStorageMock from './mocks/localStorageMock';

let plugins!:ReturnType<typeof createPlugins>;
let push:jest.SpyInstance<any, any[], any>;
let router: Router;

beforeEach(() => {
    plugins = createPlugins();
    router = plugins[1];
    push =  jest.spyOn(router, 'push');
});

afterEach(() => {
    push.mockClear();
});

describe('testing Routing' , () => {
    const localStorageMock = new LocalStorageMock();

    afterEach(() => {
        localStorageMock.reset();
    });

    test('testing / path' ,  async () => {
        await expectRoute('/' , '/login' , 2);
    });

    test('testing / path with user' , async () => {

        localStorageMock.setLocalStore({
            accessToken: tokens.accessTokenWithUser,
            refreshToken: 'some_refresh_token1'
        });

        await expectRoute('/' , '/' , 1);
    });

    test('testing /management path with user' , async () => {
        
        localStorageMock.setLocalStore({
            accessToken: tokens.accessTokenWithUser,
            refreshToken: 'some_refresh_token1'
        });
    
        shallowMount(App , {
            global: {
                plugins
            }     
        });

        router.push('/management');

        await router.isReady();

        await expect(push).toBeCalledTimes(2);
        await expect(push).lastCalledWith('/management/login');
    });
});


async function expectRoute(...[ path, expectPath , countCalls ]: [string , string , number]) {

    shallowMount(App , {
        global: {
            plugins
        }     
    });

    router.push(path);

    await router.isReady();

    await expect(push).toBeCalledTimes(countCalls);
    await expect(push).lastCalledWith(expectPath);
}