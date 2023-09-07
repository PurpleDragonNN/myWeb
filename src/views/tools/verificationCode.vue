<template>
    <div class="container">
        <nut-cell>
            <nut-uploader :file-list="defaultFileList" :before-upload="beforeUpload" accept="image/*" :auto-upload="false" :maximize="maximize"></nut-uploader>
        </nut-cell>
        <div class="img">
            <div class="hex" v-if="hexUrl">二值化图片：<br/>
                <img :src="hexUrl" alt="">
            </div>
        </div>
        <div class="canvas"></div>
        <nut-cell>
            <nut-button type="primary" @click="ocrReq('')">ocr识别</nut-button>
            <nut-button type="primary" @click="imgDeal">二值化并ocr识别</nut-button>
        </nut-cell>
        <nut-cell title="识别结果：" :desc="ocrRes" class="res_text"></nut-cell>
    </div>

</template>

<script setup lang="ts">
import {ref, onMounted, nextTick, watch} from "vue";
import axios from '@/services/axiosConfig'
import {Notify,Toast} from "@nutui/nutui";
import {compress} from "@/utils/images";

interface ValueObject {
    [propName: string]: any
}

let hexUrl = ref('')
let ocrRes = ref('')
let defaultFileList:any = ref([])
// 上传图片大小上限
let maximize = ref(1024*500)

watch(() => defaultFileList.value, (val) => {
    if (val[0] && val[0].status=== 'ready') {
        val[0].status = 'success'
    }
},{deep: true})

const beforeUpload =  async (file:File[]) => {
    if (file[0].size > maximize.value) {
        Notify.danger(`图片大小不能超过${maximize.value/1024}kb！`);
        return file
    }
    let imgFile = ref<any>(null)
    // 大于一百k则压缩图片
    if (file[0].size > 1024 * 100) {
        compress(file).then(res => {
            imgFile.value = res[0]
            return res
        })
    } else {
        imgFile.value = file[0]
    }
    return [imgFile.value]
}

const AK = "hR4RZakGswhcRKbjeTh2QGwx"
const SK = "Dfb2bsYp37EDu9x8gfd4BnKYNWkAFZw1"

async function ocrReq(url: string) {
    if (!defaultFileList.value.length) {
        Toast.warn('请先上传图片')
        return
    }
    console.log(url);
    console.log(defaultFileList.value[0].url);
    var options = {
        'method': 'POST',
        // 接口测试使用
        'url': '/api/rest/2.0/ocr/v1/form?access_token=' + await getAccessToken(),
        // 'url': '/api/rest/2.0/ocr/v1/accurate_basic?access_token=' + await getAccessToken(),
        // 'url': '/api/rest/2.0/ocr/v1/general_basic?access_token=' + await getAccessToken(),
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        },
        data: {
            'image': url || defaultFileList.value[0].url
        },
    };
    axios(options).then((res:ValueObject) => {
        if (!res?.words_result?.length) {
            Toast.fail('未识别到文字')
            return
        }
        ocrRes.value = res.words_result.reduce((prev, cur) => {
            return prev + cur.words + '\r\n'
        }, '')
        console.log(res.words_result);
    })
}

/**
 * 使用 AK，SK 生成鉴权签名（Access Token）
 * @return string 鉴权签名信息（Access Token）
 */
function getAccessToken() {
    let options = {
        'method': 'POST',
        'url': '/api/oauth/2.0/token?grant_type=client_credentials&client_id=' + AK + '&client_secret=' + SK,
    }
    return axios(options).then(res => {
        return res.access_token
    })
}

