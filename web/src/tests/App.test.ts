import App from '../App.vue';
import { mount } from '@vue/test-utils';

describe('testing App component' , () => {

    test('test' , () => {
        const wrapper = mount(App);
        expect(wrapper.text()).toBe('Hello world');
    });
})