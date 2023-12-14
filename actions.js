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

const PRESET_ID = [
	{ id: 0, label: 'Pst0' },
	{ id: 1, label: 'Pst1' },
	{ id: 2, label: 'Pst2' },
	{ id: 3, label: 'Pst3' },
	{ id: 4, label: 'Pst4' },
	{ id: 5, label: 'Pst5' },
	{ id: 6, label: 'Pst6' },
	{ id: 7, label: 'Pst7' },
	{ id: 8, label: 'Pst8' },
	{ id: 9, label: 'Pst9' },
	{ id: 10, label: 'Pst10' },
	{ id: 11, label: 'Pst11' },
	{ id: 12, label: 'Pst12' },
	{ id: 13, label: 'Pst13' },
	{ id: 14, label: 'Pst14' },
	{ id: 15, label: 'Pst15' },
	{ id: 16, label: 'Pst16' },
	{ id: 17, label: 'Pst17' },
	{ id: 18, label: 'Pst18' },
	{ id: 19, label: 'Pst19' },
	{ id: 20, label: 'Pst20' },
	{ id: 21, label: 'Pst21' },
	{ id: 22, label: 'Pst22' },
	{ id: 23, label: 'Pst23' },
	{ id: 24, label: 'Pst24' },
	{ id: 25, label: 'Pst25' },
	{ id: 26, label: 'Pst26' },
	{ id: 27, label: 'Pst27' },
	{ id: 28, label: 'Pst28' },
	{ id: 29, label: 'Pst29' },
]

