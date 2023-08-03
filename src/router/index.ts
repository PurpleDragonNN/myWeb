import { createRouter, createWebHashHistory } from "vue-router";
import { Toast } from '@nutui/nutui';
import AV from "leancloud-storage";
import routers from './map'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/homepage',
        },
        ...<[]>routers
    ]
})

interface ValueObject {
    [propName:string]: any
}

router.beforeEach((to:ValueObject,from:ValueObject,next:any) => {
    let dom:any = window.document
    dom.title = to.meta.title
    if (to.meta.needLogin && !AV.User.current()) {
        if (from.path !== '/') {
            Toast.warn('没登录你想干啥？');
        }
        router.push('homepage')
    }
    next()
})

export default router;
