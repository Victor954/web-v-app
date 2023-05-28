import { Plugin } from 'vue';
import * as assertUI from '@/assets';

function createAssertsUI(): Plugin {
    return {
        install(app) {

            Object.entries(assertUI).forEach(([ key , value ]) => {
                app.component(key, value);
            });
        },
    }
}

export default createAssertsUI;