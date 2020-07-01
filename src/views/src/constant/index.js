/*
 * @Date: 2019-10-08 11:14:41
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-29 17:56:03
 * @LastEditors: junfeng.liu
 * @Description: 枚举
 */
import regObj from './regExp.js'

export const regExp = regObj

/**
 * @description: 身份证对应省代码
 */
export const IDPROVINCECODE = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
}

/**
 * @description: 是否
 */
export const IS_NOT = [
    { label: '是', value: 1 },
    { label: '否', value: 0 }
]
