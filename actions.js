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
				var motorInversion = 1
				var temp = 0

				if (cmd != '') {

					if (actionJogSmart.options.id_mot == 1) {
						temp = self.getVariableValue('PanSpeed')
						motorInversion = self.getVariableValue('PanInversion')
					} else if (actionJogSmart.options.id_mot == 2) {
						temp = self.getVariableValue('TiltSpeed')
						motorInversion = self.getVariableValue('TiltInversion')
					} else if (actionJogSmart.options.id_mot == 3) {
						temp = self.getVariableValue('M3Speed')
						motorInversion = self.getVariableValue('M3Inversion')
					} else if (actionJogSmart.options.id_mot == 4) {
						temp = self.getVariableValue('M4Speed')
						motorInversion = self.getVariableValue('M4Inversion')
					} else if (actionJogSmart.options.id_mot == 5) {
						temp = self.getVariableValue('TN1Speed')
						motorInversion = self.getVariableValue('TN1Inversion')
					} else if (actionJogSmart.options.id_mot == 6) {
						temp = self.getVariableValue('TN2Speed')
						motorInversion = self.getVariableValue('TN2Inversion')
					} else if (actionJogSmart.options.id_mot == 7) {
						temp = self.getVariableValue('TN3Speed')
						motorInversion = self.getVariableValue('TN3Inversion')
					} else if (actionJogSmart.options.id_mot == 8) {
						temp = self.getVariableValue('RollSpeed')
						motorInversion = self.getVariableValue('RollInversion')
					} else if (actionJogSmart.options.id_mot == 9) {
						temp = self.getVariableValue('FocusSpeed')
						motorInversion = self.getVariableValue('FocusInversion')
					}

					if (actionJogSmart.options.id_mot < 5 || actionJogSmart.options.id_mot == 8) {
						motorSpeed = motorInversion * actionJogSmart.options.direction * temp / 100.0 * 500.0
					} else {
						motorSpeed = motorInversion * actionJogSmart.options.direction * temp / 100.0 * 100.0
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

		//Presets
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
				var runtemp = 0
				var ramptemp = 0

				ramptemp = self.getVariableValue('Pst' + runTime.options.id_pst + 'RampT')
				runtemp = self.getVariableValue('Pst' + runTime.options.id_pst + 'RunT')
				// if (runTime.options.id_pst == 0) {
				// 	temp = self.getVariableValue('Pst0RunT')
				// } else if (runTime.options.id_pst == 1) {
				// 	temp = self.getVariableValue('Pst1RunT')
				// } else if (runTime.options.id_pst == 2) {
				// 	temp = self.getVariableValue('Pst2RunT')
				// } else if (runTime.options.id_pst == 3) {
				// 	temp = self.getVariableValue('Pst3RunT')
				// } else if (runTime.options.id_pst == 4) {
				// 	temp = self.getVariableValue('Pst4RunT')
				// } else if (runTime.options.id_pst == 5) {
				// 	temp = self.getVariableValue('Pst5RunT')
				// } else if (runTime.options.id_pst == 6) {
				// 	temp = self.getVariableValue('Pst6RunT')
				// } else if (runTime.options.id_pst == 7) {
				// 	temp = self.getVariableValue('Pst7RunT')
				// } else if (runTime.options.id_pst == 8) {
				// 	temp = self.getVariableValue('Pst8RunT')
				// } else if (runTime.options.id_pst == 9) {
				// 	temp = self.getVariableValue('Pst9RunT')
				// } else if (runTime.options.id_pst == 10) {
				// 	temp = self.getVariableValue('Pst10RunT')
				// } else if (runTime.options.id_pst == 11) {
				// 	temp = self.getVariableValue('Pst11RunT')
				// } else if (runTime.options.id_pst == 12) {
				// 	temp = self.getVariableValue('Pst12RunT')
				// } else if (runTime.options.id_pst == 13) {
				// 	temp = self.getVariableValue('Pst13RunT')
				// } else if (runTime.options.id_pst == 14) {
				// 	temp = self.getVariableValue('Pst14RunT')
				// } else if (runTime.options.id_pst == 15) {
				// 	temp = self.getVariableValue('Pst15RunT')
				// } else if (runTime.options.id_pst == 16) {
				// 	temp = self.getVariableValue('Pst16RunT')
				// } else if (runTime.options.id_pst == 17) {
				// 	temp = self.getVariableValue('Pst17RunT')
				// } else if (runTime.options.id_pst == 18) {
				// 	temp = self.getVariableValue('Pst18RunT')
				// } else if (runTime.options.id_pst == 19) {
				// 	temp = self.getVariableValue('Pst19RunT')
				// } else if (runTime.options.id_pst == 20) {
				// 	temp = self.getVariableValue('Pst20RunT')
				// } else if (runTime.options.id_pst == 21) {
				// 	temp = self.getVariableValue('Pst21RunT')
				// } else if (runTime.options.id_pst == 22) {
				// 	temp = self.getVariableValue('Pst22RunT')
				// } else if (runTime.options.id_pst == 23) {
				// 	temp = self.getVariableValue('Pst23RunT')
				// } else if (runTime.options.id_pst == 24) {
				// 	temp = self.getVariableValue('Pst24RunT')
				// } else if (runTime.options.id_pst == 25) {
				// 	temp = self.getVariableValue('Pst25RunT')
				// } else if (runTime.options.id_pst == 26) {
				// 	temp = self.getVariableValue('Pst26RunT')
				// } else if (runTime.options.id_pst == 27) {
				// 	temp = self.getVariableValue('Pst27RunT')
				// } else if (runTime.options.id_pst == 28) {
				// 	temp = self.getVariableValue('Pst28RunT')
				// } else if (runTime.options.id_pst == 29) {
				// 	temp = self.getVariableValue('Pst29RunT')
				// }

				runtemp += runTime.options.direction

				if (runtemp > 600) {
					runtemp = 600;
				} else if (runtemp < 10) {
					runtemp = 10;
				}

				self.log('debug', 'Preset ID: ' + runTime.options.id_pst + ' RunT: ' + runtemp + ' RampT: ' + ramptemp)

				// var varID = 'Pst'+runTime.options.id_pst+'RunT'
				// self.log('debug', 'Variable ID: ' + varID)
				// self.setVariable( varID, temp )
				if (runTime.options.id_pst == 0) {
					self.setVariableValues({ Pst0RunT: runtemp })
				} else if (runTime.options.id_pst == 1) {
					self.setVariableValues({ Pst1RunT: runtemp })
				} else if (runTime.options.id_pst == 2) {
					self.setVariableValues({ Pst2RunT: runtemp })
				} else if (runTime.options.id_pst == 3) {
					self.setVariableValues({ Pst3RunT: runtemp })
				} else if (runTime.options.id_pst == 4) {
					self.setVariableValues({ Pst4RunT: runtemp })
				} else if (runTime.options.id_pst == 5) {
					self.setVariableValues({ Pst5RunT: runtemp })
				} else if (runTime.options.id_pst == 6) {
					self.setVariableValues({ Pst6RunT: runtemp })
				} else if (runTime.options.id_pst == 7) {
					self.setVariableValues({ Pst7RunT: runtemp })
				} else if (runTime.options.id_pst == 8) {
					self.setVariableValues({ Pst8RunT: runtemp })
				} else if (runTime.options.id_pst == 9) {
					self.setVariableValues({ Pst9RunT: runtemp })
				} else if (runTime.options.id_pst == 10) {
					self.setVariableValues({ Pst10RunT: runtemp })
				} else if (runTime.options.id_pst == 11) {
					self.setVariableValues({ Pst11RunT: runtemp })
				} else if (runTime.options.id_pst == 12) {
					self.setVariableValues({ Pst12RunT: runtemp })
				} else if (runTime.options.id_pst == 13) {
					self.setVariableValues({ Pst13RunT: runtemp })
				} else if (runTime.options.id_pst == 14) {
					self.setVariableValues({ Pst14RunT: runtemp })
				} else if (runTime.options.id_pst == 15) {
					self.setVariableValues({ Pst15RunT: runtemp })
				} else if (runTime.options.id_pst == 16) {
					self.setVariableValues({ Pst16RunT: runtemp })
				} else if (runTime.options.id_pst == 17) {
					self.setVariableValues({ Pst17RunT: runtemp })
				} else if (runTime.options.id_pst == 18) {
					self.setVariableValues({ Pst18RunT: runtemp })
				} else if (runTime.options.id_pst == 19) {
					self.setVariableValues({ Pst19RunT: runtemp })
				} else if (runTime.options.id_pst == 20) {
					self.setVariableValues({ Pst20RunT: runtemp })
				} else if (runTime.options.id_pst == 21) {
					self.setVariableValues({ Pst21RunT: runtemp })
				} else if (runTime.options.id_pst == 22) {
					self.setVariableValues({ Pst22RunT: runtemp })
				} else if (runTime.options.id_pst == 23) {
					self.setVariableValues({ Pst23RunT: runtemp })
				} else if (runTime.options.id_pst == 24) {
					self.setVariableValues({ Pst24RunT: runtemp })
				} else if (runTime.options.id_pst == 25) {
					self.setVariableValues({ Pst25RunT: runtemp })
				} else if (runTime.options.id_pst == 26) {
					self.setVariableValues({ Pst26RunT: runtemp })
				} else if (runTime.options.id_pst == 27) {
					self.setVariableValues({ Pst27RunT: runtemp })
				} else if (runTime.options.id_pst == 28) {
					self.setVariableValues({ Pst28RunT: runtemp })
				} else if (runTime.options.id_pst == 29) {
					self.setVariableValues({ Pst29RunT: runtemp })
				}

				const cmd = 'G21 N1 P'
				const sendBuf = Buffer.from(cmd + runTime.options.id_pst + ' T' + runtemp / 10 + ' A' + ramptemp / 10 + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
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
				var ramptemp = 0
				var runtemp = 0

				runtemp = self.getVariableValue('Pst' + rampTime.options.id_pst + 'RunT')
				ramptemp = self.getVariableValue('Pst' + rampTime.options.id_pst + 'RampT')
				// if (rampTime.options.id_pst == 0) {
				// 	temp = self.getVariableValue('Pst0RampT')
				// } else if (rampTime.options.id_pst == 1) {
				// 	temp = self.getVariableValue('Pst1RampT')
				// } else if (rampTime.options.id_pst == 2) {
				// 	temp = self.getVariableValue('Pst2RampT')
				// } else if (rampTime.options.id_pst == 3) {
				// 	temp = self.getVariableValue('Pst3RampT')
				// } else if (rampTime.options.id_pst == 4) {
				// 	temp = self.getVariableValue('Pst4RampT')
				// } else if (rampTime.options.id_pst == 5) {
				// 	temp = self.getVariableValue('Pst5RampT')
				// } else if (rampTime.options.id_pst == 6) {
				// 	temp = self.getVariableValue('Pst6RampT')
				// } else if (rampTime.options.id_pst == 7) {
				// 	temp = self.getVariableValue('Pst7RampT')
				// } else if (rampTime.options.id_pst == 8) {
				// 	temp = self.getVariableValue('Pst8RampT')
				// } else if (rampTime.options.id_pst == 9) {
				// 	temp = self.getVariableValue('Pst9RampT')
				// } else if (rampTime.options.id_pst == 10) {
				// 	temp = self.getVariableValue('Pst10RampT')
				// } else if (rampTime.options.id_pst == 11) {
				// 	temp = self.getVariableValue('Pst11RampT')
				// } else if (rampTime.options.id_pst == 12) {
				// 	temp = self.getVariableValue('Pst12RampT')
				// } else if (rampTime.options.id_pst == 13) {
				// 	temp = self.getVariableValue('Pst13RampT')
				// } else if (rampTime.options.id_pst == 14) {
				// 	temp = self.getVariableValue('Pst14RampT')
				// } else if (rampTime.options.id_pst == 15) {
				// 	temp = self.getVariableValue('Pst15RampT')
				// } else if (rampTime.options.id_pst == 16) {
				// 	temp = self.getVariableValue('Pst16RampT')
				// } else if (rampTime.options.id_pst == 17) {
				// 	temp = self.getVariableValue('Pst17RampT')
				// } else if (rampTime.options.id_pst == 18) {
				// 	temp = self.getVariableValue('Pst18RampT')
				// } else if (rampTime.options.id_pst == 19) {
				// 	temp = self.getVariableValue('Pst19RampT')
				// } else if (rampTime.options.id_pst == 20) {
				// 	temp = self.getVariableValue('Pst20RampT')
				// } else if (rampTime.options.id_pst == 21) {
				// 	temp = self.getVariableValue('Pst21RampT')
				// } else if (rampTime.options.id_pst == 22) {
				// 	temp = self.getVariableValue('Pst22RampT')
				// } else if (rampTime.options.id_pst == 23) {
				// 	temp = self.getVariableValue('Pst23RampT')
				// } else if (rampTime.options.id_pst == 24) {
				// 	temp = self.getVariableValue('Pst24RampT')
				// } else if (rampTime.options.id_pst == 25) {
				// 	temp = self.getVariableValue('Pst25RampT')
				// } else if (rampTime.options.id_pst == 26) {
				// 	temp = self.getVariableValue('Pst26RampT')
				// } else if (rampTime.options.id_pst == 27) {
				// 	temp = self.getVariableValue('Pst27RampT')
				// } else if (rampTime.options.id_pst == 28) {
				// 	temp = self.getVariableValue('Pst28RampT')
				// } else if (rampTime.options.id_pst == 29) {
				// 	temp = self.getVariableValue('Pst29RampT')
				// }

				ramptemp += rampTime.options.direction

				if (ramptemp > 250) {
					ramptemp = 250;
				} else if (ramptemp < 1) {
					ramptemp = 1;
				}

				self.log('debug', 'Preset ID: ' + rampTime.options.id_pst + ' RunT: ' + runtemp + ' RampT: ' + ramptemp)

				if (rampTime.options.id_pst == 0) {
					self.setVariableValues({ Pst0RampT: ramptemp })
				} else if (rampTime.options.id_pst == 1) {
					self.setVariableValues({ Pst1RampT: ramptemp })
				} else if (rampTime.options.id_pst == 2) {
					self.setVariableValues({ Pst2RampT: ramptemp })
				} else if (rampTime.options.id_pst == 3) {
					self.setVariableValues({ Pst3RampT: ramptemp })
				} else if (rampTime.options.id_pst == 4) {
					self.setVariableValues({ Pst4RampT: ramptemp })
				} else if (rampTime.options.id_pst == 5) {
					self.setVariableValues({ Pst5RampT: ramptemp })
				} else if (rampTime.options.id_pst == 6) {
					self.setVariableValues({ Pst6RampT: ramptemp })
				} else if (rampTime.options.id_pst == 7) {
					self.setVariableValues({ Pst7RampT: ramptemp })
				} else if (rampTime.options.id_pst == 8) {
					self.setVariableValues({ Pst8RampT: ramptemp })
				} else if (rampTime.options.id_pst == 9) {
					self.setVariableValues({ Pst9RampT: ramptemp })
				} else if (rampTime.options.id_pst == 10) {
					self.setVariableValues({ Pst10RampT: ramptemp })
				} else if (rampTime.options.id_pst == 11) {
					self.setVariableValues({ Pst11RampT: ramptemp })
				} else if (rampTime.options.id_pst == 12) {
					self.setVariableValues({ Pst12RampT: ramptemp })
				} else if (rampTime.options.id_pst == 13) {
					self.setVariableValues({ Pst13RampT: ramptemp })
				} else if (rampTime.options.id_pst == 14) {
					self.setVariableValues({ Pst14RampT: ramptemp })
				} else if (rampTime.options.id_pst == 15) {
					self.setVariableValues({ Pst15RampT: ramptemp })
				} else if (rampTime.options.id_pst == 16) {
					self.setVariableValues({ Pst16RampT: ramptemp })
				} else if (rampTime.options.id_pst == 17) {
					self.setVariableValues({ Pst17RampT: ramptemp })
				} else if (rampTime.options.id_pst == 18) {
					self.setVariableValues({ Pst18RampT: ramptemp })
				} else if (rampTime.options.id_pst == 19) {
					self.setVariableValues({ Pst19RampT: ramptemp })
				} else if (rampTime.options.id_pst == 20) {
					self.setVariableValues({ Pst20RampT: ramptemp })
				} else if (rampTime.options.id_pst == 21) {
					self.setVariableValues({ Pst21RampT: ramptemp })
				} else if (rampTime.options.id_pst == 22) {
					self.setVariableValues({ Pst22RampT: ramptemp })
				} else if (rampTime.options.id_pst == 23) {
					self.setVariableValues({ Pst23RampT: ramptemp })
				} else if (rampTime.options.id_pst == 24) {
					self.setVariableValues({ Pst24RampT: ramptemp })
				} else if (rampTime.options.id_pst == 25) {
					self.setVariableValues({ Pst25RampT: ramptemp })
				} else if (rampTime.options.id_pst == 26) {
					self.setVariableValues({ Pst26RampT: ramptemp })
				} else if (rampTime.options.id_pst == 27) {
					self.setVariableValues({ Pst27RampT: ramptemp })
				} else if (rampTime.options.id_pst == 28) {
					self.setVariableValues({ Pst28RampT: ramptemp })
				} else if (rampTime.options.id_pst == 29) {
					self.setVariableValues({ Pst29RampT: ramptemp })
				}

				const cmd = 'G21 N1 P'
				const sendBuf = Buffer.from(cmd + rampTime.options.id_pst + ' T' + runtemp / 10 + ' A' + ramptemp / 10 + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
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
					// allowCustom: true,
					// allowExpression: true,
				},
			],
			callback: async (resetPresetRunTime) => {
				var runtemp = 50;
				var ramptemp = self.getVariableValue('Pst' + resetPresetRunTime.options.id_pst + 'RampT')

				if (resetPresetRunTime.options.id_pst == 0) {
					self.setVariableValues({ Pst0RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 1) {
					self.setVariableValues({ Pst1RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 2) {
					self.setVariableValues({ Pst2RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 3) {
					self.setVariableValues({ Pst3RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 4) {
					self.setVariableValues({ Pst4RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 5) {
					self.setVariableValues({ Pst5RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 6) {
					self.setVariableValues({ Pst6RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 7) {
					self.setVariableValues({ Pst7RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 8) {
					self.setVariableValues({ Pst8RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 9) {
					self.setVariableValues({ Pst9RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 10) {
					self.setVariableValues({ Pst10RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 11) {
					self.setVariableValues({ Pst11RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 12) {
					self.setVariableValues({ Pst12RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 13) {
					self.setVariableValues({ Pst13RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 14) {
					self.setVariableValues({ Pst14RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 15) {
					self.setVariableValues({ Pst15RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 16) {
					self.setVariableValues({ Pst16RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 17) {
					self.setVariableValues({ Pst17RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 18) {
					self.setVariableValues({ Pst18RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 19) {
					self.setVariableValues({ Pst19RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 20) {
					self.setVariableValues({ Pst20RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 21) {
					self.setVariableValues({ Pst21RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 22) {
					self.setVariableValues({ Pst22RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 23) {
					self.setVariableValues({ Pst23RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 24) {
					self.setVariableValues({ Pst24RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 25) {
					self.setVariableValues({ Pst25RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 26) {
					self.setVariableValues({ Pst26RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 27) {
					self.setVariableValues({ Pst27RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 28) {
					self.setVariableValues({ Pst28RunT: runtemp })
				} else if (resetPresetRunTime.options.id_pst == 29) {
					self.setVariableValues({ Pst29RunT: runtemp })
				}

				const cmd = 'G21 N1 P'
				const sendBuf = Buffer.from(cmd + resetPresetRunTime.options.id_pst + ' T' + runtemp / 10 + ' A' + ramptemp / 10 + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
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
					// allowCustom: true,
				},
			],
			callback: async (resetPresetRampTime) => {
				var ramptemp = 10;
				var runtemp = self.getVariableValue('Pst' + resetPresetRampTime.options.id_pst + 'RunT')

				if (resetPresetRampTime.options.id_pst == 0) {
					self.setVariableValues({ Pst0RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 1) {
					self.setVariableValues({ Pst1RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 2) {
					self.setVariableValues({ Pst2RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 3) {
					self.setVariableValues({ Pst3RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 4) {
					self.setVariableValues({ Pst4RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 5) {
					self.setVariableValues({ Pst5RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 6) {
					self.setVariableValues({ Pst6RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 7) {
					self.setVariableValues({ Pst7RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 8) {
					self.setVariableValues({ Pst8RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 9) {
					self.setVariableValues({ Pst9RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 10) {
					self.setVariableValues({ Pst10RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 11) {
					self.setVariableValues({ Pst11RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 12) {
					self.setVariableValues({ Pst12RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 13) {
					self.setVariableValues({ Pst13RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 14) {
					self.setVariableValues({ Pst14RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 15) {
					self.setVariableValues({ Pst15RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 16) {
					self.setVariableValues({ Pst16RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 17) {
					self.setVariableValues({ Pst17RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 18) {
					self.setVariableValues({ Pst18RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 19) {
					self.setVariableValues({ Pst19RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 20) {
					self.setVariableValues({ Pst20RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 21) {
					self.setVariableValues({ Pst21RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 22) {
					self.setVariableValues({ Pst22RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 23) {
					self.setVariableValues({ Pst23RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 24) {
					self.setVariableValues({ Pst24RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 25) {
					self.setVariableValues({ Pst25RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 26) {
					self.setVariableValues({ Pst26RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 27) {
					self.setVariableValues({ Pst27RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 28) {
					self.setVariableValues({ Pst28RampT: ramptemp })
				} else if (resetPresetRampTime.options.id_pst == 29) {
					self.setVariableValues({ Pst29RampT: ramptemp })
				}

				const cmd = 'G21 N1 P'
				const sendBuf = Buffer.from(cmd + resetPresetRampTime.options.id_pst + ' T' + runtemp / 10 + ' A' + ramptemp / 10 + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		//Smart Presets
		setPresetRunTimeSmart: {
			name: 'Smart Set Preset Run Time',
			options: [
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Direction',
					default: 1,
					choices: DIRECTION_ID,
				},
			],
			callback: async (runTime) => {
				var runtemp = 0
				var ramptemp = 0
				var preset = self.getVariableValue('CurrentPstSet')

				runtemp = self.getVariableValue('CurrentPstSetRun')
				ramptemp = self.getVariableValue('CurrentPstSetRamp')

				runtemp += runTime.options.direction

				if (runtemp > 600) {
					runtemp = 600;
				} else if (runtemp < 10) {
					runtemp = 10;
				}

				self.log('debug', 'Preset ID: ' + preset + ' RunT: ' + runtemp + ' RampT: ' + ramptemp)

				// var varID = 'Pst'+preset+'RunT'
				// self.log('debug', 'Variable ID: ' + varID)
				// self.setVariable( varID, temp )
				if (preset == 0) {
					self.setVariableValues({ Pst0RunT: runtemp })
				} else if (preset == 1) {
					self.setVariableValues({ Pst1RunT: runtemp })
				} else if (preset == 2) {
					self.setVariableValues({ Pst2RunT: runtemp })
				} else if (preset == 3) {
					self.setVariableValues({ Pst3RunT: runtemp })
				} else if (preset == 4) {
					self.setVariableValues({ Pst4RunT: runtemp })
				} else if (preset == 5) {
					self.setVariableValues({ Pst5RunT: runtemp })
				} else if (preset == 6) {
					self.setVariableValues({ Pst6RunT: runtemp })
				} else if (preset == 7) {
					self.setVariableValues({ Pst7RunT: runtemp })
				} else if (preset == 8) {
					self.setVariableValues({ Pst8RunT: runtemp })
				} else if (preset == 9) {
					self.setVariableValues({ Pst9RunT: runtemp })
				} else if (preset == 10) {
					self.setVariableValues({ Pst10RunT: runtemp })
				} else if (preset == 11) {
					self.setVariableValues({ Pst11RunT: runtemp })
				} else if (preset == 12) {
					self.setVariableValues({ Pst12RunT: runtemp })
				} else if (preset == 13) {
					self.setVariableValues({ Pst13RunT: runtemp })
				} else if (preset == 14) {
					self.setVariableValues({ Pst14RunT: runtemp })
				} else if (preset == 15) {
					self.setVariableValues({ Pst15RunT: runtemp })
				} else if (preset == 16) {
					self.setVariableValues({ Pst16RunT: runtemp })
				} else if (preset == 17) {
					self.setVariableValues({ Pst17RunT: runtemp })
				} else if (preset == 18) {
					self.setVariableValues({ Pst18RunT: runtemp })
				} else if (preset == 19) {
					self.setVariableValues({ Pst19RunT: runtemp })
				} else if (preset == 20) {
					self.setVariableValues({ Pst20RunT: runtemp })
				} else if (preset == 21) {
					self.setVariableValues({ Pst21RunT: runtemp })
				} else if (preset == 22) {
					self.setVariableValues({ Pst22RunT: runtemp })
				} else if (preset == 23) {
					self.setVariableValues({ Pst23RunT: runtemp })
				} else if (preset == 24) {
					self.setVariableValues({ Pst24RunT: runtemp })
				} else if (preset == 25) {
					self.setVariableValues({ Pst25RunT: runtemp })
				} else if (preset == 26) {
					self.setVariableValues({ Pst26RunT: runtemp })
				} else if (preset == 27) {
					self.setVariableValues({ Pst27RunT: runtemp })
				} else if (preset == 28) {
					self.setVariableValues({ Pst28RunT: runtemp })
				} else if (preset == 29) {
					self.setVariableValues({ Pst29RunT: runtemp })
				}
				self.setVariableValues({ CurrentPstSetRun: runtemp })

				const cmd = 'G21 N1 P'
				const sendBuf = Buffer.from(cmd + preset + ' T' + runtemp / 10 + ' A' + ramptemp / 10 + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		setPresetRampTimeSmart: {
			name: 'Smart Set Preset Ramp Time',
			options: [
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Direction',
					default: 1,
					choices: DIRECTION_ID,
				},
			],
			callback: async (rampTime) => {
				var ramptemp = 0
				var runtemp = 0
				var preset = self.getVariableValue('CurrentPstSet')

				runtemp = self.getVariableValue('CurrentPstSetRun')
				ramptemp = self.getVariableValue('CurrentPstSetRamp')
				

				ramptemp += rampTime.options.direction

				if (ramptemp > 250) {
					ramptemp = 250;
				} else if (ramptemp < 1) {
					ramptemp = 1;
				}

				self.log('debug', 'Preset ID: ' + preset + ' RunT: ' + runtemp + ' RampT: ' + ramptemp)

				if (preset == 0) {
					self.setVariableValues({ Pst0RampT: ramptemp })
				} else if (preset == 1) {
					self.setVariableValues({ Pst1RampT: ramptemp })
				} else if (preset == 2) {
					self.setVariableValues({ Pst2RampT: ramptemp })
				} else if (preset == 3) {
					self.setVariableValues({ Pst3RampT: ramptemp })
				} else if (preset == 4) {
					self.setVariableValues({ Pst4RampT: ramptemp })
				} else if (preset == 5) {
					self.setVariableValues({ Pst5RampT: ramptemp })
				} else if (preset == 6) {
					self.setVariableValues({ Pst6RampT: ramptemp })
				} else if (preset == 7) {
					self.setVariableValues({ Pst7RampT: ramptemp })
				} else if (preset == 8) {
					self.setVariableValues({ Pst8RampT: ramptemp })
				} else if (preset == 9) {
					self.setVariableValues({ Pst9RampT: ramptemp })
				} else if (preset == 10) {
					self.setVariableValues({ Pst10RampT: ramptemp })
				} else if (preset == 11) {
					self.setVariableValues({ Pst11RampT: ramptemp })
				} else if (preset == 12) {
					self.setVariableValues({ Pst12RampT: ramptemp })
				} else if (preset == 13) {
					self.setVariableValues({ Pst13RampT: ramptemp })
				} else if (preset == 14) {
					self.setVariableValues({ Pst14RampT: ramptemp })
				} else if (preset == 15) {
					self.setVariableValues({ Pst15RampT: ramptemp })
				} else if (preset == 16) {
					self.setVariableValues({ Pst16RampT: ramptemp })
				} else if (preset == 17) {
					self.setVariableValues({ Pst17RampT: ramptemp })
				} else if (preset == 18) {
					self.setVariableValues({ Pst18RampT: ramptemp })
				} else if (preset == 19) {
					self.setVariableValues({ Pst19RampT: ramptemp })
				} else if (preset == 20) {
					self.setVariableValues({ Pst20RampT: ramptemp })
				} else if (preset == 21) {
					self.setVariableValues({ Pst21RampT: ramptemp })
				} else if (preset == 22) {
					self.setVariableValues({ Pst22RampT: ramptemp })
				} else if (preset == 23) {
					self.setVariableValues({ Pst23RampT: ramptemp })
				} else if (preset == 24) {
					self.setVariableValues({ Pst24RampT: ramptemp })
				} else if (preset == 25) {
					self.setVariableValues({ Pst25RampT: ramptemp })
				} else if (preset == 26) {
					self.setVariableValues({ Pst26RampT: ramptemp })
				} else if (preset == 27) {
					self.setVariableValues({ Pst27RampT: ramptemp })
				} else if (preset == 28) {
					self.setVariableValues({ Pst28RampT: ramptemp })
				} else if (preset == 29) {
					self.setVariableValues({ Pst29RampT: ramptemp })
				}
				self.setVariableValues({ CurrentPstSetRamp: ramptemp })

				const cmd = 'G21 N1 P'
				const sendBuf = Buffer.from(cmd + preset + ' T' + runtemp / 10 + ' A' + ramptemp / 10 + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		resetPresetRunTimeSmart: {
			name: 'Reset Preset Run Time Smart',
			options: [
				
			],
			callback: async (resetPresetRunTime) => {
				var preset = self.getVariableValue('CurrentPstSet')
				var runtemp = 50;
				var ramptemp = self.getVariableValue('Pst' + preset + 'RampT')

				if (preset == 0) {
					self.setVariableValues({ Pst0RunT: runtemp })
				} else if (preset == 1) {
					self.setVariableValues({ Pst1RunT: runtemp })
				} else if (preset == 2) {
					self.setVariableValues({ Pst2RunT: runtemp })
				} else if (preset == 3) {
					self.setVariableValues({ Pst3RunT: runtemp })
				} else if (preset == 4) {
					self.setVariableValues({ Pst4RunT: runtemp })
				} else if (preset == 5) {
					self.setVariableValues({ Pst5RunT: runtemp })
				} else if (preset == 6) {
					self.setVariableValues({ Pst6RunT: runtemp })
				} else if (preset == 7) {
					self.setVariableValues({ Pst7RunT: runtemp })
				} else if (preset == 8) {
					self.setVariableValues({ Pst8RunT: runtemp })
				} else if (preset == 9) {
					self.setVariableValues({ Pst9RunT: runtemp })
				} else if (preset == 10) {
					self.setVariableValues({ Pst10RunT: runtemp })
				} else if (preset == 11) {
					self.setVariableValues({ Pst11RunT: runtemp })
				} else if (preset == 12) {
					self.setVariableValues({ Pst12RunT: runtemp })
				} else if (preset == 13) {
					self.setVariableValues({ Pst13RunT: runtemp })
				} else if (preset == 14) {
					self.setVariableValues({ Pst14RunT: runtemp })
				} else if (preset == 15) {
					self.setVariableValues({ Pst15RunT: runtemp })
				} else if (preset == 16) {
					self.setVariableValues({ Pst16RunT: runtemp })
				} else if (preset == 17) {
					self.setVariableValues({ Pst17RunT: runtemp })
				} else if (preset == 18) {
					self.setVariableValues({ Pst18RunT: runtemp })
				} else if (preset == 19) {
					self.setVariableValues({ Pst19RunT: runtemp })
				} else if (preset == 20) {
					self.setVariableValues({ Pst20RunT: runtemp })
				} else if (preset == 21) {
					self.setVariableValues({ Pst21RunT: runtemp })
				} else if (preset == 22) {
					self.setVariableValues({ Pst22RunT: runtemp })
				} else if (preset == 23) {
					self.setVariableValues({ Pst23RunT: runtemp })
				} else if (preset == 24) {
					self.setVariableValues({ Pst24RunT: runtemp })
				} else if (preset == 25) {
					self.setVariableValues({ Pst25RunT: runtemp })
				} else if (preset == 26) {
					self.setVariableValues({ Pst26RunT: runtemp })
				} else if (preset == 27) {
					self.setVariableValues({ Pst27RunT: runtemp })
				} else if (preset == 28) {
					self.setVariableValues({ Pst28RunT: runtemp })
				} else if (preset == 29) {
					self.setVariableValues({ Pst29RunT: runtemp })
				}
				self.setVariableValues({ CurrentPstSetRun: runtemp })

				const cmd = 'G21 N1 P'
				const sendBuf = Buffer.from(cmd + preset + ' T' + runtemp / 10 + ' A' + ramptemp / 10 + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		resetPresetRampTimeSmart: {
			name: 'Reset Preset Ramp Time Smart',
			options: [
				
			],
			callback: async (resetPresetRampTime) => {
				var preset = self.getVariableValue('CurrentPstSet')
				var ramptemp = 10;
				var runtemp = self.getVariableValue('Pst' + preset + 'RunT')

				if (preset == 0) {
					self.setVariableValues({ Pst0RampT: ramptemp })
				} else if (preset == 1) {
					self.setVariableValues({ Pst1RampT: ramptemp })
				} else if (preset == 2) {
					self.setVariableValues({ Pst2RampT: ramptemp })
				} else if (preset == 3) {
					self.setVariableValues({ Pst3RampT: ramptemp })
				} else if (preset == 4) {
					self.setVariableValues({ Pst4RampT: ramptemp })
				} else if (preset == 5) {
					self.setVariableValues({ Pst5RampT: ramptemp })
				} else if (preset == 6) {
					self.setVariableValues({ Pst6RampT: ramptemp })
				} else if (preset == 7) {
					self.setVariableValues({ Pst7RampT: ramptemp })
				} else if (preset == 8) {
					self.setVariableValues({ Pst8RampT: ramptemp })
				} else if (preset == 9) {
					self.setVariableValues({ Pst9RampT: ramptemp })
				} else if (preset == 10) {
					self.setVariableValues({ Pst10RampT: ramptemp })
				} else if (preset == 11) {
					self.setVariableValues({ Pst11RampT: ramptemp })
				} else if (preset == 12) {
					self.setVariableValues({ Pst12RampT: ramptemp })
				} else if (preset == 13) {
					self.setVariableValues({ Pst13RampT: ramptemp })
				} else if (preset == 14) {
					self.setVariableValues({ Pst14RampT: ramptemp })
				} else if (preset == 15) {
					self.setVariableValues({ Pst15RampT: ramptemp })
				} else if (preset == 16) {
					self.setVariableValues({ Pst16RampT: ramptemp })
				} else if (preset == 17) {
					self.setVariableValues({ Pst17RampT: ramptemp })
				} else if (preset == 18) {
					self.setVariableValues({ Pst18RampT: ramptemp })
				} else if (preset == 19) {
					self.setVariableValues({ Pst19RampT: ramptemp })
				} else if (preset == 20) {
					self.setVariableValues({ Pst20RampT: ramptemp })
				} else if (preset == 21) {
					self.setVariableValues({ Pst21RampT: ramptemp })
				} else if (preset == 22) {
					self.setVariableValues({ Pst22RampT: ramptemp })
				} else if (preset == 23) {
					self.setVariableValues({ Pst23RampT: ramptemp })
				} else if (preset == 24) {
					self.setVariableValues({ Pst24RampT: ramptemp })
				} else if (preset == 25) {
					self.setVariableValues({ Pst25RampT: ramptemp })
				} else if (preset == 26) {
					self.setVariableValues({ Pst26RampT: ramptemp })
				} else if (preset == 27) {
					self.setVariableValues({ Pst27RampT: ramptemp })
				} else if (preset == 28) {
					self.setVariableValues({ Pst28RampT: ramptemp })
				} else if (preset == 29) {
					self.setVariableValues({ Pst29RampT: ramptemp })
				}
				self.setVariableValues({ CurrentPstSetRamp: ramptemp })

				const cmd = 'G21 N1 P'
				const sendBuf = Buffer.from(cmd + preset + ' T' + runtemp / 10 + ' A' + ramptemp / 10 + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		setPresetID: {
			name: 'Set Preset ID',
			options: [
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Direction',
					default: 1,
					choices: DIRECTION_ID,
				},
			],
			callback: async (pst) => {
				var ramptemp = 0
				var runtemp = 0
				var preset = self.getVariableValue('CurrentPstSet')

				
				preset += pst.options.direction
				
				if (preset > 30) {
					preset = 30;
				} else if (preset < 0) {
					preset = 0;
				}
				
				runtemp = self.getVariableValue('Pst' + preset + 'RunT')
				ramptemp = self.getVariableValue('Pst' + preset + 'RampT')
				
				self.log('debug', 'Preset ID: ' + preset + ' RunT: ' + runtemp + ' RampT: ' + ramptemp)

				self.setVariableValues({ CurrentPstSet: preset })
				self.setVariableValues({ CurrentPstSetRun: runtemp })
				self.setVariableValues({ CurrentPstSetRamp: ramptemp })

				self.checkFeedbacks("SetPresetSmart")

				
			}
		},
		savePsetSmart: {
			name: 'Save Preset Smart',
			options: [
			
			],
			callback: async (setPreset) => {
				var runtemp = 0
				var ramptemp = 0
				var preset = self.getVariableValue('CurrentPstSet')

				runtemp = self.getVariableValue('CurrentPstSetRun')
				ramptemp = self.getVariableValue('CurrentPstSetRamp')

				const cmd = 'G21 P'

				const sendBuf = Buffer.from(cmd + preset + ' T' + runtemp / 10 + ' A' + ramptemp / 10 + '\n', 'latin1')

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
		recallPsetSmart: {
			name: 'Recall Preset Smart',
			options: [
				
			],
			callback: async (recallPreset) => {
				var preset = self.getVariableValue('CurrentPstSet')

				const cmd = 'G20 P'

				const sendBuf = Buffer.from(cmd + preset + '\n', 'latin1')

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

		//Loops
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
		setLoopAPoint: {
			name: 'Set Loop A Point',
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
			callback: async (LpAPt) => {
				var temp = 0

				if (LpAPt.options.id_loop == 0) {
					temp = self.getVariableValue('Lp0APoint')
				} else if (LpAPt.options.id_loop == 1) {
					temp = self.getVariableValue('Lp1APoint')
				} else if (LpAPt.options.id_loop == 2) {
					temp = self.getVariableValue('Lp2APoint')
				} else if (LpAPt.options.id_loop == 3) {
					temp = self.getVariableValue('Lp3APoint')
				} else if (LpAPt.options.id_loop == 4) {
					temp = self.getVariableValue('Lp4APoint')
				} else if (LpAPt.options.id_loop == 5) {
					temp = self.getVariableValue('Lp5APoint')
				} else if (LpAPt.options.id_loop == 6) {
					temp = self.getVariableValue('Lp6APoint')
				} else if (LpAPt.options.id_loop == 7) {
					temp = self.getVariableValue('Lp7APoint')
				} else if (LpAPt.options.id_loop == 8) {
					temp = self.getVariableValue('Lp8APoint')
				}

				temp += LpAPt.options.direction

				if (temp > 29) {
					temp = 29;
				} else if (temp < 0) {
					temp = 0;
				}

				self.log('debug', 'Loop ID: ' + LpAPt.options.id_loop + ' APoint: ' + temp)

				if (LpAPt.options.id_loop == 0) {
					self.setVariableValues({ Lp0APoint: temp })
				} else if (LpAPt.options.id_loop == 1) {
					self.setVariableValues({ Lp1APoint: temp })
				} else if (LpAPt.options.id_loop == 2) {
					self.setVariableValues({ Lp2APoint: temp })
				} else if (LpAPt.options.id_loop == 3) {
					self.setVariableValues({ Lp3APoint: temp })
				} else if (LpAPt.options.id_loop == 4) {
					self.setVariableValues({ Lp4APoint: temp })
				} else if (LpAPt.options.id_loop == 5) {
					self.setVariableValues({ Lp5APoint: temp })
				} else if (LpAPt.options.id_loop == 6) {
					self.setVariableValues({ Lp6APoint: temp })
				} else if (LpAPt.options.id_loop == 7) {
					self.setVariableValues({ Lp7APoint: temp })
				}
			}
		},
		setLoopBPoint: {
			name: 'Set Loop B Point',
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
			callback: async (LpBPt) => {
				var temp = 0

				if (LpBPt.options.id_loop == 0) {
					temp = self.getVariableValue('Lp0BPoint')
				} else if (LpBPt.options.id_loop == 1) {
					temp = self.getVariableValue('Lp1BPoint')
				} else if (LpBPt.options.id_loop == 2) {
					temp = self.getVariableValue('Lp2BPoint')
				} else if (LpBPt.options.id_loop == 3) {
					temp = self.getVariableValue('Lp3BPoint')
				} else if (LpBPt.options.id_loop == 4) {
					temp = self.getVariableValue('Lp4BPoint')
				} else if (LpBPt.options.id_loop == 5) {
					temp = self.getVariableValue('Lp5BPoint')
				} else if (LpBPt.options.id_loop == 6) {
					temp = self.getVariableValue('Lp6BPoint')
				} else if (LpBPt.options.id_loop == 7) {
					temp = self.getVariableValue('Lp7BPoint')
				} else if (LpBPt.options.id_loop == 8) {
					temp = self.getVariableValue('Lp8BPoint')
				}

				temp += LpBPt.options.direction

				if (temp > 29) {
					temp = 29;
				} else if (temp < 0) {
					temp = 0;
				}

				self.log('debug', 'Loop ID: ' + LpBPt.options.id_loop + ' BPoint: ' + temp)

				if (LpBPt.options.id_loop == 0) {
					self.setVariableValues({ Lp0BPoint: temp })
				} else if (LpBPt.options.id_loop == 1) {
					self.setVariableValues({ Lp1BPoint: temp })
				} else if (LpBPt.options.id_loop == 2) {
					self.setVariableValues({ Lp2BPoint: temp })
				} else if (LpBPt.options.id_loop == 3) {
					self.setVariableValues({ Lp3BPoint: temp })
				} else if (LpBPt.options.id_loop == 4) {
					self.setVariableValues({ Lp4BPoint: temp })
				} else if (LpBPt.options.id_loop == 5) {
					self.setVariableValues({ Lp5BPoint: temp })
				} else if (LpBPt.options.id_loop == 6) {
					self.setVariableValues({ Lp6BPoint: temp })
				} else if (LpBPt.options.id_loop == 7) {
					self.setVariableValues({ Lp7BPoint: temp })
				}
			}
		},
		recallAPoint: {
			name: 'Recall Loop A Point',
			options: [
				{
					type: 'dropdown',
					id: 'id_loop',
					label: 'Loop ID',
					default: 1,
					choices: LOOP_ID,
				},
			],
			callback: async (LpAPt) => {
				var temp = 0

				if (LpAPt.options.id_loop == 0) {
					temp = self.getVariableValue('Lp0APoint')
				} else if (LpAPt.options.id_loop == 1) {
					temp = self.getVariableValue('Lp1APoint')
				} else if (LpAPt.options.id_loop == 2) {
					temp = self.getVariableValue('Lp2APoint')
				} else if (LpAPt.options.id_loop == 3) {
					temp = self.getVariableValue('Lp3APoint')
				} else if (LpAPt.options.id_loop == 4) {
					temp = self.getVariableValue('Lp4APoint')
				} else if (LpAPt.options.id_loop == 5) {
					temp = self.getVariableValue('Lp5APoint')
				} else if (LpAPt.options.id_loop == 6) {
					temp = self.getVariableValue('Lp6APoint')
				} else if (LpAPt.options.id_loop == 7) {
					temp = self.getVariableValue('Lp7APoint')
				} else if (LpAPt.options.id_loop == 8) {
					temp = self.getVariableValue('Lp8APoint')
				}

				// self.log('debug', 'Loop ID: ' + LpAPt.options.id_loop + ' APoint: ' + temp)

				const cmd = 'G20 P'
				const sendBuf = Buffer.from(cmd + temp + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		recallBPoint: {
			name: 'Recall Loop B Point',
			options: [
				{
					type: 'dropdown',
					id: 'id_loop',
					label: 'Loop ID',
					default: 1,
					choices: LOOP_ID,
				},
			],
			callback: async (LpBPt) => {
				var temp = 0

				if (LpBPt.options.id_loop == 0) {
					temp = self.getVariableValue('Lp0BPoint')
				} else if (LpBPt.options.id_loop == 1) {
					temp = self.getVariableValue('Lp1BPoint')
				} else if (LpBPt.options.id_loop == 2) {
					temp = self.getVariableValue('Lp2BPoint')
				} else if (LpBPt.options.id_loop == 3) {
					temp = self.getVariableValue('Lp3BPoint')
				} else if (LpBPt.options.id_loop == 4) {
					temp = self.getVariableValue('Lp4BPoint')
				} else if (LpBPt.options.id_loop == 5) {
					temp = self.getVariableValue('Lp5BPoint')
				} else if (LpBPt.options.id_loop == 6) {
					temp = self.getVariableValue('Lp6BPoint')
				} else if (LpBPt.options.id_loop == 7) {
					temp = self.getVariableValue('Lp7BPoint')
				} else if (LpBPt.options.id_loop == 8) {
					temp = self.getVariableValue('Lp8BPoint')
				}

				// self.log('debug', 'Loop ID: ' + LpBPt.options.id_loop + ' BPoint Recall: ' + temp)

				const cmd = 'G20 P'
				const sendBuf = Buffer.from(cmd + temp + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}

			}
		},
		recallLoop: {
			name: 'Recall Loop',
			options: [
				{
					type: 'dropdown',
					id: 'id_loop',
					label: 'Loop ID',
					default: 1,
					choices: LOOP_ID,
				},
			],
			callback: async (LpRecall) => {
				var tempA = 0
				var tempB = 0
				var loopActive = self.getVariableValue('LpActive')

				if (LpRecall.options.id_loop == 0) {
					tempA = self.getVariableValue('Lp0APoint')
					tempB = self.getVariableValue('Lp0BPoint')
				} else if (LpRecall.options.id_loop == 1) {
					tempA = self.getVariableValue('Lp1APoint')
					tempB = self.getVariableValue('Lp1BPoint')
				} else if (LpRecall.options.id_loop == 2) {
					tempA = self.getVariableValue('Lp2APoint')
					tempB = self.getVariableValue('Lp2BPoint')
				} else if (LpRecall.options.id_loop == 3) {
					tempA = self.getVariableValue('Lp3APoint')
					tempB = self.getVariableValue('Lp3BPoint')
				} else if (LpRecall.options.id_loop == 4) {
					tempA = self.getVariableValue('Lp4APoint')
					tempB = self.getVariableValue('Lp4BPoint')
				} else if (LpRecall.options.id_loop == 5) {
					tempA = self.getVariableValue('Lp5APoint')
					tempB = self.getVariableValue('Lp5BPoint')
				} else if (LpRecall.options.id_loop == 6) {
					tempA = self.getVariableValue('Lp6APoint')
					tempB = self.getVariableValue('Lp6BPoint')
				} else if (LpRecall.options.id_loop == 7) {
					tempA = self.getVariableValue('Lp7APoint')
					tempB = self.getVariableValue('Lp7BPoint')
				} else if (LpRecall.options.id_loop == 8) {
					tempA = self.getVariableValue('Lp8APoint')
					tempB = self.getVariableValue('Lp8BPoint')
				}


				self.log('debug', 'Active Loop: ' + loopActive)
				if (loopActive == -1) {
					self.setVariableValues({ LpActive: LpRecall.options.id_loop })
					self.checkFeedbacks("LoopStatus")
					const cmd = 'G25 L' + LpRecall.options.id_loop + ' A' + tempA + ' B' + tempB + ' C500 D500'
					const sendBuf = Buffer.from(cmd + '\n', 'latin1')
					const cmd2 = 'G24 L' + LpRecall.options.id_loop + ' N0'
					const sendBuf2 = Buffer.from(cmd2 + '\n', 'latin1')

					if (self.config.prot == 'tcp') {
						self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

						if (self.socket !== undefined && self.socket.isConnected) {
							self.socket.send(sendBuf)
							setTimeout(self.socket.send(sendBuf2), 100)
						} else {
							self.log('debug', 'Socket not connected :(')
						}
					}
				} else {
					self.setVariableValues({ LpActive: -1 })
					const cmd = 'G24'
					const sendBuf = Buffer.from(cmd + '\n', 'latin1')

					if (self.config.prot == 'tcp') {
						self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

						if (self.socket !== undefined && self.socket.isConnected) {
							self.socket.send(sendBuf)
						} else {
							self.log('debug', 'Socket not connected :(')
						}
					}
				}
			}
		},
		
		//Smart Loops
		setLoopRunTimeSmart: {
			name: 'Smart Set Loop Run Time',
			options: [
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Direction',
					default: 1,
					choices: DIRECTION_ID,
				},
			],
			callback: async (runTime) => {
				var runtemp = 0
				var ramptemp = 0
				var loop = self.getVariableValue('CurrentLpSet')
				var lpAPt = self.getVariableValue('CurrentLpA')
				var lpBPt = self.getVariableValue('CurrentLpB')

				runtemp = self.getVariableValue('CurrentLpRun')
				ramptemp = self.getVariableValue('CurrentLpRamp')

				runtemp += runTime.options.direction

				if (runtemp > 600) {
					runtemp = 600;
				} else if (runtemp < 10) {
					runtemp = 10;
				}

				self.log('debug', 'Loop ID: ' + loop + ' RunT: ' + runtemp + ' RampT: ' + ramptemp)

				// var varID = 'Lp'+loop+'RunT'
				// self.log('debug', 'Variable ID: ' + varID)
				// self.setVariable( varID, temp )
				if (loop == 0) {
					self.setVariableValues({ Lp0RunT: runtemp })
				} else if (loop == 1) {
					self.setVariableValues({ Lp1RunT: runtemp })
				} else if (loop == 2) {
					self.setVariableValues({ Lp2RunT: runtemp })
				} else if (loop == 3) {
					self.setVariableValues({ Lp3RunT: runtemp })
				} else if (loop == 4) {
					self.setVariableValues({ Lp4RunT: runtemp })
				} else if (loop == 5) {
					self.setVariableValues({ Lp5RunT: runtemp })
				} else if (loop == 6) {
					self.setVariableValues({ Lp6RunT: runtemp })
				} else if (loop == 7) {
					self.setVariableValues({ Lp7RunT: runtemp })
				} else if (loop == 8) {
					self.setVariableValues({ Lp8RunT: runtemp })
				}
				self.setVariableValues({ CurrentLpRun: runtemp })

				const cmd = 'G25 L'
				const sendBuf = Buffer.from(cmd + loop + ' A' + lpAPt + ' B' + lpBPt + ' T' + runtemp / 10 + ' R' + ramptemp / 10 + ' C500 D500' + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		setLoopRampTimeSmart: {
			name: 'Smart Set Loop Ramp Time',
			options: [
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Direction',
					default: 1,
					choices: DIRECTION_ID,
				},
			],
			callback: async (rampTime) => {
				var ramptemp = 0
				var runtemp = 0
				var loop = self.getVariableValue('CurrentLpSet')
				var lpAPt = self.getVariableValue('CurrentLpA')
				var lpBPt = self.getVariableValue('CurrentLpB')

				runtemp = self.getVariableValue('CurrentLpRun')
				ramptemp = self.getVariableValue('CurrentLpRamp')
				

				ramptemp += rampTime.options.direction

				if (ramptemp > 250) {
					ramptemp = 250;
				} else if (ramptemp < 1) {
					ramptemp = 1;
				}

				self.log('debug', 'Loop ID: ' + loop + ' RunT: ' + runtemp + ' RampT: ' + ramptemp)

				if (loop == 0) {
					self.setVariableValues({ Lp0RampT: ramptemp })
				} else if (loop == 1) {
					self.setVariableValues({ Lp1RampT: ramptemp })
				} else if (loop == 2) {
					self.setVariableValues({ Lp2RampT: ramptemp })
				} else if (loop == 3) {
					self.setVariableValues({ Lp3RampT: ramptemp })
				} else if (loop == 4) {
					self.setVariableValues({ Lp4RampT: ramptemp })
				} else if (loop == 5) {
					self.setVariableValues({ Lp5RampT: ramptemp })
				} else if (loop == 6) {
					self.setVariableValues({ Lp6RampT: ramptemp })
				} else if (loop == 7) {
					self.setVariableValues({ Lp7RampT: ramptemp })
				} else if (loop == 8) {
					self.setVariableValues({ Lp8RampT: ramptemp })
				}
				self.setVariableValues({ CurrentLpRamp: ramptemp })

				const cmd = 'G25 L'
				const sendBuf = Buffer.from(cmd + loop + ' A' + lpAPt + ' B' + lpBPt + ' T' + runtemp / 10 + ' R' + ramptemp / 10 + ' C500 D500' + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		resetLoopRunTimeSmart: {
			name: 'Reset Loop Run Time Smart',
			options: [
				
			],
			callback: async (resetLpRunTime) => {
				var loop = self.getVariableValue('CurrentLpSet')		
				
				var temp = 50;

				if (loop == 0) {
					self.setVariableValues({ Lp0RunT: temp })
				} else if (loop == 1) {
					self.setVariableValues({ Lp1RunT: temp })
				} else if (loop == 2) {
					self.setVariableValues({ Lp2RunT: temp })
				} else if (loop == 3) {
					self.setVariableValues({ Lp3RunT: temp })
				} else if (loop == 4) {
					self.setVariableValues({ Lp4RunT: temp })
				} else if (loop == 5) {
					self.setVariableValues({ Lp5RunT: temp })
				} else if (loop == 6) {
					self.setVariableValues({ Lp6RunT: temp })
				} else if (loop == 7) {
					self.setVariableValues({ Lp7RunT: temp })
				}
				self.setVariableValues({ CurrentLpRun: temp })
			}
		},
		resetLoopRampTimeSmart: {
			name: 'Reset Loop Ramp Time Smart',
			options: [
				
			],
			callback: async (resetLpRampTime) => {
				var loop = self.getVariableValue('CurrentLpSet')	

				var temp = 10;

				if (loop == 0) {
					self.setVariableValues({ Lp0RampT: temp })
				} else if (loop == 1) {
					self.setVariableValues({ Lp1RampT: temp })
				} else if (loop == 2) {
					self.setVariableValues({ Lp2RampT: temp })
				} else if (loop == 3) {
					self.setVariableValues({ Lp3RampT: temp })
				} else if (loop == 4) {
					self.setVariableValues({ Lp4RampT: temp })
				} else if (loop == 5) {
					self.setVariableValues({ Lp5RampT: temp })
				} else if (loop == 6) {
					self.setVariableValues({ Lp6RampT: temp })
				} else if (loop == 7) {
					self.setVariableValues({ Lp7RampT: temp })
				}
				self.setVariableValues({ CurrentLpRamp: temp })
			}
		},
		setLoopAPointSmart: {
			name: 'Smart Set Loop A Point',
			options: [
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Direction',
					default: 1,
					choices: DIRECTION_ID,
				},
			],
			callback: async (runTime) => {
				var ramptemp = 0
				var runtemp = 0
				var loop = self.getVariableValue('CurrentLpSet')
				var lpAPt = self.getVariableValue('CurrentLpA')
				var lpBPt = self.getVariableValue('CurrentLpB')

				runtemp = self.getVariableValue('CurrentLpRun')
				ramptemp = self.getVariableValue('CurrentLpRamp')

				lpAPt += runTime.options.direction

				if (lpAPt > 29) {
					lpAPt = 29;
				} else if (lpAPt < 0) {
					lpAPt = 0;
				}

				self.log('debug', 'Loop ID: ' + loop + ' A Point: ' + lpAPt + ' B Point: ' + lpBPt)

				// var varID = 'Lp'+loop+'RunT'
				// self.log('debug', 'Variable ID: ' + varID)
				// self.setVariable( varID, temp )
				if (loop == 0) {
					self.setVariableValues({ Lp0APoint: lpAPt })
				} else if (loop == 1) {
					self.setVariableValues({ Lp1APoint: lpAPt })
				} else if (loop == 2) {
					self.setVariableValues({ Lp2APoint: lpAPt })
				} else if (loop == 3) {
					self.setVariableValues({ Lp3APoint: lpAPt })
				} else if (loop == 4) {
					self.setVariableValues({ Lp4APoint: lpAPt })
				} else if (loop == 5) {
					self.setVariableValues({ Lp5APoint: lpAPt })
				} else if (loop == 6) {
					self.setVariableValues({ Lp6APoint: lpAPt })
				} else if (loop == 7) {
					self.setVariableValues({ Lp7APoint: lpAPt })
				} 
				self.setVariableValues({ CurrentLpA: lpAPt })

				const cmd = 'G25 L'
				const sendBuf = Buffer.from(cmd + loop + ' A' + lpAPt + ' B' + lpBPt + ' T' + runtemp / 10 + ' R' + ramptemp / 10 + ' C500 D500' + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		setLoopBPointSmart: {
			name: 'Smart Set Loop B Point',
			options: [
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Direction',
					default: 1,
					choices: DIRECTION_ID,
				},
			],
			callback: async (runTime) => {
				var ramptemp = 0
				var runtemp = 0
				var loop = self.getVariableValue('CurrentLpSet')
				var lpAPt = self.getVariableValue('CurrentLpA')
				var lpBPt = self.getVariableValue('CurrentLpB')

				runtemp = self.getVariableValue('CurrentLpRun')
				ramptemp = self.getVariableValue('CurrentLpRamp')

				lpBPt += runTime.options.direction

				if (lpBPt > 29) {
					lpBPt = 29;
				} else if (lpBPt < 0) {
					lpBPt = 0;
				}

				self.log('debug', 'Loop ID: ' + loop + ' A Point: ' + lpAPt + ' B Point: ' + lpBPt)

				// var varID = 'Lp'+loop+'RunT'
				// self.log('debug', 'Variable ID: ' + varID)
				// self.setVariable( varID, temp )
				if (loop == 0) {
					self.setVariableValues({ Lp0BPoint: lpBPt })
				} else if (loop == 1) {
					self.setVariableValues({ Lp1BPoint: lpBPt })
				} else if (loop == 2) {
					self.setVariableValues({ Lp2BPoint: lpBPt })
				} else if (loop == 3) {
					self.setVariableValues({ Lp3BPoint: lpBPt })
				} else if (loop == 4) {
					self.setVariableValues({ Lp4BPoint: lpBPt })
				} else if (loop == 5) {
					self.setVariableValues({ Lp5BPoint: lpBPt })
				} else if (loop == 6) {
					self.setVariableValues({ Lp6BPoint: lpBPt })
				} else if (loop == 7) {
					self.setVariableValues({ Lp7BPoint: lpBPt })
				} 
				self.setVariableValues({ CurrentLpB: lpBPt })

				const cmd = 'G25 L'
				const sendBuf = Buffer.from(cmd + loop + ' A' + lpAPt + ' B' + lpBPt + ' T' + runtemp / 10 + ' R' + ramptemp / 10 + ' C500 D500' + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		recallAPointSmart: {
			name: 'Recall Loop A Point Smart',
			options: [
				
			],
			callback: async (LpAPt) => {
				var temp = 0

				
				temp = self.getVariableValue('CurrentLpA')
				

				// self.log('debug', 'Loop ID: ' + LpAPt.options.id_loop + ' APoint: ' + temp)

				const cmd = 'G20 P'
				const sendBuf = Buffer.from(cmd + temp + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		recallBPointSmart: {
			name: 'Recall Loop B Point Smart',
			options: [
				
			],
			callback: async (LpAPt) => {
				var temp = 0

				
				temp = self.getVariableValue('CurrentLpB')
				

				// self.log('debug', 'Loop ID: ' + LpAPt.options.id_loop + ' APoint: ' + temp)

				const cmd = 'G20 P'
				const sendBuf = Buffer.from(cmd + temp + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		setLoopID: {
			name: 'Set Loop ID',
			options: [
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Direction',
					default: 1,
					choices: DIRECTION_ID,
				},
			],
			callback: async (pst) => {
				var ramptemp = 0
				var runtemp = 0
				var lpApt = 0
				var lpBpt = 0
				var loop = self.getVariableValue('CurrentLpSet')

				
				loop += pst.options.direction
				
				if (loop > 7) {
					loop = 7;
				} else if (loop < 0) {
					loop = 0;
				}
				
				runtemp = self.getVariableValue('Lp' + loop + 'RunT')
				ramptemp = self.getVariableValue('Lp' + loop + 'RampT')
				lpApt = self.getVariableValue('Lp' + loop + 'APoint')
				lpBpt = self.getVariableValue('Lp' + loop + 'BPoint')
				
				self.log('debug', 'Loop ID: ' + loop + ' A: ' + lpApt + ' B: ' + lpBpt + ' RunT: ' + runtemp + ' RampT: ' + ramptemp)

				self.setVariableValues({ CurrentLpSet: loop })
				self.setVariableValues({ CurrentLpRun: runtemp })
				self.setVariableValues({ CurrentLpRamp: ramptemp })
				self.setVariableValues({ CurrentLpA: lpApt })
				self.setVariableValues({ CurrentLpB: lpBpt })

				self.checkFeedbacks("SetLoopSmart")

				
			}
		},
		saveLpSmart: {
			name: 'Save Loop Smart',
			options: [
			
			],
			callback: async (setLoop) => {
				var ramptemp = 0
				var runtemp = 0
				var loop = self.getVariableValue('CurrentLpSet')
				var lpAPt = self.getVariableValue('CurrentLpA')
				var lpBPt = self.getVariableValue('CurrentLpB')

				runtemp = self.getVariableValue('CurrentLpRun')
				ramptemp = self.getVariableValue('CurrentLpRamp')

				const cmd = 'G25 L'
				const sendBuf = Buffer.from(cmd + loop + ' A' + lpAPt + ' B' + lpBPt + ' T' + runtemp / 10 + ' R' + ramptemp / 10 + ' C500 D500' + '\n', 'latin1')

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
		recallLpSmart: {
			name: 'Recall Loop Smart',
			options: [
				
			],
			callback: async (recallLoop) => {
				var loop = self.getVariableValue('CurrentLpSet')
				var loopActive = self.getVariableValue('LpActive')

				if (loopActive == -1) {
					self.setVariableValues({ LpActive: loop })
					self.checkFeedbacks("LoopStatus")
					const cmd = 'G24 L'

					const sendBuf = Buffer.from(cmd + loop + '\n', 'latin1')

					if (self.config.prot == 'tcp') {
						self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

						if (self.socket !== undefined && self.socket.isConnected) {
							self.socket.send(sendBuf)
						} else {
							self.log('debug', 'Socket not connected :(')
						}
					}
				} else {
					self.setVariableValues({ LpActive: -1 })
					self.checkFeedbacks("LoopStatus")
					const cmd = 'G24'

					const sendBuf = Buffer.from(cmd + '\n', 'latin1')

					if (self.config.prot == 'tcp') {
						self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

						if (self.socket !== undefined && self.socket.isConnected) {
							self.socket.send(sendBuf)
						} else {
							self.log('debug', 'Socket not connected :(')
						}
					}
				}
			},
		},


		homeRS: {
			name: 'Center RS',
			options: [
				{
					type: 'dropdown',
					id: 'id_end',
					label: 'Command End Character:',
					default: '\n',
					choices: CHOICES_END,
				},
			],
			callback: async (centerRS) => {
				const cmd = 'G202'
				const sendBuf = Buffer.from(cmd + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		calibrateAllTN: {
			name: 'Calibrate All TN',
			options: [
			],
			callback: async (centerRS) => {
				const cmd = 'G812 C0'
				const sendBuf = Buffer.from(cmd + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		calibrateTNMotor: {
			name: 'Calibrate TN Motor',
			options: [
				{
					type: 'dropdown',
					id: 'id_mot',
					label: 'Motor ID',
					default: 5,
					choices: TN_MOTOR_ID,
				},
			],
			callback: async (calTN) => {
				const cmd = 'G812 C0 M' + (calTN.options.id_mot-4)
				const sendBuf = Buffer.from(cmd + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		
		//Limits
		setStopA: {
			name: 'Set Stop A',
			options: [
				{
					type: 'dropdown',
					id: 'id_mot',
					label: 'Motor ID',
					default: 1,
					choices: MOTOR_ID,
				},
			],
			callback: async (stopA) => {		
				const cmd = 'G213 M' + stopA.options.id_mot
				const sendBuf = Buffer.from(cmd + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		setStopB: {
			name: 'Set Stop B',
			options: [
				{
					type: 'dropdown',
					id: 'id_mot',
					label: 'Motor ID',
					default: 1,
					choices: MOTOR_ID,
				},
			],
			callback: async (stopB) => {
				const cmd = 'G214 M' + stopB.options.id_mot
				const sendBuf = Buffer.from(cmd + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		recallStopA: {
			name: 'Recall Stop A',
			options: [
				{
					type: 'dropdown',
					id: 'id_mot',
					label: 'Motor ID',
					default: 1,
					choices: MOTOR_ID,
				},
			],
			callback: async (recStopA) => {
				const cmd = 'G217'
				const sendBuf = Buffer.from(cmd + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		recallStopB: {
			name: 'Recall Stop B',
			options: [
				{
					type: 'dropdown',
					id: 'id_mot',
					label: 'Motor ID',
					default: 1,
					choices: MOTOR_ID,
				},
			],
			callback: async (recStopB) => {
				const cmd = 'G218'
				const sendBuf = Buffer.from(cmd + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		clearStopA: {
			name: 'Clear Stop A',
			options: [
				{
					type: 'dropdown',
					id: 'id_mot',
					label: 'Motor ID',
					default: 1,
					choices: MOTOR_ID,
				},
			],
			callback: async (stopA) => {
				const cmd = 'G211 M' + stopA.options.id_mot
				const sendBuf = Buffer.from(cmd + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		clearStopB: {
			name: 'Clear Stop B',
			options: [
				{
					type: 'dropdown',
					id: 'id_mot',
					label: 'Motor ID',
					default: 1,
					choices: MOTOR_ID,
				},
			],
			callback: async (stopB) => {
				const cmd = 'G212 M' + stopB.options.id_mot
				const sendBuf = Buffer.from(cmd + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		clearStopByAxis: {
			name: 'Clear Stops by Axis',
			options: [
				{
					type: 'dropdown',
					id: 'id_mot',
					label: 'Motor ID',
					default: 1,
					choices: MOTOR_ID,
				},
			],
			callback: async (stopB) => {				
				const cmd = 'G219 M' + stopB.options.id_mot
				const sendBuf = Buffer.from(cmd + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		clearAllStops: {
			name: 'Clear All Stops',
			options: [
				
			],
			callback: async (stopB) => {				
				const cmd = 'G211 M0'
				const sendBuf = Buffer.from(cmd + '\n', 'latin1')
				const cmd2 = 'G212 M0'
				const sendBuf2 = Buffer.from(cmd2 + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
						setTimeout(self.socket.send(sendBuf2), 10)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		zeroMotors: {
			name: 'Zero Motors',
			options: [
				
			],
			callback: async (zero) => {				
				const cmd = 'G201'
				const sendBuf = Buffer.from(cmd + '\n', 'latin1')
				

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},

		//Smart Motor Setup
		setMotorID: {
			name: 'Set Motor ID',
			options: [
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Direction',
					default: 1,
					choices: DIRECTION_ID,
				},
			],
			callback: async (pst) => {
				
				var motor = self.getVariableValue('CurrentMtrSet')
				var motorName = self.getVariableValue('CurrentMtrStr')
				var motorSpeed = 0
				var motorInvert = 0
				var motorPosName = ''
				var motorNegName = ''
				var motorInvertName = ''

				motor += pst.options.direction
				
				if (motor > 9) {
					motor = 9;
				} else if (motor < 1) {
					motor = 1;
				}

				if (motor == 1) {
					motorName = 'Pan'
					motorSpeed = self.getVariableValue('PanSpeed')
					motorInvert = self.getVariableValue('PanInversion')
					motorPosName = motorName + ' Left'
					motorNegName = motorName + ' Right'
				} else if (motor == 2) {
					motorName = 'Tilt'
					motorSpeed = self.getVariableValue('TiltSpeed')
					motorInvert = self.getVariableValue('TiltInversion')
					motorPosName = motorName + ' Down'
					motorNegName = motorName + ' Up'
				} else if (motor == 3) {
					motorName = 'Slide'
					motorSpeed = self.getVariableValue('M3Speed')
					motorInvert = self.getVariableValue('M3Inversion')
					motorPosName = motorName + ' Pos'
					motorNegName = motorName + ' Neg'
				} else if (motor == 4) {
					motorName = 'M4'
					motorSpeed = self.getVariableValue('M4Speed')
					motorInvert = self.getVariableValue('M4Inversion')
					motorPosName = motorName + ' Pos'
					motorNegName = motorName + ' Neg'
				} else if (motor == 5) {
					motorName = 'Focus'
					motorSpeed = self.getVariableValue('TN1Speed')
					motorInvert = self.getVariableValue('TN1Inversion')
					motorPosName = motorName + ' Pos'
					motorNegName = motorName + ' Neg'
				} else if (motor == 6) {
					motorName = 'Iris'
					motorSpeed = self.getVariableValue('TN2Speed')
					motorInvert = self.getVariableValue('TN2Inversion')
					motorPosName = motorName + ' Pos'
					motorNegName = motorName + ' Neg'
				} else if (motor == 7) {
					motorName = 'Zoom'
					motorSpeed = self.getVariableValue('TN3Speed')
					motorInvert = self.getVariableValue('TN3Inversion')
					motorPosName = motorName + ' Pos'
					motorNegName = motorName + ' Neg'
				} else if (motor == 8) {
					motorName = 'Roll'
					motorSpeed = self.getVariableValue('RollSpeed')
					motorInvert = self.getVariableValue('RollInversion')
					motorPosName = motorName + ' Pos'
					motorNegName = motorName + ' Neg'
				} else if (motor == 9) {
					motorName = 'RS Focus'
					motorSpeed = self.getVariableValue('FocusSpeed')
					motorInvert = self.getVariableValue('FocusInversion')
					motorPosName = motorName + ' Pos'
					motorNegName = motorName + ' Neg'
				}

				if (motorInvert == 1) {
					motorInvertName = 'Normal'
				} else {
					motorInvertName = 'Inverted'
				}

				self.setVariableValues({ CurrentMtrSet: motor })
				self.setVariableValues({ CurrentMtrStr: motorName })
				self.setVariableValues({ CurrentMtrPosStr: motorPosName })
				self.setVariableValues({ CurrentMtrNegStr: motorNegName })
				self.setVariableValues({ CurrentMtrSpeed: motorSpeed})
				self.setVariableValues({ CurrentMtrInversion: motorInvertName})
				
				self.checkFeedbacks("StopAStatusSmart")
				self.checkFeedbacks("StopBStatusSmart")
			}
		},
		setStopASmart: {
			name: 'Set Stop A Smart',
			options: [
				
			],
			callback: async (stopA) => {		
				var motor = self.getVariableValue('CurrentMtrSet')
				const cmd = 'G213 M' + motor
				const sendBuf = Buffer.from(cmd + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		setStopBSmart: {
			name: 'Set Stop B Smart',
			options: [
				
			],
			callback: async (stopB) => {
				var motor = self.getVariableValue('CurrentMtrSet')
				const cmd = 'G214 M' + motor
				const sendBuf = Buffer.from(cmd + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		clearStopASmart: {
			name: 'Clear Stop A Smart',
			options: [
				
			],
			callback: async (stopA) => {
				var motor = self.getVariableValue('CurrentMtrSet')
				const cmd = 'G211 M' + motor
				const sendBuf = Buffer.from(cmd + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		clearStopBSmart: {
			name: 'Clear Stop B Smart',
			options: [
				
			],
			callback: async (stopB) => {
				var motor = self.getVariableValue('CurrentMtrSet')
				const cmd = 'G212 M' + motor
				const sendBuf = Buffer.from(cmd + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		clearStopByAxisSmart: {
			name: 'Clear Stops by Axis Smart',
			options: [
				
			],
			callback: async (stopB) => {				
				var motor = self.getVariableValue('CurrentMtrSet')
				const cmd = 'G219 M' + motor
				const sendBuf = Buffer.from(cmd + '\n', 'latin1')

				if (self.config.prot == 'tcp') {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					} else {
						self.log('debug', 'Socket not connected :(')
					}
				}
			}
		},
		setJogSpeedSmart: {
			name: 'Set Motor Jog Speed Smart',
			options: [
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Direction',
					default: 1,
					choices: DIRECTION_ID,
				},
			],
			callback: async (jogSpeed) => {
				var motor = self.getVariableValue('CurrentMtrSet')
				var motorSpeed = self.getVariableValue('CurrentMtrSpeed')

				

				motorSpeed += jogSpeed.options.direction

				if (motorSpeed > 100) {
					motorSpeed = 100;
				} else if (motorSpeed < 0) {
					motorSpeed = 0;
				}

				self.log('debug', 'Motor ID: ' + motor + ' Speed: ' + motorSpeed)

				if (motor == 1) {
					self.setVariableValues({ PanSpeed: motorSpeed })
				} else if (motor == 2) {
					self.setVariableValues({ TiltSpeed: motorSpeed })
				} else if (motor == 3) {
					self.setVariableValues({ M3Speed: motorSpeed })
				} else if (motor == 4) {
					self.setVariableValues({ M4Speed: motorSpeed })
				} else if (motor == 5) {
					self.setVariableValues({ TN1Speed: motorSpeed })
				} else if (motor == 6) {
					self.setVariableValues({ TN2Speed: motorSpeed })
				} else if (motor == 7) {
					self.setVariableValues({ TN3Speed: motorSpeed })
				} else if (motor == 8) {
					self.setVariableValues({ RollSpeed: motorSpeed })
				} else if (motor == 9) {
					self.setVariableValues({ FocusSpeed: motorSpeed })
				}

				self.setVariableValues({ CurrentMtrSpeed: motorSpeed })

			}
		},
		resetJogSpeedSmart: {
			name: 'Reset Motor Jog Speed Smart',
			options: [
				
			],
			callback: async (resetSpeed) => {
				var motor = self.getVariableValue('CurrentMtrSet')
				if (motor == 1) {
					self.setVariableValues({ PanSpeed: 100 })
					self.setVariableValues({ CurrentMtrSpeed: 100 })
				} else if (motor == 2) {
					self.setVariableValues({ TiltSpeed: 100 })
					self.setVariableValues({ CurrentMtrSpeed: 100 })
				} else if (motor == 3) {
					self.setVariableValues({ M3Speed: 100 })
					self.setVariableValues({ CurrentMtrSpeed: 100 })
				} else if (motor == 4) {
					self.setVariableValues({ M4Speed: 100 })
					self.setVariableValues({ CurrentMtrSpeed: 100 })
				} else if (motor == 5) {
					self.setVariableValues({ TN1Speed: 25 })
					self.setVariableValues({ CurrentMtrSpeed: 25 })
				} else if (motor == 6) {
					self.setVariableValues({ TN2Speed: 25 })
					self.setVariableValues({ CurrentMtrSpeed: 25 })
				} else if (motor == 7) {
					self.setVariableValues({ TN3Speed: 25 })
					self.setVariableValues({ CurrentMtrSpeed: 25 })
				} else if (motor == 8) {
					self.setVariableValues({ RollSpeed: 100 })
					self.setVariableValues({ CurrentMtrSpeed: 100 })
				}

			}
		},
		jogMotorSmarter: {
			name: 'Motor Jog Smarter',
			options: [
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
				var motorInversion = 1
				var temp = 0

				var motor = self.getVariableValue('CurrentMtrSet')

				if (cmd != '') {

					if (motor == 1) {
						temp = self.getVariableValue('PanSpeed')
						motorInversion = self.getVariableValue('PanInversion')
					} else if (motor == 2) {
						temp = self.getVariableValue('TiltSpeed')
						motorInversion = self.getVariableValue('TiltInversion')
					} else if (motor == 3) {
						temp = self.getVariableValue('M3Speed')
						motorInversion = self.getVariableValue('M3Inversion')
					} else if (motor == 4) {
						temp = self.getVariableValue('M4Speed')
						motorInversion = self.getVariableValue('M4Inversion')
					} else if (motor == 5) {
						temp = self.getVariableValue('TN1Speed')
						motorInversion = self.getVariableValue('TN1Inversion')
					} else if (motor == 6) {
						temp = self.getVariableValue('TN2Speed')
						motorInversion = self.getVariableValue('TN2Inversion')
					} else if (motor == 7) {
						temp = self.getVariableValue('TN3Speed')
						motorInversion = self.getVariableValue('TN3Inversion')
					} else if (motor == 8) {
						temp = self.getVariableValue('RollSpeed')
						motorInversion = self.getVariableValue('RollInversion')
					} else if (motor == 9) {
						temp = self.getVariableValue('FocusSpeed')
						motorInversion = self.getVariableValue('FocusInversion')
					}

					if (motor < 5 || motor == 8) {
						motorSpeed = motorInversion * actionJogSmart.options.direction * temp / 100.0 * 500.0
					} else {
						motorSpeed = motorInversion * actionJogSmart.options.direction * temp / 100.0 * 100.0
					}

					self.log('debug', 'Temp: ' + temp + ' Motor Speed: ' + motorSpeed)

					/*
					 * create a binary buffer pre-encoded 'latin1' (8bit no change bytes)
					 * sending a string assumes 'utf8' encoding
					 * which then escapes character values over 0x7F
					 * and destroys the 'binary' content
					 */
					const sendBuf = Buffer.from(cmd + motor + cmd2 + motorSpeed + cmd3, 'latin1')

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
		stopCurrentMotor: {
			name: 'Stop Current Motor',
			options: [
				
			],
			callback: async (actionJogSmart) => {
				const cmd = 'G301 M'
				const cmd2 = ' V0'
				const cmd3 = '\n'
				var motorSpeed = 0
				var temp = 0

				var motor = self.getVariableValue('CurrentMtrSet')

				if (cmd != '') {
					/*
					 * create a binary buffer pre-encoded 'latin1' (8bit no change bytes)
					 * sending a string assumes 'utf8' encoding
					 * which then escapes character values over 0x7F
					 * and destroys the 'binary' content
					 */
					const sendBuf = Buffer.from(cmd + motor + cmd2 + cmd3, 'latin1')

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
		invertCurrentAxis: {
			name: 'Invert Current Motor',
			options: [
				
			],
			callback: async (invertAxis) => {
				var motor = self.getVariableValue('CurrentMtrSet')
				var motorInvertName = ''
				var inversionState = 0
				

				if (motor == 1) {
					inversionState = self.getVariableValue('PanInversion')
					inversionState *= -1
					self.setVariableValues({ PanInversion: inversionState })
				} else if (motor == 2) {
					inversionState = self.getVariableValue('TiltInversion')
					inversionState *= -1
					self.setVariableValues({ TiltInversion: inversionState })
				} else if (motor == 3) {
					inversionState = self.getVariableValue('M3Inversion')
					inversionState *= -1
					self.setVariableValues({ M3Inversion: inversionState })
				} else if (motor == 4) {
					inversionState = self.getVariableValue('M4Inversion')
					inversionState *= -1
					self.setVariableValues({ M4Inversion: inversionState })
				} else if (motor == 5) {
					inversionState = self.getVariableValue('TN1Inversion')
					inversionState *= -1
					self.setVariableValues({ TN1Inversion: inversionState })
				} else if (motor == 6) {
					inversionState = self.getVariableValue('TN2Inversion')
					inversionState *= -1
					self.setVariableValues({ TN2Inversion: inversionState })
				} else if (motor == 7) {
					inversionState = self.getVariableValue('TN3Inversion')
					inversionState *= -1
					self.setVariableValues({ TN3Inversion: inversionState })
				} else if (motor == 8) {
					inversionState = self.getVariableValue('RollInversion')
					inversionState *= -1
					self.setVariableValues({ RollInversion: inversionState })
				} else if (motor == 9) {
					inversionState = self.getVariableValue('FocusInversion')
					inversionState *= -1
					self.setVariableValues({ FocusInversion: inversionState })
				}

				if (inversionState == 1) {
					motorInvertName = 'Normal'
				} else {
					motorInvertName = 'Inverted'
				}

				self.setVariableValues({ CurrentMtrInversion: motorInvertName})
			},
		},
		//These are already general commands without a motor ID
		// recallStopA: {
		// 	name: 'Recall Stop A Smart',
		// 	options: [
		// 		{
		// 			type: 'dropdown',
		// 			id: 'id_mot',
		// 			label: 'Motor ID',
		// 			default: 1,
		// 			choices: MOTOR_ID,
		// 		},
		// 	],
		// 	callback: async (recStopA) => {
		// 		const cmd = 'G217'
		// 		const sendBuf = Buffer.from(cmd + '\n', 'latin1')

		// 		if (self.config.prot == 'tcp') {
		// 			self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

		// 			if (self.socket !== undefined && self.socket.isConnected) {
		// 				self.socket.send(sendBuf)
		// 			} else {
		// 				self.log('debug', 'Socket not connected :(')
		// 			}
		// 		}
		// 	}
		// },
		// recallStopB: {
		// 	name: 'Recall Stop B Smart',
		// 	options: [
		// 		{
		// 			type: 'dropdown',
		// 			id: 'id_mot',
		// 			label: 'Motor ID',
		// 			default: 1,
		// 			choices: MOTOR_ID,
		// 		},
		// 	],
		// 	callback: async (recStopB) => {
		// 		const cmd = 'G218'
		// 		const sendBuf = Buffer.from(cmd + '\n', 'latin1')

		// 		if (self.config.prot == 'tcp') {
		// 			self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

		// 			if (self.socket !== undefined && self.socket.isConnected) {
		// 				self.socket.send(sendBuf)
		// 			} else {
		// 				self.log('debug', 'Socket not connected :(')
		// 			}
		// 		}
		// 	}
		// },


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
