/// <reference types="vite/client" />

declare module '*.vue' {
    import { DefineComponent } from 'vue';
    export default DefineComponent<{}, {}, any>;
}