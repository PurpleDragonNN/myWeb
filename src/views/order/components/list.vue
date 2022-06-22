<template>
    <nut-tabs auto-height v-model="state.tabVal" type="smile" @change="changeTabs">
        <nut-tabpane title="未完成">
            <listTable :tab-num="0" @refreshList="refreshList"></listTable>
        </nut-tabpane>

        <nut-tabpane title="已完成">
            <listTable v-if="state.initTab1" :tab-num="1"></listTable>
        </nut-tabpane>

        <nut-tabpane title="所有">
            <listTable v-if="state.initTab2" :tab-num="2"></listTable>
        </nut-tabpane>
    </nut-tabs>
</template>

<script setup lang="ts">
import {ref, onMounted, reactive } from "vue";
import listTable from './listTable.vue'

interface ValueObject {
    [propName:string]: any
}

const state = reactive({
    tabVal: 0,
    initTab1: false,
    initTab2: false,
});

const changeTabs = ({paneKey}:{paneKey:number}) => {
    if (paneKey === 1) {
        state.initTab1 = true
    }
    if (paneKey === 2) {
        state.initTab2 = true
    }
}
const refreshList = () => {
    state.initTab1 = false
    state.initTab2 = false
}

</script>


<style lang="scss" scoped>
.nut-tabs{
    padding: 0;
    width: 100%;
    :deep(.nut-tabs__content){
        height: calc(100% - 2.3rem);
        //flex: auto;
        //height: 100%;
    }
    .nut-tabpane{
        padding: 12px 12px 0;
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: auto;
    }
}



</style>
