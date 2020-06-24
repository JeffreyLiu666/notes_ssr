/*
 * @Date: 2020-06-18 17:30:31
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-22 16:17:35
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import Vue from 'vue'
import { setCookieParams } from '@/lib/util'
// import { doGetUsers } from '../../../../service/user'

export default {
    state: {
        users: []
    },
    mutations: {
        setUsers (state, list = []) {
            Vue.set(state.users, list)
        }
    },
    actions: {
        // 现有数据获取方案两种
        // 1、通过使用axios从服务端发起请求从服务端获取数据（可前后端复用）
        // 2、通过entry-server中的ctx传递数据（这样每次获取数据都得刷新页面）
        doGetUsers ({ commit }) {
            return []
            // return doGetUsers().then(list => {
            //     commit('setUsers', list)
            // })
        },
        logout ({ commit }) {
            setCookieParams('token', null)
            location.href = '/Public/login.html'
        }
    }
}
