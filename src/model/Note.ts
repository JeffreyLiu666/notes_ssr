/*
 * @Date: 2020-06-23 15:39:31
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-24 10:43:01
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import BaseModel from './BaseModel'
import { formatDate } from '@/lib/date'
import { isEmpty } from '@/lib/check'

const tableName = 'notes'

export default class Note extends BaseModel {
    id: numberParam
    user_id: numberParam
    title: stringParam
    content: stringParam
    imgs: stringParam
    create_time: stringParam
    update_time: stringParam

    constructor (
        {
            id,
            user_id,
            title,
            content,
            imgs,
            create_time,
            update_time,
        }: {
            id?: numberParam,
            user_id?: numberParam,
            title?: stringParam,
            content?: stringParam,
            imgs?: stringParam,
            create_time?: stringParam | Date,
            update_time?: stringParam | Date,
        } = {}
    ) {
        super()
        this.id = id
        this.user_id = user_id
        this.title = title
        this.content = content
        this.imgs = imgs
        this.create_time = create_time ? formatDate(new Date(create_time), 'yyyy-MM-dd hh:mm:ss') : null
        this.update_time = update_time ? formatDate(new Date(update_time), 'yyyy-MM-dd hh:mm:ss') : null
    }

    getTableName (): string {
        return tableName
    }

    static getTableName (): string {
        return tableName
    }

    fromObject (obj: baseObject = {}): Note {
        return new Note(obj)
    }

    toObject (): baseObject {
        const obj = {
            // id: this.id || null,
            user_id: this.user_id || null,
            title: this.title || null,
            content: this.content || null,
            imgs: this.imgs || null,
            create_time: this.create_time,
            update_time: this.update_time
        }
        if (isEmpty(obj.create_time)) delete obj.create_time
        if (isEmpty(obj.update_time)) delete obj.update_time
        return obj
    }
}
