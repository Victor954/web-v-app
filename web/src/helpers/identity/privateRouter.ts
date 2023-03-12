import { useAuthorizeStore } from '@/store/authorize.store';
import { NavigationGuardWithThis } from 'vue-router';

const privateRouter: NavigationGuardWithThis<undefined> = (to , from , next) => {
    const { userResponse } = useAuthorizeStore();
    
    if(to.meta.private && !userResponse.data) {
        next('/login');
        return;
    }

    if(to.meta.roles && !to.meta.roles.includes(userResponse.data!.role) ) {
        next('/');
        return;
    }

    next();
}

export default privateRouter;