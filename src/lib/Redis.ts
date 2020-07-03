/*
 * @Date: 2020-07-01 18:02:34
 * @Author: junfeng.liu
 * @LastEditTime: 2020-07-02 11:44:08
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import Redis from 'ioredis'
import config from '@/config/redis'
import { isEmpty } from './check'

export default class RedisHelper {

    static client: Redis.Redis

    static getClient (): Redis.Redis {
        if (isEmpty(RedisHelper.client)) RedisHelper.client = new Redis(config)
        return RedisHelper.client
    }
}
