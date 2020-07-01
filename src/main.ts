/*
 * @Date: 2020-06-15 14:47:13
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-30 17:01:09
 * @LastEditors: junfeng.liu
 * @Description: des
 */
require('tsconfig-paths/register')
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('@babel/register')({
    extensions: [".es6", ".es", ".jsx", ".js", ".mjs", ".ts"]
})

import startServer from './server'
import { Result, ResultError } from './lib/result'

global.$Result = Result
global.$ResultError = ResultError

startServer()
