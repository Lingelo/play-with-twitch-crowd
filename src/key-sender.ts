import { config } from './config/config'
import robot from 'robotjs'
import logger from './utils/logger'

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
	private useAdvancedMethod: boolean = true

	constructor() {
		for (const item of config.throttledCommands) {
			this.lastTime[item] = new Date().getTime()
		}
		
		// Option pour basculer entre les méthodes via variable d'environnement
		this.useAdvancedMethod = process.env.USE_ADVANCED_INPUT !== 'false'
		logger.info(`Méthode d'input: ${this.useAdvancedMethod ? 'Avancée (keyToggle)' : 'Simple (keyTap)'}`)
	}

	sendKey(command: string): void {
		const normalizedCommand = command.toLowerCase().trim()
		
		if (!this.isCommandAllowed(normalizedCommand)) {
			logger.debug(`Commande non autorisée: ${normalizedCommand}`)
			return
		}
		
		const key = this.getMappedKey(normalizedCommand)
		if (this.isThrottleExceeded(normalizedCommand)) {
			logger.debug(`Commande throttlée: ${normalizedCommand}`)
			return
		}
		
		logger.info(`Envoi de la touche: ${key} (commande: ${normalizedCommand})`)
		
		if (this.useAdvancedMethod) {
			this.sendKeyAdvanced(key)
		} else {
			this.sendKeySimple(key)
		}
	}

	private sendKeyAdvanced(key: string): void {
		try {
			// S'assurer que la fenêtre est bien focusée
			const mousePos = robot.getMousePos()
			robot.moveMouseSmooth(mousePos.x, mousePos.y)
			robot.mouseClick('left', false)
			
			// Attendre un peu pour que le focus soit établi
			setTimeout(() => {
				try {
					// keyToggle avec durée plus longue pour les émulateurs
					robot.setKeyboardDelay(50)
					robot.keyToggle(key, 'down')
					setTimeout(() => {
						robot.keyToggle(key, 'up')
					}, 150)
					
				} catch (toggleError) {
					logger.error(`Erreur keyToggle pour ${key}:`, toggleError)
					this.sendKeySimple(key)
				}
			}, 50)
			
		} catch (error) {
			logger.error(`Erreur méthode avancée pour ${key}:`, error)
			this.sendKeySimple(key)
		}
	}

	private sendKeySimple(key: string): void {
		try {
			robot.setKeyboardDelay(200)
			robot.keyTap(key)
			logger.info(`KeyTap simple réussi pour: ${key}`)
		} catch (error) {
			logger.error(`Échec keyTap simple pour ${key}:`, error)
		}
	}

	private isCommandAllowed(command: string): boolean {
		return this.regexFilter.test(command)
	}

	private getMappedKey(command: string): string {
		return config.keyMap[command] || command
	}

	private isThrottleExceeded(command: string): boolean {
		if (!this.regexThrottle.test(command)) {
			return false
		}
		const currentTime = new Date().getTime()
		if (currentTime - this.lastTime[command] < config.timeToWait) {
			return true
		}
		this.lastTime[command] = currentTime
		return false
	}
}
