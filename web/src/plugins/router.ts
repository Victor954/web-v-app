import { createRouter , createWebHistory } from 'vue-router';

const routes = [
    { path: '/' , component: () => import('@/routes/home/Home.vue') , meta: { private: true , roles: [] } },
    { path: '/login' , component: () => import('@/routes/home/authorize/Login.vue') },
    { path: '/register' , component: () => import('@/routes/home/authorize/Register.vue') },
    { 
        path: '/administration', 
        component: () => import('@/routes/administration/Administration.vue'),
        meta: { private: true , roles: ['admin'], redirectPath: '/administration/login' },
    },
    {
        path: '/administration/login' , 
        component: () => import('@/routes/administration/authorize/Login.vue')
    }
]

export default function () {
    return createRouter({
        history: createWebHistory(),
        routes
    });
};