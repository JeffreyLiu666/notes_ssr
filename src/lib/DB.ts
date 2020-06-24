/*
 * @Date: 2020-06-16 14:20:23
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-24 16:55:42
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import mysql, { Pool, PoolConfig, PoolConnection } from 'mysql'
import config from '@/config/mysql'
import { isEmpty, isObject, isArray, isNull } from '@/lib/check'
// import { getValueString } from '@/lib/util'
import BaseModel from '@/model/BaseModel'

export default class DbHelper {
    private _pool: Pool

    constructor () {
        this._pool = mysql.createPool(config as PoolConfig)
    }

    static dbHelper: DbHelper

    static getInstance (): DbHelper {
        if (isEmpty(DbHelper.dbHelper)) DbHelper.dbHelper = new DbHelper()
        return DbHelper.dbHelper
    }

    async getConnection (): Promise<PoolConnection> {
        return new Promise((resolve, reject) => {
            this._pool.getConnection((err, connection) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(connection)
            })
        })
    }

    async rawSql (sql: string, args?: Array<string>): Promise<unknown> {
        const connection = await this.getConnection()
        return new Promise((resolve, reject) => {
            connection.query(sql, args, (err, results) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(results)
            })
        })
    }

    async query<T extends BaseModel> (
        bean: T,
        {
            columns,
            where,
            whereArgs,
            groupBy,
            orderBy,
            limit,
            offset
        }: db.queryParams = {}
    ): Promise<Array<T>> {
        const connection = await this.getConnection()
        const cols = isEmpty(columns) ? '*' : (columns as Array<string>).toString()
        let sql = `select ${ cols } from ${ bean.getTableName() }`
        if (!isEmpty(where)) sql += ` where ${where}`
        if (!isEmpty(groupBy)) sql += ` group by ${groupBy}`
        if (!isEmpty(orderBy)) sql += ` order by ${orderBy}`
        if (!isEmpty(limit)) sql += ` limit ${limit}`
        if (!isEmpty(offset)) sql += ` offset ${offset}`
        console.log(sql)
        return new Promise((resolve, reject) => {
            connection.query(sql, whereArgs, (err, results) => {
                if (err) {
                    reject(err)
                    return
                }
                // if (isEmpty(results) || isEmptyObject(results)) return resolve([])
                if (isObject(results)) return resolve([bean.fromObject(results as baseObject) as T])
                if (isArray(results)) {
                    return resolve(results.map((item: baseObject) => (bean.fromObject(item) as T)))
                }
                return resolve([])
            })
        })
    }

    async insert<T extends BaseModel> (
        bean: T,
        {
            args
        }: db.insertParams = {}
    ): Promise<number> {
        const connection = await this.getConnection()
        const obj = bean.toObject()
        const len = Object.keys(obj).length
        if (len === 0) return 0
        const sql = `insert into ${
            bean.getTableName()
        } (${
            Object.keys(obj).toString()
        }) values(${
            '?'.padEnd(len * 2 - 1, ',?')
        })`
        console.log(sql)
        return baseCallback(connection, sql, args || Object.values(obj))
    }

    async update<T extends BaseModel> (
        bean: T,
        {
            where,
            whereArgs,
            args
        }: db.updateParams = {}
    ): Promise<number> {
        const connection = await this.getConnection()
        const obj = bean.toObject()
        if (Object.keys(obj).length === 0) return 0
        let sql = `update ${
            bean.getTableName()
        } set ${
            // Object.keys(obj).map(k => `${k}=${getValueString(obj[k])}`).toString()
            Object.keys(obj).map(k => (`${k}=?`)).toString()
        }`
        if (!isEmpty(where)) sql += ` where ${where}`
        console.log(sql)
        return baseCallback(connection, sql, (args || Object.values(obj)).concat(whereArgs || []))
    }

    async delete<T extends BaseModel> (
        bean: T,
        {
            where,
            whereArgs
        }: db.deleteParams = {}
    ): Promise<number> {
        const connection = await this.getConnection()
        let sql = `delete from ${ bean.getTableName() }`
        if (!isEmpty(where)) sql += ` where ${where}`
        return baseCallback(connection, sql, whereArgs)
    }
}

/**
 * @description: 基础返回
 * @param {mysql.PoolConnection}    connection
 * @param {string}                  sql
 * @return: promise
 */
function baseCallback (connection: mysql.PoolConnection, sql: string, args?: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
        connection.query(sql, args, (err, results) => {
            if (err) {
                reject(err)
                return
            }
            if (!isNull(results.affectedRows)) {
                resolve(results.affectedRows)
            } else {
                reject(results)
            }
        })
    })
}
