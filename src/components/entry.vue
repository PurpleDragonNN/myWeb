<template>
    <div>
        <!--登录-->
        <nut-dialog
            :no-footer="true"
            closeOnClickOverlay
            v-model:visible="logVisible"
            title="登 录"
        >
            <nut-form :model-value="loginForm" ref="loginRef">
                <nut-form-item label="账号" label-width="60px" prop="account" required :rules="rules.account">
                    <input class="nut-input-text" v-model="loginForm.account"
                           placeholder="请输入用户名或邮箱" type="text"/>
                </nut-form-item>
                <nut-form-item label="密码" label-width="60px" prop="password" required :rules="rules.password">
                    <input class="nut-input-text" v-model="loginForm.password"
                           placeholder="请输入密码" type="password"/>
                </nut-form-item>
                <nut-cell>
                    <nut-button :loading="isLoading" type="primary" block @click="login">登录</nut-button>
                </nut-cell>
            </nut-form>
            <div class="text-btn" @click="showDialog(true)">
                前往注册 <nut-icon name="arrow-right"></nut-icon>
            </div>
        </nut-dialog>
        <!--注册-->
        <nut-dialog
            :no-footer="true"
            closeOnClickOverlay
            v-model:visible="regVisible"
        >
            <nut-uploader ref="uploadRef" :file-list="defaultFileList" :before-upload="beforeUpload" accept="image/*" :auto-upload="false" :maximize="maximize"></nut-uploader>

            <nut-form :model-value="registerForm" ref="registerRef" class="register-form">
                <nut-form-item label="用户名" label-width="70px" prop="username" required :rules="rules.username">
                    <input class="nut-input-text" v-model="registerForm.username"
                           placeholder="请输入姓名" type="text"/>
                </nut-form-item>
                <nut-form-item label="密码" label-width="70px" prop="password" required :rules="rules.password">
                    <input class="nut-input-text" v-model="registerForm.password"
                           placeholder="请输入密码" type="password"/>
                </nut-form-item>
                <nut-form-item label="手机号码" label-width="70px" prop="phone" required :rules="rules.phone">
                    <input class="nut-input-text" v-model="registerForm.phone" placeholder="请输入手机号码" type="text"/>
                </nut-form-item>
                <nut-form-item label="邮箱" label-width="40px" prop="email" :rules="rules.email">
                    <input class="nut-input-text" v-model="registerForm.email" placeholder="请输入邮箱" type="email"/>
                </nut-form-item>
                <nut-cell>
                    <nut-button block class="register-btn" type="primary" @click="submit">注册</nut-button>
                </nut-cell>
                <div class="text-btn" @click="showDialog(false)">
                    前往登录 <nut-icon name="arrow-right"></nut-icon>
                </div>
            </nut-form>

        </nut-dialog>

        <!--更新信息-->
        <nut-dialog
            :no-footer="true"
            closeOnClickOverlay
            v-model:visible="updateVisible"
        >
            <nut-uploader ref="uploadRef" :file-list="defaultFileList" :before-upload="beforeUpload" accept="image/*" :auto-upload="false" :maximize="maximize"></nut-uploader>

            <nut-form :model-value="updateForm" ref="updateRef" class="register-form">
                <nut-form-item label="用户名" label-width="70px" prop="username" required :rules="rules.username">
                    <input class="nut-input-text" v-model="updateForm.username"
                           placeholder="请输入姓名" type="text"/>
                </nut-form-item>
                <nut-form-item label="手机号码" label-width="70px" prop="phone" required :rules="rules.phone">
                    <input class="nut-input-text" v-model="updateForm.phone" placeholder="请输入手机号码" type="text"/>
                </nut-form-item>
                <nut-form-item label="邮箱" label-width="40px" prop="email" :rules="rules.email">
                    <input class="nut-input-text" v-model="updateForm.email" placeholder="请输入邮箱" type="email"/>
                </nut-form-item>

                <nut-form-item label="旧密码" label-width="70px" prop="password" required :rules="rules.password">
                    <input class="nut-input-text" v-model="updateForm.password"
                           placeholder="请输入密码" type="password"/>
                </nut-form-item>
                <nut-cell>
                    <nut-button block class="register-btn" type="primary" @click="updateInfo">更新</nut-button>
                </nut-cell>
            </nut-form>

        </nut-dialog>
    </div>

</template>

<script setup lang="ts">
import {ref, onMounted, reactive, watch, defineEmits} from "vue";
import { createFileClass, createQueryClass} from "@/leancloud";
import { Notify, Toast } from '@nutui/nutui';
import AV from "leancloud-storage";
import {mainStore} from "@/store";
import { storeToRefs } from "pinia";

interface ValueObject {
    [propName: string]: any
}
const store = mainStore()
const { userInfo } = storeToRefs(store)

const emit = defineEmits<{
(e: 'loginCallback', info: Object): void,

}>()

const newUserClass = new AV.User()
const userClass = AV.User.current() || new AV.User()
const query = createQueryClass('_User')

const CODE_TIPS = {
    202: '该用户名已被注册',
    210: '手机号码或密码错误',
    211: '该用户不存在',
    214: '该号码已被注册',
}


