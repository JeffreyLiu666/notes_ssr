/*
 * @Date: 2020-06-28 10:40:44
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-28 18:53:40
 * @LastEditors: junfeng.liu
 * @Description: des
 */

import { Context } from "koa"
import multer from "koa-multer"
import config from '@/config/server'
import { Result } from "@/lib/result"

export async function upload (ctx: Context): Promise<void> {
    const req = ctx.req as multer.MulterIncomingMessage
    console.log(req.file, req.files)
    if (req.file === null) {
        ctx.body = Result.fail({ message: '没有文件或文件格式不正确，目前只可上传图片' })
        return
    }
    const fileName = req.file.filename
    const filePath = config.uploadImgDir + '/' + fileName
    ctx.body = Result.success({ fileName, path: filePath })
}
