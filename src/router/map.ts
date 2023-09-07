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
            /*{
                path: '/tools/verificationCode',
                name: 'verificationCode',
                component: ()=>import('../views/tools/verificationCode.vue'),
                meta: {
                    title: '验证码识别',
                }
            },*/
            /*{
                path: '/order',
                name: 'order',
                component: ()=>import('../views/order/index.vue'),
                meta: {
                    title: '刷单填单',
                },
            },*/
            {
                path: '/tools/encode',
                name: 'encode',
                component: ()=>import('../views/tools/encode.vue'),
                meta: {
                    title: '加密解密',
                }
            },

        ]
    },
    {
        path: '/schedule',
        name: 'schedule',
        component: ()=>import('../views/schedule/index.vue'),
        meta: {
            title: '记录',
        },
        children: [
            {
                path: '/schedule/todo',
                name: 'todo',
                component: ()=>import('../views/schedule/todo.vue'),
                meta: {
                    title: '待办',
                }
            },
            {
                path: '/schedule/notes',
                name: 'notes',
                component: ()=>import('../views/schedule/notes.vue'),
                meta: {
                    title: '备忘录',
                }
            },
            {
                path: '/schedule/addTodo',
                name: 'addTodo',
                component: ()=>import('../views/schedule/addTodo.vue'),
                meta: {
                    title: '新增待办',
                    ignore: true, // true：不出现在导航栏里
                }
            },
            {
                path: '/schedule/editTodo',
                name: 'editTodo',
                component: ()=>import('../views/schedule/addTodo.vue'),
                meta: {
                    title: '编辑待办',
                    ignore: true, // true：不出现在导航栏里
                }
            },
            {
                path: '/schedule/addNote',
                name: 'addNote',
                component: ()=>import('../views/schedule/addNote.vue'),
                meta: {
                    title: '新增待办',
                    ignore: true, // true：不出现在导航栏里
                }
            },
            {
                path: '/schedule/editNote',
                name: 'editNote',
                component: ()=>import('../views/schedule/addNote.vue'),
                meta: {
                    title: '编辑待办',
                    ignore: true, // true：不出现在导航栏里
                }
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
