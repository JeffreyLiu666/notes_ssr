/*
 * @Date: 2020-06-12 11:49:37
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-30 17:13:54
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import http from 'http'
import { exec } from 'child_process'
import chalk from 'chalk'
import address from 'address'
import portfinder from 'portfinder'
import serverConfig from './config/server'
import Log, { Level } from './lib/log'
import createApp from './app'
import { formatDate } from './lib/date'

export default async function startServer (): Promise<void> {
    portfinder.basePort = serverConfig.defaultPort
    const port = await portfinder.getPortPromise()

    const app = await createApp()

    const server = http.createServer(app.callback())

    server.on('error', (err: Error) => {
        Log.log(Log.formatWithBg(Level.ERROR, 'SERVER ERROR'), chalk.gray(formatDate(new Date())))
        console.log('server has error: ', err)
    })

    server.on('listening', () => {
        const localUrl = 'http://localhost:' + port
        const args = process.argv
        if (args.includes('--open')) {
            exec('start chrome ' + localUrl)
        }
        Log.clearConsole()
        console.log('  server listening: \n')
        console.log('     - Local:   ', chalk.cyan(localUrl))
        console.log('     - Network: ', chalk.cyan(`http://${ address.ip() }:${ port }`))
        console.log()
    })

    server.listen(port)
}
