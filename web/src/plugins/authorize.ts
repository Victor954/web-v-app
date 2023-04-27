import { Plugin } from "vue";
import { useAuthorizeStore } from "../store/authorizeStore";
import { Router } from "vue-router";

/**
 * Плагин работы с авторизацией 
 */
export default function (router: Router): Plugin{
    return {
        install: () => {
    
            const authorizeStore = useAuthorizeStore();
    
            authorizeStore.recoveryCachedUser();
    
            registerOutUser(router , authorizeStore);
            protectRoutes(router);
        }
    }
};


/**
* При обновления стора authorize/user смотрим пользователя и если тот null - выкидываем пользователя
*/
function registerOutUser(router: Router , authorizeStore: ReturnType<typeof useAuthorizeStore>) {
    authorizeStore.$subscribe((mutation , state) => {
        if(mutation.storeId === 'authorize') {
            if(state.user === null) {
                router.push('/login');
            }
        }
    });
}

/**
* Защита роутов
*/
function protectRoutes(router: Router) {

    router.beforeEach((to , from , next) => {

        const { user } = useAuthorizeStore();

        const isPrivate = to.meta?.private;
        const roles = to.meta?.roles as string[] | undefined; 
        const redirectPath = to.meta?.redirectPath as string | undefined || '/login'; 

        const hasRolesAccess = !(roles && roles.length > 0) || roles.some(role => user?.roles?.includes(role));
        const hasAccess = !isPrivate || !!user;

        if(to.path !== redirectPath && (!hasAccess || !hasRolesAccess)) {
            router.push(redirectPath)
        } else {
            next();
        }
    }); 
}