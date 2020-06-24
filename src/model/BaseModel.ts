/*
 * @Date: 2020-06-16 16:26:17
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-16 17:52:00
 * @LastEditors: junfeng.liu
 * @Description: des
 */
export default abstract class BaseModel {
    abstract getTableName (): string

    abstract fromObject (obj: baseObject): BaseModel

    abstract toObject (): baseObject
}
