const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'
console.log(process.env.NODE_ENV)

function resolve (p) {
    return path.resolve(__dirname, p)
}

module.exports = {
    output: {
        path: resolve('../dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        alias: {
            '@': resolve('../src')
        }
    },
    module: {
        rules: [
            {
                test: /\.(c|le)ss$/,
                use: isProd
                    ? [
                        'vue-style-loader',
                        // MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [require('autoprefixer')]
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {}
                        }
                    ]
                    : ['vue-style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    },
                    extractCSS: isProd
                }
            },
            {
                test: /\/js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    // limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            }
        ]
    },
    performance: {
        hints: false
    },
    plugins: isProd ? [
        new VueLoaderPlugin()
        // new MiniCssExtractPlugin({
        //     filename: 'common.[chunkhash].css'
        // })
    ] : [
        new VueLoaderPlugin()
    ]
}
