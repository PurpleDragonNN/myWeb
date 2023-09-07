<template>
    <div class="tabbar">
        <div class="tabbar-items">
            <div class="tabbar-item" @click="select(index,item)" :class="{'mid-item': item.icon==='icon-zengjia', active: item.active}" v-for="(item,index) of options">
                <div class="btn-wrap">
                    <i class="iconfont" :class="item.icon"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import { getCurrentInstance, watch } from "vue";
const { proxy } = getCurrentInstance();

let options = ref<any[]>([
    {
        icon: 'icon-task',
        path: '/schedule/todo',
        active: false
    },
    {
        icon: 'icon-zengjia',
        active: false,
    },
    {
        icon: 'icon-note1',
        path: '/schedule/notes',
        active: false,
    },
])

watch(() => proxy.$route, val => {
    for (const item of options.value) {
        item.active = false
        if (item.path === val.path) {
            item.active = true
        }
    }
}, {
    immediate: true
})

function select (index, tab) {
    console.log(index, tab);
    if (tab.path) {
        proxy.$router.push(tab.path)
    } else {
        if (proxy.$route.path === '/schedule/todo') {
            proxy.$router.push('/schedule/addTodo')
        } else if (proxy.$route.path === '/schedule/notes') {
            proxy.$router.push('/schedule/addNote')
        }
    }
}

</script>

<style lang="scss" scoped>
@import "@/assets/css/common.scss";
.tabbar{
    width: 702px;
    height: 120px;
    font-size: 26px;
    background: rgb(255, 255, 255);
    box-shadow: 6px 10px 30px 4px rgba(100, 100, 100, 0.18);
    border-radius:32px;
    color: #ccc;
    .tabbar-items{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .tabbar-item{
            @extend .center;
            flex: 1;
            text-align: center;
            &.mid-item{
                flex: 1.2;
                .btn-wrap{
                    @extend .center;
                    width: 90px;
                    height: 90px;
                    border-radius: 50%;
                    background: $darkPurple;
                }
                .iconfont{
                    color: rgb(255, 255, 255);
                    font-weight: bold;
                    font-size: 36px;
                }
            }
            &.active{
                color: $darkPurple;
            }
            .iconfont{
                font-size: 54px;
            }
            .desc{
                line-height: 44px;
            }
        }
    }

}
</style>
