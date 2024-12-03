import {config} from "./config/config"
import robot from "robotjs"

export class KeySender {

    private regexThrottle: RegExp = new RegExp("^(" + config.throttledCommands.join("|") + ")$", "i")
    private regexFilter: RegExp = new RegExp(
        "^(" + config.commands.join("|") + ")$",
        "i"
    )

    private lastTime: Record<string, number> = {}

    constructor() {
        for (const item of config.throttledCommands) {
            this.lastTime[item] = new Date().getTime()
        }
    }

    sendKey(command: string): void {
        if (command.match(this.regexFilter)) {
            let allowKey = true
            let key = config.defaultKeyMap[command] || command
            if (key.match(this.regexThrottle)) {
                let newTime = new Date().getTime()
                if (newTime - this.lastTime[key] < config.timeToWait) {
                    allowKey = false
                } else {
                    this.lastTime[key] = newTime
                }
            }
            if (allowKey) {
                robot.keyTap(key)
            }
        }
    }
}
