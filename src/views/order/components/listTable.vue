<template>
    <ul class="table-container">
        <div v-if="table.listData && table.listData.length" class="list-row table-head">
            <div class="row-item" v-for="headItem of table.tableHead">{{headItem.title}}</div>
        </div>
        <div v-if="table.listData && table.listData.length" class="table-body" :id="`customScroll${props.tabNum}`">
            <nut-infiniteloading
                :use-window='false'
                :container-id="`customScroll${props.tabNum}`"
                :has-more="hasMore"
                is-open-refresh
                @load-more="loadMore"
                @refresh="refresh"
            >

                <nut-swipe v-for="row of table.listData" :key="row.objectId" :disabled="props.tabNum!==0">
                    <li class="list-row">
                        <div class="row-item" v-for="headItem of table.tableHead" :class="{[`${headItem.class}`]: headItem.class}">
                            {{row[headItem.key]}}
                        </div>
                    </li>
                    <template #right>
                        <nut-button class="swipe-btn" shape="square" type="success" @click="changeStatus(row)">完成</nut-button>
                    </template>
                </nut-swipe>
            </nut-infiniteloading>
        </div>
        <nut-empty v-else description="暂无订单"></nut-empty>
    </ul>
</template>

<script setup lang="ts">
import {ref, onMounted, reactive, defineProps, defineEmits} from "vue";
import {createFileClass, createQueryClass, createObjClass, createWithoutData} from "@/leancloud";
import {mainStore} from "@/store";
import { storeToRefs } from "pinia";
import {Notify, Toast} from '@nutui/nutui';


interface ValueObject {
    [propName:string]: any
}

const store = mainStore()
const { userInfo } = storeToRefs(store)
let orderClass = createObjClass('order')
let queryClass = createQueryClass('order')

const props = defineProps({
    tabNum:{
        type: Number,
        default: 0
    }
})
const emit = defineEmits<{
    (e: 'changeStatusCb'): void,
}>()

const page = reactive({
    currentPage: 1,
    pageSize: 20,
    total: 100,
})
console.log('tabNum:',props.tabNum);

const hasMore = ref(true);
const table = reactive({
    tableHead:[
    {
        title: '日期',
        key: 'date',
    },
    {
        title: '名称',
        key: 'product',
    },
    {
        title: '返单',
        key: 'receive',
        class: 'red-color'
    },
    {
        title: '实付',
        key: 'payment',
    },

    {
        title: '返利',
        key: 'fanli',
    },
    {
        title: '盈利',
        key: 'totalEarn',
    },
    {
        title: '数量',
        key: 'count',
    },
    {
        title: '平台',
        key: 'channel',
    },
],
    listData: <any>[]
})
onMounted(() => {
    getData(false)
})

const loadMore = (done:Function) => {
    getData(true).then(() => {
        done()
    })
};
const refresh = (done:Function) => {
    getData(false).then(() => {
        done()
    })
};
const changeStatus = (item:ValueObject) => {
    let row = createWithoutData('order',item.objectId)
    row.set('isFinish', true)
    Toast.loading('loading');
    row.save().then(res => {
        Toast.hide();
        getData(false)
        emit('changeStatusCb')
    });
};

/**
 *
 * @param isLoadMore true:滚动加载；false：初始化或刷新
 */
const getData = (isLoadMore:boolean) => {
    if (isLoadMore) {
        page.currentPage ++
    } else {
        page.currentPage = 1
        table.listData.length = 0
        hasMore.value = true
    }
    queryClass.equalTo('userObjectId', userInfo.value.objectId)
    if (props.tabNum < 2) {
        queryClass.equalTo('isFinish', Boolean(props.tabNum))
    }
    queryClass.descending('createdAt');
    queryClass.limit(page.pageSize);
    queryClass.skip((page.currentPage-1) * page.pageSize);

    Toast.loading('loading');
    return queryClass.findAndCount().then(([res,count]) => {
        Toast.hide();
        page.total = count
        for(let item of res){
            let obj:any = item.toJSON()
            obj.totalEarn = formatNumber(formatNumber(obj.receive,obj.fanli),-obj.payment)
            table.listData.push(obj)
        }
        console.log(table.listData);
        if (table.listData.length >= count) {
            hasMore.value = false
        }
    })
}

// 解决精度丢失问题
const formatNumber = (num1:number, num2:number) => {
    num1 = String(num1).includes('.') ? Number(String(num1).replace('.', '')) : num1*100
    num2 = String(num2).includes('.') ? Number(String(num2).replace('.', '')) : num2*100
    return (num1+num2)/100
}

defineExpose({
})

</script>


<style lang="scss" scoped>
$border-color: #ececec;
.table-container{
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;

    font-size: 26px;
    .table-head{
        flex: none;
        background-color: #f3f3f3;
        border: 1px solid $border-color;
        border-bottom: none;
    }
    .table-body{
        flex: auto;
        width: 100%;
        overflow: auto;
        overflow-x: hidden;
        border-left: 1px solid $border-color;
        border-top: 1px solid $border-color;
    }

    .list-row{
        display: flex;
        list-style: none;

        .row-item{
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 10px 5px;
            width: 14%;
            border-right: 1px solid $border-color;
            border-bottom: 1px solid $border-color;
            line-height: 1.2;

            &.red-color{
                color: #fa2c19;
            }
            &:nth-last-child(-n+2){
                width: 6.5%;
            }
            &:nth-child(1){
                width: 11%;
            }
            &:nth-child(2){
                width: 21%;
            }
        }


    }

    .nut-swipe{
        &:nth-child(2n) .list-row{
            background-color: #f3f3f3;
        }

        .swipe-btn{
            width: 50px;
            height:100%;
            line-height: 1.3;
        }
    }
    /*.nut-table{
        width: 100%;
        :deep(.nut-table__main__head__tr__th){
            min-width: 60px;
            &:last-child,&:nth-last-child(2){
                min-width: 40px;
            }
            &:nth-child(-n+2){
            }
        }
        :deep(.nut-table__main__body__tr__td){
            min-width: 60px;
            &:last-child,&:nth-last-child(2){
                min-width: 40px;
            }
            &:nth-child(3){
                color: #fa2c19;
            }
        }
        :deep(.nut-table__main__head__tr__th),
        :deep(.nut-table__main__body__tr__th),
        :deep(.nut-table__main__head__tr__td),
        :deep(.nut-table__main__body__tr__td) {
            padding: 6px 2px;
            vertical-align: middle;
        }
    }*/
}


</style>
