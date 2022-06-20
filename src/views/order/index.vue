<template>
  <div class="container">
      <nut-tabbar @tab-switch="tabSwitch" v-model:visible="currentTab">
          <nut-tabbar-item tab-title="填单" icon="home"></nut-tabbar-item>
          <nut-tabbar-item tab-title="列表" icon="category"></nut-tabbar-item>
      </nut-tabbar>

      <fillCom v-show="currentTab===0"></fillCom>
      <listCom v-show="currentTab===1"></listCom>

  </div>

</template>

<script setup lang="ts">
import {ref, onMounted, reactive } from "vue";
import dayjs from "dayjs";
import fillCom from './components/fill.vue'
import listCom from './components/list.vue'

interface ValueObject {
  [propName:string]: any
}
let currentTab = ref(1)

function tabSwitch(item:ValueObject, index:number) {
    console.log(index);
    currentTab.value = index
}

</script>


<style lang="scss" scoped>
.container{
  padding: 0;
  width: 100%;
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  font-size: 34px;
  color: #333;

    .nut-tabbar{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }

}


</style>
