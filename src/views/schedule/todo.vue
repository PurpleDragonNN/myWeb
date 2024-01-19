<template>
    <div class="todo">
        <div class="todo-header">
            <nut-searchbar class="search-bar" placeholder="搜索" v-model="searchValue" @clear="search" @search="search">
                <template v-slot:leftin>
                    <nut-icon size="14" name="search2"></nut-icon>
                </template>
            </nut-searchbar>
        </div>
        <div v-show="!isSearching" class="todo-calendar" ref="calendarRef">
            <div class="todo-calendar-container todo-calendar-shrink" v-if="!isShowFullCalendar">
                <div class="cur-date">
                    <div class="date-month">{{dayjs(selectDate).format('M月')}}</div>
                    <div class="date-year">{{dayjs(selectDate).format('YYYY')}}</div>
                </div>
                <div
                    v-for="(item,index) of curWeekOrMonth"
                    class="time"
                    :class="{
                        'today':dayjs().isSame(item.time, 'date'),
                        'active': selectDate===item.time,
                        'have': item.haveTask
                    }"
                    @click="changeDate(item)"
                >
                    <div class="item-day">周{{'一二三四五六日'[index]}}</div>
                    <div class="item-date">{{dayjs(item.time).format('DD')}}</div>
                </div>
            </div>
            <div class="todo-calendar-container todo-calendar-expand" v-else>
                <div class="cur-date">{{dayjs(selectDate).format('YYYY年M月')}}</div>
                <div class="time">
                    <div class="item-day-container">
                        <div class="item-day" v-for="index of 7">周{{'一二三四五六日'[index-1]}}</div>
                    </div>
                    <div class="item-date-container">
                        <div
                            class="item-date"
                            v-for="(item,index) of curWeekOrMonth"
                            @click="changeDate(item)"
                        >
                            <div :class="{
                                'today':dayjs().isSame(item.time, 'date'),
                                'active': selectDate===item.time,
                                'gray': !dayjs().isSame(item.time,'month'),
                                'have': item.haveTask
                            }">
                                {{dayjs(item.time).format('DD')}}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="todo-list">
            <template v-for="(value,key) of isSearching?searchData:pageData">
                <div class="todo-list-content" v-if="value.length">
                    <div class="list-time" :class="{blink: isBlink && key === dayjs(selectDate).format('YYYYMMDD')}">
                        <div class="list-time-month">{{dayjs(key).format('M月')}}</div>
                        <div class="list-time-date">{{dayjs(key).format('DD')}}</div>
                    </div>
                    <div class="inner-content">
                        <div
                            class="todo-list-item"
                            v-for="(childItem,index) of value"
                            :class="{done: childItem.done}"
                            @click="switchStatus(key,index)"
                        >
                            <div class="item-title">{{childItem.title}}</div>
                            <div class="item-desc" v-if="childItem.desc">{{childItem.desc}}</div>
                            <div class="item-time">{{formatDate(childItem.dateTime)}}</div>

                            <div class="more-btn">
                                <i class="iconfont icon-i-more" :id="'more-btn-'+childItem.id" @click.stop="more(key,index)"></i>
                            </div>

                            <i v-show="childItem.done" class="iconfont icon-roundcheckfill"></i>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <nut-popover
            v-model:visible="isShowMore"
            :targetId="moreBtnId"
            :overlay="true"
            :overlay-style="{'opacity': '0'}"
            :list="moreBtnConfig" location="left-start"
            @choose="handleOptions"
        >
        </nut-popover>
    </div>

</template>
<script setup lang="ts">
import {ref, onMounted, reactive, nextTick, computed, getCurrentInstance} from "vue";
import EventUtil from '@/utils/touchEvents'
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import {createObjClass, createQueryClass, createWithoutData} from "@/leancloud";
import {Notify} from "@nutui/nutui";
dayjs.locale('zh-cn')

interface AnyObject {
    [propName: string]: any
}

const { proxy }: any = getCurrentInstance();
let inputValue = ref('')
const moreBtnConfig = reactive([
    {
        name: '编辑',
        icon: 'edit',
        desc: 'edit',
    },
    {
        name: '删除',
        icon: 'del',
        desc: 'del',
    },
]);
const popoverRef = ref<any>(null);

