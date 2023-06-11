
import { AssertComponents } from '@/assets/types'

declare module '@vue/runtime-core' {
  export interface GlobalComponents extends AssertComponents {};
}

declare module 'vue-router' {
  interface RouteMeta {
    private?: boolean
  }
}

declare module 'bootstrap';

export {};