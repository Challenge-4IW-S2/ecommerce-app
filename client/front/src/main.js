import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useUserStore } from './store/userStore.js'
import { useUserAuthStore} from "./store/userAuthStore.js";
import { useStockStore} from "./store/useStockStore.js";

import { v4 as uuidv4 } from 'uuid'
import './style.css'
import App from './App.vue'
import router from './router.js'
import 'flowbite';

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
const userStore = useUserStore();
const userAuthStore = useUserAuthStore();
const stockStore = useStockStore();
userAuthStore.checkAuthStatus();

// create a sessionId and bag for the user when the app is loaded
userStore.initSessionAndBag(uuidv4());


stockStore.fetchProducts();
