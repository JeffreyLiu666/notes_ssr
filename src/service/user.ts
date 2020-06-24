/*
 * @Date: 2020-06-18 16:52:19
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-22 17:01:02
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import { isEmpty } from "@/lib/check"
import { ResultError } from "@/lib/result"
import { ResultCode } from "@/constant"
import DbHelper from "@/lib/DB"
import User from "@/model/User"

export async function doLogin (username: string, password: string): Promise<User> {
    if (isEmpty(username) || isEmpty(password)) {
        throw new ResultError({ code: ResultCode.LOGIN_FAIL })
    }
    const db = DbHelper.getInstance()
    const result = await db.query(new User(), { where: `username=? and password=?`, whereArgs: [username, password] })
    if (result.length === 0) {
        throw new ResultError({ code: ResultCode.LOGIN_FAIL })
    }
    return result[0]
}

export async function doGetUsers (): Promise<unknown> {
    const db = DbHelper.getInstance()
    const list = await db.query(new User())
    return list
}
