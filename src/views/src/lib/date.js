/*
 * @Date: 2019-10-08 11:14:41
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-22 16:12:42
 * @LastEditors: junfeng.liu
 * @Description: 时间类工具函数
 */
import { isObject, isString } from './check'

/**
 * @description: 将时间处理成指定格式
 * @param {Date} date 时间变量
 * @param {String} format 时间格式
 * @return: string
 */
export function formatDate (date, format = 'yyyy-MM-dd') {
    let d = date ? iosAdapter(date) : new Date()
    if (d instanceof Date && isNaN(d.getSeconds())) {
        return ''
    }
    let str = format
    str = str.replace(/yyyy/g, d.getFullYear())
    str = str.replace(/MM/g, ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1))
    str = str.replace(/dd/g, (d.getDate() < 10 ? '0' : '') + d.getDate())
    str = str.replace(/hh/g, (d.getHours() < 10 ? '0' : '') + d.getHours())
    str = str.replace(/mm/g, (d.getMinutes() < 10 ? '0' : '') + d.getMinutes())
    str = str.replace(/ss/g, (d.getSeconds() < 10 ? '0' : '') + d.getSeconds())
    return str
}

/**
 * @description: 推移时间，可推移年，月，日，时，分，秒
 * @param {Date | String} date 时间变量
 * @param {Object} rules 推移的规则
 * @return: date
 */
export function moveDate (date, rules = {}) {
    if (!isObject(rules)) return ''
    let d = date ? iosAdapter(date) : new Date()
    Object.keys(rules).forEach(k => {
        let num = Number(rules[k])
        if (isNaN(num)) return
        switch (k) {
            case 'y':
                d.setFullYear(d.getFullYear() + num)
                break
            case 'M':
                d.setMonth(d.getMonth() + num)
                break
            case 'd':
                d.setDate(d.getDate() + num)
                break
            case 'h':
                d.setHours(d.getHours() + num)
                break
            case 'm':
                d.setMinutes(d.getMinutes() + num)
                break
            case 's':
                d.setSeconds(d.getSeconds() + num)
                break
        }
    })
    return d
}

/**
 * @description: 适配IOS及Safari
 * @param {Date | String} date 时间变量
 * @return: date
 */
export function iosAdapter (date) {
    if (isString(date)) {
        date = date.replace(/-/g, '/')
    }
    return new Date(date)
}
