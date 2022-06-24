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

                <nut-swipe v-for="row of table.listData" :key="row.objectId">
                    <li class="list-row">
                        <div class="row-item" v-for="headItem of table.tableHead" :class="{[`${headItem.class}`]: headItem.class}" @click="copy(row[headItem.key])">
                            <span v-if="headItem.key==='count' && row.count>1" class="red-color">{{row.count}}</span>
                            <span v-else>{{row[headItem.key]}}</span>
                        </div>
                    </li>
                    <template #left v-if="props.tabNum !==0">
                        <nut-button class="swipe-btn swipe-btn-del" shape="square" @click="delOrder(row)" type="danger">删除</nut-button>
                    </template>
                    <template #right v-if="props.tabNum===0">
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
import {Toast} from '@nutui/nutui';
import BigNumber from 'bignumber.js'
import {copy} from '@/utils/utils'

interface ValueObject {
    [propName:string]: any
}

const store = mainStore()
const { userInfo } = storeToRefs(store)
let queryClass = createQueryClass('order')

const props = defineProps({
    tabNum:{
        type: Number,
        default: 0
    }
})
const emit = defineEmits<{
    (e: 'refreshList'): void,
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


const delOrder = (item:ValueObject) => {
    let row = createWithoutData('order',item.objectId)
    Toast.loading('loading');
    row.destroy().then(res => {
        Toast.hide();
        getData(false)
        emit('refreshList')
    });
};

const changeStatus = (item:ValueObject) => {
    let row = createWithoutData('order',item.objectId)
    row.set('isFinish', true)
    Toast.loading('loading');
    row.save().then(res => {
        Toast.hide();
        getData(false)
        emit('refreshList')
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
            obj.totalEarn = new BigNumber(obj.receive).multipliedBy(obj.count).plus(obj.fanli).minus(obj.payment)
            table.listData.push(obj)
        }
        if (table.listData.length >= count) {
            hasMore.value = false
        }
    })
}

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
        border-top: 1px solid $border-color;
    }
    .table-body{
        flex: auto;
        width: 100%;
        overflow: auto;
        overflow-x: hidden;
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

            &:nth-last-child(-n+2){
                width: 6.5%;
            }
            &:nth-child(1){
                width: 11%;
                border-left: 1px solid $border-color;
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
}
.red-color{
    color: #fa2c19;
}

</style>
