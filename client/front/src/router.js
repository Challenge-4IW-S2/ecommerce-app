import {
    createMemoryHistory,
    createRouter,
    createWebHistory,
} from "vue-router";

import HomeView from "./pages/Homepage.vue";
import LoginView from "./pages/Login.vue";
import LogoutView from "./pages/Logout.vue";
import RegisterView from "./pages/Register.vue";
import CVG from "./pages/legal/CGV.vue";
import Dashboard from "./pages/Dashboard/Dashboard.vue";
import PDC from "./pages/legal/PolitiqueDeConfidentialite.vue"

import UserView from "./pages/Account/User.vue";
import UserHomeView from "./pages/Account/UserHomeView.vue";
import UserOrdersView from "./pages/Account/Orders.vue";
import UserAdressesView from "./pages/Account/Addresses.vue";

import ProductsView from "./pages/Products/Products.vue";
import ProductView from "./pages/Products/Product.vue";
import DashboardUsersView from "./pages/Dashboard/Tables/Users.vue";
import DashboardProductsView from "./pages/Dashboard/Tables/Products.vue";
import DashboardCategoriesView from "./pages/Dashboard/Tables/Categories.vue";
import DashboardOrdersView from "./pages/Dashboard/Tables/Orders.vue";
import DashboardCommentsView from "./pages/Dashboard/Tables/Comments.vue";
import DashboardAddressesView from "./pages/Dashboard/Tables/Addresses.vue";
import DashboardUserRolesView from "./pages/Dashboard/Tables/UserRoles.vue";
import DashboardEditAdress from "./pages/Dashboard/DynamicEditAdress.vue";
import DashboardEditProductPicture from "./pages/Dashboard/DynamicEditProductPicture.vue";
import DashboardEdit from "./pages/Dashboard/DynamicEdit.vue";
import DashboardStock from "./pages/Dashboard/Tables/Stock.vue";
import Subscriptions from "./pages/Account/Subscriptions.vue";

import PageNotFound from "./pages/PageNotFound.vue";
import { isUserAuthenticated } from "./api/auth.js";
import { useUserAuthStore } from "./store/userAuthStore.js";


const routes = [

    {
        path: "/",
        component: HomeView,
    },
    {
        path: "/login",
        component: LoginView,
        meta: {
            requiresNoAuth: true,
        },
    },
    {
        path: "/logout",
        component: LogoutView,
        meta: {
            requiresAuth: true,
        },
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
                path: 'adresses',
                component: UserAdressesView
            },
            {
                path: 'settings',
                component: Subscriptions
            }
        ]
    },
    {
        path: '/products',
        name: 'products',
        component: ProductsView
    },
    {
        path: "/register",
        component: RegisterView,
        meta: {
            requiresNoAuth: true,
        },
    },
    {
        path: "/account",
        component: UserView,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: "",
                component: UserHomeView,
            },
            {
                path: "orders",
                component: UserOrdersView,
            },
            {
                path: "adresses",
                component: UserAdressesView,
            },
            {
                path: "settings",
                component: Subscriptions,
            },
        ],
    },

    {
        path: "/products",
        component: ProductsView,
    },
    {
        path: "/product/:slug",
        component: ProductView,
    },
    {
        path: "/change-password",
        component: ProductView,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/change-password/:slug",
        component: ProductView,
    },

    {
        path: "/login?token=:token",
        component: LoginView,
    },


    { path: '/admin/categories', component: DashboardCategoriesView},
    { path: '/admin/users', component: DashboardUsersView },
    { path: '/admin/products', component: DashboardProductsView },
    { path: '/admin/orders', component: DashboardOrdersView},
    { path: '/admin/comments', component: DashboardCommentsView},
    { path: '/admin/addresses', component: DashboardAddressesView},
    { path: '/admin/userroles', component: DashboardUserRolesView},
    { path: "/conditions-generales-de-vente", component: CVG },
    // { path: "/politique-de-confidentialite", component: PDC },

    { path: "/admin/categories", component: DashboardCategoriesView },
    { path: "/admin/users", component: DashboardUsersView },
    { path: "/admin/products", component: DashboardProductsView },
    { path: "/admin/orders", component: DashboardOrdersView },
    { path: "/admin/comments", component: DashboardCommentsView },
    { path: "/admin/addresses", component: DashboardAddressesView },
    { path: "/admin/userroles", component: DashboardUserRolesView },

    { path: '/admin/:entityType/:id', component: DashboardEdit },
    { path: '/admin/add-:entityType', component: DashboardEdit},
    { path: '/admin/add-address/:userId', component: DashboardEditAdress , props: true},//add address
    { path: '/admin/edit-address/:id/:userId', component: DashboardEditAdress , props: true}, //edit addressess
    { path: '/admin/stock', component: DashboardStock},
    { path: '/admin/', component: Dashboard},


    { path: "/admin/:entityType/:id", component: DashboardEdit },
    { path: "/admin/add-:entityType", component: DashboardEdit },
    {
        path: "/admin/add-address/:userId",
        component: DashboardEditAdress,
        props: true,
    }, //add address
    {
        path: "/admin/edit-address/:id/:userId",
        component: DashboardEditAdress,
        props: true,
    }, //edit addressess
    {
        path: "/admin/stock",
        component: DashboardStock,
    },

    { path: "/admin/", component: Dashboard },

    { path: '/account/settings/preferences', component: Subscriptions },
    { path: '/politique-de-confidentialite', component: PDC },
    { path: '/conditions-generales-de-vente', component: CGV },
    { path: '/mentions-legales', component: LegalMentions },





    { path: "/products", component: ProductsView },
    { path: "/product/:slug", component: ProductView },

    // route pour les 404
    {
        path: "/:catchAll(.*)*",
        component: PageNotFound,
    },
];

const router = createRouter({
    history: createWebHistory(), // for browser history
    routes,
});

router.beforeEach(async (to, from, next) => {
    const requiresNoAuth = to.matched.some(
        (record) => record.meta.requiresNoAuth
    );
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const user = await isUserAuthenticated();
    const isLogged = user !== false;

    const userAuthStore = useUserAuthStore();
    userAuthStore.setUserDetails(isLogged ? user : null);
    userAuthStore.setLoginStatus(isLogged);

    if (requiresNoAuth && isLogged) {
        next("/");
        return;
    }
    if (requiresAuth && !isLogged) {
        next("/login");

        return;
    }

    next();
});

export default router;
