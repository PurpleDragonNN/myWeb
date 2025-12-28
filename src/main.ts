import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import NutUI from "@nutui/nutui";
// import "@nutui/nutui/dist/style.css";
import "@nutui/nutui/dist/styles/themes/default.scss";
import { createPinia } from 'pinia'
import AV from "leancloud-storage";
import vConsole from "vconsole";

//华北
/*AV.init({
    appId: 'RkUUB80oGO9vlo9htFYem297-gzGzoHsz',
    appKey: 'A4hJjBWVBKMoPpPKRCOrQUnk',
    serverURL: 'https://rkuub80o.lc-cn-n1-shared.com'
})*/
// 国际
AV.init({
    appId: 'zEzq4jmMzNJCXDyEpMzl4TaB-MdYXbMMI',
    appKey: 'lTEUwdAVwLqHvANYPoqzq7Zw',
    serverURL: 'https://api.purpledragon.top'
})
// 创建vConsole实例
if (location.href.includes('vconsole')) {
}
new vConsole();


// @ts-ignore
const app = createApp(App)
// 全局变量
// app.config.globalProperties.$loading = false
app.use(NutUI).use(router).use(createPinia()).mount('#app')


// @ts-ignore
window.dataBase = {
}
