<template>
    <div>
        <entryCom ref="entryRef" @loginCallback="loginCallback"></entryCom>
        <div class="container" v-if="userInfo">
            <i @click="logout" class="iconfont icon-Logout"></i>
            <nut-avatar size="60" :icon="userInfo.headImg ? newImg(userInfo.headImg.url) : 'my'" shape="square"></nut-avatar>
            <p>{{userInfo.username}} <nut-icon name="edit" @click="updatePassword"></nut-icon></p>
            <nut-cell-group class="info-group">
                <nut-cell>
                    <i class="iconfont icon-phone"></i>
                    <nut-input @blur="updateInfo('phone')" :border="false" v-if="inputVisible.phone" placeholder="请输入手机号码" v-model="userInfo.mobilePhoneNumber" />
                    <span v-else>{{userInfo.mobilePhoneNumber}}</span>
                    <nut-icon name="edit" @click="inputVisible.phone=true"></nut-icon>
                </nut-cell>
                <nut-cell>
                    <i class="iconfont icon-email"></i>
                    <nut-input :border="false" v-if="inputVisible.email" placeholder="请输入邮箱地址" v-model="userInfo.email" />
                    <span v-else>{{userInfo.email}}</span>
                </nut-cell>

            </nut-cell-group>
        </div>
        <nut-empty v-else image="empty" description="未登录">
            <div style="margin-top: 10px">
                <nut-button type="primary" @click="showLoginDialog"><i class="iconfont icon-login"></i> 登录</nut-button>
            </div>
        </nut-empty>

    </div>

</template>

<script setup lang="ts">
import entryCom from '@/components/entry.vue'
import {ref, reactive, onMounted, nextTick, watch} from "vue";
import AV from "leancloud-storage";
import { Dialog } from '@nutui/nutui';
import { createFileClass, createQueryClass, createObjClass} from "@/leancloud";
import {mainStore} from "@/store";
import { storeToRefs } from "pinia";
import { newImg } from "@/utils/utils";

const store = mainStore()
const { userInfo } = storeToRefs(store)

const inputVisible = reactive({
    phone: true,
    email: false,
})
const entryRef = ref<any>(null);

const userClass = AV.User.current() || new AV.User()

watch(userInfo, async val => {
    if (!val) {
        await nextTick()
        showLoginDialog()
    }
}, {immediate: true, deep: true})

// 显示登录弹窗
const showLoginDialog = () => {
    entryRef.value.logVisible = true
}
// 注销登录
const logout = () => {
    Dialog({
        content: '确认退出当前登录？',
        onOk: () => {
            AV.User.logOut().then(res => {
                store.fetchUserInfo()
            })
        },
    });
}
// 登录成功回调
const loginCallback = (info) => {
    store.fetchUserInfo()
}
// 设置选项
const menuChoose = (val) => {
    console.log(val);

}

// 更新信息
const updateInfo = (infoItem) => {
    const obj = {
        username: () => userClass.setUsername(updateForm.username),
        phone: () => userClass.setMobilePhoneNumber(registerForm.phone),
        email: () => userClass.setEmail(registerForm.email)
    }
    obj[infoItem]()
    userClass.save().then(res => {
        store.fetchUserInfo()
    })
    return
    if (updateForm.password) {
        userClass.updatePassword('12345678',updateForm.password,{
            sessionToken: userClass.getSessionToken(),
            // user: userClass,
            useMasterKey: true
        }).then(res => {
            store.fetchUserInfo()
            console.log(res);
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

    .icon-Logout{
        font-size: 40px;
        position: absolute;
        right: 30px;
        top: 30px;
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
