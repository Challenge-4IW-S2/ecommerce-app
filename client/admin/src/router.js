import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import DashboardView from './pages/Dashboard.vue'

import DashboardUsersView from './pages/Dashboard/Tables/Users.vue'
import DashboardProductsView from './pages/Dashboard/Tables/Products.vue'
import DashboardCategoriesView from './pages/Dashboard/Tables/Categories.vue'
import DashboardOrdersView from './pages/Dashboard/Tables/Orders.vue'
import DashboardCommentsView from './pages/Dashboard/Tables/Comments.vue'
import DashboardAddressesView from './pages/Dashboard/Tables/Addresses.vue'
import DashboardUserRolesView from './pages/Dashboard/Tables/UserRoles.vue'
import DashboardEditAdress from './pages/Dashboard/DynamicEditAdress.vue'
import DashboardEditProductPicture from './pages/Dashboard/DynamicEditProductPicture.vue'
import DashboardEdit from './pages/Dashboard/DynamicEdit.vue'

import PageNotFound from './pages/PageNotFound.vue'


const routes = [
    { path: '/', component: DashboardView },

    { path: '/categories', component: DashboardCategoriesView},
    { path: '/users', component: DashboardUsersView },
    { path: '/products', component: DashboardProductsView },
    { path: '/orders', component: DashboardOrdersView},
    { path: '/comments', component: DashboardCommentsView},
    { path: '/addresses', component: DashboardAddressesView},
    { path: '/userroles', component: DashboardUserRolesView},


    { path: '/:entityType/:id', component: DashboardEdit },
    { path: '/add-:entityType', component: DashboardEdit},
    { path: '/add-address/:userId', component: DashboardEditAdress , props: true},//add address
    { path: '/edit-address/:id/:userId', component: DashboardEditAdress , props: true}, //edit addressess
    { path: '/add-productPicture/:productId', component: DashboardEditProductPicture , props: true},//add photo produit


    // { path: '/change-password', component: ProductView},
    // { path: '/change-password/:slug', component: ProductView},


    // route pour les 404
    { path: '/:catchAll(.*)*', component: PageNotFound }

]

const router = createRouter({
    history: createWebHistory(), // for browser history
    routes,
})

export default router