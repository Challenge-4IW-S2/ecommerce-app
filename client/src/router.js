import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import HomeView from './App.vue'
import LoginView from './pages/Login.vue'
import RegisterView from './pages/Register.vue'
import DashboardUsersView from './pages/Dashboard/users/Users.vue'
import DashboardUserEdit from './pages/Dashboard/users/EditUser.vue'
import DashboardAddUser from './pages/Dashboard/users/AddUser.vue';


const routes = [
    { path: '/', component: HomeView },
    { path: '/login', component: LoginView },
    { path: '/register', component: RegisterView },
   // { path: '/admin', component: DashboardView },
    { path: '/admin/users', component: DashboardUsersView },
    { path: '/admin/:entityType/:id', component: DashboardUserEdit },
    {path: '/admin/add-:entityType', component: DashboardUserEdit}
]

const router = createRouter({
    history: createWebHistory(), // for browser history
    routes,
})

export default router