function imgDeal () {
    if (!defaultFileList.value.length) {
        Toast.warn('请先上传图片')
        return
    }
    let img = new Image()
    img.src = defaultFileList.value[0].url
    let WIDTH = 0
    let HEIGHT = 0
    img.onload = function () {
        WIDTH = img.width
        HEIGHT = img.height
        var canvas1 = document.createElement("canvas");
        document.querySelector(".canvas").appendChild(canvas1);
        canvas1.width = WIDTH;
        canvas1.height = HEIGHT;
        canvas1.style.backgroundColor = "cornsilk";
        let ctx1 = canvas1.getContext('2d');
        ctx1.drawImage(img,0,0,WIDTH,HEIGHT);
        var imgData = ctx1.getImageData(0,0,WIDTH,HEIGHT);
        let hexData = toHex(imgData)

        var canvas2 = document.createElement("canvas");
        document.querySelector(".canvas").appendChild(canvas2);
        canvas2.style.backgroundColor = "#aaa";
        canvas2.width = WIDTH;
        canvas2.height = HEIGHT;
        let ctx2:any = canvas2.getContext('2d');
        ctx2.putImageData(hexData,0,0);
        // 使用二值化后的结果
        hexUrl.value = canvas2.toDataURL("image/png")
        ocrReq(hexUrl.value)
        // 使用原生图片
        // hexUrl.value = canvas1.toDataURL("image/png")
    }


    function split(fromArray,count){
        var numNow = 0;
        var status = false;
        var w = fromArray[0].length;
        for(var k=0;k<w;k++) {//遍历图像
            var sumUp = 0;
            for (var j=0;j<fromArray.length;j++) //检测整列是否有图像
                sumUp += fromArray[j][k];
            if(sumUp == 0){//切割
                for (j=0;j<fromArray.length-1;j++)
                    fromArray[j].remove(k);
                w --;
                k --;
                status = false;
                continue;
            }
            else{//切换状态
                if(!status)
                    numNow ++;
                status = true;
            }
            if(numNow!=count){//不是想要的数字
                for (j=0;j<fromArray.length-1;j++)
                    fromArray[j].remove(k);
                w --;
                k --;
            }
        }
        return fromArray;
    }//切割，获取特定数字

    function toXY(fromImgData){
        var result = new Array(HEIGHT);
        var fromPixelData = fromImgData.data;
        for(var j=0;j<HEIGHT;j++){
            result[j] = new Array(WIDTH);
            for(var k=0;k<WIDTH;k++){
                var r = fromPixelData[4*(j*WIDTH+k)];
                var g = fromPixelData[4*(j*WIDTH+k)+1];
                var b = fromPixelData[4*(j*WIDTH+k)+2];

                result[j][k] = (r+g+b)>500?0:1;//赋值0、1给内部数组
            }
        }
        return result;
    }//图像转数组

    function corrode(fromArray){
        for(var j=1;j<fromArray.length-1;j++){
            for(var k=1;k<fromArray[j].length-1;k++){
                if(fromArray[j][k]==1&&fromArray[j-1][k]+fromArray[j+1][k]+fromArray[j][k-1]+fromArray[j][k+1]==0){
                    fromArray[j][k] = 0;
                }
            }
        }
        return fromArray;
    }//腐蚀（简单）

    function expand(fromArray){
        for(var j=1;j<fromArray.length-1;j++){
            for(var k=1;k<fromArray[j].length-1;k++){
                if(fromArray[j][k]==0&&fromArray[j-1][k]+fromArray[j+1][k]+fromArray[j][k-1]+fromArray[j][k+1]==4){
                    fromArray[j][k] = 1;
                }
            }
        }
        return fromArray;
    }//膨胀（简单）

    function toHex(fromImgData){//二值化图像
        var fromPixelData = fromImgData.data;
        var greyAve = 0;
        for(var j=0;j<WIDTH*HEIGHT;j++){
            var r = fromPixelData[4*j];
            var g = fromPixelData[4*j+1];
            var b = fromPixelData[4*j+2];
            greyAve += r*0.3 + g*0.59 + b*0.11;
        }
        greyAve /= WIDTH*HEIGHT;//计算平均灰度值。
        for(j=0;j<WIDTH*HEIGHT;j++){
            r = fromPixelData[4*j];
            g = fromPixelData[4*j+1];
            b = fromPixelData[4*j+2];
            var grey = r*0.333 + g*0.333 + b*0.333;//取平均值。
            grey = grey>greyAve?255:0;
            fromPixelData[4*j] = grey;
            fromPixelData[4*j+1] = grey;
            fromPixelData[4*j+2] = grey;
        }
        return fromImgData;
    }//二值化图像


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

    .nut-uploader{
        min-width: 100px;
        min-height: 100px;
        ::v-deep(.picture){
            width: 100%;
            height: 100%;
            margin: auto;
            .nut-uploader__preview-img{
                width: 100%;
                height: 100%;
                .nut-uploader__preview-img__c{
                }
            }
        }
    }


    .img {
        padding: 20px;
        display: flex;
        flex-direction: column;
        .hex{
            margin-bottom: 10px;
            img{
                max-width: 100%;
            }
        }
        ::v-deep(canvas){
            width: 100%;
        }
    }
    .canvas{
        display: none;
    }
    .res_text{
        white-space: pre-wrap;
    }
}


</style>
