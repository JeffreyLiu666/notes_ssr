/*
 * @Date: 2020-06-18 16:15:01
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-22 16:36:12
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
    return new Router({
        mode: 'history',
        // base: '/Public',
        routes: [
            { path: '/Public', redirect: '/Public/Home' },
            { path: '/Public/Home', component: () => import('../views/Home.vue') },
            { path: '/Public/Login', component: () => import('../views/Login/Login.vue') }
        ]
    })
}
