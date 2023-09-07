<template>
    <div class="container">
        <div class="main">
            <router-view></router-view>
        </div>
        <Tabbar v-if="['todo','notes'].includes(proxy.$route.name)"></Tabbar>
    </div>

</template>
<script setup lang="ts">
import Tabbar from './components/Tabbar.vue'

import {ref, onMounted, nextTick, watch, getCurrentInstance} from "vue";
interface ValueObject {
    [propName: string]: any
}
const { proxy }: any = getCurrentInstance();
let inputValue = ref('')

let hexUrl = ref('')
let ocrRes = ref('')



</script>


<style lang="scss">
.container {
    padding: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    color: #333;
    .main{
        flex: 1;
        width: 100%;
        overflow: hidden;
    }
    .tabbar{
        flex: none;
        margin: 0 auto 26px;
    }
}
$colorPurple: rgb(10, 33, 83);

</style>
