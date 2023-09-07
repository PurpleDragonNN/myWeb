import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pxTOViewport from 'postcss-px-to-viewport'
import { resolve } from 'path'
import createCNAME from './plugins/createCNAME.js'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), createCNAME()],
    base: './',
	build: {
        outDir: './docs',
        chunkSizeWarningLimit: 1000
	},
    resolve: {
        alias: [
            { find: '@', replacement: resolve(__dirname, 'src') },
            { find: '@com', replacement: resolve(__dirname, 'src/components') },
        ]
    },
    css: {
        postcss: {
            plugins: [
                pxTOViewport({
                    unitToConvert: 'px', // 要转化的单位
                    viewportWidth: 750, // UI设计稿的宽度
                    // viewportHeight: 667, // UI设计稿的高度
                    unitPrecision: 3, // 转换后的精度，即小数点位数
                    propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
                    viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
                    fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
                    selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
                    minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
                    mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
                    replace: true, // 是否转换后直接更换属性值
                    exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
                    // exclude: [],
                    landscape: true,       // 是否添加根据 landscapeWidth 生成的媒体查询条件
                    landscapeUnit: 'rem',    // 横屏时使用的单位
                    landscapeWidth: 750,   // 横屏时使用的视窗宽度
                })
            ]
        },
        preprocessorOptions: {
            scss: {
                // 默认京东 APP 10.0主题 > @import "@nutui/nutui/dist/styles/variables.scss";
                // 京东科技主题 > @import "@nutui/nutui/dist/styles/variables-jdt.scss";
                // 京东B商城主题 > @import "@nutui/nutui/dist/styles/variables-jdb.scss";
                // 京东企业业务主题 > @import "@nutui/nutui/dist/styles/variables-jddkh.scss";
                // additionalData: `@import "./assets/custom_theme.scss";@import "@nutui/nutui/dist/styles/variables.scss";`
                additionalData: `@import "@/assets/css/custom_theme.scss";`
            }
        },
    },
    server: {
        open: true, //配置自动启动浏览器
        proxy: {
            "/api": {
                target: "https://aip.baidubce.com",
                changeOrigin: true,
                rewrite: (path) => path.replace(/\/api/, ""),
            },
        },
    },
})
