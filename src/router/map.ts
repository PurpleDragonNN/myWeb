export default [
    {
        path: '/tools',
        name: 'tools',
        component: ()=>import('../views/tools/index.vue'),
        meta: {
            title: '在线工具',
            name: '工具',
            icon: 'check-normal'
        },
        children: [
            {
                path: '/tools',
                redirect: '/tools/richText',
            },
            {
                path: '/tools/richText',
                name: 'richText',
                component: ()=>import('../views/tools/richText.vue'),
                meta: {
                    title: '富文本格式化',
                }
            },
            {
                path: '/tools/radius',
                name: 'radius',
                component: ()=>import('../views/tools/radius.vue'),
                meta: {
                    title: '圆角矩形切割',
                }
            },
            {
                path: '/tools/verificationCode',
                name: 'verificationCode',
                component: ()=>import('../views/tools/verificationCode.vue'),
                meta: {
                    title: '验证码识别',
                }
            },
            {
                path: '/order',
                name: 'order',
                component: ()=>import('../views/order/index.vue'),
                meta: {
                    title: '刷单填单',
                },
            },

        ]
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
        path: '/homepage',
        name: 'homepage',
        component: ()=>import('../views/homepage/index.vue'),
        meta: {
            title: '主页',
            name: '主页',
            icon: 'my'
        }
    },
]
