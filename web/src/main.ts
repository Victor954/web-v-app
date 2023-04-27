import { createApp } from 'vue'

import './style.css';

import App from './App.vue'
import { createPinia , createAuthorize , createRouter } from './plugins';

const app = createApp(App);

const store = createPinia();
const router = createRouter();
const authorize = createAuthorize(router);

app.use(store);
app.use(router);
app.use(authorize);

app.mount('#app');