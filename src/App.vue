<template>
    <div class="ignore-container">
        <nut-drag class="btn-menu" v-show="!visible">
            <i @click="visible=true" class="iconfont icon-round_menu_fill"></i>
        </nut-drag>

        <!--        <nut-drag direction="y" :style="{right:'0px',bottom:'0px'}">
                    <nut-fixednav :overlay="true" un-active-text="更多页面" active-text="收起" v-model:visible="visible">
                        <template v-slot:list>
                            <ul class="nut-fixednav__list">
                                <li class="nut-fixednav__list-item" @click="goPage(item)" v-for="item of navList"
                                    :class="{active: $route.path.includes(item.path)}">
                                    <nut-icon :name="item.icon" class="nav-icon"></nut-icon>
                                    {{ item.text }}
                                </li>
                            </ul>
                        </template>
                        <template v-slot:btn>
                            <nut-icon name="left" color="#fff"></nut-icon>
                            <nut-avatar v-if="userInfo && userInfo.headImg" size="40" :icon="userInfo.headImg.url"
                                        shape="round"></nut-avatar>
                            <span v-else class="text">更多</span>
                        </template>
                    </nut-fixednav>
                </nut-drag>-->
        <nut-popup position="right" v-model:visible="visible" :style="{ width: '50%', height: '100%' }">
            <nut-sidenavbar class="main-side_bar">
                <template v-for="item of navList">
                    <nut-subsidenavbar
                        :title="item.title"
                        :ikey="item.key"
                        v-if="item.children"
                    >
                        <nut-sidenavbaritem
                            :title="child.title"
                            :ikey="child.key"
                            :class="{'active': child.path === $route.path}"
                            v-for="child of item.children"
                            @click="goPage(child)"
                        >
                        </nut-sidenavbaritem>
                    </nut-subsidenavbar>

                    <nut-sidenavbaritem
                        v-else :title="item.title"
                        :class="{'active': item.path === $route.path}"
                        :ikey="item.key"
                        @click="goPage(item)"
                    >
                    </nut-sidenavbaritem>
                </template>
            </nut-sidenavbar>

            <router-link class="btn-nav" to="/homepage">
                <i class="iconfont icon-zhuye"></i>
            </router-link>
        </nut-popup>
        <router-view/>
    </div>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";
import {useRouter, useRoute} from 'vue-router';
import router from './router/index'
import {mainStore} from "@/store";
import {storeToRefs} from "pinia";

interface ValueObject {
    [propName: string]: any
}

const store = mainStore()
const {userInfo} = storeToRefs(store)
const $router: Object = useRouter()
const $route: Object = useRoute()
let visible = ref(false)

let nav: object[] = []
/*router.options.routes.forEach((item: ValueObject, index: number) => {
    if (index > 0) {
        nav.push({
            id: index,
            text: item.meta.name,
            icon: item.meta.icon,
            path: item.path
        })
    }
})*/
nav = getRoutesInfo(router.options.routes)

let navList: any = reactive(nav)
onMounted(() => {
    console.log(navList);
})

// 获取路由信息并整合
function getRoutesInfo(routes: any): object[] {
    const arr = []
    for (const routeElement of routes) {
        if (!routeElement.redirect) {
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


function goPage(item: ValueObject) {
    console.log(item);
    visible.value = false;
    ($router as any).push(item.path)
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
            color: $red;
            font-size: 34px;
        }
    }

    .main-side_bar {
        height: 92%;
        .active{
            ::v-deep(span){
                color: $red;
            }
        }
    }

    .btn-nav {
        position: absolute;
        bottom: 4px;
        right: 6px;
        padding: 8px 14px;

        .icon-zhuye {
            font-size: 26px;
            color: $red;
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

.nut-subsidenavbar {
    float: none !important;

    .nut-subsidenavbar__list {
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
