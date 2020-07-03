/*
 * @Date: 2020-07-02 15:37:33
 * @Author: junfeng.liu
 * @LastEditTime: 2020-07-03 10:54:00
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import jwt, { TokenExpiredError } from 'jsonwebtoken'
import md5 from 'js-md5'
import BaseModel from "./BaseModel"
import { formatDate } from "@/lib/date"
import { Context } from 'koa'
import { isEmpty } from '@/lib/check'
import { ResultError } from '@/lib/result'
import { ResultCode } from '@/constant'
import config from '@/config/server'
import RedisHelper from '@/lib/Redis'
import DbHelper from '@/lib/DB'
import { isNull } from 'util'

export default class Token extends BaseModel {
    id: numberParam
    user_id: numberParam
    token: stringParam
    jwt_token: stringParam
    create_time: stringParam
    update_time: stringParam
    static tableName = 'tokens'

    constructor (
        {
            id,
            user_id,
            token,
            jwt_token,
            create_time,
            update_time
        }: {
            id?: number,
            user_id?: number,
            token?: string,
            jwt_token?: string,
            create_time?: string | Date
            update_time?: string | Date
        } = {}
    ) {
        super()
        this.id = id
        this.user_id = user_id
        this.token = token
        this.jwt_token = jwt_token
        this.create_time = create_time ? formatDate(new Date(create_time), 'yyyy-MM-dd hh:mm:ss') : null
        this.update_time = update_time ? formatDate(new Date(update_time), 'yyyy-MM-dd hh:mm:ss') : null
    }

    getTableName (): string {
        return Token.tableName
    }

    fromObject (obj: baseObject = {}): Token {
        return new Token(obj)
    }

    toObject (): baseObject {
        const obj = {
            user_id: this.user_id || null,
            token: this.token || null,
            jwt_token: this.jwt_token || null,
            create_time: this.create_time,
            update_time: this.update_time
        }

        if (isEmpty(obj.create_time)) delete obj.create_time
        if (isEmpty(obj.update_time)) delete obj.update_time

        return obj
    }

    /**
     * @description: 校验jwtToken
     * @param {Context} ctx
     * @return: user_id
     */
    static async checkJwtToken (ctx: Context): Promise<void> {
        const jwtToken = await Token.getJwtTokenByContext(ctx)
        return new Promise((resolve, reject) => {
            jwt.verify(jwtToken, config.jwtSecret, (err, decode) => {
                if (
                    err instanceof TokenExpiredError
                    || isEmpty(decode)
                    || isEmpty((decode as TokenPayload).user_id)
                ) {
                    throw new ResultError({ code: ResultCode.TOKEN_EXPIRE })
                }
                if (!err) {
                    ctx.state.user = decode
                    ctx.state.jwtToken = jwtToken
                    resolve()
                }
                else reject(err)
            })
        })
    }

    /**
     * @description: 从token中获取user_id，如果user_id为空则直接抛错
     * @param {Context} ctx
     * @return: user_id
     */
    static async getUserId (ctx: Context): Promise<number> {
        const jwtToken = await Token.getJwtTokenByContext(ctx)
        const userInfo = jwt.verify(jwtToken, config.jwtSecret) as TokenPayload
        const user_id = userInfo?.user_id
        if (isEmpty(user_id)) throw new ResultError({ code: ResultCode.TOKEN_EXPIRE })
        return user_id
    }

    /**
     * @description: 生成token并进行相关处理
     * @param {TokenPayload} payload
     * @return: token
     */
    static async getToken (payload: TokenPayload): Promise<string> {
        const db = DbHelper.getInstance()
        const redis = RedisHelper.getClient()
        const { user_id } = payload
        const jwt_token = jwt.sign(payload, config.jwtSecret, { expiresIn: '2h' })
        const token = md5(jwt_token)
        const baseParam = { user_id: user_id, token, jwt_token, update_time: new Date() }
        const tokens = await db.query(new Token(), { where: 'user_id=?', whereArgs: [user_id] })
        let isSuccess
        if (tokens.length === 0) {
            isSuccess = await db.insert(new Token(Object.assign({ create_time: new Date() }, baseParam)))
        }
        else {
            isSuccess = await db.update(new Token(baseParam), { where: 'user_id=?', whereArgs: [user_id] })
            redis.del(tokens[0].token as string)
        }
        if (!isSuccess) throw new ResultError({ message: '未能成功修改token信息' })
        redis.set(token, jwt_token)
        return token
    }

    /**
     * @description: 获取JwtToken
     * @param {string} token
     * @return: jwtToken
     */
    static async getJwtToken (token: string): Promise<string | null> {
        if (isEmpty(token)) return null
        const redis = RedisHelper.getClient()
        let jwtToken = await redis.get(token)
        if (!isNull(jwtToken)) return jwtToken
        const db = DbHelper.getInstance()
        const tokens = await db.query(new Token(), { where: 'token=?', whereArgs: [token] })
        if (tokens.length === 0) return null
        jwtToken = tokens[0].jwt_token as string
        if (!isEmpty(jwtToken)) redis.set(token, jwtToken)
        return jwtToken
    }

    /**
     * @description: 通过ctx获取jwtToken
     * @param {Context} ctx
     * @return: user_id
     */
    static async getJwtTokenByContext (ctx: Context): Promise<string> {
        const token = ctx.req.headers.authorization?.replace('Bearer ', '') || ''
        if (isEmpty(token)) throw new ResultError({ code: ResultCode.TOKEN_EXPIRE })
        const jwtToken = await Token.getJwtToken(token)
        if (isEmpty(jwtToken)) throw new ResultError({ code: ResultCode.TOKEN_EXPIRE })
        return jwtToken
    }
}

interface TokenPayload {
    user_id: number,
    username?: stringParam
}
