const CHOICES_END = [
	{ id: '', label: 'None' },
	{ id: '\n', label: 'LF - \\n (Common UNIX/Mac)' },
	{ id: '\r\n', label: 'CRLF - \\r\\n (Common Windows)' },
	{ id: '\r', label: 'CR - \\r (Old MacOS)' },
	{ id: '\x00', label: 'NULL - \\x00 (Can happen)' },
	{ id: '\n\r', label: 'LFCR - \\n\\r (Just stupid)' },
]

const MOTOR_ID = [
	{ id: 1, label: 'Pan' },
	{ id: 2, label: 'Tilt' },
	{ id: 3, label: 'Slide' },
	{ id: 4, label: 'TurnTable' },
	{ id: 5, label: 'TN 1' },
	{ id: 6, label: 'TN 2' },
	{ id: 7, label: 'TN 3' },
	{ id: 8, label: 'Roll' },
	{ id: 9, label: 'Focus' },
]

const TN_MOTOR_ID = [
	{ id: 5, label: 'TN 1' },
	{ id: 6, label: 'TN 2' },
	{ id: 7, label: 'TN 3' },
]

const DIRECTION_ID = [
	{ id: 1, label: 'Positive' },
	{ id: -1, label: 'Negative' },
]

const MOTOR_SPEED = [
	{ id: -100000, label: 'Neg Fastest' },
	{ id: -50000, label: 'Neg Fast' },
	{ id: -25000, label: 'Neg Medium' },
	{ id: -5000, label: 'Neg Slow' },
	{ id: 0, label: 'Stopped' },
	{ id: 5000, label: 'Slow' },
	{ id: 25000, label: 'Medium' },
	{ id: 50000, label: 'Fast' },
	{ id: 100000, label: 'Fastest' },

]

const VIRTUAL_BUTTON = [
	{ id: 0, label: 'Enter' },
	{ id: 1, label: 'Up' },
	{ id: 2, label: 'Right' },
	{ id: 3, label: 'Down' },
	{ id: 4, label: 'Left' },
	{ id: 5, label: 'Back' },
	{ id: 6, label: 'Enter Held' },
	{ id: 7, label: 'Empty' },
	{ id: 8, label: 'Empty' },

]