let timeout = null
const moreBtnKI = []
const moreBtnId = ref('more-btn-')
const calendarRef = ref<any>(null);
const isShowMore = ref(false)
const isShowFullCalendar = ref(false)
const searchValue = ref('')
const pageData = ref<any>({})
const searchData = ref<any>({})
// 当前是否处于搜索状态
const isSearching = ref(false)
const selectDate = ref(dayjs().format('YYYY/MM/DD 00:00'))
const isBlink = ref(false)

const curWeekOrMonth = computed(() => {
    let val = []
    for (let i = 0; i < (isShowFullCalendar.value?35:7); i++) {
        const time = dayjs().startOf('week').add(i, 'day')
        val[i] = {
            time:time.format('YYYY/MM/DD 00:00'),
            haveTask: !!pageData.value[time.format('YYYYMMDD')]
        }
    }
    return val
})


onMounted(() => {
    EventUtil.bindEvent(calendarRef.value, 'slideup', () => {
        isShowFullCalendar.value = true
    })
    EventUtil.bindEvent(calendarRef.value, 'slidedown', () => {
        isShowFullCalendar.value = false
    })

})

getPageData();
function getPageData(){
    const queryTodo = createQueryClass('todo')
    proxy.$toast.loading('loading',{cover:true,duration: 0})
    queryTodo.find().then((data) => {
        proxy.$toast.hide();
        dealData(data, pageData.value)
    });
}

function dealData(data, showData) {
    data.forEach(item => {
        const date = dayjs(item.get('dateTime')).format('YYYYMMDD')
        if (!showData[date]) {
            showData[date] = []
        }
        showData[date].push({...item.attributes,id:item.id})
    })
    proxy.$toast.hide()
}

// 格式化日期显示
function formatDate(dateTime){
    dateTime = dayjs(dateTime).format(dateTime.includes(' ')?'YYYY年MM月DD日 HH:mm':'YYYY年MM月DD日')
    const isSameYear = dayjs().isSame(dayjs(dateTime),'year')
    dateTime = isSameYear? dateTime.split('年')[1]: dateTime
    return dateTime
}

// 切换日历中选择的日期
function changeDate(item){
    selectDate.value = dayjs(item.time).format('YYYY/MM/DD HH:mm')
    // 添加闪烁样式
    if (timeout) {
        clearTimeout(timeout)
    }
    isBlink.value = true
    timeout = setTimeout(() => {
        isBlink.value = false
    },1500)

    // 滚动到元素所在位置
    nextTick(() => {
        document.querySelector('.blink').scrollIntoView({
            behavior: "smooth",
        })
    })
}

// 切换待办的完成状态
function switchStatus(key,index){
    if (!pageData.value[key][index]) return;
    let todoClass = createWithoutData('todo',pageData.value[key][index].id)
    todoClass.set('done', !pageData.value[key][index].done)
    proxy.$toast.loading('loading',{cover:true,duration: 0})
    todoClass.save().then(res => {
        proxy.$toast.hide();
        pageData.value[key][index].done = !pageData.value[key][index].done
    }).catch(err =>{
        Notify.danger(err);
    })
}

function search(){
    if (searchValue.value) {
        isSearching.value = true
        searchData.value = {}
        proxy.$toast.loading('loading',{cover:true,duration: 0})
        const queryTodo = createQueryClass('todo')
        queryTodo.contains ('title', searchValue.value);
        queryTodo.find().then((data) => {
            proxy.$toast.hide();
            dealData(data, searchData.value)
        });
    } else {
        isSearching.value = false
        pageData.value = {}
        getPageData()
    }
}

function more(key,index){
    moreBtnKI[0] = key
    moreBtnKI[1] = index
    moreBtnId.value = 'more-btn-'+pageData.value[key][index].id
    isShowMore.value=!isShowMore.value
}

function handleOptions(val){
    const arr = pageData.value[moreBtnKI[0]]
    const id = moreBtnId.value.replace('more-btn-','');
    ({
        'edit': () => {
            sessionStorage.setItem('todoEditInfo', JSON.stringify(arr[moreBtnKI[1]]))
            proxy.$router.push({
                path: '/schedule/editTodo',
                query: {
                    id: arr[moreBtnKI[1]].id
                }
            })
        },
        'del': () => {
            let todoClass = createWithoutData('todo',id)
            proxy.$toast.loading('loading',{cover:true,duration: 0})
            todoClass.destroy().then(res => {
                proxy.$toast.hide()
                if (searchValue.value) {
                    search()
                } else {
                    arr.splice(moreBtnKI[1],1)
                }
            });
        },
    })[val.desc]()

}

