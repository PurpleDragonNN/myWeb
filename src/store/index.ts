import {defineStore, storeToRefs} from "pinia";
import AV from "leancloud-storage";

export const mainStore = defineStore('main',{
    state: () => {
        return {
            userInfo: AV.User.current() ? AV.User.current().toJSON() : null,
            isLogin: false,
            elRef: {},
        }
    },
    getters: {
    },
    actions: {
        // 更新用户信息
        fetchUserInfo () {
            this.userInfo = AV.User.current() ? AV.User.current().toJSON() : null
            this.isLogin = !!AV.User.current()
        },
        updateElRef (val){
            Object.assign(this.elRef,val)
        }
    }
})
