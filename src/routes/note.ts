/*
 * @Date: 2020-06-23 15:02:02
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-23 15:03:09
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import Router from 'koa-router'
import { getList, updateNote, addNote, delNote, changeResolve } from '@/controller/note'

const router = new Router()

router
    .get('/getList', getList)
    .post('/editNote', updateNote)
    .post('/addNote', addNote)
    .post('/delNote', delNote)
    .post('/changeResolve', changeResolve)

export default router
