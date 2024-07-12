import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import HomeView from './pages/Homepage.vue'
// import LoginView from './pages/Login.vue'
// import RegisterView from './pages/Register.vue'
import UsersView from './pages/users/Users.vue'
import UserEdit from './pages/users/EditUser.vue'
// import ProductsView from './pages/Products/Products.vue'
// import ProductView from './pages/Products/Product.vue'


const routes = [
    { path: '/', component: HomeView },
    // { path: '/login', component: LoginView },
    // { path: '/register', component: RegisterView },
     { path: '/users', component: UsersView },
     { path: '/users/:entityType/:id', component: UserEdit },
     { path: '/users/add-:entityType', component: UserEdit},
    // path: '/products', component: ProductsView},
    // path: '/:slug', component: ProductView},
]

const router = createRouter({
    history: createWebHistory(), // for browser history
    routes,
})

export default router