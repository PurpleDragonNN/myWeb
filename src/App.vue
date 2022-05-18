<template>
  <div class="ignore-container">
    <nut-drag direction="y" :style="{right:'0px',bottom:'100px'}">
      <nut-fixednav :overlay="false" un-active-text="更多页面" active-text="收起" v-model:visible="visible">
        <template v-slot:list>
          <ul class="nut-fixednav__list">
            <li class="nut-fixednav__list-item" @click="goPage(item)" v-for="item of navList" :class="{active: $route.path===item.path}">
              <nut-icon :name="item.icon" class="nav-icon"></nut-icon>
              {{item.text}}
            </li>
          </ul>
        </template>
      </nut-fixednav>
    </nut-drag>
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import {ref,reactive, onMounted} from "vue";
import { useRouter, useRoute } from 'vue-router';
import router from './router/index'
interface ValueObject {
  [propName:string]: any
}
const $router = useRouter()
let visible = ref(false)

let nav: object[] = []
router.options.routes.forEach((item:ValueObject,index:number) => {
  if (index > 0) {
    nav.push({
      id: index,
      text: item.meta.name,
      icon: item.meta.icon,
      path: item.path
    })
  }
})
let navList: any = reactive(nav)

onMounted(() => {

})


function goPage(item:ValueObject){
  $router.push(item.path)
}
</script>

<style lang="scss">
*{
  box-sizing: border-box;
}
.ignore-container{
  position: relative;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
  .nut-fixednav__list{
    &-item{
      font-size: 10px;
      color: #444;
      .nav-icon{
        font-size: 20px;
        margin-bottom: 4px;
        transform: rotate(0) !important;
      }
      &.active{
        color: #fa2c19;
      }
     }
  }
}
</style>
