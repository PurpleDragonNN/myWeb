<template>
    <div class="container">
        <nut-textarea
            v-model="rule"
            autofocus
            :autosize="{maxHeight: 250, minHeight: 50}" max-length="10000"
            limit-show/>
        <div class="btn-groups">
            <nut-button
                type="primary"
                :disabled="!rule"
                @click="format">
                格式化
            </nut-button>
            <nut-button
                type="success"
                :disabled="!formatText"
                @click="copy(formatText)">
                复制结果
            </nut-button>
            <nut-button
                type="info"
                :disabled="!formatText"
                @click="previewVisible=true">
                预览
            </nut-button>
        </div>

        <nut-textarea
            v-if="formatText"
            :autosize="{maxHeight: 200, minHeight: 50}" readonly
            v-model="formatText"/>

        <nut-dialog
            closeOnClickOverlay
            noFooter
            textAlign="left"
            teleport="#app"
            :content="formatText"
            v-model:visible="previewVisible"
        >
        </nut-dialog>
    </div>

</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
import {copy} from '@/utils/utils'

interface ValueObject {
    [propName: string]: any
}

let previewVisible = ref(false)
let rule = ref('')
let formatText = ref('')
let format = () => {
    let arr = rule.value.split("\n")
    arr.forEach((item, index) => {
        if (item) {
            let reg = /([一二三四五六七八九十][\.、])|(\d{1,2}[\.、])/
            if (reg.test(item)) {
                arr[index] = `<h4>${item.trim()}</h4>`
            } else {
                arr[index] = `<p>${item.trim()}</p>`
            }
        }
    })
    formatText.value = arr.join('')
}


</script>


<style lang="scss" scoped>
.container {
    padding: 20px 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    color: #333;
    background: #f7f8fa;


    .nut-textarea {
    }
    .btn-groups{
        margin: 20px auto;
        .nut-button{
            margin-left: 20px;
        }
    }
    .preview{
        padding: 10px 30px;
    }
}


</style>
