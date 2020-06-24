/*
 * @Date: 2020-06-23 14:47:43
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-23 17:09:17
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
export async function queryList (user_id?: number, offset?: number, limit?: number): Promise<Note[]> {
    const db = DbHelper.getInstance()
    const result = await db.query(
        new Note(),
        {
            where: 'user_id=?',
            whereArgs: [user_id?.toString() || ''],
            limit: limit,
            offset: offset
        }
    )
    return result
}

/**
 * @description: 查询总条数
 * @param {number} user_id
 * @return: number
 */
export async function queryListTotal (user_id?: number): Promise<number> {
    const db = DbHelper.getInstance()
    let sql = `select count(*) from ${ Note.getTableName() }`
    if (!isEmpty(user_id)) {
        sql += ` where user_id=${ user_id }`
    }
    const result = await db.rawSql(sql)
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