const LOOP_ID = [
	{ id: 0, label: 'Lp0' },
	{ id: 1, label: 'Lp1' },
	{ id: 2, label: 'Lp2' },
	{ id: 3, label: 'Lp3' },
	{ id: 4, label: 'Lp4' },
	{ id: 5, label: 'Lp5' },
	{ id: 6, label: 'Lp6' },
	{ id: 7, label: 'Lp7' },
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
		setPresetRunTime: {
			name: 'Set Preset Run Time',
			options: [
				{
					type: 'dropdown',
					id: 'id_pst',
					label: 'Preset ID',
					default: 1,
					choices: PRESET_ID,
				},
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Direction',
					default: 1,
					choices: DIRECTION_ID,
				},
			],
			callback: async (runTime) => {
				var temp = 0

				if (runTime.options.id_pst == 0) {
					temp = self.getVariableValue('Pst0RunT')
				} else if (runTime.options.id_pst == 1) {
					temp = self.getVariableValue('Pst1RunT')
				} else if (runTime.options.id_pst == 2) {
					temp = self.getVariableValue('Pst2RunT')
				} else if (runTime.options.id_pst == 3) {
					temp = self.getVariableValue('Pst3RunT')
				} else if (runTime.options.id_pst == 4) {
					temp = self.getVariableValue('Pst4RunT')
				} else if (runTime.options.id_pst == 5) {
					temp = self.getVariableValue('Pst5RunT')
				} else if (runTime.options.id_pst == 6) {
					temp = self.getVariableValue('Pst6RunT')
				} else if (runTime.options.id_pst == 7) {
					temp = self.getVariableValue('Pst7RunT')
				} else if (runTime.options.id_pst == 8) {
					temp = self.getVariableValue('Pst8RunT')
				} else if (runTime.options.id_pst == 9) {
					temp = self.getVariableValue('Pst9RunT')
				} else if (runTime.options.id_pst == 10) {
					temp = self.getVariableValue('Pst10RunT')
				} else if (runTime.options.id_pst == 11) {
					temp = self.getVariableValue('Pst11RunT')
				} else if (runTime.options.id_pst == 12) {
					temp = self.getVariableValue('Pst12RunT')
				} else if (runTime.options.id_pst == 13) {
					temp = self.getVariableValue('Pst13RunT')
				} else if (runTime.options.id_pst == 14) {
					temp = self.getVariableValue('Pst14RunT')
				} else if (runTime.options.id_pst == 15) {
					temp = self.getVariableValue('Pst15RunT')
				} else if (runTime.options.id_pst == 16) {
					temp = self.getVariableValue('Pst16RunT')
				} else if (runTime.options.id_pst == 17) {
					temp = self.getVariableValue('Pst17RunT')
				} else if (runTime.options.id_pst == 18) {
					temp = self.getVariableValue('Pst18RunT')
				} else if (runTime.options.id_pst == 19) {
					temp = self.getVariableValue('Pst19RunT')
				} else if (runTime.options.id_pst == 20) {
					temp = self.getVariableValue('Pst20RunT')
				} else if (runTime.options.id_pst == 21) {
					temp = self.getVariableValue('Pst21RunT')
				} else if (runTime.options.id_pst == 22) {
					temp = self.getVariableValue('Pst22RunT')
				} else if (runTime.options.id_pst == 23) {
					temp = self.getVariableValue('Pst23RunT')
				} else if (runTime.options.id_pst == 24) {
					temp = self.getVariableValue('Pst24RunT')
				} else if (runTime.options.id_pst == 25) {
					temp = self.getVariableValue('Pst25RunT')
				} else if (runTime.options.id_pst == 26) {
					temp = self.getVariableValue('Pst26RunT')
				} else if (runTime.options.id_pst == 27) {
					temp = self.getVariableValue('Pst27RunT')
				} else if (runTime.options.id_pst == 28) {
					temp = self.getVariableValue('Pst28RunT')
				} else if (runTime.options.id_pst == 29) {
					temp = self.getVariableValue('Pst29RunT')
				}

				temp += runTime.options.direction

				if (temp > 600) {
					temp = 600;
				} else if (temp < 10) {
					temp = 10;
				}

				self.log('debug', 'Preset ID: ' + runTime.options.id_pst + ' RunT: ' + temp)

				if (runTime.options.id_pst == 0) {
					self.setVariableValues({ Pst0RunT: temp })
				} else if (runTime.options.id_pst == 1) {
					self.setVariableValues({ Pst1RunT: temp })
				} else if (runTime.options.id_pst == 2) {
					self.setVariableValues({ Pst2RunT: temp })
				} else if (runTime.options.id_pst == 3) {
					self.setVariableValues({ Pst3RunT: temp })
				} else if (runTime.options.id_pst == 4) {
					self.setVariableValues({ Pst4RunT: temp })
				} else if (runTime.options.id_pst == 5) {
					self.setVariableValues({ Pst5RunT: temp })
				} else if (runTime.options.id_pst == 6) {
					self.setVariableValues({ Pst6RunT: temp })
				} else if (runTime.options.id_pst == 7) {
					self.setVariableValues({ Pst7RunT: temp })
				} else if (runTime.options.id_pst == 8) {
					self.setVariableValues({ Pst8RunT: temp })
				} else if (runTime.options.id_pst == 9) {
					self.setVariableValues({ Pst9RunT: temp })
				} else if (runTime.options.id_pst == 10) {
					self.setVariableValues({ Pst10RunT: temp })
				} else if (runTime.options.id_pst == 11) {
					self.setVariableValues({ Pst11RunT: temp })
				} else if (runTime.options.id_pst == 12) {
					self.setVariableValues({ Pst12RunT: temp })
				} else if (runTime.options.id_pst == 13) {
					self.setVariableValues({ Pst13RunT: temp })
				} else if (runTime.options.id_pst == 14) {
					self.setVariableValues({ Pst14RunT: temp })
				} else if (runTime.options.id_pst == 15) {
					self.setVariableValues({ Pst15RunT: temp })
				} else if (runTime.options.id_pst == 16) {
					self.setVariableValues({ Pst16RunT: temp })
				} else if (runTime.options.id_pst == 17) {
					self.setVariableValues({ Pst17RunT: temp })
				} else if (runTime.options.id_pst == 18) {
					self.setVariableValues({ Pst18RunT: temp })
				} else if (runTime.options.id_pst == 19) {
					self.setVariableValues({ Pst19RunT: temp })
				} else if (runTime.options.id_pst == 20) {
					self.setVariableValues({ Pst20RunT: temp })
				} else if (runTime.options.id_pst == 21) {
					self.setVariableValues({ Pst21RunT: temp })
				} else if (runTime.options.id_pst == 22) {
					self.setVariableValues({ Pst22RunT: temp })
				} else if (runTime.options.id_pst == 23) {
					self.setVariableValues({ Pst23RunT: temp })
				} else if (runTime.options.id_pst == 24) {
					self.setVariableValues({ Pst24RunT: temp })
				} else if (runTime.options.id_pst == 25) {
					self.setVariableValues({ Pst25RunT: temp })
				} else if (runTime.options.id_pst == 26) {
					self.setVariableValues({ Pst26RunT: temp })
				} else if (runTime.options.id_pst == 27) {
					self.setVariableValues({ Pst27RunT: temp })
				} else if (runTime.options.id_pst == 28) {
					self.setVariableValues({ Pst28RunT: temp })
				} else if (runTime.options.id_pst == 29) {
					self.setVariableValues({ Pst29RunT: temp })
				}
			}
		},
		setPresetRampTime: {
			name: 'Set Preset Ramp Time',
			options: [
				{
					type: 'dropdown',
					id: 'id_pst',
					label: 'Preset ID',
					default: 1,
					choices: PRESET_ID,
				},
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Direction',
					default: 1,
					choices: DIRECTION_ID,
				},
			],
			callback: async (rampTime) => {
				var temp = 0

				if (rampTime.options.id_pst == 0) {
					temp = self.getVariableValue('Pst0RampT')
				} else if (rampTime.options.id_pst == 1) {
					temp = self.getVariableValue('Pst1RampT')
				} else if (rampTime.options.id_pst == 2) {
					temp = self.getVariableValue('Pst2RampT')
				} else if (rampTime.options.id_pst == 3) {
					temp = self.getVariableValue('Pst3RampT')
				} else if (rampTime.options.id_pst == 4) {
					temp = self.getVariableValue('Pst4RampT')
				} else if (rampTime.options.id_pst == 5) {
					temp = self.getVariableValue('Pst5RampT')
				} else if (rampTime.options.id_pst == 6) {
					temp = self.getVariableValue('Pst6RampT')
				} else if (rampTime.options.id_pst == 7) {
					temp = self.getVariableValue('Pst7RampT')
				} else if (rampTime.options.id_pst == 8) {
					temp = self.getVariableValue('Pst8RampT')
				} else if (rampTime.options.id_pst == 9) {
					temp = self.getVariableValue('Pst9RampT')
				} else if (rampTime.options.id_pst == 10) {
					temp = self.getVariableValue('Pst10RampT')
				} else if (rampTime.options.id_pst == 11) {
					temp = self.getVariableValue('Pst11RampT')
				} else if (rampTime.options.id_pst == 12) {
					temp = self.getVariableValue('Pst12RampT')
				} else if (rampTime.options.id_pst == 13) {
					temp = self.getVariableValue('Pst13RampT')
				} else if (rampTime.options.id_pst == 14) {
					temp = self.getVariableValue('Pst14RampT')
				} else if (rampTime.options.id_pst == 15) {
					temp = self.getVariableValue('Pst15RampT')
				} else if (rampTime.options.id_pst == 16) {
					temp = self.getVariableValue('Pst16RampT')
				} else if (rampTime.options.id_pst == 17) {
					temp = self.getVariableValue('Pst17RampT')
				} else if (rampTime.options.id_pst == 18) {
					temp = self.getVariableValue('Pst18RampT')
				} else if (rampTime.options.id_pst == 19) {
					temp = self.getVariableValue('Pst19RampT')
				} else if (rampTime.options.id_pst == 20) {
					temp = self.getVariableValue('Pst20RampT')
				} else if (rampTime.options.id_pst == 21) {
					temp = self.getVariableValue('Pst21RampT')
				} else if (rampTime.options.id_pst == 22) {
					temp = self.getVariableValue('Pst22RampT')
				} else if (rampTime.options.id_pst == 23) {
					temp = self.getVariableValue('Pst23RampT')
				} else if (rampTime.options.id_pst == 24) {
					temp = self.getVariableValue('Pst24RampT')
				} else if (rampTime.options.id_pst == 25) {
					temp = self.getVariableValue('Pst25RampT')
				} else if (rampTime.options.id_pst == 26) {
					temp = self.getVariableValue('Pst26RampT')
				} else if (rampTime.options.id_pst == 27) {
					temp = self.getVariableValue('Pst27RampT')
				} else if (rampTime.options.id_pst == 28) {
					temp = self.getVariableValue('Pst28RampT')
				} else if (rampTime.options.id_pst == 29) {
					temp = self.getVariableValue('Pst29RampT')
				}

				temp += rampTime.options.direction

				if (temp > 250) {
					temp = 250;
				} else if (temp < 1) {
					temp = 1;
				}

				self.log('debug', 'Preset ID: ' + rampTime.options.id_pst + ' RampT: ' + temp)

				if (rampTime.options.id_pst == 0) {
					self.setVariableValues({ Pst0RampT: temp })
				} else if (rampTime.options.id_pst == 1) {
					self.setVariableValues({ Pst1RampT: temp })
				} else if (rampTime.options.id_pst == 2) {
					self.setVariableValues({ Pst2RampT: temp })
				} else if (rampTime.options.id_pst == 3) {
					self.setVariableValues({ Pst3RampT: temp })
				} else if (rampTime.options.id_pst == 4) {
					self.setVariableValues({ Pst4RampT: temp })
				} else if (rampTime.options.id_pst == 5) {
					self.setVariableValues({ Pst5RampT: temp })
				} else if (rampTime.options.id_pst == 6) {
					self.setVariableValues({ Pst6RampT: temp })
				} else if (rampTime.options.id_pst == 7) {
					self.setVariableValues({ Pst7RampT: temp })
				} else if (rampTime.options.id_pst == 8) {
					self.setVariableValues({ Pst8RampT: temp })
				} else if (rampTime.options.id_pst == 9) {
					self.setVariableValues({ Pst9RampT: temp })
				} else if (rampTime.options.id_pst == 10) {
					self.setVariableValues({ Pst10RampT: temp })
				} else if (rampTime.options.id_pst == 11) {
					self.setVariableValues({ Pst11RampT: temp })
				} else if (rampTime.options.id_pst == 12) {
					self.setVariableValues({ Pst12RampT: temp })
				} else if (rampTime.options.id_pst == 13) {
					self.setVariableValues({ Pst13RampT: temp })
				} else if (rampTime.options.id_pst == 14) {
					self.setVariableValues({ Pst14RampT: temp })
				} else if (rampTime.options.id_pst == 15) {
					self.setVariableValues({ Pst15RampT: temp })
				} else if (rampTime.options.id_pst == 16) {
					self.setVariableValues({ Pst16RampT: temp })
				} else if (rampTime.options.id_pst == 17) {
					self.setVariableValues({ Pst17RampT: temp })
				} else if (rampTime.options.id_pst == 18) {
					self.setVariableValues({ Pst18RampT: temp })
				} else if (rampTime.options.id_pst == 19) {
					self.setVariableValues({ Pst19RampT: temp })
				} else if (rampTime.options.id_pst == 20) {
					self.setVariableValues({ Pst20RampT: temp })
				} else if (rampTime.options.id_pst == 21) {
					self.setVariableValues({ Pst21RampT: temp })
				} else if (rampTime.options.id_pst == 22) {
					self.setVariableValues({ Pst22RampT: temp })
				} else if (rampTime.options.id_pst == 23) {
					self.setVariableValues({ Pst23RampT: temp })
				} else if (rampTime.options.id_pst == 24) {
					self.setVariableValues({ Pst24RampT: temp })
				} else if (rampTime.options.id_pst == 25) {
					self.setVariableValues({ Pst25RampT: temp })
				} else if (rampTime.options.id_pst == 26) {
					self.setVariableValues({ Pst26RampT: temp })
				} else if (rampTime.options.id_pst == 27) {
					self.setVariableValues({ Pst27RampT: temp })
				} else if (rampTime.options.id_pst == 28) {
					self.setVariableValues({ Pst28RampT: temp })
				} else if (rampTime.options.id_pst == 29) {
					self.setVariableValues({ Pst29RampT: temp })
				}
			}
		},
		resetPresetRunTime: {
			name: 'Reset Preset Run Time',
			options: [
				{
					type: 'dropdown',
					id: 'id_pst',
					label: 'Preset ID',
					default: 1,
					choices: PRESET_ID,
				},
			],
			callback: async (resetPresetRunTime) => {
				var temp = 50;

				if (resetPresetRunTime.options.id_pst == 0) {
					self.setVariableValues({ Pst0RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 1) {
					self.setVariableValues({ Pst1RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 2) {
					self.setVariableValues({ Pst2RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 3) {
					self.setVariableValues({ Pst3RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 4) {
					self.setVariableValues({ Pst4RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 5) {
					self.setVariableValues({ Pst5RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 6) {
					self.setVariableValues({ Pst6RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 7) {
					self.setVariableValues({ Pst7RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 8) {
					self.setVariableValues({ Pst8RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 9) {
					self.setVariableValues({ Pst9RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 10) {
					self.setVariableValues({ Pst10RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 11) {
					self.setVariableValues({ Pst11RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 12) {
					self.setVariableValues({ Pst12RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 13) {
					self.setVariableValues({ Pst13RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 14) {
					self.setVariableValues({ Pst14RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 15) {
					self.setVariableValues({ Pst15RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 16) {
					self.setVariableValues({ Pst16RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 17) {
					self.setVariableValues({ Pst17RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 18) {
					self.setVariableValues({ Pst18RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 19) {
					self.setVariableValues({ Pst19RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 20) {
					self.setVariableValues({ Pst20RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 21) {
					self.setVariableValues({ Pst21RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 22) {
					self.setVariableValues({ Pst22RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 23) {
					self.setVariableValues({ Pst23RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 24) {
					self.setVariableValues({ Pst24RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 25) {
					self.setVariableValues({ Pst25RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 26) {
					self.setVariableValues({ Pst26RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 27) {
					self.setVariableValues({ Pst27RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 28) {
					self.setVariableValues({ Pst28RunT: temp })
				} else if (resetPresetRunTime.options.id_pst == 29) {
					self.setVariableValues({ Pst29RunT: temp })
				}

			}
		},
		resetPresetRampTime: {
			name: 'Reset Preset Ramp Time',
			options: [
				{
					type: 'dropdown',
					id: 'id_pst',
					label: 'Preset ID',
					default: 1,
					choices: PRESET_ID,
				},
			],
			callback: async (resetPresetRampTime) => {
				var temp = 10;

				if (resetPresetRampTime.options.id_pst == 0) {
					self.setVariableValues({ Pst0RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 1) {
					self.setVariableValues({ Pst1RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 2) {
					self.setVariableValues({ Pst2RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 3) {
					self.setVariableValues({ Pst3RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 4) {
					self.setVariableValues({ Pst4RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 5) {
					self.setVariableValues({ Pst5RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 6) {
					self.setVariableValues({ Pst6RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 7) {
					self.setVariableValues({ Pst7RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 8) {
					self.setVariableValues({ Pst8RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 9) {
					self.setVariableValues({ Pst9RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 10) {
					self.setVariableValues({ Pst10RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 11) {
					self.setVariableValues({ Pst11RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 12) {
					self.setVariableValues({ Pst12RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 13) {
					self.setVariableValues({ Pst13RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 14) {
					self.setVariableValues({ Pst14RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 15) {
					self.setVariableValues({ Pst15RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 16) {
					self.setVariableValues({ Pst16RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 17) {
					self.setVariableValues({ Pst17RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 18) {
					self.setVariableValues({ Pst18RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 19) {
					self.setVariableValues({ Pst19RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 20) {
					self.setVariableValues({ Pst20RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 21) {
					self.setVariableValues({ Pst21RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 22) {
					self.setVariableValues({ Pst22RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 23) {
					self.setVariableValues({ Pst23RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 24) {
					self.setVariableValues({ Pst24RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 25) {
					self.setVariableValues({ Pst25RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 26) {
					self.setVariableValues({ Pst26RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 27) {
					self.setVariableValues({ Pst27RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 28) {
					self.setVariableValues({ Pst28RampT: temp })
				} else if (resetPresetRampTime.options.id_pst == 29) {
					self.setVariableValues({ Pst29RampT: temp })
				}

			}
		},
		setLoopRunTime: {
			name: 'Set Loop Run Time',
			options: [
				{
					type: 'dropdown',
					id: 'id_loop',
					label: 'Loop ID',
					default: 1,
					choices: LOOP_ID,
				},
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Direction',
					default: 1,
					choices: DIRECTION_ID,
				},
			],
			callback: async (runTime) => {
				var temp = 0

				if (runTime.options.id_loop == 0) {
					temp = self.getVariableValue('Lp0RunT')
				} else if (runTime.options.id_loop == 1) {
					temp = self.getVariableValue('Lp1RunT')
				} else if (runTime.options.id_loop == 2) {
					temp = self.getVariableValue('Lp2RunT')
				} else if (runTime.options.id_loop == 3) {
					temp = self.getVariableValue('Lp3RunT')
				} else if (runTime.options.id_loop == 4) {
					temp = self.getVariableValue('Lp4RunT')
				} else if (runTime.options.id_loop == 5) {
					temp = self.getVariableValue('Lp5RunT')
				} else if (runTime.options.id_loop == 6) {
					temp = self.getVariableValue('Lp6RunT')
				} else if (runTime.options.id_loop == 7) {
					temp = self.getVariableValue('Lp7RunT')
				} else if (runTime.options.id_loop == 8) {
					temp = self.getVariableValue('Lp8RunT')
				}

				temp += runTime.options.direction

				if (temp > 600) {
					temp = 600;
				} else if (temp < 10) {
					temp = 10;
				}

				self.log('debug', 'Loop ID: ' + runTime.options.id_loop + ' RunT: ' + temp)

				if (runTime.options.id_loop == 0) {
					self.setVariableValues({ Lp0RunT: temp })
				} else if (runTime.options.id_loop == 1) {
					self.setVariableValues({ Lp1RunT: temp })
				} else if (runTime.options.id_loop == 2) {
					self.setVariableValues({ Lp2RunT: temp })
				} else if (runTime.options.id_loop == 3) {
					self.setVariableValues({ Lp3RunT: temp })
				} else if (runTime.options.id_loop == 4) {
					self.setVariableValues({ Lp4RunT: temp })
				} else if (runTime.options.id_loop == 5) {
					self.setVariableValues({ Lp5RunT: temp })
				} else if (runTime.options.id_loop == 6) {
					self.setVariableValues({ Lp6RunT: temp })
				} else if (runTime.options.id_loop == 7) {
					self.setVariableValues({ Lp7RunT: temp })
				}
			}
		},
		setLoopRampTime: {
			name: 'Set Loop Ramp Time',
			options: [
				{
					type: 'dropdown',
					id: 'id_loop',
					label: 'Loop ID',
					default: 1,
					choices: LOOP_ID,
				},
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Direction',
					default: 1,
					choices: DIRECTION_ID,
				},
			],
			callback: async (rampTime) => {
				var temp = 0

				if (rampTime.options.id_loop == 0) {
					temp = self.getVariableValue('Lp0RampT')
				} else if (rampTime.options.id_loop == 1) {
					temp = self.getVariableValue('Lp1RampT')
				} else if (rampTime.options.id_loop == 2) {
					temp = self.getVariableValue('Lp2RampT')
				} else if (rampTime.options.id_loop == 3) {
					temp = self.getVariableValue('Lp3RampT')
				} else if (rampTime.options.id_loop == 4) {
					temp = self.getVariableValue('Lp4RampT')
				} else if (rampTime.options.id_loop == 5) {
					temp = self.getVariableValue('Lp5RampT')
				} else if (rampTime.options.id_loop == 6) {
					temp = self.getVariableValue('Lp6RampT')
				} else if (rampTime.options.id_loop == 7) {
					temp = self.getVariableValue('Lp7RampT')
				}

				temp += rampTime.options.direction

				if (temp > 250) {
					temp = 250;
				} else if (temp < 1) {
					temp = 1;
				}

				self.log('debug', 'Loop ID: ' + rampTime.options.id_loop + ' RampT: ' + temp)

				if (rampTime.options.id_loop == 0) {
					self.setVariableValues({ Lp0RampT: temp })
				} else if (rampTime.options.id_loop == 1) {
					self.setVariableValues({ Lp1RampT: temp })
				} else if (rampTime.options.id_loop == 2) {
					self.setVariableValues({ Lp2RampT: temp })
				} else if (rampTime.options.id_loop == 3) {
					self.setVariableValues({ Lp3RampT: temp })
				} else if (rampTime.options.id_loop == 4) {
					self.setVariableValues({ Lp4RampT: temp })
				} else if (rampTime.options.id_loop == 5) {
					self.setVariableValues({ Lp5RampT: temp })
				} else if (rampTime.options.id_loop == 6) {
					self.setVariableValues({ Lp6RampT: temp })
				} else if (rampTime.options.id_loop == 7) {
					self.setVariableValues({ Lp7RampT: temp })
				}
			}
		},
		resetLoopRunTime: {
			name: 'Reset Loop Run Time',
			options: [
				{
					type: 'dropdown',
					id: 'id_loop',
					label: 'Loop ID',
					default: 1,
					choices: LOOP_ID,
				},
			],
			callback: async (resetLpRunTime) => {
				var temp = 50;

				if (resetLpRunTime.options.id_loop == 0) {
					self.setVariableValues({ Lp0RunT: temp })
				} else if (resetLpRunTime.options.id_loop == 1) {
					self.setVariableValues({ Lp1RunT: temp })
				} else if (resetLpRunTime.options.id_loop == 2) {
					self.setVariableValues({ Lp2RunT: temp })
				} else if (resetLpRunTime.options.id_loop == 3) {
					self.setVariableValues({ Lp3RunT: temp })
				} else if (resetLpRunTime.options.id_loop == 4) {
					self.setVariableValues({ Lp4RunT: temp })
				} else if (resetLpRunTime.options.id_loop == 5) {
					self.setVariableValues({ Lp5RunT: temp })
				} else if (resetLpRunTime.options.id_loop == 6) {
					self.setVariableValues({ Lp6RunT: temp })
				} else if (resetLpRunTime.options.id_loop == 7) {
					self.setVariableValues({ Lp7RunT: temp })
				}
			}
		},
		resetLoopRampTime: {
			name: 'Reset Loop Ramp Time',
			options: [
				{
					type: 'dropdown',
					id: 'id_loop',
					label: 'Loop ID',
					default: 1,
					choices: LOOP_ID,
				},
			],
			callback: async (resetLpRampTime) => {
				var temp = 10;

				if (resetLpRampTime.options.id_loop == 0) {
					self.setVariableValues({ Lp0RampT: temp })
				} else if (resetLpRampTime.options.id_loop == 1) {
					self.setVariableValues({ Lp1RampT: temp })
				} else if (resetLpRampTime.options.id_loop == 2) {
					self.setVariableValues({ Lp2RampT: temp })
				} else if (resetLpRampTime.options.id_loop == 3) {
					self.setVariableValues({ Lp3RampT: temp })
				} else if (resetLpRampTime.options.id_loop == 4) {
					self.setVariableValues({ Lp4RampT: temp })
				} else if (resetLpRampTime.options.id_loop == 5) {
					self.setVariableValues({ Lp5RampT: temp })
				} else if (resetLpRampTime.options.id_loop == 6) {
					self.setVariableValues({ Lp6RampT: temp })
				} else if (resetLpRampTime.options.id_loop == 7) {
					self.setVariableValues({ Lp7RampT: temp })
				} 
			}
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
