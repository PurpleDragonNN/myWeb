<template>
    <div class="add-todo">
        <header>
            <div class="btn-back" @click="$router.go(-1)">
                <nut-icon name="rect-left" size="1.1rem"></nut-icon>
            </div>
            <div class="header-title">{{ isEdit?'编辑待办':'新增待办' }}</div>
        </header>
        <main>
            <nut-form :model-value="formData" :rules="rules" ref="ruleForm">
                <nut-form-item prop="title" required>
                    <div class="label">标题</div>
                    <input class="nut-input-text" v-model="formData.title"
                           placeholder="请输入标题" type="text" />
                </nut-form-item>
                <nut-form-item prop="desc" >
                    <div class="label">备注</div>
                    <input class="nut-input-text" v-model="formData.desc"
                           placeholder="请输入备注" type="text" />
                </nut-form-item>
                <nut-form-item >
                    <div class="label">日期</div>
                    <section class="date" @click="calendarVisible=true">
                        <div class="label">{{formData.date}}</div>
                        <i class="iconfont icon-rili"></i>
                    </section>
                </nut-form-item>
                <nut-form-item >
                    <div class="label">时间</div>
                    <section class="date" @click="timeVisible=true">
                        <div class="label">{{formData.time.slice(0,-3)||'选择'}}</div>
                        <i class="iconfont icon-shijian"></i>
                    </section>
                </nut-form-item>
                <nut-cell class="submit-container">
                    <nut-button type="primary" :disabled="!formData.title" block color="rgb(106, 116, 205)" size="large" @click="submit">提交</nut-button>
                </nut-cell>
            </nut-form>
            <nut-calendar
                v-model:visible="calendarVisible"
                @close="calendarVisible = false"
                @choose="setChooseValue"
                :default-value="formData.date"
                :start-date="null"
                :end-date="null"
                :is-auto-back-fill="true"
            >
            </nut-calendar>
            <nut-datepicker
                v-model="defaultTime"
                title="时间选择"
                :formatter="formatter"
                type="time"
                @confirm="selectTime"
                v-model:visible="timeVisible"
            ></nut-datepicker>
        </main>
    </div>

</template>
<script setup lang="ts">

import {ref, onMounted, reactive, getCurrentInstance} from "vue";
import dayjs from "dayjs";
import {useRouter} from "vue-router";
import {createObjClass, createWithoutData} from "@/leancloud";
import {Notify, Toast} from "@nutui/nutui";

interface ValueObject {
    [propName: string]: any
}
const { proxy }: any = getCurrentInstance();
const $router: Object = useRouter()
const isEdit = ref(false)
const formData = reactive({
    title: '',
    desc: '',
    date: dayjs().format('YYYY-MM-DD'),
    time: '',
})
const ruleForm = ref<any>(null);
const rules = reactive({
    desc: [{
        message: '请输入备注',
    }],
})
const calendarVisible = ref(false)
const timeVisible = ref(false)
const defaultTime = ref(new Date(dayjs().format('YYYY-MM-DD HH:mm:00')))


if (proxy.$route.path === '/schedule/editTodo') {
    isEdit.value = true
    const editInfo = JSON.parse(sessionStorage.getItem('todoEditInfo'))
    console.log(editInfo);
    formData.title = editInfo.title
    formData.desc = editInfo.desc
    formData.date = editInfo.dateTime.split(' ')[0]
    formData.time = editInfo.dateTime.split(' ')[1]||''
}


function submit(){
    ruleForm.value.validate().then(({ valid, errors }: any) => {
        if (valid) {
            console.log(formData);
            let todoClass = isEdit.value ? createWithoutData('todo',proxy.$route.query.id):createObjClass('todo')
            todoClass.set('title', formData.title)
            todoClass.set('desc', formData.desc)
            todoClass.set('done', false)
            todoClass.set('dateTime', formData.time?(formData.date+' '+formData.time):formData.date)
                proxy.$toast.loading('loading',{cover:true})

            todoClass.save().then(res => {
                Toast.hide();
                Notify.success('保存成功');
                proxy.$router.go(-1)
            }).catch(err =>{
                Notify.danger(err);
            })
        } else {
            console.log(errors);
        }
    })
}

function customValidator(val: string){
    return /^[\d\w]+$/.test(val);
}

function setChooseValue(params){
    formData.date = params[3]
}

function selectTime(params){
    const value = params.selectedValue
    defaultTime.value = new Date(dayjs().format('YYYY-MM-DD ')+`${value[0]}:${value[1]}:${value[2]}`)
    formData.time = `${value[0]}:${value[1]}:${value[2]}`
}
const formatter = (type: string, option) => {
    const obj = {
        'year': () => option.text += '年',
        'month': () => option.text += '月',
        'day': () => option.text += '日',
        'hour': () => option.text += '时',
        'minute': () => option.text += '分',
    }
    obj[type] && obj[type]()
    return option;
};
</script>


<style lang="scss" scoped>
@import "@/assets/css/common.scss";
$colorPurple: rgb(10, 33, 83);

.add-todo {
    padding: 20px 30px 0;
    color: $colorPurple;
    header{
        position: relative;
        height: 80px;
        .btn-back{
            @extend .center;
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            width: 60px;
            height: 60px;
            border-radius: 16px;
            box-shadow: 6px 10px 30px 4px rgba(100, 100, 100, 0.1);

        }
        .header-title{
            text-align: center;
            line-height: 80px;
            font-weight: bold;
        }
    }
    main{
        .nut-form{
            .label{
                color: $colorPurple;
            }
            ::v-deep(input){
                height: 70px;
                color: $colorPurple;
            }
            .date{
                display: flex;
                justify-content: space-between;
                font-size: 30px;
                .iconfont{
                    font-size: 36px;
                    color: $colorPurple;
                }
            }
            .submit-container{
                margin-top: 50px;
            }
        }
        ::v-deep(.nut-picker__columnitem:last-child){
            display: none;
        }
    }
}


</style>
