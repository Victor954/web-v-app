import { Role } from '@/domain/client/user.types';

declare module 'vue-router' {
    interface RouteMeta {
      roles?: Role[],
      private?: boolean
    }
}