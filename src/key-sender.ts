import { config } from './config/config'
import robot from 'robotjs'

export class KeySender {
	private regexThrottle: RegExp = new RegExp(
		'^(' + config.throttledCommands.join('|') + ')$',
		'i'
	)
	private regexFilter: RegExp = new RegExp(
		'^(' + config.commands.join('|') + ')$',
		'i'
	)

	private lastTime: Record<string, number> = {}

	constructor() {
		for (const item of config.throttledCommands) {
			this.lastTime[item] = new Date().getTime()
		}
	}

	sendKey(command: string): void {
		if (!this.isCommandAllowed(command)) {
			return
		}
		const key = this.getMappedKey(command)
		if (this.isThrottleExceeded(key)) {
			return
		}
		robot.setKeyboardDelay(100)
		robot.mouseClick('left')
		robot.keyTap(key)
	}

	private isCommandAllowed(command: string): boolean {
		return this.regexFilter.test(command)
	}

	private getMappedKey(command: string): string {
		return config.keyMap[command] || command
	}

	private isThrottleExceeded(key: string): boolean {
		if (!this.regexThrottle.test(key)) {
			return false
		}
		const currentTime = new Date().getTime()
		if (currentTime - this.lastTime[key] < config.timeToWait) {
			return true
		}
		this.lastTime[key] = currentTime
		return false
	}
}
