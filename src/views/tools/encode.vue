<template>
    <div class="container">
        <nut-cell>
            <nut-textarea rows="14" autosize autofocus v-model="inputValue" />
        </nut-cell>
        <nut-cell class="btn-groups">
            <nut-button type="primary" plain @click="base64Encode">Base64 Encode</nut-button>
            <nut-button type="primary" plain @click="base64Decode">Base64 Decode</nut-button>
            <nut-button type="primary" plain @click="urlEncode">URL Encode</nut-button>
            <nut-button type="primary" plain @click="urlDecode">URL Decode</nut-button>
        </nut-cell>
        <nut-cell>
            <div class="desc">
                <h3>简介</h3>
                <p>
                    base64 编码普遍应用于需要通过被设计为处理文本数据的媒介上储存和传输二进制数据而需要编码该二进制数据的场景。这样是为了保证数据的完整并且不用在传输过程中修改这些数据。<br>
                    url编码解码，又叫百分号编码，是统一资源定位(URL)编码方式。URL地址（常说网址）规定了常用地数字，字母可以直接使用，另外一批作为特殊用户字符也可以直接用（/,:@等），剩下的其它所有字符必须通过%xx编码处理。 现在已经成为一种规范了，基本所有程序语言都有这种编码，如js：有encodeURI、encodeURIComponent，PHP有 urlencode、urldecode等。编码方法很简单，在该字节ascii码的的16进制字符前面加%. 如 空格字符，ascii码是32，对应16进制是'20'，那么urlencode编码结果是:%20。
                </p>
            </div>
        </nut-cell>

    </div>

</template>
<script setup lang="ts">
import {ref, onMounted, nextTick, watch} from "vue";
import { Base64 } from 'js-base64';
interface ValueObject {
    [propName: string]: any
}
let inputValue = ref('')

let hexUrl = ref('')
let ocrRes = ref('')
console.log(Base64);

function base64Encode() {
    inputValue.value = Base64.encode(inputValue.value)
}

function base64Decode(){
    inputValue.value = Base64.decode(inputValue.value)
}

function urlEncode() {
    inputValue.value = encodeURIComponent(inputValue.value)
}

function urlDecode(){
    inputValue.value = decodeURIComponent(inputValue.value)
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

    .btn-groups{
        flex-wrap: wrap;
        .nut-button{
            margin: 0 20px 20px 0;
        }
    }
    .desc{
        font-size: 28px;
        padding: 10px 30px;
        background: white;
    }

}


</style>
