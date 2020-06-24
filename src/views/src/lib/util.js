/*
 * @Date: 2019-10-08 11:14:41
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-22 17:29:26
 * @LastEditors: junfeng.liu
 * @Description: 其他工具函数
 */
import Vue from 'vue'
import { isNull, isEmpty, isEmptyObject, isObject } from './check'

/**
 * @description: 设置页面标题
 * @param {Object}  route 当前路由对象
 * @return: null
 */
export function setTitle (route = {}) {
    const title = route.meta && route.meta.title
    window.document.title = title || 'welcome'
}

/**
 * @description: 深拷贝
 * @param {Any} 要深拷贝的变量
 * @return: 深拷贝后的变量
 */
export function deepCopy (data) {
    let cacheList = []
    let result = doDeepCopy(data, cacheList)
    cacheList = null
    return result
}

function doDeepCopy (data, cacheList) {
    const t = (typeof data)
    let o

    // 考虑性能问题，不拷贝vue实例
    if (data instanceof Vue) return
    if (data && t === 'object') {
        // 避免循环引用造成的问题
        if (cacheList.indexOf(data) !== -1) {
            return
        }
        cacheList.push(data)
        o = (data.constructor === Array) ? [] : {}
    } else {
        return data
    }

    if (data.constructor === Array) {
        for (let i = 0, j = data.length; i < j; i++) {
            let res = doDeepCopy(data[i], cacheList)
            if (isNull(res)) continue
            o.push(res)
        }
    } else if (t === 'object') {
        for (let i in data) {
            let res = doDeepCopy(data[i], cacheList)
            if (isNull(res)) continue
            o[i] = res
        }
    }
    return o
}

/**
 * @description: 将array(object)转为array({label: val, value: val})
 * @param {Array} list 需要转的数组
 * @param {String} labelKey label键名
 * @param {String} valKey value键名
 * @return:
 */
export function formatList (list, labelKey = 'name', valKey = 'id') {
    if (!list || !Array.isArray(list)) return
    let arr = []
    for (let item of list) {
        let obj = { label: item[labelKey], value: item[valKey] }
        arr.push(obj)
    }
    return arr
}

/**
 * @description: 跳转页面且缓存参数
 * @param {Object}  point vue实例对象
 * @param {String}  page 要跳转的页面的路由name
 * @param {Object}  params 传递的参数
 * @return:
 */
export const goToPage = (point, page, params) => {
    if (isEmpty(page || point)) return false
    if (!isEmpty(params) && isObject(params)) {
        sessionStorage.setItem(page, JSON.stringify(params))
    }
    point.$router.push({ name: page, params })
}

/**
 * @description: 获取缓存的参数，需要用上面方法跳转的页面才能取
 * @param {Object}  point vue实例对象
 * @param {String}  page 要跳转的页面的路由name
 * @return:
 */
export const getPageParam = (point, page) => {
    let params = point.$route.params
    if (!isEmptyObject(params)) return params
    let result = sessionStorage.getItem(page)
    if (isEmpty(page) || isEmpty(result)) return {}
    result = JSON.parse(result)
    return result
}

/**
 * @description: 通过class获取上级dom
 * @param {Object}  ele 当前dom
 * @param {String}  classes 要寻找的父级的classname数组
 * @return:
 */
export const findNodeUpperByClasses = (ele, classes = []) => {
    let parentNode = ele.parentNode
    if (parentNode) {
        let classList = Array.from(parentNode.classList || [])
        if (classList && classes.every(className => classList.includes(className))) {
            return parentNode
        } else {
            return findNodeUpperByClasses(parentNode, classes)
        }
    }
}

/**
 * @description: 自定义JSON.stringify()，可解决对象中循环引用造成的问题
 * @param {Object}  obj 需要stringify的对象
 * @return:
 */
export function jsonToString (obj) {
    let copyObj = deepCopy(obj)
    let cache = []
    // 可解决对象中循环引用造成的问题
    // JSON.stringify的第二个参数可以预处理
    // JSON.stringify的第二个参数会影响原对象，需要深拷贝在使用
    let str = JSON.stringify(copyObj, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                return // 如果返回undefined则JSON.stringify会忽略该key
            }
            cache.push(value)
        }
        return value
    })
    cache = null
    return str
}

/**
 * @description: 获取url中某个参数
 * @param {Object}  variable 参数名
 * @return:
 */
export function getQueryVariable (variable) {
    let query = window.location.search.substring(1)
    let vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=')
        if (pair[0] === variable) { return pair[1] }
    }
    return false
}

/**
 * @description: 获取url中所有参数
 * @param
 * @return:
 */
export function getQueryParams () {
    let query = window.location.search.substring(1)
    let vars = query.split('&')
    let result = {}
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=')
        result[pair[0]] = pair[1]
    }
    return result
}

/**
 * @description: 将横线和下划线转为驼峰
 * @param {String}  str
 * @return:
 */
export function toHump (str = '', first2Up = false) {
    let result = str.replace(/(_|-)(\w)/g, function (all, s1, s2 = '') {
        return s2.toUpperCase()
    })
    if (!first2Up) return result
    return result.substring(0, 1).toUpperCase() + result.substring(1)
}

/**
 * @description: 设置Cookie
 * @param {String} key 键名
 * @param {String} value 值
 * @param {Number} exDays 几天后过期
 * @return:
 */
export function setCookieParams (key, value, exDays) {
    if (isEmpty(key)) return
    let str = `${key}=${value};`
    if (isNaN(Number(exDays))) {
        document.cookie = str
        return
    }
    exDays = Number(exDays)
    const date = new Date()
    switch (exDays) {
        case -1:
            date.setTime(0)
            break
        default:
            date.setTime(date.getTime() + exDays * 24 * 60 * 60 * 1000)
    }
    document.cookie = str + `expires=${date.toUTCString()};`
}

/**
 * @description: 获取Cookie中所有参数
 * @param
 * @return: Object
 */
export function getCookieParams () {
    if (isEmpty(document.cookie)) return {}
    const params = document.cookie.split(';')
    let result = {}
    params.forEach((item) => {
        if (isEmpty(item)) return
        const arr = item.split('=')
        result[arr[0].trim()] = arr[1]
    })
    return result
}

