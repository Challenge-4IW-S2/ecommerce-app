import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import HomeView from './pages/Homepage.vue'
import LoginView from './pages/Login.vue'
import RegisterView from './pages/Register.vue'
//import DashboardUsersView from './pages/Dashboard/users/Users.vue'
//import DashboardUserEdit from './pages/Dashboard/users/EditUser.vue'
import ProductsView from './pages/Products/Products.vue'
import ProductView from './pages/Products/Product.vue'
import PageNotFound from './pages/PageNotFound.vue'
import {isUserAuthenticated} from "./api/auth.js";


const routes = [
    {
        path: '/', component: HomeView
    },
    {
        path: '/login',
        component: LoginView
    },
    {
        path: '/register',
        component: RegisterView,
    },
    {
        path: '/profile',
        component: ProductView,
        meta: {
            requiresAuth: true
        }
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
    const isAuthenticated = await isUserAuthenticated();

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});



export default router