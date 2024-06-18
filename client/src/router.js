import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import HomeView from './pages/Home.vue'
import LoginView from './pages/Login.vue'
import RegisterView from './pages/Register.vue'
import DashboardUsersView from './pages/Dashboard/users/Users.vue'
import DashboardUserEdit from './pages/Dashboard/users/EditUser.vue'
import DashboardAddUser from './pages/Dashboard/users/AddUser.vue';
import ProductsView from './pages/Products/Products.vue'
import ProductView from './pages/Products/Product.vue'


const routes = [
    { path: '/', component: HomeView },
    { path: '/login', component: LoginView },
    { path: '/register', component: RegisterView },
   // { path: '/admin', component: DashboardView },
    { path: '/admin/users', component: DashboardUsersView },
    { path: '/admin/users/:id', component: DashboardUserEdit },
    {path: '/admin/add-user', component: DashboardAddUser},
    { path: '/products', component: ProductsView},
    { path: '/product/:name/:id', component: ProductView}
]

const router = createRouter({
    history: createWebHistory(), // for browser history
    routes,
})

export default router