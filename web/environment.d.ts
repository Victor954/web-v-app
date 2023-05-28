declare module 'vue-router' {
  interface RouteMeta {
    private?: boolean
  }
}

import { AssertComponents } from '@/assets/types'

declare module '@vue/runtime-core' {
  export interface GlobalComponents extends AssertComponents {};
}

export {};