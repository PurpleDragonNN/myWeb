<template>
    <nut-form :model-value="formData" ref="formRef">
        <nut-form-item prop="channel">
            <nut-radiogroup v-model="formData.channel" direction="horizontal">
                <nut-radio shape="button" label="京东">京东</nut-radio>
                <nut-radio shape="button" label="淘宝">淘宝</nut-radio>
            </nut-radiogroup>
        </nut-form-item>
        <nut-form-item label="下单数量" prop="count">
            <nut-inputnumber v-model="formData.count" input-width="60" button-size="28" />
        </nut-form-item>
        <nut-form-item label="选择下单日期" prop="channel">
            <span @click="openSwitch('dateVisible')">{{formData.date ? formData.date : '请选择'}}</span>
            <nut-calendar
                v-model:visible="dateVisible"
                @close="closeSwitch('dateVisible')"
                @choose="setChooseValue"
                :default-value="formData.date"
                start-date="2022-01-01"
                :end-date="endDate"
                :is-auto-back-fill="true"
            >
            </nut-calendar>
        </nut-form-item>

        <nut-form-item label="商品名称" required prop="product" :rules="rules.product">
            <input class="nut-input-text" placeholder="请输入商品名称" type="text" v-model="formData.product" />
        </nut-form-item>

        <nut-form-item label="返单金额" required prop="receive" :rules="rules.receive">
            <nut-inputnumber v-model="formData.receive" @blur="blur" min="0" step="1" decimal-places="2"  input-width="60" button-size="28" />
        </nut-form-item>
        <nut-form-item label="实付金额" required prop="payment" :rules="rules.payment">
            <nut-inputnumber v-model="formData.payment" @blur="blur" min="0" step="1" decimal-places="2" input-width="60" button-size="28"  />
        </nut-form-item>
        <nut-form-item label="返利金额" prop="fanli" :rules="rules.fanli">
            <nut-inputnumber v-model="formData.fanli" @blur="blur" min="0" step="1" decimal-places="2"  input-width="60" button-size="28" />
        </nut-form-item>
        <nut-cell title="预计盈利">
            <span v-if="!isNaN(totalEarn) && totalEarn">{{`${Number(formData.receive)} + ${Number(formData.fanli)} - ${Number(formData.payment)} = `}}</span>
            <nut-price :price="totalEarn" size="large" :need-symbol="false" :thousands="true" />
        </nut-cell>
        <nut-cell>
            <nut-button class="submit-btn" type="primary" block @click="submit">提交</nut-button>
        </nut-cell>
    </nut-form>

</template>

<script setup lang="ts">
import {ref, onMounted, reactive, computed, watch } from "vue";
import { createFileClass, createQueryClass, createObjClass} from "@/leancloud";
import {mainStore} from "@/store";
import { storeToRefs } from "pinia";
import dayjs from "dayjs";
import {Notify} from "@nutui/nutui";
interface ValueObject {
    [propName:string]: any
}

const store = mainStore()
const { userInfo } = storeToRefs(store)
let orderClass = createObjClass('order')
let queryClass = createQueryClass('order')

let endDate = ref(dayjs().format('YYYY-MM-DD'))

let dateVisible = ref(false)

const formRef = ref<any>(null);

let formData = reactive({
    channel: '京东',
    count: 1,
    date: dayjs().format('YYYY-MM-DD'),
    product: '',
    payment: <any>null,
    receive: <any>null,
    fanli: 0.00
});

watch(() => formData.product,val => {
    // 提取标题中的返单金额
    let reg = val.match(/\/[0-9]*返/)
    if (reg && reg[0].match(/[0-9]+/)) {
        // @ts-ignore
        formData.payment = Number(reg[0].match(/[0-9]+/)[0])
    }
})


const openSwitch = (param:string) => {
    dateVisible.value = true;
};
const closeSwitch = (param:string) => {
    dateVisible.value = false;
};
const setChooseValue = (param:string) => {
    formData.date= param[3];
};
// 表单校验
const rules = reactive({
    product: [{ required: true, message: '请输入商品名称' }],
    payment: [{ required: true, message: '请输入实付金额' }],
    receive: [{ required: true, message: '请输入返单金额' }],
    fanli: [{ required: false, message: '请输入返利金额' }],
    phone: [
        {
            validator: (val:string) => !val || /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(val),
            message: '手机号码格式不正确'
        }
    ]
})

let totalEarn = computed(() => {
    let res = Number(formData.receive)-Number(formData.payment)+Number(formData.fanli)
    return isNaN(res) ? 0 : res
})

const blur = () => {
    if (isNaN(formData.receive)) {
        formData.receive = null
    }
    if (isNaN(formData.payment)) {
        formData.payment = null
    }
    if (isNaN(formData.fanli)) {
        formData.fanli = 0
    }
}

const submit = () => {
    formRef.value.validate().then(({ valid, errors }: any) => {
        if (valid) {
            save()
        } else {
            console.log('error submit!!', errors);
        }
    });
}


const save = () => {
    orderClass.set('channel', formData.channel)
    orderClass.set('count', Number(formData.count))
    orderClass.set('date', formData.date)
    orderClass.set('product', formData.product)
    orderClass.set('payment', Number(formData.payment))
    orderClass.set('receive', Number(formData.receive))
    orderClass.set('fanli', Number(formData.fanli))
    orderClass.set('isFinish', false)
    orderClass.set('username', userInfo.value.username)
    orderClass.set('userObjectId', userInfo.value.objectId)
    orderClass.save().then(res => {
        Notify.success('提交成功');
        resetForm()
    });
}

const resetForm = () => {
    formData.channel = '京东'
    formData.count = 1
    formData.date = dayjs().format('YYYY-MM-DD')
    formData.product = ''
    formData.payment = null
    formData.receive = null
    formData.fanli = 0
}

</script>


<style lang="scss" scoped>
.container{
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

    .submit-btn{
        margin-top: 20px;
    }
}


</style>
