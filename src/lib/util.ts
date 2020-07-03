/*
 * @Date: 2020-06-17 10:18:32
 * @Author: junfeng.liu
 * @LastEditTime: 2020-07-02 14:45:39
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import { isNull, isString } from './check'

/**
 * @description: 主要用于数据库object转values的内容
 * @param {baseObject} obj
 * @return: 转完后的字符串
 */
export function getObjectValuesWithNull (obj: baseObject): string {
    let result = ''
    const list = Object.values(obj)
    list.forEach(item => {
        result += getValueString(item) + ','
    })
    return result.substr(0, result.length - 1)
}

/**
 * @description: 获取value的字符串形式
 * @param {unknown} val
 * @return: 字符串
 */
export function getValueString (val: unknown): string {
    if (isNull(val)) return 'null'
    if (isString(val)) return `'${val}'`
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (val as any).toString()
}
