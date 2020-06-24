/*
 * @Date: 2019-10-08 11:14:41
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-12 12:33:51
 * @LastEditors: junfeng.liu
 * @Description: 枚举
 */
import regObj from './regExp.js'

export const regExp = regObj

/**
 * @description: 身份证对应省代码
 * @param {type} 
 * @return: 
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
 * @description: 订单状态
 * @param {type} 
 * @return: 
 */
export const ORDERSTATUSMAP = [
    {label: '全部', value: ''},
    {label: '已预订', value: '1'},
    {label: '已入住', value: '2'},
    {label: '已完成', value: '3'},
    {label: '已取消', value: '0'}
]

/**
 * @description: 订单状态
 * @param {type} 
 * @return: 
 */
export const ORDERSTATUS = {
    0: '已取消',
    1: '已预订',
    2: '已入住',
    3: '已退房'
}

/**
 * @description: 订单状态2
 * @param {type} 
 * @return: 
 */
export const ORDERSTATUS2 = {
    0: '已取消',
    1: '已预订',
    2: '已入住',
    3: '已完成'
}

/**
 * @description: 订单状态颜色
 * @param {type} 
 * @return: 
 */
export const ORDERSTATUSCOLOR = {
    0: 'default',
    1: 'warning',
    2: 'primary',
    3: 'default'
}

/**
 * @description: 房间状态
 * @param {type} 
 * @return: 
 */
export const ROOMSTATUS = {
    0: '已取消',
    2: '已预订',
    3: '维修',
    4: '停用',
    5: '保留',
    21: '已入住',
    22: '已退房',
    30: '未上架'
}

/**
 * @description: 入住类型
 * @param {type} 
 * @return: 
 */
export const BOOKTYPEMAP = [
    {label: '正常入住', value: 1},
    {label: '自用房', value: 2},
    {label: '免费房', value: 3}
]

/**
 * @description: 入住类型
 * @param {type} 
 * @return: 
 */
export const BOOKTYPE = {
    1: '正常入住',
    2: '自用房',
    3: '免费房'
}

/**
 * @description: 接入类型
 * @param {type} 
 * @return: 
 */
export const ORIGINTYPE = {
    1: '民宿自营',
    2: '代理商',
    3: 'OTA'
}

/**
 * @description: 接入类型
 * @param {type} 
 * @return: 
 */
export const ORIGINTYPEMAP = [
    {label: '民宿自营', value: 1},
    {label: '代理商', value: 2},
    {label: 'OTA', value: 3}
]