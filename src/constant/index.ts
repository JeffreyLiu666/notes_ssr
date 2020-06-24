/*
 * @Date: 2020-06-15 11:21:05
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-16 15:22:33
 * @LastEditors: junfeng.liu
 * @Description: des
 */
export enum ResultCode {
    SUCCESS = '00000',
    TOKEN_EXPIRE = '10001',
    LOGIN_FAIL = '10002',
    UNKNOWN_ERROR = '99999'
}

export const ResultMsg: Record<string,string> = {
    '00000': 'success',
    '10001': 'token过期',
    '10002': '账号或密码错误',
    '99999': '未知错误'
}
