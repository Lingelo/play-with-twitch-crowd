type KeyMap = {
	[key: string]: string
}

export interface Config {
	commands: string[]
	channel: string
	programName: string
	filteredCommands: string[]
	throttledCommands: string[]
	timeToWait: number
	keyMap: KeyMap
	logLevel: string
	logFile?: boolean
}

const defaultKeyMap = {
	up: 'up',
	left: 'left',
	down: 'down',
	right: 'right',
	a: 'a',
	b: 'b',
	x: 'x',
	y: 'y',
	start: 's',
	select: 'e',
}

export const config: Config = {
	commands: Object.keys(defaultKeyMap),
	keyMap: defaultKeyMap,
	channel: process.env.TWITCH_CHANNEL || '',
	programName: process.env.CONFIG_PROGRAM_NAME || '',
	filteredCommands: [],
	throttledCommands: [],
	logLevel: process.env.LOG_LEVEL || 'info',
	timeToWait: 10000,
	logFile: process.env.LOG_FILE === 'true' || false,
}
