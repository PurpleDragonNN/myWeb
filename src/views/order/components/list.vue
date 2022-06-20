<template>
    <nut-tabs v-model="state.tab11value" type="smile">
        <nut-tabpane title="未完成">

            <div class="table-container">
                <nut-table :columns="table.tableHead" :data="listData" striped></nut-table>
            </div>

            <nut-button type="primary" @click="getData">刷新</nut-button>
        </nut-tabpane>
        <nut-tabpane title="已完成">
        </nut-tabpane>
        <nut-tabpane title="所有">
        </nut-tabpane>
    </nut-tabs>
</template>

<script setup lang="ts">
import {ref, onMounted, reactive } from "vue";
import { createFileClass, createQueryClass, createObjClass} from "@/leancloud";
import {mainStore} from "@/store";
import { storeToRefs } from "pinia";
interface ValueObject {
    [propName:string]: any
}

const store = mainStore()
const { userInfo } = storeToRefs(store)
let orderClass = createObjClass('order')
let queryClass = createQueryClass('order')
const state = reactive({
    tab11value: '0',
});

let listData:any = ref([])
let checkboxgroup = ref([])

const table = reactive({
    tableHead: [


        {
            title: '下单日期',
            key: 'date'
        },
        {
            title: '商品名称',
            key: 'product'
        },
        {
            title: '下单数量',
            key: 'count'
        },
        {
            title: '实际盈利',
            key: 'totalEarn'
        },
        {
            title: '实付',
            key: 'payment'
        },
        {
            title: '返单',
            key: 'earn'
        },
        {
            title: '返利',
            key: 'fanli'
        },
        {
            title: '平台',
            key: 'channel'
        },
    ]
})

onMounted(() => {

})

const getData = () => {
    queryClass.equalTo('userObjectId', userInfo.value.objectId)
    queryClass.ascending('createdAt');
    queryClass.find().then(res => {
        console.log(res);
        listData.value = []
        for(let item of (res)){
            let obj:any = item.toJSON()
            obj.totalEarn = obj.earn-obj.payment+obj.fanli
            listData.value.push(obj)
        }
    })
}
const toFinish = () => {
    queryClass.equalTo('userObjectId', userInfo.value.objectId)
    queryClass.ascending('createdAt');
    queryClass.find().then(res => {
        console.log(res);
        listData.value = []
        for(let item of (res)){
            listData.value.push(item.toJSON())
        }
    })
}

</script>


<style lang="scss" scoped>
.nut-tabs{
    padding: 0 15px;
    width: 100%;
    .nut-tabpane{
        padding-left: 0;
        padding-right: 0;
        .table-container{
            width: 100%;
            overflow-x: auto;
            .nut-table{
                width: 900px;
            }
        }
    }

}



</style>
