import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import NutUI from "@nutui/nutui";
import "@nutui/nutui/dist/style.css";
// @ts-ignore
createApp(App).use(NutUI).use(router).mount('#app')
