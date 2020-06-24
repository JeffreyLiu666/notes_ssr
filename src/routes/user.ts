/*
 * @Date: 2020-06-16 11:38:05
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-22 17:25:38
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import Router from 'koa-router'
import { login, register, getUsers } from '@/controller/user'

const router = new Router()

router
    .post('/Login', login)
    .all('/Register', register)
    .all('/getUsers', getUsers)

export default router
