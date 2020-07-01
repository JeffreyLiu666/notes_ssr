/*
 * @Date: 2020-06-15 15:37:00
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-28 12:36:45
 * @LastEditors: junfeng.liu
 * @Description: des
 */

import { Result, ResultError } from "@/lib/result"
import { BaseRequest } from "koa"

declare global {
    type baseObject = { [key: string]: unknown }
    type stringParam = string | null | undefined
    type numberParam = number | null | undefined
    type booleanParam = boolean | null | undefined

    namespace NodeJS {
        interface Global {
            $Result: typeof Result
            $ResultError: typeof ResultError
        }
    }

    interface Error {
        status: number
    }
}

export {}
