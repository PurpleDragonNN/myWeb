<template>
  <div class="container">
    <nut-uploader @failure="uploadFailure" :file-list="defaultFileList"  ref="uploaderEl" class="upload-btn"></nut-uploader>

    <nut-range v-model="radiusVal"></nut-range>
    <nut-divider />

    <div class="show">
      <a :href="downloadUrl" v-if="afterUrl" download="图片" class="download-btn">
        <p>转换后（{{isWeixin? '长按图片保存':'点击下载'}}）:</p>
        <img ref="afterImgEl" :src="afterUrl" alt="" class="after-transform">
      </a>
      <div v-if="beforeUrl">
        <p>转换前:</p>
        <img ref="beforeImgEl" :src="beforeUrl" alt="" class="before-transform">
      </div>

    </div>
  </div>

</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
interface ValueObject {
  [propName:string]: any
}

let beforeUrl = ref('')
let afterUrl = ref('')
let downloadUrl = ref('')
// @ts-ignore
let isWeixin = ref(window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger")

let radiusVal = ref(50)
let defaultFileList:any = ref([])

let afterImgEl: ValueObject | null = ref(null)
let beforeImgEl: ValueObject | null = ref(null)
let uploaderEl: ValueObject | null = ref(null)



function getImage (name: string): string {
  return new URL(`../../assets/radius/img/${name}`, import.meta.url).href
}
/*onMounted(() => {
})*/

// 上传回调
// @ts-ignore
function uploadFailure({fileItem}) {
  defaultFileList.value[0].status = 'success'
  //预览图片链接
  beforeUrl.value = fileItem.url
  setTimeout(() => {
    let afterTransform:any = circleRect_image({
      img: beforeImgEl!.value,
      type: 1,
      radius: radiusVal.value * (beforeImgEl!.value!.naturalWidth/750)
    })
    afterUrl.value = afterTransform
    downloadUrl.value = afterTransform
  },500)

}


/**
 * 把图片处理成圆角矩形
 * @param  {object} img 图片(img)对象
 * @param  {number} type 设置生成图片的大小：0设置生成的图片大小是以图片设置的css大小为准，1设置生成的图片大小是以图片分辨率为准，默认值为0
 * @param  {number} radius 圆角矩形的半径，默认值为0
 * @return {string}     return base64 png图片字符串
 */
function circleRect_image(option:ValueObject ) {
  let img = option.img;
  let type = option.type || 0;
  let radius = option.radius || 0;
  let imgSize, canvas, ctx:any;
  if (type){
    imgSize = {
      width: img.naturalWidth,
      height: img.naturalHeight
    }
  }else{
    imgSize = {
      width: img.width,
      height: img.height
    }
  }
  canvas = document.createElement('canvas');
  if (!canvas.getContext) { // 判断浏览器是否支持canvas，如果不支持在此处做相应的提示
    console.log('您的浏览器版本过低，暂不支持。');
    return false;
  }
  canvas.width = imgSize.width;
  canvas.height = imgSize.height;
  ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, imgSize.width, imgSize.height);
  ctx.save();
  ctx.beginPath();
  roundedRect(ctx, 0, 0, imgSize.width, imgSize.height, radius);
  ctx.clip();  // 通过裁剪得到圆角矩形
  if(type){
    ctx.drawImage(img, 0, 0, imgSize.width, imgSize.height, 0, 0, imgSize.width, imgSize.height);
  }else{
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, imgSize.width, imgSize.height);
  }
  ctx.restore();

// 画圆角矩形
  function roundedRect(ctx:any, x:number, y:number, width:number, height:number, radius:number) {
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
    ctx.lineTo(x + width - radius, y + height);
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    ctx.lineTo(x + width, y + radius);
    ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
    ctx.lineTo(x + radius, y);
    ctx.quadraticCurveTo(x, y, x, y + radius);
    ctx.stroke();
  }
  return canvas.toDataURL('image/png');
}


</script>


<style lang="scss" scoped>
.container{
  padding: 20px;
  width: 100%;
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  font-size: 34px;
  color: #333;

  .upload-btn{
    width: 100%;
    margin: 50px 0;
  }
  .nut-divider{
    width: 100%;
  }

  .show{
    width: 100%;
    a{
      color: #333;
    }
    img{
      max-width: 100%;

    }
  }
}


</style>
