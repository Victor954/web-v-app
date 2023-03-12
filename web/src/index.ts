import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter , RouteRecordRaw  , createWebHistory} from 'vue-router';

import './style.scss';

import App from './App.vue';
import { privateRouter } from './helpers/identity';

const app = createApp(App);
const pinia = createPinia();

const routes: RouteRecordRaw[] = [
    { path: '/', component: () => import('@/pages/people/Page.vue')},
    { path: '/settings', component:  () => import('@/pages/settings/Page.vue') , meta: { roles: ['admin'] , private: true } },
    { path: '/login', component: () => import('@/pages/authorize/Page.vue') },
    { path: '/:catchAll(.*)', component: () => import('@/pages/404/Page.vue') }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

router.beforeEach(privateRouter);

app.use(pinia);
app.use(router);

app.mount('#app');