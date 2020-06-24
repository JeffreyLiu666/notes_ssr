/*
 * @Date: 2020-06-23 14:35:35
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-23 14:56:46
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import Vue from 'vue'
import { getList } from '@/api/note.js'

export default {
    namespaced: true,
    state: () => ({
        initList: []
    }),
    mutations: {
        setUsers (state, list = []) {
            Vue.set(state.initList, list)
        }
    },
    actions: {
        getNoteList ({ commit }) {
            return getList().then(list => {
                commit('setUsers', list)
            })
        }
    }
}
