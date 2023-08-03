import axios  from 'axios'
import utils from "./utils";
import {Toast} from '@nutui/nutui'
let baseURL

const instance:any = axios.create({
    baseURL: baseURL,
    // 超时时间
    timeout: 60000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
})
instance.defaults.headers = {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'};

// 请求拦截
instance.interceptors.request.use((config:any) => {
        if (config.isLoading !== false) {
            Toast.loading('');
        }
    return config;
},utils.catchError
);

// 响应拦截（配置请求回来的信息）
instance.interceptors.response.use(function (response:any) {
    Toast.hide();
    return response.data;
}, utils.catchError);
export default instance
