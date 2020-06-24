/*
 * @Date: 2020-06-16 16:33:49
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-23 16:27:28
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import BaseModel from './BaseModel'
import { formatDate } from '@/lib/date'

const tableName = 'users'

export default class User extends BaseModel {
    id: numberParam
    username: stringParam
    password: stringParam
    create_time: stringParam

    constructor (
        {
            id,
            username,
            password,
            create_time
        }: {
            id?: numberParam,
            username?: stringParam,
            password?: stringParam,
            create_time?: stringParam
        } = {}
    ) {
        super()
        this.id = id
        this.username = username
        this.password = password
        this.create_time = create_time ? formatDate(new Date(create_time), 'yyyy-MM-dd hh:mm:ss') : null
    }

    getTableName (): string {
        return tableName
    }

    static getTableName (): string {
        return tableName
    }

    fromObject (obj: baseObject = {}): User {
        return new User(obj)
    }

    toObject (): baseObject {
        return {
            // id: this.id || null,
            username: this.username,
            password: this.password,
            create_time: this.create_time || formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
        }
    }
}
