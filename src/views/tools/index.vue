<template>
  <div class="tools-container">
    <nut-menu>
      <nut-menu-item v-model="defaultValue" :cols="2" :options="options" @change="handleChange" />
    </nut-menu>
      <div class="router-view">
          <router-view></router-view>
      </div>
  </div>

</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {useRouter, useRoute} from "vue-router";
interface ValueObject {
  [propName:string]: any
}
let options = ref<any>([])
let defaultValue = ref('')

const $route:ValueObject = useRoute()

watch(() => $route.path, (val:string) => {
    defaultValue.value = val
},{deep:true,immediate: true})

const $router:ValueObject = useRouter()
$router.options.routes[1].children.forEach((item:ValueObject) => {
    if (item.meta) {
        options.value.push({
            text: item.meta.title,
            value: item.path
        })
    }
})

const handleChange = (val:string) => {
    $router.push(val)
}

</script>


<style lang="scss" scoped>
*{
    font-size: 34px;
}
.tools-container{
  width: 100%;
  height: 100vh;
  overflow: auto;
  display: flex;
    flex-direction: column;
  box-sizing: border-box;
  color: #333;

    .nut-menu{
        width: 100%;
        ::v-deep(.nut-menu-item__content){
            width: 100%;
        }
    }

    .router-view{
        width: 100%;
        flex: 1;
        overflow: auto;
    }
}


</style>
