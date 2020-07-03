/*
 * @Date: 2020-06-17 16:16:45
 * @Author: junfeng.liu
 * @LastEditTime: 2020-07-03 10:39:50
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import { Context } from 'koa'
import { Result, ResultError } from '@/lib/result'
import { doLogin, doGetUsers } from '@/service/user'
import Token from '@/model/Token'
import { isEmpty } from '@/lib/check'

export async function login (ctx: Context): Promise<void> {
    const { username, password } = ctx.request.body
    const user = await doLogin(username, password)
    if (isEmpty(user.id)) throw new ResultError({ message: '账户异常' })
    const payload = { username: user.username, user_id: (user.id) }
    const token = await Token.getToken(payload)
    ctx.body = Result.success({ token })
}

export async function register (ctx: Context): Promise<void> {
    ctx.body = Result.success('register')
}

export async function getUsers (ctx: Context): Promise<void> {
    ctx.body = await doGetUsers()
}
