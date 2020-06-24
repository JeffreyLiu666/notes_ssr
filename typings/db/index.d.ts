/*
 * @Date: 2020-06-16 15:49:42
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-17 17:11:33
 * @LastEditors: junfeng.liu
 * @Description: des
 */
declare namespace db {
    type queryParams = {
        columns?: Array<string>,
        where?: string,
        whereArgs?: Array<any>,
        groupBy?: string,
        orderBy?: string,
        limit?: number,
        offset?: number
    }

    type insertParams = {
        args?: Array<any>
    }

    type updateParams = {
        where?: string,
        whereArgs?: Array<any>,
        args?: Array<any>
    }

    type deleteParams = {
        where?: string,
        whereArgs?: Array<any>
    }
}
