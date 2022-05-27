import { defineStore } from "pinia";
import AV from "leancloud-storage";

export const mainStore = defineStore('main',{
    state: () => {
        return {
            userInfo: AV.User.current() ? AV.User.current().toJSON() : null
        }
    },
    getters: {
    },
    actions: {
        // 更新用户信息
        fetchUserInfo () {
            this.userInfo = AV.User.current() ? AV.User.current().toJSON() : null
        }
    }
})
