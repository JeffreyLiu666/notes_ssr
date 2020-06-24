/*
 * @Date: 2020-06-15 17:30:32
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-23 17:02:22
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import Router from 'koa-router'
import base from './base'
import user from './user'
import view from './view'
import note from './note'

const router = new Router()

router
    .use(base.routes())
    .use('/User', user.routes())
    .use('/Note', note.routes())
    .use('/Public', view.routes())

export default router
