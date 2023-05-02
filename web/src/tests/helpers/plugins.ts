import { Router } from 'vue-router';
import { createPinia , createAuthorize , createRouter , createAssertsUI} from '../../plugins';
import { Plugin } from 'vue';

export function createPlugins() : [Plugin , Router , ...Plugin[]]{
    const store = createPinia();
    const router = createRouter();
    const authorize = createAuthorize(router);
    const assertsUI = createAssertsUI();
    return [
        store, 
        router, 
        authorize, 
        assertsUI
    ];
}