/*
 * @Date: 2019-09-07 13:16:54
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-23 14:46:10
 * @LastEditors: junfeng.liu
 * @Description: 请求工具
 */

import iview from 'view-design'
import axios from 'axios'
import { createStore } from '@/store'
import { isEmpty, isString, isObject, isNull } from './check'
import { getCookieParams } from './util'
const store = createStore()

const baseUrl = ''

function loading () {
    iview.Spin.show()
}

function clearLoading () {
    iview.Spin.hide()
}

function message (msg = '', level = 'error') {
    iview.Message[level](msg)
}

function statusCheck (res) {
    let { data, status, code, msg } = res
    if (status === 1) {
        return Promise.resolve(data)
    } else if (code === '10001') {
        iview.Modal.warning({
            title: '登录过期',
            content: '您的登录信息已过期，请重新登录',
            onOk: () => {
                store.dispatch('logout')
            }
        })
    } else {
        message(msg)
    }
    return Promise.reject(res)
}

export const reqStatusCheck = statusCheck

class Request {

    constructor () {
        this.baseUrl = baseUrl
        this.queue = {}
        this.defMethod = 'get'
    }

    getDefParams () {
        let defParams = {}
        return defParams
    }

    getDefOptions (method = 'get') { // 默认请求配置
        const contentType = 'application/json'
        let config = {
            baseURL: this.baseUrl,
            method: method,
            timeout: 60000,
            headers: {
                'Content-type': contentType,
                authorization: 'Bearer ' + getCookieParams().token
            }
        }
        return config
    }

    destroy (url) { // 将已完成的请求从请求队列中删除
        delete this.queue[url]
        // 由于在一个请求结束后马上接一个请求会导致Spin不能显示，所以加个timeout暂时处理
        setTimeout(() => {
            if (!Object.keys(this.queue).length) {
                clearLoading()
            }
        }, 0)
    }

    clearNull (options) {
        if (!isObject(options)) return options
        for (let key in options) {
            if (!isNull(options[key])) { continue }
            delete options[key]
        }
        return options
    }

    getParams (params) {
        // 添加默认参数
        params = Object.assign(this.getDefParams(), params)
        // 清除空值的参数
        params = this.clearNull(params)

        return params
    }

    interceptors (instance, options) { // 拦截器
        const url = options.url
        instance.interceptors.request.use(
            (config) => {
                if (!this.queue[url] && !options.noLoading) {
                    if (!Object.keys(this.queue).length) { loading() }
                    this.queue[url] = true
                }
                return config
            },
            (error) => {
                this.destroy(url)
                message('请求发起失败，请重试')
                return Promise.reject(error)
            }
        )
        instance.interceptors.response.use(
            (res) => {
                this.destroy(url)
                return statusCheck(res.data)
            },
            (error) => {
                this.destroy(url)
                if (error.message.indexOf('timeout') !== -1) {
                    message('请求超时，请重试')
                } else {
                    message('请求错误，请重试')
                }
                return Promise.reject(error)
            }
        )
    }

    request (options = {}, params = {}) {
        options = Object.assign({}, options)
        let url = options.url
        if (isEmpty(url) || !isString(url)) {
            return message('请正确配置URL')
        }
        // 添加默认配置
        options = Object.assign(this.getDefOptions(options.method), options)
        // 获取处理后的params
        params = this.getParams(params, options)
        // 根据不同的请求方式设置数据参数
        if (options.method === 'get') {
            options.params = params
        } else {
            options.data = params
        }
        const instance = axios.create()
        // 设置拦截器
        this.interceptors(instance, options)

        return instance(options)
    }
}

const req = new Request()

export default req
