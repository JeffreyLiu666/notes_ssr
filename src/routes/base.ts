/*
 * @Date: 2020-06-16 09:49:07
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-28 18:40:22
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import Router from 'koa-router'
import { Context } from 'koa'
import KoaMulter from 'koa-multer'
import path from 'path'
import * as base from '@/controller/base'
import config from '@/config/server'

const rootPath = path.resolve('.')

// 存放路径及文件名称
const storage = KoaMulter.diskStorage({
    destination (req, file, cb) {
        const imgPath = path.join(rootPath, '/public', config.uploadImgDir)
        cb(null, imgPath)
    },
    filename (req, file, cb) {
        const ext = path.extname(file.originalname) || '.jpg'
        cb(null, Date.now() + ext)
    }
})

// 相关限制
const limits = {
    fileSize: 2 * 1024 * 1024,
    files: 1
}

const uploader = KoaMulter({
    storage,
    limits,
    // 对相关文件过滤
    fileFilter: (req, file, cb) => {
        const isImage = file.mimetype?.includes('image')
        cb(null, isImage)
    }
})

// function handleUploadError (ctx: Context, next: Next) {
//     return next().catch((err) => {

//     })
// }

const router = new Router()

router
    .get('', (ctx: Context) => {
        ctx.body = 'hello world'
    })
    .get('/hello', (ctx: Context) => {
        ctx.body = 'haha'
    })
    .post('/upload', uploader.single('file'), base.upload)

export default router
