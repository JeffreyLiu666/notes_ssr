const merge = require('webpack-merge')
const baseConf = require('./base.conf')
const path = require('path')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const webpack = require('webpack')

function resolve (p = '') {
    return path.resolve(__dirname, p)
}

module.exports = merge(baseConf, {
    entry: resolve('../src/entry-client.js'),
    plugins: [
        new VueSSRClientPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'
        })
    ]
})