let isLoading = ref(false)
let regVisible = ref(false)
let logVisible = ref(false)
let updateVisible = ref(false)

let defaultFileList:any = ref([])

// 上传图片大小上限
let maximize = ref(1024*500)

const registerRef = ref<any>(null);
const loginRef = ref<any>(null);
const uploadRef = ref<any>(null);
const updateRef = ref<any>(null);

let headImgFile = ref<any>(File)
const loginForm = reactive({
    account: '576817275@qq.com',
    password: '123456789',
});
const registerForm = reactive({
    username: 'yangzilong',
    password: '12345678',
    phone: '18578655522',
    email: '576817275@qq.com'
});
const updateForm = reactive({
    username: '',
    password: '',
    phone: '',
    email: ''
});


const showErrorTips = error => {
    if (CODE_TIPS[error.code]) {
        Notify.danger(CODE_TIPS[error.code])
    } else {
        Notify.danger(error.rawMessage)
    }
}
const showDialog = (isShow) => {
    regVisible.value = isShow
    logVisible.value = !isShow
}

// 表单校验
const rules = reactive({
    username: [{ required: true, message: '请输入用户名' }],
    account: [{ required: true, message: '请输入用户名或邮箱' }],
    password: [{ required: true, message: '请输入密码' }],
    email: [{ required: false, message: '请输入邮箱' },
        {
            validator: (val:string) => /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(val),
            message: '邮箱格式不正确'
        }],
    phone: [
        { required: true, message: '请输入联系电话' },
        {
            validator: (val:string) => /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(val),
            message: '手机号码格式不正确'
        }
    ]
})

watch(() =>defaultFileList.value.length, () => {
    defaultFileList.value[0].status = 'success'
},{deep:true})

watch(userInfo, val => {
    if (val) {
        updateForm.username = userInfo.value.username
        updateForm.phone = userInfo.value.mobilePhoneNumber
        updateForm.email = userInfo.value.email
    }
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
            isLoading.value = true
            AV.User.logIn(loginForm.account,loginForm.password).then(loginUser => {
                isLoading.value = false
                logVisible.value = false
                emit('loginCallback', loginUser)
            }).catch(error => {
                isLoading.value = false
                showErrorTips(error)
            })
        } else {
            console.log('error submit!!', errors);
        }
    });
};

// 注册
const register = () => {
    newUserClass.setUsername(registerForm.username)
    newUserClass.setPassword(registerForm.password)
    newUserClass.setMobilePhoneNumber(registerForm.phone)
    newUserClass.setEmail(registerForm.email)
    if (headImgFile.value) {
        newUserClass.set('headImg',new AV.File(headImgFile.value.name, headImgFile.value))
    }
    isLoading.value = true
    newUserClass.signUp().then(res => {
        isLoading.value = false
        Toast.success('注册成功，正在前往登录',);
        setTimeout(() => {
            showDialog(false)
        },2000)
    }).catch(error => {
        showErrorTips(error)
    })
}

// 更新信息
const updateInfo = () => {
    userClass.setUsername(updateForm.username)
    userClass.setMobilePhoneNumber(registerForm.phone)
    userClass.setEmail(registerForm.email)
    userClass.save().then(res => {
        store.fetchUserInfo()
    })
    if (updateForm.password) {
        userClass.updatePassword('12345678',updateForm.password,{
            sessionToken: userClass.getSessionToken(),
            // user: userClass,
            useMasterKey: true
        }).then(res => {
            store.fetchUserInfo()
            console.log(res);
        })
    }
}

const beforeUpload =  async (file:File[]) => {
    if (file[0].size > maximize.value) {
        Notify.danger(`图片大小不能超过${maximize.value/1024}kb！`);
        return file
    }

    // 大于一百k则压缩图片
    if (file[0].size > 1024 * 100) {
        compress(file).then(res => {
            headImgFile.value = res[0]
            console.log('compress:',res);
            return res
        })
    }
    headImgFile.value = file[0]
    return [file[0]]
}

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

defineExpose({
    logVisible,
    regVisible,
    updateVisible,
})

</script>


<style lang="scss" scoped>


.text-btn{
    display: flex;
    text-decoration: unset;
    color: #262626;
    position: absolute;
    right: 40px;
    bottom: 40px;
    font-size: 20px;
    .nut-icon{
        font-size: 20px;
    }
}

.nut-uploader{
    width: 120px;
    height: 120px;
    position: absolute;
    left: 50%;
    top: 40px;
    transform: translateX(-50%);
    ::v-deep .picture{
        width: 100%;
        height: 100%;
        margin: auto;
        border-radius: 50%;
        .nut-uploader__preview-img{
            width: 100%;
            height: 100%;
            .nut-uploader__preview-img__c{
                border-radius: 50%;
            }
        }
    }
}
.register-form{
    margin-top: 80px;
    .register-btn{
        margin: 0 auto;
    }
}

@media screen and (min-device-width: 500px){
    .nut-uploader {
        width: 80px;
        height: 80px;
    }
    .text-btn{
        bottom: 20px;
        font-size: 14px;
        .nut-icon{
            font-size: 14px;
        }
    }
}

</style>
