<template>
  <div class="container">
      <fillCom class="main" v-show="currentTab===0" @submitOrderCb="submitOrderCb"></fillCom>
      <listCom class="main" v-if="initList" v-show="currentTab===1"></listCom>
      <nut-tabbar @tab-switch="tabSwitch" v-model:visible="currentTab">
          <nut-tabbar-item tab-title="填单" icon="home"></nut-tabbar-item>
          <nut-tabbar-item tab-title="列表" icon="category"></nut-tabbar-item>
      </nut-tabbar>

  </div>

</template>

<script setup lang="ts">
import {ref, onMounted, reactive } from "vue";
import fillCom from './components/fill.vue'
import listCom from './components/list.vue'

interface ValueObject {
  [propName:string]: any
}
let currentTab = ref(0)
let initList = ref(false)

function tabSwitch(item:ValueObject, index:number) {
    if (index === 1) {
        initList.value = true
    }
    currentTab.value = index
}

// 提交后将列表页状态改为未初始化，以便刷新数据
function submitOrderCb() {
    initList.value = false
}

</script>


<style lang="scss" scoped>
.container{
    position: fixed;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  font-size: 34px;
  color: #333;

    .main{
        flex: auto;
        overflow: hidden;
    }
    .nut-tabbar{
        width: 100%;
        flex: none;
    }

}


</style>
