/*
 * @Date: 2020-06-15 10:29:53
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-23 18:02:16
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import { ResultMsg, ResultCode } from '@/constant'
import { result } from 'typings/result'

export class Result {
    // 成功回调
    static success (content: result.Data): result.ResultFormat {
        const code = ResultCode.SUCCESS
        return {
            status: 1,
            code: code,
            msg: ResultMsg[code],
            data: content
        }
    }

    // 失败回调
    static fail (
        {
            code = ResultCode.UNKNOWN_ERROR,
            message
        }: result.FailParams = {}
    ): result.ResultFormat {
        return {
            status: 0,
            code: code,
            msg: message ?? ResultMsg[code],
            data: null
        }
    }

    // 数组查询回调
    static queryList (
        list: any[],
        total: number,
        currentPage?: number,
        limit?: number
    ): result.ResultFormat {
        return Result.success({
            list,
            total: Number(total || 0),
            currentPage: currentPage ? Number(currentPage) : currentPage,
            limit: limit ? Number(limit) : limit
        })
    }
}

export class ResultError extends Error  {
    status: number
    code: string
    expose: boolean

    constructor (
        {
            code = ResultCode.UNKNOWN_ERROR,
            message
        }: result.FailParams = {}
    ) {
        super('fail')
        this.status = 200
        this.code = code
        // 返回的body，需配合expose为true
        this.message = JSON.stringify(Result.fail({ code: code, message: message }))
        this.name = 'ResultError'
        // 设为true将可以返回数据
        this.expose = true
    }
}

export class CustomError extends Error  {
    status: number
    expose: boolean

    constructor (
        {
            status = 500,
            message = 'server error'
        }: {
            status?: number,
            message?: string
        }
    ) {
        super('fail')
        this.status = status
        // 返回的body，需配合expose为true
        this.message = message
        this.name = 'CustomError'
        // 设为true将可以返回数据
        this.expose = true
    }
}
