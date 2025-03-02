import { createPersistentState } from "$lib/state"
import { get, type Writable } from "svelte/store"

export enum LogLevel {
    Info = "INFO",
    Developer = "DEV",
    Debug = "DEBUG",
    Warning = "WARN",
    Error = "ERROR",
}

export type LogItem = {
    timestamp: number
    level: LogLevel
    message: string
    file?: string
    line?: number
    other?: any[]
}

export type LoggerSettings = {
    relay_to_js_console: boolean
    level: LogLevel
}

export class Logger {
    log: LogItem[]
    settings: Writable<LoggerSettings>

    constructor(settings: LoggerSettings) {
        this.settings = createPersistentState("uplink.settings.developer", settings)
        this.log = []
    }

    private getLogLocation(depth: number = 4): { file: string; line: number } | null {
        const error = new Error()
        const stack = error.stack?.split("\n")

        if (stack && stack.length > depth) {
            const line = stack[depth].trim()
            const match = line.match(/(?:\()?(.*):(\d+):\d+\)?$/)
            if (match) {
                return { file: match[1], line: parseInt(match[2]) }
            }
        }
        return null
    }

    write(level: LogLevel, message: string, ...other: any[]) {
        let settings = get(this.settings)
        if (Object.values(LogLevel).indexOf(level) < Object.values(LogLevel).indexOf(settings.level)) return

        const location = this.getLogLocation(4)
        this.log.push({
            timestamp: Date.now(),
            level,
            message,
            file: location?.file,
            line: location?.line,
            other,
        })

        if (settings.relay_to_js_console) {
            const locationInfo = location ? ` (${location.file}:${location.line})` : ""
            switch (level) {
                case LogLevel.Error: {
                    console.error(`[${level.toString()}] (${new Date().toLocaleTimeString()}): ${message}${locationInfo}`, ...other)
                    break
                }
                case LogLevel.Warning: {
                    console.warn(`[${level.toString()}] (${new Date().toLocaleTimeString()}): ${message}${locationInfo}`, ...other)
                    break
                }
                case LogLevel.Info: {
                    console.info(`\x1b[32mℹ️ [${level.toString()}] (${new Date().toLocaleTimeString()}): ${message}\x1b[0m`, ...other)
                    break
                }
                default: {
                    console.log(`\x1b[36m🔍 [${level.toString()}] (${new Date().toLocaleTimeString()}): ${message}\x1b[0m`, ...other)
                    break
                }
            }
        }
    }

    info(message: string, ...other: any) {
        this.write(LogLevel.Info, message, ...other)
    }

    dev(message: string, ...other: any) {
        this.write(LogLevel.Developer, message, ...other)
    }

    debug(message: string, ...other: any[]) {
        this.write(LogLevel.Debug, message, ...other)
    }

    warn(message: string, ...other: any[]) {
        this.write(LogLevel.Warning, message, ...other)
    }

    error(message: string, ...other: any[]) {
        this.write(LogLevel.Error, message, ...other)
    }
}

export let log = new Logger({ relay_to_js_console: true, level: LogLevel.Info })
