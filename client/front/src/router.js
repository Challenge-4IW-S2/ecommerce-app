import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import HomeView from './pages/Homepage.vue'
import LoginView from './pages/Login.vue'
import LogoutView from './pages/Logout.vue'
import RegisterView from './pages/Register.vue'
import UserView from './pages/Account/User.vue'
import UserHomeView from './pages/Account/UserHomeView.vue'
import UserOrdersView from './pages/Account/Orders.vue'

import ProductsView from './pages/Products/Products.vue'
import ProductView from './pages/Products/Product.vue'
import PageNotFound from './pages/PageNotFound.vue'
import {isUserAuthenticated} from "./api/auth.js";


const routes = [
    {
        path: '/',
        component: HomeView,
    },
    {
        path: '/login',
        component: LoginView,
        meta: {
            requiresNoAuth: true
        }
    },
    {
        path: '/logout',
        component: LogoutView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/register',
        component: RegisterView,
        meta: {
            requiresNoAuth: true
        }
    },
    {
        path: '/account',
        component: UserView,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '',
                component: UserHomeView
            },
            {
                path: 'orders',
                component: UserOrdersView
            },
            {
                path: 'settings',
                component: UserView
            }
        ]
    },
    {
        path: '/products',
        component: ProductsView
    },
    {
        path: '/change-password',
        component: ProductView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/change-password/:slug',
        component: ProductView
    },

    // route pour les 404
    {
        path: '/:catchAll(.*)*',
        component: PageNotFound
    }
]

const router = createRouter({
    history: createWebHistory(), // for browser history
    routes,
})

router.beforeEach(async (to, from, next) => {
    const requiresNoAuth = to.matched.some(record => record.meta.requiresNoAuth);
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = await isUserAuthenticated();

    if (requiresNoAuth && isAuthenticated) {
        next('/');
        return;
    }

    if (requiresAuth && !isAuthenticated) {
        next('/login');
        return;
    }

    next();
});



export default router