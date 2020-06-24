/*
 * @Date: 2020-06-18 10:45:56
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-22 15:49:04
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import Vue from 'vue'
import iView from 'view-design'
import lView from 'l-view-vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'

export function createApp () {
    const router = createRouter()
    const store = createStore()

    // 同步路由状态(route state)到 store
    sync(store, router)

    Vue.use(iView)
    Vue.use(lView)

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })
    return { app, router, store }
}
