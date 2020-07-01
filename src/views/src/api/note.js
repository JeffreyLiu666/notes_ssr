/*
 * @Date: 2020-06-23 14:37:25
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-23 15:01:39
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import http from '@/lib/request'

export function getList (params) {
    return http.request({
        url: '/Note/getList',
        method: 'get'
    }, params)
}

export function editNote (params) {
    return http.request({
        url: '/Note/editNote',
        method: 'post'
    }, params)
}

export function addNote (params) {
    return http.request({
        url: '/Note/addNote',
        method: 'post'
    }, params)
}

export function delNote (params) {
    return http.request({
        url: '/Note/delNote',
        method: 'post'
    }, params)
}

export function changeResolve (params) {
    return http.request({
        url: '/Note/changeResolve',
        method: 'post'
    }, params)
}
