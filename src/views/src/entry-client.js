/*
 * @Date: 2020-06-18 15:55:47
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-18 18:22:13
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import { createApp } from './main'

// 客户端特定引导逻辑……

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
    // 这里假定 App.vue 模板中根元素具有 `id="app"`
    app.$mount('#app')
})
