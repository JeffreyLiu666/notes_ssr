/*
 * @Date: 2020-06-23 14:47:43
 * @Author: junfeng.liu
 * @LastEditTime: 2020-07-01 16:09:37
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import DbHelper from "@/lib/DB"
import Note from "@/model/Note"
import { isEmpty } from "@/lib/check"

/**
 * @description: 查询列表
 * @param {number} user_id
 * @param {number} offset
 * @param {number} limit
 * @return: Note[]
 */
export async function doGetList (
    {
        user_id,
        id,
        title,
        content,
        isResolve,
        offset,
        limit
    }: {
        user_id?: number,
        id?: number,
        title?: string,
        content?: string,
        isResolve?: number,
        offset?: number,
        limit?: number
    }
): Promise<{
    list: Note[],
    total: number
}> {
    let where = ''

    if (!isEmpty(user_id)) where += `user_id=${ user_id }`
    if (!isEmpty(id)) where += ` ${ isEmpty(where) ? '' : 'and ' }id=${ id }`
    if (!isEmpty(title)) where += ` ${ isEmpty(where) ? '' : 'and ' }title like '%${ title }%'`
    if (!isEmpty(content)) where += ` ${ isEmpty(where) ? '' : 'and ' }content like '%${ content }%'`
    if (!isEmpty(isResolve)) where += ` ${ isEmpty(where) ? '' : 'and ' }isResolve=${ isResolve }`

    const list = await queryList(where,{ limit, offset, orderBy: 'create_time desc' })
    const total = await queryListTotal(where)
    return { list, total }
}

/**
 * @description: 查询列表
 * @param {number} user_id
 * @param {number} offset
 * @param {number} limit
 * @return: Note[]
 */
export async function queryList (
    where: string,
    {
        whereArgs,
        offset,
        limit,
        orderBy
    }: {
        whereArgs?: any[],
        offset?: number,
        limit?: number,
        orderBy?: string
    }
): Promise<Note[]> {
    const db = DbHelper.getInstance()
    const result = await db.query(
        new Note(),
        {
            where,
            whereArgs,
            limit,
            offset,
            orderBy
        }
    )
    return result
}

/**
 * @description: 查询总条数
 * @param {number} user_id
 * @return: number
 */
export async function queryListTotal (where: string, whereArgs?: any[]): Promise<number> {
    const db = DbHelper.getInstance()
    let sql = `select count(*) from ${ Note.getTableName() }`
    if (!isEmpty(where)) {
        sql += ` where ${ where }`
    }
    const result = await db.rawSql(sql, whereArgs)
    return (result as any[])[0]['count(*)']
}

/**
 * @description: 更新
 * @param {Note} note
 * @return: number
 */
export async function doUpdateNote (note: Note): Promise<number> {
    const db = DbHelper.getInstance()
    const result = await db.update(note, { where: 'id=? and user_id=?', whereArgs: [note.id, note.user_id] })
    return result
}

/**
 * @description: 添加
 * @param {Note} note
 * @return: number
 */
export async function doAddNote (note: Note): Promise<number> {
    const db = DbHelper.getInstance()
    const result = await db.insert(note)
    return result
}

/**
 * @description: 删除
 * @param {Note} note
 * @return: number
 */
export async function doDeleteNote (note: Note): Promise<number> {
    const db = DbHelper.getInstance()
    const result = await db.delete(note, { where: 'id=? and user_id=?', whereArgs: [note.id, note.user_id] })
    return result
}

/**
 * @description: 修改已解决状态
 * @param {Note} note
 * @return: number
 */
export async function doChangeResolve (note: Note): Promise<number> {
    const db = DbHelper.getInstance()
    const result = await db.update(note, { where: 'id=? and user_id=?', whereArgs: [note.id, note.user_id] })
    return result
}
