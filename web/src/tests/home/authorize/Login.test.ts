import Login from '@/routes/home/authorize/Login.vue';
import { VueWrapper, mount } from '@vue/test-utils';
import tokens from '../../helpers/tokens';
import { createPlugins } from '@/tests/helpers/plugins';
import { Router } from 'vue-router';
import MockAdapter from 'axios-mock-adapter';
import { api } from '@/api';
import { nextTick } from 'vue';
import _ from 'lodash'; 
describe('testing home/authorize/Login' , () => {

    const adapter = new MockAdapter(api.instance);

    let plugins!:ReturnType<typeof createPlugins>;
    let push!:jest.SpyInstance<any, any[], any>;
    let router!: Router;

    const debounceMock = jest.fn((fn) => fn as any);

    beforeEach(() => {

        _.debounce = debounceMock;

        plugins = createPlugins();
        router = plugins[1];
        push = jest.spyOn(router, 'push');
    });

    afterEach(() => {
        push.mockClear();
        debounceMock.mockClear();

        adapter.reset();
    });

    test('testing successful login and route to /' , async () => {

        adapter.onPost('/authorize/login').reply(200 , { accessToken: tokens.accessTokenWithUser , refreshToken: 'refresh_token' });

        await mountForm();

        await router.isReady();

        await expect(push).toBeCalledWith('/');
    });

    test('testing error with response login' , async () => {

        adapter.onPost('/authorize/login').reply(400 , {
            code: 'authorize_error',
            message: 'Неверный логин или пароль'
        });

        const wrapper = await mountForm();
        
        await nextTick();
        await new Promise((resolve) => setTimeout(resolve , 0));

        const invalidValues = await findInvalids(wrapper);

        await expect(invalidValues).toEqual([
            'Неверный логин или пароль' , 
            'Неверный логин или пароль'
        ]);
    })

    test('testing error without response login' , async () => {

        adapter.onPost('/authorize/login').reply(500 , 'Some error');

        const wrapper = await mountForm();
        
        await nextTick();
        await new Promise((resolve) => setTimeout(resolve , 0));

        const invalidValues = await findInvalids(wrapper);

        await expect(invalidValues).toEqual([
            'Request failed with status code 500' , 
            'Request failed with status code 500'
        ]);
    })

    async function mountForm() {
        const wrapper = mount(Login , {
            global: {
                plugins
            }     
        });

        await wrapper.get('input[name="login"]').setValue('sameLogin');
        await wrapper.get('input[name="password"]').setValue('123456789');
        await wrapper.get('button[type="submit"]').trigger('submit');

        return wrapper;
    }

    async function findInvalids(wrapper: VueWrapper<any>) {
        const invalidValues = await wrapper.findAll('[data-test="formInvalidValue"]');
        const invalidText = invalidValues.map(invalidValue => invalidValue.text());

        return invalidText;
    }
})