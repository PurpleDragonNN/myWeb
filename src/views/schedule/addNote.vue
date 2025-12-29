<template>
    <div class="add-note">
        <header>
            <div class="btn-back" @click="$router.go(-1)">
                <nut-icon name="rect-left" size="1.1rem"></nut-icon>
            </div>
            <div class="header-title">{{ isEdit?'编辑笔记':'新增笔记' }}</div>
        </header>
        <main>
            <nut-form :modelValue="formData" :rules="rules" ref="ruleForm">
                <nut-form-item prop="title" required>
                    <input class="nut-input-text" v-model="formData.title"
                           placeholder="标题" type="text" />
                </nut-form-item>
                <nut-form-item prop="detail" >
                    <div class="label"></div>
                    <nut-textarea v-model="formData.detail" placeholder="内容……" rows="10" :autosize=" { maxHeight: maxHeight, minHeight: 100 }" />
                </nut-form-item>
                <nut-cell class="submit-container">
                    <nut-button type="primary" :disabled="!formData.title&&!formData.detail" block color="rgb(106, 116, 205)" size="large" @click="submit">提交</nut-button>
                </nut-cell>
            </nut-form>
        </main>
    </div>

</template>
<script setup lang="ts">

import {ref, nextTick, reactive, getCurrentInstance} from "vue";
import {useRouter} from "vue-router";
import {createObjClass, createWithoutData} from "@/leancloud";
import {showNotify, showToast} from "@nutui/nutui";

interface ValueObject {
    [propName: string]: any
}
const { proxy }: any = getCurrentInstance();
const $router: Object = useRouter()
const isEdit = ref(false)
const formData = reactive({
    title: '',
    detail: '',
})
const ruleForm = ref<any>(null);
const rules = reactive({
    detail: [{
        message: '请输入备注',
    }],
})
const noteEditInfo = ref<any>({})
const maxHeight = ref(400)

nextTick(() => {
    maxHeight.value = window.innerHeight-320
})


if (proxy.$route.path === '/schedule/editNote') {
    isEdit.value = true
    noteEditInfo.value = JSON.parse(sessionStorage.getItem('noteEditInfo'))
    formData.title = noteEditInfo.value.title
    formData.detail = noteEditInfo.value.detail
}


function submit(){
    ruleForm.value.validate().then(({ valid, errors }: any) => {
        if (valid) {
            let noteClass = isEdit.value ? createWithoutData('note',proxy.$route.query.objectId):createObjClass('note')
            noteClass.set('title', formData.title)
            noteClass.set('detail', formData.detail)
            if (!isEdit.value) {
                const color = ['green', 'blue', 'pink', 'purple', 'orange']
                const bgColor = color[Math.floor(Math.random() * 5)]
                noteClass.set('bgColor', bgColor)
            }
            showToast.loading('loading',{cover:true,duration: 0})
            noteClass.save().then(res => {
                showToast.hide();
                showNotify.success('保存成功');
                proxy.$router.go(-1)
            }).catch(err =>{
                showNotify.danger(err);
            })
        } else {
            console.log(errors);
        }
    })
}

</script>


<style lang="scss" scoped>
@import "@/assets/css/common.scss";
$colorPurple: rgb(10, 33, 83);

.add-note {
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
            :deep(input){
                height: 70px;
                color: $colorPurple;
                &.nut-input-text{
                    font-size: 40px;
                }
            }
            :deep(.nut-textarea){
                max-height: calc(100vh - 200px);
            }
            .submit-container{
                margin-top: 50px;
            }
        }
        :deep(.nut-picker__columnitem:last-child){
            display: none;
        }
    }
}


</style>
