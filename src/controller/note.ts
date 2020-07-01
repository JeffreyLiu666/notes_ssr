/*
 * @Date: 2020-06-23 14:47:03
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-30 15:04:55
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import { Context } from 'koa'
import { Result, ResultError } from '@/lib/result'
import {
    doGetList,
    doUpdateNote,
    doAddNote,
    doDeleteNote,
    doChangeResolve
} from '@/service/note'
import { isEmpty } from '@/lib/check'
import { getUserIdByContext } from '@/lib/util'
import Note from '@/model/Note'

export async function getList (ctx: Context): Promise<void> {
    const { page, limit, id, title, content, isResolve } = ctx.query
    const user_id = getUserIdByContext(ctx)
    const result = await doGetList({
        user_id,
        id,
        title,
        content,
        isResolve,
        offset: page && limit ? (page - 1) * limit : undefined,
        limit
    })
    ctx.body = Result.queryList(result.list, result.total, page, limit)
}

export async function updateNote (ctx: Context): Promise<void> {
    const { id, title } = ctx.request.body
    if (isEmpty(id)) throw new ResultError({ message: '缺少id' })
    if (isEmpty(title)) throw new ResultError({ message: '标题不能为空' })
    const user_id = getUserIdByContext(ctx)
    const isSuccess = await doUpdateNote(new Note(Object.assign({ user_id, update_time: new Date() }, ctx.request.body), 'update'))
    if (isSuccess) ctx.body = Result.success({ id })
    else ctx.body = Result.fail({ message: '修改失败' })
}

export async function addNote (ctx: Context): Promise<void> {
    const { title } = ctx.request.body
    if (isEmpty(title)) throw new ResultError({ message: '标题不能为空' })
    const user_id = getUserIdByContext(ctx)
    const isSuccess = await doAddNote(new Note(Object.assign({ user_id, create_time: new Date(), update_time: new Date() }, ctx.request.body)))
    if (isSuccess) ctx.body = Result.success({})
    else ctx.body = Result.fail({ message: '添加失败' })
}

export async function delNote (ctx: Context): Promise<void> {
    const { id } = ctx.request.body
    if (isEmpty(id)) throw new ResultError({ message: '缺少id' })
    const user_id = getUserIdByContext(ctx)
    const isSuccess = await doDeleteNote(new Note({ id, user_id }))
    if (isSuccess) ctx.body = Result.success({ id })
    else ctx.body = Result.fail({ message: '删除失败' })
}

export async function changeResolve (ctx: Context): Promise<void> {
    const { id, isResolve } = ctx.request.body
    if (isEmpty(id)) throw new ResultError({ message: '缺少id' })
    const user_id = getUserIdByContext(ctx)
    const isSuccess = await doChangeResolve(new Note({ id, user_id, isResolve }, 'changeResolve'))
    if (isSuccess) ctx.body = Result.success({ id })
    else ctx.body = Result.fail({ message: '修改失败' })
}
