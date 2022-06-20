<template>
    <nut-tabs v-model="state.tabVal" type="smile">
        <nut-tabpane title="未完成">

            <div class="table-container">
                <nut-table :columns="table.tableHead" :data="listData" striped></nut-table>
            </div>
            <nut-pagination v-model="page.currentPage" :total-items="page.total" :items-per-page="page.pageSize" :show-page-size="3" force-ellipses @change="pageChange" />

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
import { Toast } from '@nutui/nutui';

interface ValueObject {
    [propName:string]: any
}

const store = mainStore()
const { userInfo } = storeToRefs(store)
let orderClass = createObjClass('order')
let queryClass = createQueryClass('order')
const state = reactive({
    tabVal: '0',
});

const page = reactive({
    currentPage: 1,
    pageSize: 5,
    total: 100,
})

let listData:any = ref([])

const table = reactive({
    tableHead: [
        {
            title: '日期',
            key: 'date',
            align: 'center'
        },
        {
            title: '名称',
            key: 'product',
            align: 'center'
        },
        {
            title: '盈利',
            key: 'totalEarn',
            align: 'center'
        },
        {
            title: '返单',
            key: 'earn',
            align: 'center'
        },
        {
            title: '实付',
            key: 'payment',
            align: 'center'
        },

        {
            title: '返利',
            key: 'fanli',
            align: 'center'
        },
        {
            title: '数量',
            key: 'count',
            align: 'center'
        },
        {
            title: '平台',
            key: 'channel',
            align: 'center'
        },
    ]
})

onMounted(() => {
    getData()
})

const getData = () => {
    queryClass.equalTo('userObjectId', userInfo.value.objectId)
    queryClass.descending('createdAt');
    queryClass.limit(page.pageSize);
    console.log((page.currentPage - 1) * page.pageSize);
    queryClass.skip((page.currentPage-1) * page.pageSize);
    Toast.loading('加载中');
    queryClass.findAndCount().then(([res,count]) => {
        Toast.hide();
        page.total = count
        listData.value = []
        for(let item of res){
            let obj:any = item.toJSON()
            obj.totalEarn = formatNumber(formatNumber(obj.earn,obj.fanli),-obj.payment)
            listData.value.push(obj)
        }
    })
}
const pageChange = (value: number) => {
    console.log(value);
    page.currentPage = value
    getData()
};

// 解决精度丢失问题
const formatNumber = (num1:number, num2:number) => {
    num1 = String(num1).includes('.') ? Number(String(num1).replace('.', '')) : num1*100
    num2 = String(num2).includes('.') ? Number(String(num2).replace('.', '')) : num2*100
    return (num1+num2)/100
}

</script>


<style lang="scss" scoped>
.nut-tabs{
    padding: 0;
    width: 100%;
    height: calc(100vh - 104px);
   ::v-deep .nut-tabs__content{
        flex: 1;
       overflow-y: auto;
       overflow-x: hidden;
        .nut-tabpane{
            padding: 20px 15px;
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: auto;
            .table-container{
                margin-bottom: 20px;
                width: 100%;
                overflow-x: auto;
                .nut-table{
                    //width: 700px;
                    ::v-deep .nut-table__main__head__tr__th{
                        min-width: 60px;
                        &:last-child,&:nth-last-child(2){
                            min-width: 40px;
                        }
                        &:nth-child(-n+2){
                        }
                    }
                    ::v-deep .nut-table__main__body__tr__td{
                        min-width: 60px;
                        &:last-child,&:nth-last-child(2){
                            min-width: 40px;
                        }
                        &:nth-child(3){
                            color: #fa2c19;
                        }
                    }
                    ::v-deep .nut-table__main__head__tr__th,
                    ::v-deep .nut-table__main__body__tr__th,
                    ::v-deep .nut-table__main__head__tr__td,
                    ::v-deep .nut-table__main__body__tr__td {
                        padding: 6px 2px;
                        vertical-align: middle;
                    }
                }
            }

            .nut-pagination{
                margin: 0 auto 20px;
            }
        }

    }

}



</style>
