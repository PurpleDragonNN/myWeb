//  图片地址
export function getImage (url: string) {
    return new URL(url, import.meta.url).href
}

//  破解图片防盗链
export function newImg (url: string) {
    return `https://images.weserv.nl/?url=${url}`
}