</script>


<style lang="scss" scoped>
@import "@/assets/css/common.scss";
$colorPurple: rgb(10, 33, 83);
.todo {
    display: flex;
    flex-direction: column;
    padding: 10px 30px;
    height: 100%;
    color: $colorPurple;
    .todo-header {
        .search-bar{
            margin-bottom: 24px;
        }
    }
    .todo-calendar {
        display: flex;
        align-items: center;
        .cur-date {
            flex: none;
            margin-right: 20px;
            .date-month{
                text-align: center;
                font-size: 30px;
                font-weight: bold;
            }
            .date-year{
                font-size: 28px;
            }
        }

        .todo-calendar-container{
            flex: 1;
            &.todo-calendar-shrink {
                display: flex;
                align-items: center;
                margin-bottom: 20px;
                .time {
                    flex: 1;
                    color: $colorPurple;
                    text-align: center;
                    padding: 24px 0;
                    border-radius: 20px;
                    font-size: 28px;
                    &.today{
                        color: $darkPurple;
                    }
                    &.have{
                        position: relative;
                        &:before{
                            content: '';
                            position: absolute;
                            bottom: 8px;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            background: $darkPurple;
                        }
                    }
                    &.active{
                        background: $darkPurple;
                        color: #fff;
                        &.have{
                            &:before{
                                background: white;
                            }
                        }
                    }
                    .item-day {
                        margin-bottom: 10px;
                        font-weight: bold;
                    }
                    .item-date {}
                }
            }
            &.todo-calendar-expand{
                margin-bottom: 20px;
                .cur-date{
                    display: flex;
                    justify-content: center;
                    text-align: center;
                    font-weight: bold;
                    margin-bottom: 20px;
                }
                .time {
                    flex: 1;
                    color: $colorPurple;
                    text-align: center;

                    .item-day-container{
                        display: flex;
                        .item-day {
                            flex: 1;
                            margin-bottom: 10px;
                            font-weight: bold;
                        }
                    }
                    .item-date-container{
                        display: flex;
                        flex-wrap: wrap;
                        .item-date {
                            flex-basis: 14.279%;
                            padding: 0 14px;
                            height: 66px;
                            line-height: 66px;
                            font-size: 28px;
                            &>div{
                                border-radius: 20px;
                            }

                            .today{
                                color: $darkPurple;
                            }
                            .gray{
                                color: #999;
                            }
                            .have{
                                position: relative;
                                &:before{
                                    content: '';
                                    position: absolute;
                                    bottom: 4px;
                                    left: 50%;
                                    transform: translateX(-50%);
                                    width: 8px;
                                    height: 8px;
                                    border-radius: 50%;
                                    background: $darkPurple;
                                }
                            }
                            .active{
                                background: $darkPurple;
                                color: #fff;
                                &.have{
                                    &:before{
                                        background: white;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }


    }
    .todo-list {
        flex: 1;
        overflow-y: auto;
        .todo-list-content{
            display: flex;
            .list-time {
                margin-right: 20px;
                flex: 0.15;
                font-size: 30px;
                text-align: center;
                &.blink{
                    animation: blink 1.5s infinite;
                }
                .list-time-month {}
                .list-time-date {
                    font-size: 40px;
                }
            }
            .inner-content{
                flex: 1;
                .todo-list-item {
                    position: relative;
                    margin-bottom: 30px;
                    padding: 20px 80px 20px 20px;
                    border-radius: 20px;
                    background: $lightPurple;
                    &.done{
                        background: #f2f4f5;
                        opacity: 0.7;
                    }
                    .item-title {
                        margin-bottom: 10px;
                    }
                    .item-desc {
                        margin-bottom: 10px;
                        font-size: 26px;
                    }
                    .item-time {
                        font-size: 26px;
                    }

                    .more-btn{

                        .icon-i-more{
                            position: absolute;
                            right: 0px;
                            top: 6px;
                            padding: 10px 20px;
                            font-size: 32px;
                            color: #999;
                        }
                    }

                    .icon-roundcheckfill{
                        padding: 0 20px;
                        position: absolute;
                        right: 0px;
                        bottom: 6px;
                        font-size: 32px;
                        color: $darkPurple;
                    }

                }
            }
        }

    }
    ::v-deep(.nut-popover-menu-item) {
        display: flex;
        align-items: center;
        .nutui-iconfont{
            font-size: 26px;
            margin-right: 12px;
        }
    }
}

</style>
