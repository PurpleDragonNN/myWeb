import { createRouter, createWebHashHistory } from "vue-router";
import { Toast } from '@nutui/nutui';
import AV from "leancloud-storage";
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/homepage',
        },
        {
            path: '/radius',
            name: 'radius',
            component: ()=>import('../views/radius/index.vue'),
            meta: {
                title: '圆角矩形切割',
                name: '圆角',
                icon: 'check-normal'
            }
        },
        {
            path: '/christmas',
            name: 'christmas',
            component: ()=>import('../views/christmas/index.vue'),
            meta: {
                title: 'Dorana,Merry Christmas!',
                name: '圣诞',
                icon: 'follow'
            }
        },
        {
            path: '/order',
            name: 'order',
            component: ()=>import('../views/order/index.vue'),
            meta: {
                title: '刷单填单',
                name: '填单',
                icon: 'edit',
                needLogin: true
            },
        },
        {
            path: '/homepage',
            name: 'homepage',
            component: ()=>import('../views/homepage/index.vue'),
            meta: {
                title: '主页',
                name: '主页',
                icon: 'my'
            }
        }
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
