/*
 * @Date: 2020-06-16 14:15:47
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-16 18:09:04
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import { PoolConfig } from 'mysql'

const config: PoolConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'notes_srr',
    connectTimeout: 60000
}

export default config
