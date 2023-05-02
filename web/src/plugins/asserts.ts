import { Plugin } from 'vue';
import * as assertUI from '@/components';

function createAssertsUI(): Plugin {
    return {
        install(app) {
            app.component('Button', assertUI.Button);
            app.component('Card', assertUI.Card);
            app.component('Form', assertUI.Form);
            app.component('FormGroup', assertUI.FormGroup);
            app.component('FormInfo', assertUI.FormInfo);
            app.component('FormLabel', assertUI.FormLabel);
            app.component('Icon', assertUI.Icon);
            app.component('Input', assertUI.Input);
            app.component('PasswordInput', assertUI.PasswordInput);
            app.component('Validate', assertUI.Validate);
            app.component('PageTitle', assertUI.PageTitle);
        },
    }
}

export default createAssertsUI;