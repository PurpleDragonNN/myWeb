<template>
    <div class="container">

        <nut-form :model-value="loginForm" ref="ruleForm">
            <nut-form-item label="账号" prop="username" required :rules="rules.username">
                <input class="nut-input-text" v-model="loginForm.username"
                       placeholder="请输入用户名或手机号码" type="text"/>
            </nut-form-item>
            <nut-form-item label="密码" prop="password" required :rules="rules.password">
                <input class="nut-input-text" v-model="loginForm.password"
                       placeholder="请输入密码" type="password"/>
            </nut-form-item>
            <nut-cell>
                <nut-button type="primary" block @click="login">登录</nut-button>
            </nut-cell>
        </nut-form>


        <nut-dialog
            :no-footer="true"
            closeOnClickOverlay
            v-model:visible="visible"
        >
            <nut-uploader :url="uploadUrl" accept="image/*" @failure="uploadFinish" :maximize="1024*500">
                <nut-avatar
                    class="avatar"
                    size="large"
                    :icon="uploadUrl"
                ></nut-avatar>
            </nut-uploader>

            <nut-form :model-value="registerForm" ref="ruleForm" class="register-form">
                <nut-form-item label="用户名" prop="username" required :rules="rules.username">
                    <input class="nut-input-text" v-model="registerForm.username"
                           placeholder="请输入姓名" type="text"/>
                </nut-form-item>
                <nut-form-item label="密码" prop="password" required :rules="rules.password">
                    <input class="nut-input-text" v-model="registerForm.password"
                           placeholder="请输入密码" type="password"/>
                </nut-form-item>
                <nut-form-item label="手机号码" prop="phone" required :rules="rules.phone">
                    <input class="nut-input-text" v-model="registerForm.phone" placeholder="请输入手机号码" type="text"/>
                </nut-form-item>
                <nut-cell>
                    <nut-button block class="register-btn" type="primary" @click="submit">注册</nut-button>
                </nut-cell>
            </nut-form>

        </nut-dialog>
    </div>

</template>

<script setup lang="ts">
import {ref, onMounted, reactive} from "vue";
import {mainStore} from '../../store'
import { createUserClass, createFileClass, createQueryClass } from "../../leancloud";
import { Notify, Toast } from '@nutui/nutui';
const userClass = createUserClass()
const queryClass = createQueryClass('_User')

interface ValueObject {
    [propName: string]: any
}

let {username, password} = mainStore()

let visible = ref(true)
let uploadUrl = ref('my')

const ruleForm = ref<any>(null);
const uploadRef = ref<any>(null);

let headImgFile = reactive<any>(File)
const loginForm = reactive({
    username: 'yangzilong',
    password: '12345678',
});
const registerForm = reactive({
    username: 'yangzilong',
    password: '12345678',
    phone: '18578655522',
});

const phoneValidator = (val:string) => /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(val)

const rules = reactive({
    username: [{ required: true, message: '请填写用户名' }],
    password: [{ required: true, message: '请填写密码' }],
    phone: [
        { required: true, message: '请填写联系电话' },
        { validator: phoneValidator, message: '手机号码格式不正确' }
    ]
})

const submit = () => {
    ruleForm.value.validate().then(({ valid, errors }: any) => {
        if (valid) {
            register()
        } else {
            console.log('error submit!!', errors);
        }
    });
};
const login = () => {
    ruleForm.value.validate().then(({ valid, errors }: any) => {
        if (valid) {
        } else {
            console.log('error submit!!', errors);
        }
    });
};

const register = () => {
    let headFile = createFileClass(headImgFile.value.name, headImgFile.value);
    userClass.setUsername(registerForm.username)
    userClass.setPassword(registerForm.password)
    userClass.setMobilePhoneNumber(registerForm.phone)
    userClass.set('headImg',headImgFile.value.url)
    userClass.signUp().then(res => {
        console.log(res);
        Toast.success('注册成功，正在前往登录',);
        setTimeout(() => {
            Notify.danger('前往登录')
        },2000)
    }).catch(error => {
        if (error.code === 214){
            Notify.danger('该号码已被注册')
        } else if (error.code === 202){
            Notify.danger('该用户名已被注册')
        } else {
            Notify.danger(error.rawMessage)
        }
    })
}

const uploadFinish = ({responseText,option,fileItem}) => {

    // let read = new FileReader()
    uploadUrl.value =  fileItem.url
    headImgFile.value = fileItem
    console.log(fileItem);

}

/*onMounted(() => {
})*/


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

}

.nut-uploader{
    position: absolute;
    left: 50%;
    top: 40px;
    transform: translateX(-50%);
}
.register-form{
    margin-top: 80px;
    .register-btn{
        margin: 0 auto;
    }
}

</style>
