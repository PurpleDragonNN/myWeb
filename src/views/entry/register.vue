<template>
    <div class="container">

        <nut-form :model-value="loginForm" ref="loginRef">
            <nut-form-item label="账号" prop="username" required :rules="rules.username">
                <input class="nut-input-text" v-model="loginForm.username"
                       placeholder="请输入用户名或手机号码" type="text"/>
            </nut-form-item>
            <nut-form-item label="密码" prop="password" required :rules="rules.password">
                <input class="nut-input-text" v-model="loginForm.password"
                       placeholder="请输入密码" type="password"/>
            </nut-form-item>
            <nut-cell>
                <nut-button type="primary" block @click="login">登录</nut-button>
            </nut-cell>
        </nut-form>


        <nut-dialog
            :no-footer="true"
            closeOnClickOverlay
            v-model:visible="visible"
        >
            <nut-uploader ref="uploadRef" :before-upload="beforeUpload" :url="uploadUrl" accept="image/*" @failure="uploadFinish" :auto-upload="false" :maximize="maximize">
                <nut-avatar
                    class="avatar"
                    size="large"
                    :icon="uploadUrl"
                ></nut-avatar>
            </nut-uploader>

            <nut-form :model-value="registerForm" ref="registerRef" class="register-form">
                <nut-form-item label="用户名" prop="username" required :rules="rules.username">
                    <input class="nut-input-text" v-model="registerForm.username"
                           placeholder="请输入姓名" type="text"/>
                </nut-form-item>
                <nut-form-item label="密码" prop="password" required :rules="rules.password">
                    <input class="nut-input-text" v-model="registerForm.password"
                           placeholder="请输入密码" type="password"/>
                </nut-form-item>
                <nut-form-item label="手机号码" prop="phone" required :rules="rules.phone">
                    <input class="nut-input-text" v-model="registerForm.phone" placeholder="请输入手机号码" type="text"/>
                </nut-form-item>
                <nut-cell>
                    <nut-button block class="register-btn" type="primary" @click="submit">注册</nut-button>
                </nut-cell>
            </nut-form>

        </nut-dialog>
    </div>

</template>

<script setup lang="ts">
import {ref, onMounted, reactive} from "vue";
import {mainStore} from '../../store'
import {createUserClass, createFileClass, createQueryClass, createObjClass} from "../../leancloud";
import { Notify, Toast } from '@nutui/nutui';
import AV from "leancloud-storage";

const userClass = createUserClass()
const query = createQueryClass('_User')
const userObj = createObjClass('_User')

interface ValueObject {
    [propName: string]: any
}

let {username, password} = mainStore()

let visible = ref(true)
let uploadUrl = ref('my')
// 上传图片大小上限
let maximize = ref(1024*500)

const registerRef = ref<any>(null);
const loginRef = ref<any>(null);
const uploadRef = ref<any>(null);

let headImgFile = reactive<any>(File)
const loginForm = reactive({
    username: 'yangzilong',
    password: '12345678',
});
const registerForm = reactive({
    username: 'yangzilong',
    password: '12345678',
    phone: '18578655522',
});

// 表单校验
const rules = reactive({
    username: [{ required: true, message: '请填写用户名' }],
    password: [{ required: true, message: '请填写密码' }],
    phone: [
        { required: true, message: '请填写联系电话' },
        {
            validator: (val:string) => /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(val),
            message: '手机号码格式不正确'
        }
    ]
})

// 注册表单提交
const submit = () => {
    registerRef.value.validate().then(({ valid, errors }: any) => {
        if (valid) {
            register()
        } else {
            console.log('error submit!!', errors);
        }
    });
};

// 登录
const login = () => {
    loginRef.value.validate().then(({ valid, errors }: any) => {
        if (valid) {
            AV.User.logIn(loginForm.username,loginForm.password).then(loginUser => {
                console.log(loginUser);
            })
        } else {
            console.log('error submit!!', errors);
        }
    });
};

// 注册
const register = () => {

    userClass.setUsername(registerForm.username)
    userClass.setPassword(registerForm.password)
    userClass.setMobilePhoneNumber(registerForm.phone)
    // userClass.set('headImg',headImgFile.value.url)
    userClass.signUp().then(res => {
        console.log(res);
        Toast.success('注册成功，正在前往登录',);
        setTimeout(() => {
            Notify.danger('前往登录')
        },2000)
    }).catch(error => {
        if (error.code === 214){
            Notify.danger('该号码已被注册')
        } else if (error.code === 202){
            Notify.danger('该用户名已被注册')
        } else {
            Notify.danger(error.rawMessage)
        }
    })
}

const uploadFinish = ({responseText,option,fileItem}) => {
    console.log(fileItem);
    console.log(fileItem);

// const uploadFinish = ({fileList,event}) => {


    // let read = new FileReader()
    // uploadUrl.value =  fileItem.url
    // headImgFile.value = fileItem
    // console.log(fileItem);

}

/*query.equalTo('username','yangzilong')
query.find().then(res => {
    console.log(res[0]);
    return
    res[0].set('password', '3121')
    res[0].save().then(r => {
        console.log(r);
    })
})*/

const beforeUpload =  async (file:File[]) => {
    if (file[0].size > maximize.value) {
        Notify.danger(`图片大小不能超过${maximize.value/1024}kb！`);
        return file
    }

    if (file[0].size > 1024 * 100) {
        compress(file).then(res => {
            console.log('compress:',res);
        })
    }

    // let headFile = createFileClass(file[0].name, file[0]);


    // 大于一百k压缩图片
    return  file
};

// 图片压缩
const compress = async (file: File[]) => {
    let fileName = file[0].name;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    const base64 = await fileToDataURL(file[0]);
    const img = await dataURLToImage(base64);
    canvas.width = img.width;
    canvas.height = img.height;

    context.clearRect(0, 0, img.width, img.height);
    context.drawImage(img, 0, 0, img.width, img.height);

    let blob = (await canvastoFile(canvas, 'image/jpeg', 0.5)) as Blob; //quality:0.5可根据实际情况计算
    const f = await new File([blob], fileName);
    return [f];
}

const fileToDataURL = (file: Blob): Promise<any> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = (e) => resolve((e.target as FileReader).result);
        reader.readAsDataURL(file);
    });
};
const dataURLToImage = (dataURL: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = dataURL;
    });
};
const canvastoFile = (canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> => {
    return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), type, quality));
};

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

.nut-uploader{
    position: absolute;
    left: 50%;
    top: 40px;
    transform: translateX(-50%);
}
.register-form{
    margin-top: 80px;
    .register-btn{
        margin: 0 auto;
    }
}

</style>
