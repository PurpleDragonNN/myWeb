<template>
    <div class="note">
        <div class="note-header">
            <nut-searchbar class="search-bar" placeholder="搜索" v-model="searchValue" @clear="search" @search="search">
                <template v-slot:leftin>
                    <nut-icon size="14" name="search2"></nut-icon>
                </template>
            </nut-searchbar>
        </div>

        <div class="note-list">
            <div class="note-item" :class="item.toJSON().bgColor+'-bg'" v-for="item of pageData" @click="edit(item.toJSON())">
                <div class="title">{{item.toJSON().title}}</div>
                <div class="detail">{{item.toJSON().detail}}</div>
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">

import {ref, onMounted, nextTick, watch, getCurrentInstance} from "vue";
import {createQueryClass} from "@/leancloud";
interface ValueObject {
    [propName: string]: any
}
const { proxy }: any = getCurrentInstance();

const pageData = ref<any>({})
const searchValue = ref('')
const searchData = ref<any>({})
// 当前是否处于搜索状态
const isSearching = ref(false)
getPageData();
function getPageData(){
    const queryNote = createQueryClass('note')
    proxy.$toast.loading('loading',{cover:true})
    queryNote.find().then((data) => {
        pageData.value = data
    });
}

function search(){
    if (searchValue.value) {
    } else {
    }
}

function edit (item){
    sessionStorage.setItem('noteEditInfo', JSON.stringify(item))
    proxy.$router.push({
        path: '/schedule/editNote',
        query: {
            objectId: item.objectId
        }
    })
}

</script>


<style lang="scss" scoped>
@import "@/assets/css/common.scss";

.green-bg{
    background: $lightGreen;
}
.blue-bg{
    background: $lightBlue;
}
.pink-bg{
    background: $lightPink;
}
.purple-bg{
    background: $lightPurple;
}
.orange-bg{
    background: $lightOrange;
}
.note {
    display: flex;
    flex-direction: column;
    padding: 0;
    height: 100%;
    .note-header{
        flex: none;
    }
    .note-list{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        padding: 0 40px;
        margin: 30px auto 0;
        flex: 1;
        overflow: auto;
        .note-item{
            display: flex;
            flex-direction: column;
            margin-bottom: 30px;
            padding: 15px 20px;
            width: 48%;
            height: 300px;
            border-radius: 20px;
            overflow: hidden;
            &:nth-child(2n-1){
                margin-right: 3%;
            }
            .title{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                height: 60px;
                line-height: 60px;
                font-size: 28px;
            }
            .detail{
                flex: 1;
                overflow: hidden;
                font-size: 22px;
            }
        }
    }
}


</style>
