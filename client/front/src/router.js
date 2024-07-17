import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import HomeView from './pages/Homepage.vue'
import LoginView from './pages/Login.vue'
import RegisterView from './pages/Register.vue'
//import DashboardUsersView from './pages/Dashboard/users/Users.vue'
//import DashboardUserEdit from './pages/Dashboard/users/EditUser.vue'
import ProductsView from './pages/Products/Products.vue'
import ProductView from './pages/Products/Product.vue'
import PageNotFound from './pages/PageNotFound.vue'


const routes = [
    { path: '/', component: HomeView },
    { path: '/login', component: LoginView },
    { path: '/register', component: RegisterView },
    //{ path: '/admin', component: DashboardView },
    //{ path: '/admin/users', component: DashboardUsersView },
    //{ path: '/admin/:entityType/:id', component: DashboardUserEdit },
    //{ path: '/admin/add-:entityType', component: DashboardUserEdit},
    { path: '/products', component: ProductsView},
    { path: '/change-password', component: ProductView},
    { path: '/change-password/:slug', component: ProductView},
    // { path: '/:slug', component: ProductView},
    // route pour les 404
    { path: '/:catchAll(.*)*', component: PageNotFound }
]

const router = createRouter({
    history: createWebHistory(), // for browser history
    routes,
})

export default router