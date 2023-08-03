import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import NutUI from "@nutui/nutui";
import "@nutui/nutui/dist/style.css";
import { createPinia } from 'pinia'
import AV from "leancloud-storage";
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
    serverURL: 'https://www.purpledragon.top'
})

// @ts-ignore
createApp(App).use(NutUI).use(router).use(createPinia()).mount('#app')


// @ts-ignore
window.dataBase = {
}
