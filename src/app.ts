/*
 * @Date: 2020-06-12 14:51:00
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-23 16:51:03
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import Koa from 'koa'
import KoaBodyParser from 'koa-bodyparser'
import KoaStatic from 'koa-static'
// import KoaJwt from 'koa-jwt'
import path from 'path'
import Log, { Level } from './lib/log'
import router from '@/routes'
// import config from './config/server'
import { Result, CustomError, ResultError } from './lib/result'
import { ResultCode } from './constant'
import initDev from './views/build/dev.js'
import { isEmpty } from './lib/check'

const isDev = process.env.NODE_ENV === 'development'

console.log(isDev)
const whiteUrls = [
    '/Public/Login'
]

export default async function createApp (): Promise<Koa> {
    const app = new Koa()

    if (isDev) {
        initDev(app)
    }

    app.on('error', (err) => {
        if (err instanceof CustomError || err instanceof ResultError) return
        logError(err)
    })

    // 静态资源
    // app.use(KoaStatic(path.join(__dirname, '../public')))
    app.use(KoaStatic(path.join(__dirname, 'views/dist')))

    // 处理错误
    app.use(async (ctx, next) => {
        const url = ctx.url
        if (
            url === '/'
            || url === '/Public'
            || (
                !whiteUrls.includes(url)
                && url.includes('/Public')
                && isEmpty(ctx.cookies.get('token'))
            )
        ) {
            ctx.redirect('/Public/Login')
        }
        return next().catch((err) => {
            if (err.status === 401) {
                ctx.body = Result.fail({ code: ResultCode.TOKEN_EXPIRE })
                return
            }
            // 如果是ResultError则直接返回其message
            if (err instanceof ResultError) {
                logError(err.message)
                ctx.set('Content-Type', 'application/json')
                ctx.body = err.message
                return
            }
            logError(err)
            if (err.code === 404) throw new CustomError({ status: 404, message: '您访问的路径不正确' })
            else throw new CustomError({ message: err.message })
        })
    })

    // jwt校验
    // app.use(KoaJwt({ secret: config.jwtSecret }).unless({
    //     path: [/\/Login$/, /\/Public/]
    // }))

    // 解析post请求
    app.use(KoaBodyParser())

    // 路由
    app.use(router.routes()).use(router.allowedMethods())

    return app
}

function logError (err: unknown) {
    Log.log(Log.formatWithBg(Level.ERROR, 'APP ERROR'), 'app listen error：', err)
}
