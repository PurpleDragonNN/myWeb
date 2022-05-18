<template>
    <div class="container">
        <nut-form :model-value="formData" ref="ruleForm">
            <nut-form-item label="用户名" prop="userName" required :rules="rules.userName">
                <input class="nut-input-text" @blur="customBlurValidate('name')" v-model="formData.userName"
                       placeholder="请输入姓名，blur 事件校验" type="text"/>
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

const {testDB} = window.dataBase

interface ValueObject {
    [propName: string]: any
}

let {userName, password} = mainStore()

const formData = reactive({
    userName: '',
    password: '',
    phone: '',
    address: ''
});
const ruleForm = ref<any>(null);

const rules = reactive({
    userName: [{ required: true, message: '请填写用户名' }],
    phone: [
        { required: true, message: '请填写联系电话' },
        { validator: asyncValidator, message: '电话格式不正确' }
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

const getInfo = () => {

}

getInfo('userName')
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
