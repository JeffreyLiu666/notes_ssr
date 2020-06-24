/*
 * @Date: 2020-06-13 01:16:39
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-13 10:38:29
 * @LastEditors: junfeng.liu
 * @Description: des
 */
// TODO: 类型放到typings里编译不通过，不知道为什么
// declare type RuleKey = 'y' | 'M' | 'd' | 'h' | 'm' | 's'

// declare type Rule = {
//     y?: number,
//     M?: number,
//     d?: number,
//     h?: number,
//     m?: number,
//     s?: number
// }

/**
 * @description: 将时间处理成指定格式
 * @param {Date} date 时间变量
 * @param {String} format 时间格式
 * @return: String
 */
export function formatDate (date: Date, format = 'yyyy-MM-dd'): string {
    const d = date ? date : new Date()
    if (d instanceof Date && isNaN(d.getSeconds())) {
        return ''
    }
    let str = format
    str = str.replace(/yyyy/g, d.getFullYear().toString())
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
 * @return:  Date
 */
export function moveDate (date: Date, rules: date.Rule = {}): Date {
    // if (!isObject(rules)) return ''
    const d = date ? date : new Date()
    if (d instanceof Date && isNaN(d.getSeconds())) {
        return new Date()
    }
    Object.keys(rules).forEach((k: string) => {
        const num = Number(rules[k as  date.RuleKey])
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
