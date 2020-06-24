/*
 * @Date: 2020-06-18 10:59:18
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-22 18:20:07
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import Router from 'koa-router'
import * as view from '@/controller/view'

const router = new Router()

router
    .get('/', view.common)
    .get('/Login', view.login)
    .get('/Home', view.common)

export default router
