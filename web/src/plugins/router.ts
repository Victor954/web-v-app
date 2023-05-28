import { RouteRecordRaw, createRouter , createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
    { 
        path: '/' , 
        component: () => import('@/routes/home/Home.vue') , 
        meta: { private: true , roles: [] } },
    { 
        path: '/login' , 
        component: () => import('@/routes/home/authorize/Login.vue') ,
        meta: { loginRoute: true } },
    { 
        path: '/register' , 
        component: () => import('@/routes/home/authorize/Register.vue') 
    },
    { 
        path: '/management', 
        component: () => import('@/routes/management/Administration.vue'),
        meta: { private: true , roles: ['admin'], redirectPath: '/management/login' },
    },
    {
        path: '/management/login' , 
        component: () => import('@/routes/management/authorize/Login.vue'), 
        meta: { loginRoute: true }
    }
]

export default function () {
    return createRouter({
        history: createWebHistory(),
        routes
    });
};