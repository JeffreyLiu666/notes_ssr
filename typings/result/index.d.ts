/*
 * @Date: 2020-06-15 14:43:18
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-22 10:59:33
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import { ResultCode } from "@/constant"

declare namespace result {

    type Data = unknown | null

    type ResultFormat = {
        status: number,
        code: string,
        msg: string,
        data: Data
    }

    interface FailParams {
        code?: ResultCode,
        message?: string
    }
}
