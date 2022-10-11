<template>
  <div class="tools-container">
    <nut-menu>
      <nut-menu-item v-model="value" :cols="2" :options="options" @change="handleChange" />
    </nut-menu>
      <div class="router-view">
          <router-view></router-view>
      </div>
  </div>

</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";
interface ValueObject {
  [propName:string]: any
}
let options = ref([
    { text: '富文本格式化', value: 'richText' },
    { text: '圆角矩形切割', value: 'radius' },
])
let value = ref('richText')
const $router:ValueObject = useRouter()

const handleChange = (val:string) => {
    $router.push(`/tools/${val}`)
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
