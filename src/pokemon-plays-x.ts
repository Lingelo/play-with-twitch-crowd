import tmi, { ChatUserstate, Client } from 'tmi.js'
import { config } from './config/config'
import { KeySender } from './key-sender'
import logger from './utils/logger'

export class PokemonPlaysX {
	private readonly client: Client
	private readonly keyHandler: KeySender
	constructor() {
		this.client = new tmi.client({
			connection: {
				secure: true,
				reconnect: true,
			},
			channels: [config.channel],
		})
		this.keyHandler = new KeySender()
	}

	async run(): Promise<void> {
		this.client.on(
			'message',
			async (
				channel: string,
				tags: ChatUserstate,
				message: string,
				self: boolean
			): Promise<void> => {
				if (this.isCorrectChannel(channel)) {
					if (self) return
					if (this.isMessageMatching(message)) {
						logger.debug(`@${tags.username}: ${message}`)
						this.keyHandler.sendKey(message.toLowerCase())
					}
				}
			}
		)

		if (!config.channel) {
			throw new Error('No channel specified!')
		}

		await this.client.connect()
		this.client.addListener('connected', function (): void {
			logger.info('Connected! Waiting for messages...')
		})
		this.client.addListener('disconnected', function (reason: string): void {
			logger.error('Disconnected from the server! Reason: ' + reason)
		})
		logger.info(`Connecting to /${config.channel}..`)
	}

	private isCorrectChannel(channel: string): boolean {
		return `#${config.channel}` === channel
	}
	private isMessageMatching(message: string): RegExpMatchArray | null {
		const commandRegex = new RegExp(
			'^(' + config.commands.join('|') + ')$',
			'i'
		)
		return message.match(commandRegex)
	}
}
