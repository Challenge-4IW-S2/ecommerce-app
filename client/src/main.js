import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router.js'
import { v4 as uuidv4 } from 'uuid'
import { useUserStore } from './store/userStore.js'
import { useCartStore } from './store/cartStore.js'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
const userStore = useUserStore();
const cartStore = useCartStore();

// create a sessionId and bag for the user when the app is loaded
if (userStore.user === null) {
    userStore.setUser(uuidv4());
    cartStore.initBag(userStore.user);
}