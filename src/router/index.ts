import { createRouter, createWebHashHistory } from "vue-router";
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/radius',
            meta: {
                title: '圆角矩形切割'
            }
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
        }
    ]
})
interface ValueObject {
    [propName:string]: any
}

router.beforeEach((to:ValueObject,from:ValueObject,next:any) => {
    let dom:any = window.document
    dom.title = to.meta.title
    next()
})

export default router;
