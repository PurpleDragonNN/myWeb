<template>
    <div class="container" v-if="userInfo">
        <i @click="elRef.settingRef.actionsheetVisible=true" class="iconfont icon-setting"></i>
        <nut-avatar size="60" :icon="userInfo.headImg ? userInfo.headImg.url : 'my'" shape="square"></nut-avatar>
        <span class="username">{{userInfo.username}}</span>
        <nut-cell-group class="info-group">
            <nut-cell v-if="userInfo.mobilePhoneNumber">
                <i class="iconfont icon-phone"></i>
                <span>{{userInfo.mobilePhoneNumber}}</span>

            </nut-cell>
            <nut-cell v-if="userInfo.email">
                <i class="iconfont icon-email"></i>
                <span>{{userInfo.email}}</span>
            </nut-cell>
            <br>
        </nut-cell-group>
    </div>
    <nut-empty v-else image="empty" description="未登录">
        <div style="margin-top: 10px">
            <nut-button type="primary" @click="elRef.entryRef.logVisible=true"><i class="iconfont icon-login"></i> 登录</nut-button>
        </div>
    </nut-empty>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {mainStore} from "@/store";
import { storeToRefs } from "pinia";

interface ValueObject {
    [propName: string]: any
}

const store = mainStore()
const { userInfo, elRef } : any = storeToRefs(store)
onMounted(() => {
})
</script>


<style lang="scss" scoped>
.container {
    padding: 50px 20px 0;
    width: 100%;
    height: 100vh;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    font-size: 34px;
    color: #333;

    .icon-menu{
        font-size: 40px;
        position: absolute;
        left: 30px;
        top: 30px;
    }

    .icon-setting{
        font-size: 40px;
        position: absolute;
        right: 30px;
        top: 30px;
    }
    .username{
        margin-top: 20px;
    }

    .info-group{
        font-size: 30px;
        .iconfont{
            font-size: 40px;
            margin-right: 20px;
        }
        .nut-cell{
            display: flex;
            align-items: center;
            .nut-input{
                padding-left: 0;
                padding-right: 0;
                ::v-deep(.input-text){
                    color: #666;
                }
            }
        }
    }

}

</style>