module.exports = function (self) {
	self.setActionDefinitions({
		jogMotor: {
			name: 'Motor Jog',
			options: [
				{
					type: 'dropdown',
					id: 'id_mot',
					label: 'Motor ID',
					default: 2,
					choices: MOTOR_ID,
				},
				{
					type: 'dropdown',
					id: 'id_speed',
					label: 'Motor Speed',
					default: 0,
					choices: MOTOR_SPEED,
				}
			],
			callback: async (actionJog) => {
				const cmd = 'G300 M'
				const cmd2 = ' V'
				const cmd3 = '\n'

				if (cmd != '') {
					/*
					 * create a binary buffer pre-encoded 'latin1' (8bit no change bytes)
					 * sending a string assumes 'utf8' encoding
					 * which then escapes character values over 0x7F
					 * and destroys the 'binary' content
					 */
					const sendBuf = Buffer.from(cmd + actionJog.options.id_mot + cmd2 + actionJog.options.id_speed + cmd3, 'latin1')

					if (self.config.prot == 'tcp') {
						self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

						if (self.socket !== undefined && self.socket.isConnected) {
							self.socket.send(sendBuf)
						} else {
							self.log('debug', 'Socket not connected :(')
						}
					}

					if (self.config.prot == 'udp') {
						if (self.udp !== undefined) {
							self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

							self.udp.send(sendBuf)
						}
					}
				}
			},
		},
		jogMotorSmart: {
			name: 'Motor Jog Smart',
			options: [
				{
					type: 'dropdown',
					id: 'id_mot',
					label: 'Motor ID',
					default: 2,
					choices: MOTOR_ID,
				},
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Direction',
					default: 1,
					choices: DIRECTION_ID,
				},
			],
			callback: async (actionJogSmart) => {
				const cmd = 'G301 M'
				const cmd2 = ' V'
				const cmd3 = '\n'
				var motorSpeed = 0
				var temp = 0

				if (cmd != '') {

					if (actionJogSmart.options.id_mot == 1) {
						temp = self.getVariableValue('PanSpeed')
					} else if (actionJogSmart.options.id_mot == 2) {
						temp = self.getVariableValue('TiltSpeed')
					} else if (actionJogSmart.options.id_mot == 3) {
						temp = self.getVariableValue('M3Speed')
					} else if (actionJogSmart.options.id_mot == 4) {
						temp = self.getVariableValue('M4Speed')
					} else if (actionJogSmart.options.id_mot == 5) {
						temp = self.getVariableValue('TN1Speed')
					} else if (actionJogSmart.options.id_mot == 6) {
						temp = self.getVariableValue('TN2Speed')
					} else if (actionJogSmart.options.id_mot == 7) {
						temp = self.getVariableValue('TN3Speed')
					} else if (actionJogSmart.options.id_mot == 8) {
						temp = self.getVariableValue('RollSpeed')
					} else if (actionJogSmart.options.id_mot == 9) {
						temp = self.getVariableValue('FocusSpeed')
					}
					
					if (actionJogSmart.options.id_mot < 5) {
						motorSpeed = actionJogSmart.options.direction * temp / 100.0 * 500.0
					} else {
						motorSpeed = actionJogSmart.options.direction * temp / 100.0 * 25.0
					}
					
					self.log('debug', 'Temp: ' + temp + ' Motor Speed: ' + motorSpeed)

					/*
					 * create a binary buffer pre-encoded 'latin1' (8bit no change bytes)
					 * sending a string assumes 'utf8' encoding
					 * which then escapes character values over 0x7F
					 * and destroys the 'binary' content
					 */
					const sendBuf = Buffer.from(cmd + actionJogSmart.options.id_mot + cmd2 + motorSpeed + cmd3, 'latin1')

					if (self.config.prot == 'tcp') {
						self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

						if (self.socket !== undefined && self.socket.isConnected) {
							self.socket.send(sendBuf)
						} else {
							self.log('debug', 'Socket not connected :(')
						}
					}

					if (self.config.prot == 'udp') {
						if (self.udp !== undefined) {
							self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

							self.udp.send(sendBuf)
						}
					}
				}
			},
		},
		positionDrive: {
			name: 'Send Motor Position',
			options: [
				{
					type: 'dropdown',
					id: 'id_mot',
					label: 'Motor ID',
					default: 5,
					choices: TN_MOTOR_ID,
				},
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Direction',
					default: 1,
					choices: DIRECTION_ID,
				},
			],
			callback: async (setMotorPosition) => {
				const cmd = 'G302 M'
				const cmd2 = ' P'
				const cmd3 = '\n'
				var temp = 0
				var increment = 0

				if (cmd != '') {
					if (setMotorPosition.options.id_mot == 5) {
						temp = self.getVariableValue('FPos')
						increment = self.getVariableValue('FStep')
					} else if (setMotorPosition.options.id_mot == 6) {
						temp = self.getVariableValue('IPos')
						increment = self.getVariableValue('IStep')
					} else if (setMotorPosition.options.id_mot == 7) {
						temp = self.getVariableValue('ZPos')
						increment = self.getVariableValue('ZStep')
					}

					temp += (setMotorPosition.options.direction * increment);
					// self.log('debug', 'Motor ID' + setMotorPosition.options.id_mot + 'Position' + temp)

					if (temp > 10000) {
						temp = 10000;
					} else if (temp < 0) {
						temp = 0;
					}

					if (setMotorPosition.options.id_mot == 5) {
						self.setVariableValues({ FPos: temp })
					} else if (setMotorPosition.options.id_mot == 6) {
						self.setVariableValues({ IPos: temp })
					} else if (setMotorPosition.options.id_mot == 7) {
						self.setVariableValues({ ZPos: temp })
					}

					/*
					 * create a binary buffer pre-encoded 'latin1' (8bit no change bytes)
					 * sending a string assumes 'utf8' encoding
					 * which then escapes character values over 0x7F
					 * and destroys the 'binary' content
					 */
					const sendBuf = Buffer.from(cmd + setMotorPosition.options.id_mot + cmd2 + temp + cmd3, 'latin1')

					if (self.config.prot == 'tcp') {
						self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

						if (self.socket !== undefined && self.socket.isConnected) {
							self.socket.send(sendBuf)
						} else {
							self.log('debug', 'Socket not connected :(')
						}
					}

					if (self.config.prot == 'udp') {
						if (self.udp !== undefined) {
							self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

							self.udp.send(sendBuf)
						}
					}
				}
			},
		},
		toggleIncrement: {
			name: 'Toggle Motor Increment',
			options: [
				{
					type: 'dropdown',
					id: 'id_mot',
					label: 'Motor ID',
					default: 5,
					choices: TN_MOTOR_ID,
				},
			],
			callback: async (toggleIncrement) => {
				var temp = 0

				if (toggleIncrement.options.id_mot == 5) {
					temp = self.getVariableValue('FStep')
				} else if (toggleIncrement.options.id_mot == 6) {
					temp = self.getVariableValue('IStep')
				} else if (toggleIncrement.options.id_mot == 7) {
					temp = self.getVariableValue('ZStep')
				}

				if (temp == 200) {
					temp = 50;
				} else {
					temp = 200;
				}

				self.log('debug', 'Motor ID: ' + toggleIncrement.options.id_mot + ' Increment: ' + temp)

				if (toggleIncrement.options.id_mot == 5) {
					self.setVariableValues({ FStep: temp })
				} else if (toggleIncrement.options.id_mot == 6) {
					self.setVariableValues({ IStep: temp })
				} else if (toggleIncrement.options.id_mot == 7) {
					self.setVariableValues({ ZStep: temp })
				}

			}
		},
		setJogSpeed: {
			name: 'Set Motor Jog Speed',
			options: [
				{
					type: 'dropdown',
					id: 'id_mot',
					label: 'Motor ID',
					default: 1,
					choices: MOTOR_ID,
				},
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Direction',
					default: 1,
					choices: DIRECTION_ID,
				},
			],
			callback: async (jogSpeed) => {
				var temp = 0

				if (jogSpeed.options.id_mot == 1) {
					temp = self.getVariableValue('PanSpeed')
				} else if (jogSpeed.options.id_mot == 2) {
					temp = self.getVariableValue('TiltSpeed')
				} else if (jogSpeed.options.id_mot == 3) {
					temp = self.getVariableValue('M3Speed')
				} else if (jogSpeed.options.id_mot == 4) {
					temp = self.getVariableValue('M4Speed')
				} else if (jogSpeed.options.id_mot == 5) {
					temp = self.getVariableValue('TN1Speed')
				} else if (jogSpeed.options.id_mot == 6) {
					temp = self.getVariableValue('TN2Speed')
				} else if (jogSpeed.options.id_mot == 7) {
					temp = self.getVariableValue('TN3Speed')
				} else if (jogSpeed.options.id_mot == 8) {
					temp = self.getVariableValue('RollSpeed')
				}

				temp += jogSpeed.options.direction

				if (temp > 100) {
					temp = 100;
				} else if (temp < 0) {
					temp = 0;
				}

				self.log('debug', 'Motor ID: ' + jogSpeed.options.id_mot + ' Speed: ' + temp)

				if (jogSpeed.options.id_mot == 1) {
					self.setVariableValues({ PanSpeed: temp })
				} else if (jogSpeed.options.id_mot == 2) {
					self.setVariableValues({ TiltSpeed: temp })
				} else if (jogSpeed.options.id_mot == 3) {
					self.setVariableValues({ M3Speed: temp })
				} else if (jogSpeed.options.id_mot == 4) {
					self.setVariableValues({ M4Speed: temp })
				} else if (jogSpeed.options.id_mot == 5) {
					self.setVariableValues({ TN1Speed: temp })
				} else if (jogSpeed.options.id_mot == 6) {
					self.setVariableValues({ TN2Speed: temp })
				} else if (jogSpeed.options.id_mot == 7) {
					self.setVariableValues({ TN3Speed: temp })
				} else if (jogSpeed.options.id_mot == 8) {
					self.setVariableValues({ RollSpeed: temp })
				}

			}
		},
		resetJogSpeed: {
			name: 'Reset Motor Jog Speed',
			options: [
				{
					type: 'dropdown',
					id: 'id_mot',
					label: 'Motor ID',
					default: 1,
					choices: MOTOR_ID,
				},
			],
			callback: async (resetSpeed) => {

				if (resetSpeed.options.id_mot == 1) {
					self.setVariableValues({ PanSpeed: 100 })
				} else if (resetSpeed.options.id_mot == 2) {
					self.setVariableValues({ TiltSpeed: 100 })
				} else if (resetSpeed.options.id_mot == 3) {
					self.setVariableValues({ M3Speed: 100 })
				} else if (resetSpeed.options.id_mot == 4) {
					self.setVariableValues({ M4Speed: 100 })
				} else if (resetSpeed.options.id_mot == 5) {
					self.setVariableValues({ TN1Speed: 25 })
				} else if (resetSpeed.options.id_mot == 6) {
					self.setVariableValues({ TN2Speed: 25 })
				} else if (resetSpeed.options.id_mot == 7) {
					self.setVariableValues({ TN3Speed: 25 })
				} else if (resetSpeed.options.id_mot == 8) {
					self.setVariableValues({ RollSpeed: 100 })
				}

			}
		},
		stopMotors: {
			name: 'Stop All Motors',
			options: [

			],
			callback: async (haltMotors) => {
				// console.log('Hello world!', event.options.num)
				const cmd = 'G911'


				const sendBuf = Buffer.from(cmd + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			},
		},
		savePset: {
			name: 'Save Preset',
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Preset Number',
					default: 0,
					min: 0,
					max: 127,
				},
			],
			callback: async (setPreset) => {
				// console.log('Hello world!', event.options.num)
				const cmd = 'G21 P'


				const sendBuf = Buffer.from(cmd + setPreset.options.num + ' T' + self.presetRunTimes[setPreset.options.num] / 10 + ' A' + self.presetRampTimes[setPreset.options.num] / 10 + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			},
		},
		recallPset: {
			name: 'Recall Preset',
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Preset Number',
					default: 0,
					min: 0,
					max: 127,
				},
			],
			callback: async (recallPreset) => {
				// console.log('Hello world!', event.options.num)
				const cmd = 'G20 P'
				const sendBuf = Buffer.from(cmd + recallPreset.options.num + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			},
		},
		presetRunTimeU: {
			name: 'Preset Run Time Increment',
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Preset Number',
					default: 0,
					min: 0,
					max: 127,
				},
			],
			callback: async (presetRunTimeU) => {
				self.presetRunTimes[presetRunTimeU.options.num] += 1;

				const cmd = 'G21 N1 P'
				const sendBuf = Buffer.from(cmd + presetRunTimeU.options.num + ' T' + self.presetRunTimes[presetRunTimeU.options.num] / 10 + ' A' + self.presetRampTimes[presetRunTimeU.options.num] / 10 + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			},
		},
		presetRunTimeD: {
			name: 'Preset Run Time Decrement',
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Preset Number',
					default: 0,
					min: 0,
					max: 127,
				},
			],
			callback: async (presetRunTimeD) => {
				self.presetRunTimes[presetRunTimeD.options.num] -= 1;

				const cmd = 'G21 N1 P'
				const sendBuf = Buffer.from(cmd + presetRunTimeD.options.num + ' T' + self.presetRunTimes[presetRunTimeD.options.num] / 10 + ' A' + self.presetRampTimes[presetRunTimeD.options.num] / 10 + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			},
		},
		presetRampTimeU: {
			name: 'Preset Ramp Time Increment',
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Preset Number',
					default: 0,
					min: 0,
					max: 127,
				},
			],
			callback: async (presetRampTimeU) => {
				self.presetRampTimes[presetRampTimeU.options.num] += 1;

				const cmd = 'G21 N1 P'
				const sendBuf = Buffer.from(cmd + presetRampTimeU.options.num + ' T' + self.presetRunTimes[presetRampTimeU.options.num] / 10 + ' A' + self.presetRampTimes[presetRampTimeU.options.num] / 10 + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			},
		},
		presetRampTimeD: {
			name: 'Preset Ramp Time Decrement',
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Preset Number',
					default: 0,
					min: 0,
					max: 127,
				},
			],
			callback: async (presetRampTimeD) => {
				self.presetRampTimes[presetRampTimeD.options.num] -= 1;

				const cmd = 'G21 N1 P'
				const sendBuf = Buffer.from(cmd + presetRampTimeD.options.num + ' T' + self.presetRunTimes[presetRampTimeD.options.num] / 10 + ' A' + self.presetRampTimes[presetRampTimeD.options.num] / 10 + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			},
		},
		virtualInput: {
			name: 'Virtual Button Input',
			options: [
				{
					id: 'vbutton',
					type: 'dropdown',
					label: 'Button Input',
					default: 0,
					choices: VIRTUAL_BUTTON,
				},
			],
			callback: async (virtButtonPress) => {
				// console.log('Hello world!', event.options.num)
				const cmd = 'G600 C'
				const sendBuf = Buffer.from(cmd + virtButtonPress.options.vbutton + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			},
		},
		sample_action: {
			name: 'My First Action',
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Test',
					default: 5,
					min: 0,
					max: 100,
				},
			],
			callback: async (event) => {
				console.log('Hello world!', event.options.num)
			},
		},
		// buttonFeedback: {
		// 	name: 'Button Feedback (highlight/clear)',
		// 	options: [
		// 		{
		// 			type: 'dropdown',
		// 			label: 'highlight/clear',
		// 			id: 'bol',
		// 			choices: [
		// 				{ id: 1, label: 'Highlight' },
		// 				{ id: 0, label: 'Clear' },
		// 			],
		// 			default: '1',
		// 		},
		// 	],
		// 	callback: async (event) => {
		// 		self.state.heldThresholdReached = event.options.bol
		// 		self.checkFeedbacks()
		// 	},
		// },

		send: {
			name: 'Send Command',
			options: [
				{
					type: 'textinput',
					id: 'id_send',
					label: 'Command:',
					tooltip: 'Use %hh to insert Hex codes',
					default: '',
					useVariables: true,
				},
				{
					type: 'dropdown',
					id: 'id_end',
					label: 'Command End Character:',
					default: '\n',
					choices: CHOICES_END,
				},
			],
			callback: async (action) => {
				const cmd = unescape(await self.parseVariablesInString(action.options.id_send))

				if (cmd != '') {
					/*
					 * create a binary buffer pre-encoded 'latin1' (8bit no change bytes)
					 * sending a string assumes 'utf8' encoding
					 * which then escapes character values over 0x7F
					 * and destroys the 'binary' content
					 */
					const sendBuf = Buffer.from(cmd + action.options.id_end, 'latin1')

					if (self.config.prot == 'tcp') {
						self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

						if (self.socket !== undefined && self.socket.isConnected) {
							self.socket.send(sendBuf)
						} else {
							self.log('debug', 'Socket not connected :(')
						}
					}

					if (self.config.prot == 'udp') {
						if (self.udp !== undefined) {
							self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

							self.udp.send(sendBuf)
						}
					}
				}
			},
		},
	})
}
