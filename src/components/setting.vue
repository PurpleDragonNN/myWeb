<template>
    <nut-actionsheet
        v-model:visible="actionsheetVisible"
        :menu-items="props.menuItems"
        @choose="chooseItem"
    >
    </nut-actionsheet>

</template>

<script setup lang="ts">
import {ref, reactive, onMounted, defineProps} from "vue";
import AV from "leancloud-storage";
import { Dialog } from '@nutui/nutui';
import {mainStore} from "@/store";
import { storeToRefs } from "pinia";

const props = defineProps({
    menuItems:{
        type: Array,
        default: []
    }
})
interface ValueObject {
    [propName: string]: any
}
const store = mainStore()
const { userInfo } : {userInfo: ValueObject} = storeToRefs(store)
const actionsheetVisible = ref(false)



const userClass:ValueObject = AV.User.current() || new AV.User()

const password = reactive({
    new: '',
    old: ''
})

// 设置选项
const chooseItem = (item:ValueObject ) => {
    item.event()
    actionsheetVisible.value = false
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

defineExpose({
    actionsheetVisible
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
                :deep(.input-text){
                    color: #666;
                }
            }
        }
    }

}

</style>
