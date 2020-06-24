/*
 * @Date: 2020-06-18 16:40:19
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-19 11:09:43
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

export function createStore () {
    return new Vuex.Store({
        modules: {
            user
        }
    })
}
