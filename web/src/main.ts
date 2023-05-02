import { createApp } from 'vue'

import './style.css';

import App from './App.vue'
import { 
    createPinia , 
    createAuthorize , 
    createRouter , 
     createAssertsUI
} from './plugins';

const app = createApp(App);

const store = createPinia();
const router = createRouter();
const authorize = createAuthorize(router);
const assertsUI = createAssertsUI();

[
    store,
    router, 
    authorize, 
    assertsUI
].forEach((plugin) => {
    app.use(plugin);
});

app.mount('#app');