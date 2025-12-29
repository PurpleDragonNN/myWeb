import { createRouter, createWebHashHistory } from "vue-router";
import { showToast } from '@nutui/nutui';
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
    window.document.title = to.meta.title
    if (to.meta.needLogin && !AV.User.current()) {
        if (from.path !== '/') {
            showToast.warn('请先登录');
        }
        router.push('homepage')
    }
    next()
})

export default router;
