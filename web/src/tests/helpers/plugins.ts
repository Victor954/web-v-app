import { Pinia } from 'pinia';
import { createPinia , createAuthorize , createRouter } from '../../plugins';
import { Router } from 'vue-router';
import { Plugin } from 'vue';

export function createPlugins() : [Pinia , Router , Plugin]{
    const store = createPinia();
    const router = createRouter();
    const authorize = createAuthorize(router);

    return [store , router , authorize];
}