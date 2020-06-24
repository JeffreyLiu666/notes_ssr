/*
 * @Date: 2020-06-17 10:18:32
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-24 15:56:48
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import jwt from 'jsonwebtoken'
import { isNull, isString, isEmpty } from './check'
import { ResultError } from './result'
import { ResultCode } from '@/constant'
import { Context } from 'koa'

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

/**
 * @description: 从token中获取user_id，如果user_id为空则直接抛错
 * @param {Context} ctx
 * @return: user_id
 */
export function getUserIdByContext (ctx: Context): number {
    const token = ctx.req.headers.authorization?.replace('Bearer ', '') || ''
    const userInfo = jwt.decode(token)
    const user_id = (userInfo as baseObject)?.id
    if (isEmpty(user_id)) {
        throw new ResultError({ code: ResultCode.LOGIN_FAIL })
    }
    return user_id as number
}
