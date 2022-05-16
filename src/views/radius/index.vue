<template>
  <div class="container">
    <div class="input-block">
      <nut-uploader @failure="uploadFailure" class="upload-btn">
      </nut-uploader>
      <!--        <nut-button type="success">上传文件</nut-button>-->

      <nut-inputnumber v-model="radiusVal" />
<!--      <input type="number" :value="radiusVal" placeholder="请输入圆角矩形的半径" class="radius">-->
    </div>
    <div class="show">
      <a :href="downloadUrl" download="图片" class="download-btn">
        <p>转换后（点击下载）:</p>
        <img ref="afterImgEl" :src="afterUrl" alt="" class="after-transform">
      </a>
      <div>
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

let beforeUrl = ref(getImage('wx-share.png'))
let afterUrl = ref('')
let downloadUrl = ref('')

let radiusVal = ref(50)

let afterImgEl: ValueObject | null = ref(null)
let beforeImgEl: ValueObject | null = ref(null)


function getImage (name: string): string {
  return new URL(`../../assets/radius/img/${name}`, import.meta.url).href
}
onMounted(() => {
  // 初始化示例
  setTimeout(() => {
    let afterTransform: any = circleRect_image({
      img: beforeImgEl!.value,
      type: 1,
      // 不同分辨率图片下圆角效果不一致，故按比例转换
      radius: radiusVal.value * (beforeImgEl!.value!.naturalWidth/750)
    })
    afterUrl.value = afterTransform
    downloadUrl.value = afterTransform
  },300)

return
  // 上传事件
  let uploadBtn:HTMLElement | null = document.querySelector('.upload-btn')
  uploadBtn!.onchange = function (img:ValueObject){
    let file = img.target.files[0]
    console.log({file})
    let reader:ValueObject = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener('load',() => {
      //预览图片链接
      beforeUrl.value = reader.result
      setTimeout(() => {
        let afterTransform:any = circleRect_image({
          img: beforeImgEl!.value!,
          type: 1,
          radius: radiusVal.value * (beforeImgEl!.value!.naturalWidth/750)
        })
        afterUrl.value = afterTransform
        downloadUrl.value = afterTransform
      },500)
    })
  }
})


function uploadFailure({responseText,option,fileItem}) {
  console.log({fileItem});
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
  var img = option.img;
  var type = option.type || 0;
  var radius = option.radius || 0;
  var imgSize, canvas, ctx:any;
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
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  .btn{
    //width: 140px;
  }
  .input-block{
    display: flex;
    justify-content: space-around;
    width: 100%;
    input{
      width: 49%;
    }
    .radius{
      width: 150px;
      border: 1px solid #999;
      outline: none;
    }
  }

  .show{
    width: 100%;
    img{
      max-width: 100%;

    }
  }
}


</style>
