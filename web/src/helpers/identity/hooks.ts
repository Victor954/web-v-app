import { inject} from 'vue';

import { User } from '@/domain/client/user.types';
import { Identity } from './types';

export function useIdentityUser(): User | undefined {
    const identity = inject<Identity>('identity');
    return identity!.user
}