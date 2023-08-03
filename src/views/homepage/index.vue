<template>
    <entryCom ref="entryRef" @loginCallback="loginCallback"></entryCom>
    <div class="container" v-if="userInfo">
        <i @click="actionsheetVisible=true" class="iconfont icon-setting"></i>
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
            <nut-button type="primary" @click="showLoginDialog"><i class="iconfont icon-login"></i> 登录</nut-button>
        </div>
    </nut-empty>

    <nut-actionsheet
        v-model:visible="actionsheetVisible"
        :menu-items="menuItems"
        @choose="chooseItem"
    >
    </nut-actionsheet>

</template>

<script setup lang="ts">
import entryCom from '@/components/entry.vue'
import {ref, reactive, onMounted, nextTick, watch} from "vue";
import AV from "leancloud-storage";
import { Dialog } from '@nutui/nutui';
import {mainStore} from "@/store";
import { storeToRefs } from "pinia";

interface ValueObject {
    [propName: string]: any
}
const store = mainStore()
const { userInfo } : {userInfo: ValueObject} = storeToRefs(store)
const actionsheetVisible = ref(false)


const entryRef = ref<any>(null);

const userClass:ValueObject = AV.User.current() || new AV.User()

const password = reactive({
    new: '',
    old: ''
})

watch(userInfo, async val => {
    if (val) {
    } else {
        await nextTick()
        showLoginDialog()
    }

}, {immediate: true, deep: true})


// 注销登录
const logout = () => {
    (<any>Dialog)(<any>{
        content: '确认退出当前登录？',
        onOk: () => {
            AV.User.logOut().then(() => {
                store.fetchUserInfo()
            })
        },
    });
}
// 设置选项
const chooseItem = (item:ValueObject ) => {
    item.event()
    actionsheetVisible.value = false
}

const menuItems = [
    {
        name: '修改个人信息',
        event: () => {
            entryRef.value.updateVisible = true
        }
    },
    {
        name: '修改密码',
        event: () => {
            entryRef.value.updatePWVisible = true
        }
    },
    {
        name: '注销登录',
        event: logout
    }
];
// 显示登录弹窗
const showLoginDialog = () => {
    entryRef.value.logVisible = true
}
// 登录成功回调
const loginCallback = () => {
    store.fetchUserInfo()
}

// 更新信息
const updateInfo = () => {
    (<any>Dialog)(<any>{
        content: '确认保存当前修改？',
        onOk: () => {
            userClass.setUsername(userInfo.username)
            userClass.setMobilePhoneNumber(userInfo.phone)
            userClass.setEmail(userInfo.email)
            userClass.save().then(() => {
                store.fetchUserInfo()
            })
        },
    });
    if (password.new && password.old) {
        userClass.updatePassword(password.old,password.new,{
            sessionToken: userClass.getSessionToken(),
            // user: userClass,
            useMasterKey: true
        }).then(() => {
            store.fetchUserInfo()
        })
    }
}


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
