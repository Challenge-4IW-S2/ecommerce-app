import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import HomeView from './pages/Homepage.vue'
import LoginView from './pages/Login.vue'
import RegisterView from './pages/Register.vue'
import DashboardUsersView from './pages/Dashboard/Tables/Users.vue'
import DashboardProductsView from './pages/Dashboard/Tables/Products.vue'
import DashboardEdit from './pages/Dashboard/DynamicEdit.vue'
import ProductsView from './pages/Products/Products.vue'
import ProductView from './pages/Products/Product.vue'
import DashboardCategoriesView from './pages/Dashboard/Tables/Categories.vue'
import DashboardOrdersView from './pages/Dashboard/Tables/Orders.vue'
import DashboardCommentsView from './pages/Dashboard/Tables/Comments.vue'
import DashboardAddressesView from './pages/Dashboard/Tables/Addresses.vue'
import DashboardUserRolesView from './pages/Dashboard/Tables/UserRoles.vue'
import DashboardEditAdress from './pages/Dashboard/DynamicEditAdress.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/login', component: LoginView },
    { path: '/register', component: RegisterView },
   // { path: '/admin', component: DashboardView },

    { path: '/admin/categories', component: DashboardCategoriesView},
    { path: '/admin/users', component: DashboardUsersView },
    { path: '/admin/products', component: DashboardProductsView },
    { path: '/admin/orders', component: DashboardOrdersView},
   // { path: 'admin/settings', component: DashboardSettingsView},
    { path: '/admin/comments', component: DashboardCommentsView},
    { path: '/admin/addresses', component: DashboardAddressesView},
    { path: '/admin/userroles', component: DashboardUserRolesView},




    { path: '/admin/:entityType/:id', component: DashboardEdit },
    { path: '/admin/add-:entityType', component: DashboardEdit},
    { path: '/admin/add-address/:userId', component: DashboardEditAdress , props: true},//add address
    { path: '/admin/edit-address/:id/:userId', component: DashboardEditAdress , props: true}, //edit address
    { path: '/products', component: ProductsView},
    { path: '/:slug', component: ProductView},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router