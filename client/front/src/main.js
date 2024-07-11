import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useUserStore } from './store/userStore'
import { v4 as uuidv4 } from 'uuid'
import './style.css'
import App from './App.vue'
import router from './router.js'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
const userStore = useUserStore();

// create a sessionId and bag for the user when the app is loaded
userStore.initSessionAndBag(uuidv4());
console.log(userStore.user);
