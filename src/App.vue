<template>
    <div class="ignore-container">
        <nut-drag class="btn-menu" v-show="!visible">
            <i @click="visible=true" class="iconfont icon-round_menu_fill"></i>
        </nut-drag>

        <nut-popup position="right" v-model:visible="visible" :style="{ width: '50%', height: '100%' }">
            <nut-side-navbar class="main-side_bar">
                <template v-for="item of navList">
                    <nut-sub-side-navbar
                        :title="item.title"
                        :ikey="item.key"
                        v-if="item.children"
                    >
                        <nut-side-navbar-item
                            :title="child.title"
                            :ikey="child.key"
                            :class="{'active': child.path === $route.path}"
                            v-for="child of item.children"
                            @click="goPage(child)"
                        >
                        </nut-side-navbar-item>
                    </nut-sub-side-navbar>

                    <nut-side-navbar-item
                        v-else :title="item.title"
                        :class="{'active': item.path === $route.path}"
                        :ikey="item.key"
                        @click="goPage(item)"
                    >
                    </nut-side-navbar-item>
                </template>
            </nut-side-navbar>

            <div class="btn-nav btn-setting" @click="handleSetting">
                <i class="iconfont icon-setting"></i>
            </div>
            <div class="btn-nav" @click="goHomePage">
                <i class="iconfont icon-zhuye"></i>
            </div>
        </nut-popup>
        <entryCom ref="entryRef" @loginCallback="loginCallback"></entryCom>
        <settingCom ref="settingRef" :menuItems="menuItems"></settingCom>
        <router-view/>
    </div>
</template>

<script setup lang="ts">
import settingCom from '@/components/setting.vue'
import entryCom from '@/components/entry.vue'
import {ref, reactive, onMounted, getCurrentInstance, watch, nextTick} from "vue";
import {useRouter, useRoute} from 'vue-router';
import router from './router/index'
import {mainStore} from "@/store";
import {storeToRefs} from "pinia";
import {Dialog, showToast} from "@nutui/nutui";
import AV from "leancloud-storage";
const { proxy }: any = getCurrentInstance();

interface ValueObject {
    [propName: string]: any
}
const settingRef = ref<any>(null);
const entryRef = ref<any>(null);
const store = mainStore()
const {userInfo} = storeToRefs(store)
const $router: Object = useRouter()
const $route: Object = useRoute()
let visible = ref(false)

let nav: object[] = []
nav = getRoutesInfo(router.options.routes)

let navList: any = reactive(nav)

const menuItems = [
    {
        name: '修改个人信息',
        event: () => {
            entryRef.value.updateVisible = true
        }
    },
    {
        name: '修改密码',
        event: () => {
            entryRef.value.updatePWVisible = true
        }
    },
    {
        name: '注销登录',
        event: logout
    }
];

onMounted(() => {
    store.updateElRef({
        entryRef: entryRef.value,
        settingRef: settingRef.value,
    })
})
watch(() => proxy.$loading, val => {
    if (val) {
        showToast.loading('loading', {
            cover: true
        });
    } else {
        showToast.hide();
    }
})
watch(userInfo, async val => {
    if (val) {
        menuItems[2] = {
            name: '注销登录',
            event: logout
        }
    } else {
        menuItems[2] = {
            name: '登录',
            event: showLoginDialog
        }
        await nextTick()
        showLoginDialog()
    }

}, {immediate: true, deep: true})

// 登录成功回调
const loginCallback = () => {
    store.fetchUserInfo()
}

// 显示登录弹窗
function showLoginDialog(){
    console.log(entryRef.value);
    entryRef.value.logVisible = true
}

// 注销登录
function logout(){
    (<any>Dialog)(<any>{
        content: '确认退出当前登录？',
        onOk: () => {
            AV.User.logOut().then(() => {
                store.fetchUserInfo()
            })
        },
    });
}

// 获取路由信息并整合
function getRoutesInfo(routes: any): object[] {
    const arr = []
    for (const routeElement of routes) {
        if (!routeElement.redirect && !routeElement.meta?.ignore) {
            const obj = {
                key: routeElement.name,
                title: routeElement.meta.name || routeElement.meta.title,
                children: routeElement.children ? getRoutesInfo(routeElement.children) : undefined,
                path: routeElement.path
            }
            if (!obj.children) {
                delete obj.children
            }
            arr.push(obj)
        }
    }
    return arr
}

function handleSetting () {
    visible.value = false;
    settingRef.value.actionsheetVisible=true
}

function goPage(item: ValueObject) {
    visible.value = false;
    ($router as any).push(item.path)
}

function goHomePage(item: ValueObject) {
    visible.value = false;
    ($router as any).push('/homepage')
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/common.scss";

.ignore-container {
    position: relative;
    max-width: 500px;
    margin: 0 auto;
    width: 100%;

    .btn-menu {
        bottom: 80px;
        right: 20px;

        .icon-round_menu_fill {
            color: $darkPurple;
            font-size: 34px;
        }
    }

    .main-side_bar {
        height: 92%;
        .active{
            :deep(span){
                color: $darkPurple;
            }
        }
    }

    .btn-nav {
        position: absolute;
        bottom: 4px;
        right: 6px;
        padding: 8px 14px;

        .iconfont {
            font-size: 26px;
            color: $darkPurple;
        }
        &.btn-setting{
            left: 6px;
        }
    }

    .nut-fixednav__list {
        &-item {
            font-size: 10px;

            .nav-icon {
                font-size: 20px;
                margin-bottom: 4px;
                transform: rotate(0) !important;
            }

            &.active {
                color: #fa2c19;
            }
        }
    }

    .nut-fixednav__btn {
        padding-left: 0;
    }
}
</style>

<style lang="scss">
* {
    box-sizing: border-box;
}

body {
    color: #262626;
}

.nut-dialog {
    .nut-dialog__content {
        max-height: 850px;
    }
}

.nut-sub-side-navbar {
    float: none !important;

    .nut-sub-side-navbar__list {
        overflow: hidden;
    }
}


@media screen and (min-device-width: 500px) {
    html {
        font-size: 5px;
    }
    .nut-dialog {
        width: 500px !important;

        .nut-dialog__content {
            max-height: 500px;
        }
    }
}

</style>
