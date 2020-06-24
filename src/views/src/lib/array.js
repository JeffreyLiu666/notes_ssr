/*
 * @Date: 2019-10-08 11:14:41
 * @Author: junfeng.liu
 * @LastEditTime: 2019-10-18 15:17:46
 * @LastEditors: junfeng.liu
 * @Description: 数组类工具函数
 */

/**
 * @description: 获取符合条件的object的下标
 * @param {Array(Object)} list 需要处理的数组
 * @param {String} val 匹配的值
 * @param {String} key Object的键名
 * @return: 
 */
export function getItemIndex (list = [], val = '', key = '') {
    if (!Array.isArray(list)) return -1
    // 如果没有key则当成Array(String)来处理
    if (key === '') {
        return list.findIndex((item) => {
            return val === item
        })
    }
    let result = list.findIndex((item) => {
        return val === item[key]
    })
    return result
}

/**
 * @description: 获取符合条件的object
 * @param {Array(Object)} list 需要处理的数组
 * @param {String} val 匹配的值
 * @param {String} key Object的键名
 * @return: 
 */
export function getItemObject (list = [], val = '', key = '') {
    if (!Array.isArray(list)) return -1
    let result = list.find((item) => {
        return val === item[key]
    })
    return result || -1
}