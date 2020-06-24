/*
 * @Date: 2020-06-16 15:03:57
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-17 10:40:21
 * @LastEditors: junfeng.liu
 * @Description: des
 */
export const objectToString = Object.prototype.toString

export const isEmpty = (val: unknown): boolean => isNull(val) || objectToString.call(val) === ''
export const isNull = (val: unknown): boolean => val === null || val === undefined
export const isEmptyObject = (val: unknown): boolean =>
    isObject(val) && !Object.keys(val).length

export const isArray = Array.isArray
// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (val: unknown): val is Function =>
    typeof val === 'function'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isNumber = (val: unknown): val is number => typeof val === 'number'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
export const isObject = (val: unknown): val is Record<string | number | symbol, unknown> =>
    Object.prototype.toString.call(val) === '[object Object]'
