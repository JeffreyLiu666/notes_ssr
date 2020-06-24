const merge = require('webpack-merge')
const baseConf = require('./base.conf')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const webpack = require('webpack')

function resolve (p) {
    return path.resolve(__dirname, p)
}

module.exports = merge(baseConf, {
    entry: resolve('../src/entry-server.js'),
    target: 'node',
    devtool: 'source-map',
    output: {
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
    },
    // 外置化应用程序依赖模块。可以使服务器构建速度更快，
    // 并生成较小的 bundle 文件。
    externals: nodeExternals({
        // 不要外置化 webpack 需要处理的依赖模块。
        // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
        // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
        whitelist: /\.css$/
    }),
    plugins: [
        new VueSSRServerPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        })
    ]
})
