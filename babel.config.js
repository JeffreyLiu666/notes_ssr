/*
 * @Date: 2020-06-17 14:39:09
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-29 15:49:39
 * @LastEditors: junfeng.liu
 * @Description: des
 */
module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-typescript', '@vue/babel-preset-jsx'],
    plugins: [
        ['@babel/plugin-transform-runtime', {
            corejs: 3
        }],
        '@babel/plugin-syntax-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator'
    ]
}
