/*
 * @Date: 2020-06-12 14:30:57
 * @Author: junfeng.liu
 * @LastEditTime: 2020-06-22 18:19:19
 * @LastEditors: junfeng.liu
 * @Description: des
 */
import chalk from 'chalk'
import readline from 'readline'

export enum Level {
    ERROR,
    SUCCESS,
    INFO,
    NOTE,
    WARNING
}

export default class Log {
    static log (...args: any[]): void {
        console.log(...args)
        console.log()
    }

    static logWithBg (level: Level, msg: string): void {
        Log.log(Log.formatWithBg(level, msg))
    }

    static logText (level: Level, msg: string): void {
        Log.log(Log.formatText(level, msg))
    }

    static formatWithBg (level: Level, msg: string): string {
        return Log.bgColor(level).black('', msg, '')
    }

    static formatText (level: Level, msg: string): string {
        return Log.textColor(level)(msg)
    }

    static bgColor (level: Level): chalk.Chalk {
        switch (level) {
            case Level.SUCCESS: return chalk.bgGreen
            case Level.INFO: return chalk.bgBlue
            case Level.NOTE: return chalk.bgWhite
            case Level.WARNING: return chalk.bgYellow
            case Level.ERROR: return chalk.bgRed
            default: return chalk.bgRed
        }
    }

    static textColor (level: Level): chalk.Chalk {
        switch (level) {
            case Level.SUCCESS: return chalk.green
            case Level.INFO: return chalk.blue
            case Level.NOTE: return chalk.white
            case Level.WARNING: return chalk.yellow
            case Level.ERROR: return chalk.red
            default: return chalk.red
        }
    }

    static firstCodeUpperCase (str = ''): string {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    static clearConsole (): void {
        const blank = '\n'.repeat(process.stdout.rows)
        console.log(blank)
        readline.cursorTo(process.stdout, 0, 0)
        readline.clearScreenDown(process.stdout)
    }
}
