import { createRouter , createWebHistory } from 'vue-router';
import * as routesComps from '../routes';

const routes = [
    { path: '/' , component: routesComps.Home , meta: { private: true , roles: [] } },
    { path: '/login' , component: routesComps.Login },
    { path: '/register' , component: routesComps.Register },
    { 
        path: '/administration', 
        component: routesComps.Administration,
        meta: { private: true , roles: ['admin'], redirectPath: '/administration/login' },
        children: [
            {
                path: 'login' , 
                component: routesComps.Login
            }
        ],
    },
]

export default function () {
    return createRouter({
        history: createWebHistory(),
        routes
    });
};