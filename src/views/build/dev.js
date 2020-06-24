/*
 * @Date: 2020-06-20 12:21:45
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-22 17:15:34
 * @LastEditors: junfeng.liu
 * @Description: 类型匹配吐了，还是用js写
 */
import path from 'path'
import fs from 'fs'
import webpack from 'webpack'
import KoaWebpackDevMiddleware from 'koa-webpack-dev-middleware'
import KoaWebpackHotMiddleware from 'koa-webpack-hot-middleware'
import MFS from 'memory-fs'
import { createBundleRenderer } from 'vue-server-renderer'
import clientConf from './client.conf.js'
import serverConf from './server.conf.js'

export default function initDev (app) {

    let renderer, bundle, clientManifest
    const resolve = (p) => path.resolve(__dirname, p)
    const readFile = (fs, file) => {
        try {
            return fs.readFileSync(path.join(clientConf.output.path || '', file), 'utf8')
        } catch (e) {}
    }
    const templatePath = resolve('../index.template.html')

    clientConf.entry = ['webpack-hot-middleware/client?noInfo=true', clientConf.entry]
    clientConf.output.filename = '[name].js'
    clientConf.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
    clientConf.mode = 'development'
    const clientCompiler = webpack(clientConf)
    const devMiddleware = KoaWebpackDevMiddleware(clientCompiler, {
        publicPath: clientConf.output.publicPath,
        noInfo: true
    })
    // 添加dev中间件监听文件变化
    app.use(devMiddleware)
    clientCompiler.plugin('done', (stats) => {
        console.log('client change')
        stats = stats.toJson()
        if (stats.errors.length) console.log(stats.errors)
        if (stats.warnings.length) console.log(stats.warnings)
        if (stats.errors.length) return
        clientManifest = JSON.parse(readFile(
            devMiddleware.fileSystem,
            'vue-ssr-client-manifest.json'
        ))
        update()
    })

    // 热重载中间件
    // app.use(WebpackHotMiddleware(clientCompiler, { log: false, heartbeat: 5000 }) as any)
    const hotMiddleware = KoaWebpackHotMiddleware(clientCompiler, { log: false, heartbeat: 5000 })
    app.use(hotMiddleware)

    // watch服务端renderer
    serverConf.mode = 'development'
    const serverCompiler = webpack(serverConf)
    const mfs = new MFS()
    serverCompiler.outputFileSystem = mfs
    serverCompiler.watch({}, (err, stats) => {
        console.log('server change')
        if (err) throw err
        const statsJson = stats.toJson()
        if (statsJson.errors.length) return
        bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
        update()
    })

    app.use(async (ctx, next) => {
        ctx._renderer = renderer
        return next()
    })

    function update () {
        renderer = createRenderer(bundle, { clientManifest })
    }

    function createRenderer (bundle, options) {
        return createBundleRenderer(bundle, Object.assign(options, {
            // cache: new LRU({
            //     max: 1000,
            //     maxAge: 1000 * 60 * 15
            // }),
            runInNewContext: false,
            template: fs.readFileSync(templatePath, 'utf8')
        }))
    }
}
