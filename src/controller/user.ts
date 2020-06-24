/*
 * @Date: 2020-06-17 16:16:45
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-22 17:23:01
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import jwt from 'jsonwebtoken'
import { Context } from 'koa'
import { Result } from '@/lib/result'
import { doLogin, doGetUsers } from '@/service/user'
import config from '@/config/server'

export async function login (ctx: Context): Promise<void> {
    const { username, password } = ctx.request.body
    const user = await doLogin(username, password)
    const payload = { username: user.username, id: user.id }
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '2h' })
    ctx.body = Result.success({ token })
}

export async function register (ctx: Context): Promise<void> {
    ctx.body = Result.success('register')
}

export async function getUsers (ctx: Context): Promise<void> {
    ctx.body = await doGetUsers()
}
