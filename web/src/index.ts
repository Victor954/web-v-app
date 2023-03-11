import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter , RouteRecordRaw  , createWebHistory} from 'vue-router';

import './style.scss';

import App from './App.vue';
import PeoplePage from '@/pages/Main.vue';

const app = createApp(App);
const pinia = createPinia();

const routes: RouteRecordRaw[] = [
    { path: '/', component: PeoplePage }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

app.use(pinia);
app.use(router);

app.mount('#app');