import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import NutUI from "@nutui/nutui";
import "@nutui/nutui/dist/style.css";
import { createPinia } from 'pinia'
// @ts-ignore
createApp(App).use(NutUI).use(router).use(createPinia()).mount('#app')



// @ts-ignore
window.dataBase = {
}
