/*
 * @Date: 2020-06-18 11:45:41
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-24 17:43:50
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import fs from 'fs'
import path from 'path'
// import Vue from 'vue'
import { createBundleRenderer, BundleRenderer } from 'vue-server-renderer'
import { Context } from 'koa'

import serverBundle from '../dist/vue-ssr-server-bundle.json'
import clientManifest from '../dist/vue-ssr-client-manifest.json'
// import { ResultError } from '@/lib/result'

let renderer: BundleRenderer
const resolvePath = (p: string) => path.resolve(__dirname, p)
const isDev = process.env.NODE_ENV === 'development'

function createRenderer () {
    renderer = createBundleRenderer(serverBundle, {
        // cache: new LRU({
        //     max: 1000,
        //     maxAge: 1000 * 60 * 15
        // }),
        runInNewContext: false,
        template: fs.readFileSync(resolvePath('../index.template.html'), 'utf8'),
        clientManifest: clientManifest
    })
}
if (!isDev) createRenderer()

// const renderer = createRenderer({
//     template: fs.readFileSync(resolvePath('../index.template.html'), 'utf8')
// })

function renderToString (ctx: baseObject = {}): Promise<string> {
    return new Promise(function (resolve, reject) {
        (ctx.renderer as BundleRenderer || renderer).renderToString(ctx, (err, html) => {
            if (err) {
                console.log('eeeeee', err instanceof Error)
                // if (err instanceof Error) return reject(err)
                // const e = new Error()
                // e.status = err.status || 500
                // e.message = err.message || ''
                return reject(err)
            }
            resolve(html)
        })
    })
}

export async function test (ctx: Context): Promise<string> {
    // const app = new Vue({
    //     data: {
    //         url: ctx.req.url
    //     },
    //     template: `<div>访问的 URL 是： {{ url }}</div>`
    // })
    console.log(ctx._renderer)
    return await renderToString({ url: '/home', title: 'test', meta: '', renderer: ctx._renderer })
}

export async function common (ctx: Context): Promise<string> {
    return await renderToString({ url: ctx.url, title: '我的笔记本', meta: '', renderer: ctx._renderer })
}

export async function login (ctx: Context): Promise<string> {
    return await renderToString({ url: ctx.url, title: '登录', meta: '', renderer: ctx._renderer })
}
