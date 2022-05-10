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
                title: '圆角矩形切割'
            }
        }
    ]
})
router.beforeEach((to,from,next) => {
    let dom:any = window.document
    dom.title = to.meta.title
    next()
})

export default router;
