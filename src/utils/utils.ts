class utils {

  //  图片地址
  getImage (url: string) {
    return new URL(url, import.meta.url).href
  }
}

export default new utils()
