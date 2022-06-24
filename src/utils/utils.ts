import {Notify} from '@nutui/nutui';
//  图片地址
export function getImage (url: string) {
    // return new URL(url, import.meta.url).href
}

/**
 * 破解图片防盗链
 * @param url:图片链接
 */
export function newImg (url: string) {
    return `https://images.weserv.nl/?url=${url}`
}

/**
 * 复制指定内容到剪贴板
 * 该api替代已废弃的document.execCommand，需要获取剪贴板权限
 * @param value：需要复制到简体版的内容
 */
export function copy (value:string) {
    navigator.clipboard.writeText(value).then(function() {
        Notify.success('复制成功');
    }, function() {
        console.log('copy fail');
        /* clipboard write failed */
    });
}
//兼容性更好，但已废弃
/*export function oldCopy (value:string) {
    const input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', value);
    document.body.appendChild(input);
    input.setSelectionRange(0, 9999);
    if (document.execCommand('copy')) {
        input.select()
        document.execCommand('copy');
        Notify.success('复制成功');
    }
    document.body.removeChild(input);
}*/
