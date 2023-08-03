import {Toast} from '@nutui/nutui';

//错误处理
function catchError(error:any) {
    if (error.response) {
        switch (error.response.status) {
            case 400:
                Toast.warn('不存在');
                break;
            default:
                Toast.warn(error.response.data.message || '服务端异常，请联系技术支持');
        }
    } else {
        Toast.warn('网络错误,请稍后再试');
    }
    return Promise.reject(error);
}

export default {
    catchError,
} as any
