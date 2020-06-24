/*
 * @Date: 2020-06-18 11:23:22
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-24 10:57:08
 * @LastEditors: junfeng.liu
 * @Description: des
 */

import { Context } from "koa"
import * as views from '@/views/pages'

export async function common (ctx: Context): Promise<void> {
    ctx.body = await views.common(ctx)
}

export async function login (ctx: Context): Promise<void> {
    ctx.body = await views.login(ctx)
}
