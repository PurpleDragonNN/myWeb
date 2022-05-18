<template>
    <div class="container">
        <nut-form :model-value="formData" ref="ruleForm">
            <nut-form-item label="用户名" prop="userName" required :rules="rules.userName">
                <input class="nut-input-text" v-model="formData.userName"
                       placeholder="请输入姓名" type="text"/>
            </nut-form-item>
            <nut-form-item label="密码" prop="password" required :rules="rules.password">
                <input class="nut-input-text" v-model="formData.password"
                       placeholder="请输入密码" type="password"/>
            </nut-form-item>
            <nut-form-item label="手机号码" prop="phone" required :rules="rules.phone">
                <input class="nut-input-text" v-model="formData.phone" placeholder="请输入手机号码" type="text"/>
            </nut-form-item>
            <nut-cell>
                <nut-button type="primary" size="small" style="margin-right: 10px" @click="submit">提交</nut-button>
            </nut-cell>
        </nut-form>
    </div>

</template>

<script setup lang="ts">
import {ref, onMounted, reactive} from "vue";
import {mainStore} from '../../store'

const {testDB, queryDB} = window.dataBase

interface ValueObject {
    [propName: string]: any
}

let {userName, password} = mainStore()

const formData = reactive({
    userName: '',
    password: '',
    phone: '',
});
const ruleForm = ref<any>(null);
const phoneValidator = (val:string) => /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(val)

const rules = reactive({
    userName: [{ required: true, message: '请填写用户名' }],
    password: [{ required: true, message: '请填写密码' }],
    phone: [
        { required: true, message: '请填写联系电话' },
        { validator: phoneValidator, message: '手机号码格式不正确' }
    ]
})

const submit = () => {
    ruleForm.value.validate().then(({ valid, errors }: any) => {
        if (valid) {
            console.log('success', formData);
        } else {
            console.log('error submit!!', errors);
        }
    });
};

const register = () => {
    testDB.set('userName', userName)
    testDB.set('password', password)
    testDB.set('phone', '18578655522')
    testDB.save().then(res => {
        console.log(res);
    })
}

const getInfo = (key:string) => {
    queryDB.get(key).then(res => {
        console.log(res);
    })
}

getInfo('6284b0996cdbd3408025fb43')
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


</style>
