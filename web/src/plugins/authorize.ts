import { App, Plugin } from "vue";
import { useAuthorizeStore } from "../store/authorizeStore";
import { RouteLocationNormalizedLoaded, Router } from "vue-router";

/**
 * Плагин работы с авторизацией 
 */
export default function (): Plugin{
    return {
        install: (app: App<Element>) => {
            
            const authorizeStore = useAuthorizeStore();
            authorizeStore.recoveryCachedUser();

            const options: KickOutOptions = {
                app,
                authorizeStore
            };
    
            registerKickOutUser(options);
            protectRoutes(options);
        }
    }
};


type KickOutOptions =  {
    app: App<Element>
    authorizeStore: ReturnType<typeof useAuthorizeStore>
}

/**
* При обновления стора authorize/user смотрим пользователя и если тот null - выкидываем пользователя
*/
function registerKickOutUser({ app , authorizeStore } : KickOutOptions) {


    const router = app.config.globalProperties.$router;

    authorizeStore.$subscribe((mutation , state) => {

        const route = app.config.globalProperties.$route;

        if(mutation.storeId === 'authorize' && !state.tokens.data) {

            if(!route.meta.loginRoute) {
                router.push('/login');
            }
        }
    });
}

/**
* Защита роутов
*/
function protectRoutes(options: KickOutOptions) {

    const router = options.app.config.globalProperties.$router;

    router.beforeEach((to , from , next) => {

        const user = options.authorizeStore.user;

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