/*
 * @Date: 2020-06-13 09:55:16
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-15 14:42:56
 * @LastEditors: junfeng.liu
 * @Description: des
 */ 
declare namespace date {
    type RuleKey = 'y' | 'M' | 'd' | 'h' | 'm' | 's'

    type Rule = {
        y?: number,
        M?: number,
        d?: number,
        h?: number,
        m?: number,
        s?: number
    }
}
