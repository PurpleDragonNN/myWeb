import { createRouter, createWebHashHistory } from "vue-router";
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/index'
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

export default router;
