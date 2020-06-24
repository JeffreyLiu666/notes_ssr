/*
 * @Date: 2020-06-16 09:49:07
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-16 11:02:11
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import Router from 'koa-router'
import { Context } from 'koa'

const router = new Router()

router
    .get('', (ctx: Context) => {
        ctx.body = 'hello world'
    })
    .get('/hello', (ctx: Context) => {
        ctx.body = 'haha'
    })

export default router
