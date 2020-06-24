/*
 * @Date: 2020-06-18 15:55:59
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-22 16:11:47
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import { createApp } from './main'

export default ctx => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp()

        console.log('req url ', ctx.url)
        router.push(ctx.url)

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }

            Promise.all(matchedComponents.map(Component => {
                if (Component.asyncData) {
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                    })
                }
            })).then(() => {
                // 在所有预取钩子(preFetch hook) resolve 后，
                // 我们的 store 现在已经填充入渲染应用程序所需的状态。
                // 当我们将状态附加到上下文，
                // 并且 `template` 选项用于 renderer 时，
                // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
                ctx.state = store.state

                resolve(app)
            }).catch(reject)
        }, reject)
    })
}
