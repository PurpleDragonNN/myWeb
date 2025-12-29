<template>
    <div class="fill-container">
        <nut-form :modelValue="formData" ref="formRef">
            <nut-form-item prop="channel">
                <nut-radiogroup v-model="formData.channel" direction="horizontal">
                    <nut-radio shape="button" label="京东">京东</nut-radio>
                    <nut-radio shape="button" label="淘宝">淘宝</nut-radio>
                </nut-radiogroup>
            </nut-form-item>
            <nut-form-item label="下单数量" prop="count">
                <nut-input-number v-model="formData.count" input-width="60" button-size="28" max="100" />
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
                    :isAutoBackFill="true"
                >
                </nut-calendar>
            </nut-form-item>

            <nut-form-item label="商品名称" required prop="product" :rules="rules.product">
                <input class="nut-input-text" placeholder="请输入商品名称" type="text" v-model="formData.product" />
            </nut-form-item>

            <nut-form-item label="返单金额" required prop="receive" :rules="rules.receive">
                <nut-input-number v-model="formData.receive" @blur="blur" min="0" step="1" decimal-places="2"  input-width="60" button-size="28" />
            </nut-form-item>
            <nut-form-item label="实付金额" required prop="payment" :rules="rules.payment">
                <nut-input-number v-model="formData.payment" @click="clickPayment" @blur="blur" min="0" step="1" decimal-places="2" input-width="60" button-size="28" :disabled="formData.count>1" />
            </nut-form-item>
            <nut-form-item label="返利金额" prop="fanli" :rules="rules.fanli">
                <nut-input-number v-model="formData.fanli" @blur="blur" @click="clickFanli" min="0" step="1" decimal-places="2"  input-width="60" button-size="28" :disabled="formData.count>1" />
            </nut-form-item>
            <nut-cell title="预计盈利">
                <span v-if="!isNaN(totalEarn) && totalEarn">{{`${Number(formData.receive)}${formData.count>1 ? '*' + formData.count : ''} + ${Number(formData.fanli)} - ${Number(formData.payment)} = `}}</span>
                <nut-price :price="totalEarn" size="large" />
            </nut-cell>
            <nut-cell>
                <nut-button class="submit-btn" type="primary" block @click="submit">提交</nut-button>
            </nut-cell>
        </nut-form>
        <nut-dialog
            no-footer
            closeOnClickOverlay
            v-model:visible="paymentVisible"
            class="info-dialog"
            title="实付金额"
        >
            <div class="inputs-container">
                <nut-cell v-for="(item, index) of paymentInputs">
                    <span>第{{index+1}}单：</span>
                    <nut-input-number v-model="paymentInputs[index]" min="0" step="1" decimal-places="2" input-width="60" button-size="28"  />
                </nut-cell>
            </div>
            <nut-button block type="primary" @click="sumPayment">确认</nut-button>

        </nut-dialog>
        <nut-dialog
            no-footer
            closeOnClickOverlay
            v-model:visible="fanliVisible"
            class="info-dialog"
            title="返利金额"
        >
            <div class="inputs-container">
                <nut-cell v-for="(item, index) of fanliInputs">
                    <span>第{{index+1}}单：</span>
                    <nut-input-number v-model="fanliInputs[index]" min="0" step="1" decimal-places="2" input-width="60" button-size="28"  />
                </nut-cell>
            </div>
            <nut-button block type="primary" @click="sumFanli">确认</nut-button>
        </nut-dialog>
    </div>


</template>

<script setup lang="ts">
import {ref, onMounted, reactive, computed, watch, defineEmits} from "vue";
import { createFileClass, createQueryClass, createObjClass} from "@/leancloud";
import {mainStore} from "@/store";
import { storeToRefs } from "pinia";
import dayjs from "dayjs";
import {showNotify, showToast} from "@nutui/nutui";
import BigNumber from "bignumber.js";
interface ValueObject {
    [propName:string]: any
}
const emit = defineEmits<{
    (e: 'submitOrderCb'): void,
}>()

const store = mainStore()
const { userInfo } = storeToRefs(store)
let queryClass = createQueryClass('order')

let endDate = ref(dayjs().format('YYYY-MM-DD'))

let dateVisible = ref(false)
let paymentVisible = ref(false)
let fanliVisible = ref(false)

const formRef = ref<any>(null);

// 多单的情况下实付款输入框绑定的值
const paymentInputs = <any>ref([])
// 多单的情况下返利输入框绑定的值
const fanliInputs = <any>ref([])

let formData = reactive({
    channel: '京东',
    count: 1,
    date: dayjs().format('YYYY-MM-DD'),
    product: '',
    payment: <any>null,
    receive: <any>null,
    fanli: <any>null
});

watch(() => formData.product,val => {
    // 提取标题中的返单金额
    let regRec = val.match(/\/[0-9]+返/)
    if (regRec && regRec[0].match(/[0-9]+/)) {
        // @ts-ignore
        formData.receive = Number(regRec[0].match(/[0-9]+/)[0])
    }
    // 提取标题中的下单数量
    let regCount = val.match(/^[0-9]+单/)
    if (regCount && regCount[0].match(/[0-9]+/)) {
        // @ts-ignore
        formData.count = Number(regCount[0].match(/[0-9]+/)[0])
    }
})
watch(() => formData.count,val => {
    if (val > 0) {
        paymentInputs.value.length = val
        paymentInputs.value.fill(null)
        fanliInputs.value.length = val
        fanliInputs.value.fill(null)
    }
},{immediate: true})


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
    // let res = Number(formData.receive)-Number(formData.payment)+Number(formData.fanli)
    let res = formData.receive*formData.count-formData.payment+formData.fanli
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
        formData.fanli = null
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
    let orderClass = createObjClass('order')
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
    showToast.loading('loading');
    orderClass.save().then(res => {
        showToast.hide();
        showNotify.success('提交成功');
        resetForm()
        emit('submitOrderCb')
    });
}

const resetForm = () => {
    formData.channel = '京东'
    formData.count = 1
    formData.date = dayjs().format('YYYY-MM-DD')
    formData.product = ''
    formData.payment = null
    formData.receive = null
    formData.fanli = null
}

const sumPayment = () => {
    if (paymentInputs.value.some((item:object) => !item)) {
        showNotify.warn('每单必填!');
        return
    }
    formData.payment = Number(paymentInputs.value.reduce((total:string, item:string|number) => {
        return new BigNumber(Number(total)).plus(Number(item))
    }))
    paymentVisible.value = false
}

const sumFanli = () => {
    if (fanliInputs.value.some((item:object) => !item)) {
        showNotify.warn('每单必填!');
        return
    }
    formData.fanli = Number(fanliInputs.value.reduce((total:string, item:string|number) => {
        return new BigNumber(total).plus(item)
    }))
    fanliVisible.value = false
}
const clickPayment = () => {
    paymentVisible.value = true
}
const clickFanli = () => {
    fanliVisible.value = true
}



</script>


<style lang="scss" scoped>


.fill-container{
    .nut-cell{
        display: flex;
        align-items: center;
    }
}
.inputs-container{
    margin-bottom: 30px;
    width: 100%;
    max-height: 45vh;
    overflow: auto;
    .nut-cell{
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

</style>
