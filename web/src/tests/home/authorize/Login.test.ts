import Login from '@/routes/home/authorize/Login.vue';
import { impMockAdapter } from '@/tests/helpers/implements/api';
import { impPluginsAndMockRoute } from '@/tests/helpers/implements/plugins';
import { shallowMount } from '@vue/test-utils';
import tokens from '../../helpers/tokens';

const { plugins , push } = impPluginsAndMockRoute();
const adapter = impMockAdapter();

describe('testing home/authorize/Login' , () => {

    test('testing successful login and route to /' , async () => {

        adapter.onPost('/authorize/login').reply(200 , { accessToken: tokens.accessTokenWithUser , refreshToken: 'refresh_token' });

        const wrapper = shallowMount(Login , {
            global: {
                plugins
            }     
        });

        await wrapper.get('input[name="login"]').setValue('sameLogin');
        await wrapper.get('input[name="password"]').setValue('123456789');
        await wrapper.get('button[type="submit"]').trigger('submit');

        await expect(push).toBeCalledWith('/');
    })
})