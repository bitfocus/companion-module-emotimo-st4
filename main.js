const { InstanceBase, Regex, runEntrypoint, InstanceStatus, TCPHelper } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
// const UpdatePresets = require('./presets')

const presets = require('./presets')

const config = require('./config')
const { MODELS } = require('./models.js')

class eMotimoModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		// Assign the methods from the listed files to this class
		Object.assign(this, {
			// 	...config,
			// 	...UpdateActions,
			// 	...UpdateFeedbacks,
			// ...UpdateVariableDefinitions,
			...presets,
		})
	}

	async init(config) {
		this.config = config
		this.log('debug', 'Instance Init');
		// this.updateStatus(InstanceStatus.Ok)

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
		// this.updatePresets()

		await this.configUpdated(config)
	}
	// When module gets deleted
	async destroy() {
		this.log('debug', 'destroy')
	}

	async configUpdated(config) {
		this.log('debug', "Config Updated");

		if (this.socket) {
			this.socket.destroy()
			delete this.socket
		}

		//These aren't visible to user declare in variable.js instead
		// this.presetRunTimes = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50];
		// this.presetRampTimes = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
		// this.presetStatus = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

		this.config = config

		this.config.host = this.config.host || ''
		this.config.port = this.config.port || 5000
		this.config.model = this.config.model || 'ST4'
		this.config.interval = this.config.interval || 5000
		this.config.prot = 'tcp'

		if (this.config.prot == 'tcp') {
			this.init_tcp()

			this.init_tcp_variables()
		}

		this.init_emotimo_variables() //Moved this all to variables.js
		this.initPresets()
	}

	// // Return config fields for web config
	// getConfigFields() {
	// 	return [
	// 		{
	// 			type: 'textinput',
	// 			id: 'host',
	// 			label: 'Target IP',
	// 			width: 8,
	// 			regex: Regex.IP,
	// 		},
	// 		{
	// 			type: 'textinput',
	// 			id: 'port',
	// 			label: 'Target Port',
	// 			width: 4,
	// 			regex: Regex.PORT,
	// 		},
	// 	]
	// }
	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value:
					"This module controls the ST4, ST4.3 and SA2.6",
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'Target IP',
				width: 4,
				regex: Regex.IP,
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Target Port',
				width: 4,
				default: 5000,
				regex: Regex.PORT,
			},
			{
				type: 'dropdown',
				id: 'prot',
				label: 'Connect with TCP / UDP',
				default: 'tcp',
				choices: [
					{ id: 'tcp', label: 'TCP' },
					{ id: 'udp', label: 'UDP' },
				],
			},
			{
				type: 'static-text',
				id: 'modelInfo',
				width: 12,
				label: 'Camera Model',
				value: 'Please Select the camera model.',
			},
			{
				type: 'dropdown',
				id: 'model',
				label: 'Select Your Camera Model',
				width: 6,
				default: MODELS[0].id,
				choices: MODELS,
				minChoicesForSearch: 5,
			},
			// {
			// 	type: 'static-text',
			// 	id: 'intervalInfo',
			// 	width: 12,
			// 	label: 'Update Interval',
			// 	value:
			// 		'Please enter the amount of time in milliseconds to request new information from the camera. Set to 0 to disable.',
			// },
			// {
			// 	type: 'textinput',
			// 	id: 'interval',
			// 	label: 'Update Interval',
			// 	width: 3,
			// 	default: 5000,
			// },
			{
				type: 'static-text',
				id: 'dummy2',
				width: 12,
				label: ' ',
				value: ' ',
			},
		]
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}

	updatePresets() {
		UpdatePresets(this)
	}

	sendEmotimoAPICommand = function (str) {
		var self = this;

		const sendBuf = Buffer.from(str, 'latin1')

		if (self.config.prot == 'tcp') {
			self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

			if (self.socket !== undefined && self.socket.isConnected) {
				self.socket.send(sendBuf)
			} else {
				self.log('debug', 'Socket not connected :(')
			}
		}
	};

	handleTCPResponse = function (dataPacket) {
		var tokens = dataPacket.toString().split(':')

		this.log('debug', "Parse:" + tokens[0]);
		switch (tokens[0]) {
			case 'Positions':
				var data = tokens[1].split(',')
				// this.log('debug', "Position Update:" + data[0] + ":" + data[1]); //Data[0] has movement flags led by a space data[1] is Pan Position
				this.setVariableValues({ PPos: Number(data[1])})
				this.setVariableValues({ TPos: Number(data[2])})
				this.setVariableValues({ SPos: Number(data[3])})
				this.setVariableValues({ MPos: Number(data[4])})
				this.setVariableValues({ FPos: Number(data[5])})
				this.setVariableValues({ IPos: Number(data[6])})
				this.setVariableValues({ ZPos: Number(data[7])})
				// this.setVariableValues({ RPos: Number(data[8])})
				break
			case 'Preset Set':
				var data = tokens[1].split(' ')
				this.log('debug', "ID:" + data[0] + ":" + data[1]); //Data[0] is empty there is a space here
				switch (data[1]) {
					case '0':
						this.setVariableValues({ Pst0Stat: 1 })
						break
					case '1':
						this.setVariableValues({ Pst1Stat: 1 })
						break
					case '2':
						this.setVariableValues({ Pst2Stat: 1 })
						break
					case '3':
						this.setVariableValues({ Pst3Stat: 1 })
						break
					case '4':
						this.setVariableValues({ Pst4Stat: 1 })
						break
					case '5':
						this.setVariableValues({ Pst5Stat: 1 })
						break
					case '6':
						this.setVariableValues({ Pst6Stat: 1 })
						break
					case '7':
						this.setVariableValues({ Pst7Stat: 1 })
						break
					case '8':
						this.setVariableValues({ Pst8Stat: 1 })
						break
					case '9':
						this.setVariableValues({ Pst9Stat: 1 })
						break
					case '10':
						this.setVariableValues({ Pst10Stat: 1 })
						break
					case '11':
						this.setVariableValues({ Pst11Stat: 1 })
						break
					case '12':
						this.setVariableValues({ Pst12Stat: 1 })
						break
					case '13':
						this.setVariableValues({ Pst13Stat: 1 })
						break
					case '14':
						this.setVariableValues({ Pst14Stat: 1 })
						break
					case '15':
						this.setVariableValues({ Pst15Stat: 1 })
						break
					case '16':
						this.setVariableValues({ Pst16Stat: 1 })
						break
					case '17':
						this.setVariableValues({ Pst17Stat: 1 })
						break
					case '18':
						this.setVariableValues({ Pst18Stat: 1 })
						break
					case '19':
						this.setVariableValues({ Pst19Stat: 1 })
						break
					case '20':
						this.setVariableValues({ Pst20Stat: 1 })
						break
					case '21':
						this.setVariableValues({ Pst21Stat: 1 })
						break
					case '22':
						this.setVariableValues({ Pst22Stat: 1 })
						break
					case '23':
						this.setVariableValues({ Pst23Stat: 1 })
						break
					case '24':
						this.setVariableValues({ Pst24Stat: 1 })
						break
					case '25':
						this.setVariableValues({ Pst25Stat: 1 })
						break
					case '26':
						this.setVariableValues({ Pst26Stat: 1 })
						break
					case '27':
						this.setVariableValues({ Pst27Stat: 1 })
						break
					case '28':
						this.setVariableValues({ Pst28Stat: 1 })
						break
					case '29':
						this.setVariableValues({ Pst29Stat: 1 })
						break
					case '30':
						this.setVariableValues({ Pst30Stat: 1 })
						break
					default:
						break
				}
				this.checkFeedbacks("SetPreset")
				this.checkFeedbacks("SetPresetSmart")
				break
			case 'Exiting Loop':
				this.setVariableValues({ LpActive: -1 })
				this.checkFeedbacks("LoopStatus")
				break
			case 'Stop All Initiated':
				this.setVariableValues({ LpActive: -1 })
				this.checkFeedbacks("LoopStatus")
				break
			case 'Reset Stops':
				var data = tokens[1]
				this.log('debug', "Motor:" + data); //Data[0] is empty there is a space here
				if (data == 1) {
					this.setVariableValues({ PanStopA: 0 })
					this.setVariableValues({ PanStopB: 0 })
					this.log('debug', "Pan Cleared");
				} else if (data == 2) {
					this.setVariableValues({ TiltStopA: 0 })
					this.setVariableValues({ TiltStopB: 0 })
				} else if (data == 3) {
					this.setVariableValues({ M3StopA: 0 })
					this.setVariableValues({ M3StopB: 0 })
				} else if (data == 4) {
					this.setVariableValues({ M4StopA: 0 })
					this.setVariableValues({ M4StopB: 0 })
				} else if (data == 5) {
					this.setVariableValues({ TNFocusStopA: 0 })
					this.setVariableValues({ TNFocusStopB: 0 })
				} else if (data == 6) {
					this.setVariableValues({ TNIrisStopA: 0 })
					this.setVariableValues({ TNIrisStopB: 0 })
				} else if (data == 7) {
					this.setVariableValues({ TNZoomStopA: 0 })
					this.setVariableValues({ TNZoomStopB: 0 })
				} else if (data == 8) {
					this.setVariableValues({ RSRollStopA: 0 })
					this.setVariableValues({ RSRollStopB: 0 })
				} else if (data == 9) {
					this.setVariableValues({ RSFocusStopA: 0 })
					this.setVariableValues({ RSFocusStopB: 0 })
				} else {
					this.log('debug', "Error");
				}
				this.checkFeedbacks("StopAStatus")
				this.checkFeedbacks("StopBStatus")
				this.checkFeedbacks("StopAStatusSmart")
				this.checkFeedbacks("StopBStatusSmart")
				break
			case 'StopA':
				var data = tokens[1].split(',')
				this.log('debug', "ID:" + data[0] + ":" + data[1]); //Data[0] is empty there is a space here
				var motor = data[0]
				var position = data[1]
				if (position != "-2000000000") {
					if (motor == 1) {
						this.setVariableValues({ PanStopA: 1 })
					} else if (motor == 2) {
						this.setVariableValues({ TiltStopA: 1 })
					} else if (motor == 3) {
						this.setVariableValues({ M3StopA: 1 })
					} else if (motor == 4) {
						this.setVariableValues({ M4StopA: 1 })
					} else if (motor == 5) {
						this.setVariableValues({ TNFocusStopA: 1 })
					} else if (motor == 6) {
						this.setVariableValues({ TNIrisStopA: 1 })
					} else if (motor == 7) {
						this.setVariableValues({ TNZoomStopA: 1 })
					} else if (motor == 8) {
						this.setVariableValues({ RSRollStopA: 1 })
					} else if (motor == 9) {
						this.setVariableValues({ RSFocusStopA: 1 })
					}
				} else {
					if (motor == 1) {
						this.setVariableValues({ PanStopA: 0 })
					} else if (motor == 2) {
						this.setVariableValues({ TiltStopA: 0 })
					} else if (motor == 3) {
						this.setVariableValues({ M3StopA: 0 })
					} else if (motor == 4) {
						this.setVariableValues({ M4StopA: 0 })
					} else if (motor == 5) {
						this.setVariableValues({ TNFocusStopA: 0 })
					} else if (motor == 6) {
						this.setVariableValues({ TNIrisStopA: 0 })
					} else if (motor == 7) {
						this.setVariableValues({ TNZoomStopA: 0 })
					} else if (motor == 8) {
						this.setVariableValues({ RSRollStopA: 0 })
					} else if (motor == 9) {
						this.setVariableValues({ RSFocusStopA: 0 })
					}
				}
				this.checkFeedbacks("StopAStatus")	
				this.checkFeedbacks("StopAStatusSmart")
				break
			case 'StopB':
				var data = tokens[1].split(',')
				this.log('debug', "ID:" + data[0] + ":" + data[1]); //Data[0] is empty there is a space here
				var motor = data[0]
				var position = data[1]
				if (position != "-2000000000") {
					if (motor == 1) {
						this.setVariableValues({ PanStopB: 1 })
					} else if (motor == 2) {
						this.setVariableValues({ TiltStopB: 1 })
					} else if (motor == 3) {
						this.setVariableValues({ M3StopB: 1 })
					} else if (motor == 4) {
						this.setVariableValues({ M4StopB: 1 })
					} else if (motor == 5) {
						this.setVariableValues({ TNFocusStopB: 1 })
					} else if (motor == 6) {
						this.setVariableValues({ TNIrisStopB: 1 })
					} else if (motor == 7) {
						this.setVariableValues({ TNZoomStopB: 1 })
					} else if (motor == 8) {
						this.setVariableValues({ RSRollStopB: 1 })
					} else if (motor == 9) {
						this.setVariableValues({ RSFocusStopB: 1 })
					}
				} else {
					if (motor == 1) {
						this.setVariableValues({ PanStopB: 0 })
					} else if (motor == 2) {
						this.setVariableValues({ TiltStopB: 0 })
					} else if (motor == 3) {
						this.setVariableValues({ M3StopB: 0 })
					} else if (motor == 4) {
						this.setVariableValues({ M4StopB: 0 })
					} else if (motor == 5) {
						this.setVariableValues({ TNFocusStopB: 0 })
					} else if (motor == 6) {
						this.setVariableValues({ TNIrisStopB: 0 })
					} else if (motor == 7) {
						this.setVariableValues({ TNZoomStopB: 0 })
					} else if (motor == 8) {
						this.setVariableValues({ RSRollStopB: 0 })
					} else if (motor == 9) {
						this.setVariableValues({ RSFocusStopB: 0 })
					}
				}
				this.checkFeedbacks("StopBStatus")
				this.checkFeedbacks("StopBStatusSmart")
				break
			case 'All Stops Cleared':
				this.setVariableValues({ PanStopA: 0 })
				this.setVariableValues({ PanStopB: 0 })
				this.setVariableValues({ TiltStopA: 0 })
				this.setVariableValues({ TiltStopB: 0 })
				this.setVariableValues({ M3StopA: 0 })
				this.setVariableValues({ M3StopB: 0 })
				this.setVariableValues({ M4StopA: 0 })
				this.setVariableValues({ M4StopB: 0 })
				this.setVariableValues({ TNFocusStopA: 0 })
				this.setVariableValues({ TNFocusStopB: 0 })
				this.setVariableValues({ TNIrisStopA: 0 })
				this.setVariableValues({ TNIrisStopB: 0 })
				this.setVariableValues({ TNZoomStopA: 0 })
				this.setVariableValues({ TNZoomStopB: 0 })
				this.setVariableValues({ RSRollStopA: 0 })
				this.setVariableValues({ RSRollStopB: 0 })
				this.setVariableValues({ RSFocusStopA: 0 })
				this.setVariableValues({ RSFocusStopB: 0 })
				this.checkFeedbacks("StopAStatus")
				this.checkFeedbacks("StopBStatus")
				this.checkFeedbacks("StopAStatusSmart")
				this.checkFeedbacks("StopBStatusSmart")
				break
			default:
				break
		}
	}

	init_tcp() {
		this.log('debug', "Init TCP");
		if (this.socket) {
			this.socket.destroy()
			delete this.socket
		}

		this.updateStatus(InstanceStatus.Connecting)

		if (this.config.host) {
			this.log('debug', "Opening TCP:" + this.config.host.toString() + ":" + this.config.port.toString());
			this.socket = new TCPHelper(this.config.host, this.config.port)

			this.socket.on('status_change', (status, message) => {
				this.updateStatus(status, message)
			})

			this.socket.on('error', (err) => {
				this.updateStatus(InstanceStatus.ConnectionFailure, err.message)
				this.log('error', 'Network error: ' + err.message)
			})

			this.socket.on('data', (data) => {
				this.log('debug', data.toString());
				if (this.config.saveresponse) {
					let dataResponse = data

					if (this.config.convertresponse == 'string') {
						dataResponse = data.toString()
					} else if (this.config.convertresponse == 'hex') {
						dataResponse = data.toString('hex')
					}

					this.setVariableValues({ tcp_response: dataResponse })

				}
				//Insert TCP Parsing Here
				this.handleTCPResponse(data)
			})

			this.log('debug', "Heartbeat Initialized");
			this.heartbeatInterval = setInterval(() => {
				var cmd = 'G500\n';
				// var cmd = '\x45\x4D\x07\x00\x00\xC1\xA4';
				this.sendEmotimoAPICommand(cmd);
			}, 10000)
		} else {
			this.updateStatus(InstanceStatus.BadConfig)
		}
	}

	init_tcp_variables() {
		// this.setVariableDefinitions([{ name: 'Last TCP Response', variableId: 'tcp_response' }]) //Calling this function overwrites other variables already declared we want to declare them all in variables.js

		this.setVariableValues({ tcp_response: '' })
	}

	init_emotimo_variables() {
		// this.setVariableDefinitions([
		// 	{ name: 'FocusPosition', variableId: 'FPos' },
		// 	{ name: 'IrisPosition', variableId: 'IPos' },
		// 	{ name: 'ZoomPosition', variableId: 'ZPos' },
		// ])

		this.setVariableValues({ PPos: 0 })
		this.setVariableValues({ TPos: 0 })
		this.setVariableValues({ SPos: 0 })
		this.setVariableValues({ MPos: 0 })
		this.setVariableValues({ FPos: 5000 })
		this.setVariableValues({ IPos: 5000 })
		this.setVariableValues({ ZPos: 5000 })
		this.setVariableValues({ RPos: 0 })
		if (this.config.model == 'SA2.6 Conductor') {
			this.setVariableValues({ TStep: 1 })
			this.setVariableValues({ PStep: 1 })
		} else {
			this.setVariableValues({ TStep: 1000 })
			this.setVariableValues({ PStep: 1000 })
		}
		this.setVariableValues({ SStep: 1000 })
		this.setVariableValues({ MStep: 1000 })
		this.setVariableValues({ FStep: 50 })
		this.setVariableValues({ IStep: 50 })
		this.setVariableValues({ ZStep: 50 })
		this.setVariableValues({ RStep: 1 })
		this.setVariableValues({ PanSpeedLimit: 100 })
		this.setVariableValues({ TiltSpeedLimit: 100 })
		this.setVariableValues({ M3SpeedLimit: 100 })
		this.setVariableValues({ M4SpeedLimit: 100 })
		this.setVariableValues({ TN1SpeedLimit: 50 })
		this.setVariableValues({ TN2SpeedLimit: 50 })
		this.setVariableValues({ TN3SpeedLimit: 50 })
		this.setVariableValues({ RollSpeedLimit: 100 })
		this.setVariableValues({ FocusSpeedLimit: 100 })
		this.setVariableValues({ PanCruiseSpeed: 0 })
		this.setVariableValues({ TiltCruiseSpeed: 0 })
		this.setVariableValues({ M3CruiseSpeed: 0 })
		this.setVariableValues({ M4CruiseSpeed: 0 })
		this.setVariableValues({ TN1CruiseSpeed: 0 })
		this.setVariableValues({ TN2CruiseSpeed: 0 })
		this.setVariableValues({ TN3CruiseSpeed: 0 })
		this.setVariableValues({ RollCruiseSpeed: 0 })
		this.setVariableValues({ FocusCruiseSpeed: 0 })
		this.setVariableValues({ Pst0Stat: 0 })
		this.setVariableValues({ Pst1Stat: 0 })
		this.setVariableValues({ Pst2Stat: 0 })
		this.setVariableValues({ Pst3Stat: 0 })
		this.setVariableValues({ Pst4Stat: 0 })
		this.setVariableValues({ Pst5Stat: 0 })
		this.setVariableValues({ Pst6Stat: 0 })
		this.setVariableValues({ Pst7Stat: 0 })
		this.setVariableValues({ Pst8Stat: 0 })
		this.setVariableValues({ Pst9Stat: 0 })
		this.setVariableValues({ Pst10Stat: 0 })
		this.setVariableValues({ Pst11Stat: 0 })
		this.setVariableValues({ Pst12Stat: 0 })
		this.setVariableValues({ Pst13Stat: 0 })
		this.setVariableValues({ Pst14Stat: 0 })
		this.setVariableValues({ Pst15Stat: 0 })
		this.setVariableValues({ Pst16Stat: 0 })
		this.setVariableValues({ Pst17Stat: 0 })
		this.setVariableValues({ Pst18Stat: 0 })
		this.setVariableValues({ Pst19Stat: 0 })
		this.setVariableValues({ Pst20Stat: 0 })
		this.setVariableValues({ Pst21Stat: 0 })
		this.setVariableValues({ Pst22Stat: 0 })
		this.setVariableValues({ Pst23Stat: 0 })
		this.setVariableValues({ Pst24Stat: 0 })
		this.setVariableValues({ Pst25Stat: 0 })
		this.setVariableValues({ Pst26Stat: 0 })
		this.setVariableValues({ Pst27Stat: 0 })
		this.setVariableValues({ Pst28Stat: 0 })
		this.setVariableValues({ Pst29Stat: 0 })
		this.setVariableValues({ Pst30Stat: 0 })
		this.setVariableValues({ Pst0RunT: 50 })
		this.setVariableValues({ Pst1RunT: 50 })
		this.setVariableValues({ Pst2RunT: 50 })
		this.setVariableValues({ Pst3RunT: 50 })
		this.setVariableValues({ Pst4RunT: 50 })
		this.setVariableValues({ Pst5RunT: 50 })
		this.setVariableValues({ Pst6RunT: 50 })
		this.setVariableValues({ Pst7RunT: 50 })
		this.setVariableValues({ Pst8RunT: 50 })
		this.setVariableValues({ Pst9RunT: 50 })
		this.setVariableValues({ Pst10RunT: 50 })
		this.setVariableValues({ Pst11RunT: 50 })
		this.setVariableValues({ Pst12RunT: 50 })
		this.setVariableValues({ Pst13RunT: 50 })
		this.setVariableValues({ Pst14RunT: 50 })
		this.setVariableValues({ Pst15RunT: 50 })
		this.setVariableValues({ Pst16RunT: 50 })
		this.setVariableValues({ Pst17RunT: 50 })
		this.setVariableValues({ Pst18RunT: 50 })
		this.setVariableValues({ Pst19RunT: 50 })
		this.setVariableValues({ Pst20RunT: 50 })
		this.setVariableValues({ Pst21RunT: 50 })
		this.setVariableValues({ Pst22RunT: 50 })
		this.setVariableValues({ Pst23RunT: 50 })
		this.setVariableValues({ Pst24RunT: 50 })
		this.setVariableValues({ Pst25RunT: 50 })
		this.setVariableValues({ Pst26RunT: 50 })
		this.setVariableValues({ Pst27RunT: 50 })
		this.setVariableValues({ Pst28RunT: 50 })
		this.setVariableValues({ Pst29RunT: 50 })
		this.setVariableValues({ Pst30RunT: 50 })
		this.setVariableValues({ Pst0RampT: 10 })
		this.setVariableValues({ Pst1RampT: 10 })
		this.setVariableValues({ Pst2RampT: 10 })
		this.setVariableValues({ Pst3RampT: 10 })
		this.setVariableValues({ Pst4RampT: 10 })
		this.setVariableValues({ Pst5RampT: 10 })
		this.setVariableValues({ Pst6RampT: 10 })
		this.setVariableValues({ Pst7RampT: 10 })
		this.setVariableValues({ Pst8RampT: 10 })
		this.setVariableValues({ Pst9RampT: 10 })
		this.setVariableValues({ Pst10RampT: 10 })
		this.setVariableValues({ Pst11RampT: 10 })
		this.setVariableValues({ Pst12RampT: 10 })
		this.setVariableValues({ Pst13RampT: 10 })
		this.setVariableValues({ Pst14RampT: 10 })
		this.setVariableValues({ Pst15RampT: 10 })
		this.setVariableValues({ Pst16RampT: 10 })
		this.setVariableValues({ Pst17RampT: 10 })
		this.setVariableValues({ Pst18RampT: 10 })
		this.setVariableValues({ Pst19RampT: 10 })
		this.setVariableValues({ Pst20RampT: 10 })
		this.setVariableValues({ Pst21RampT: 10 })
		this.setVariableValues({ Pst22RampT: 10 })
		this.setVariableValues({ Pst23RampT: 10 })
		this.setVariableValues({ Pst24RampT: 10 })
		this.setVariableValues({ Pst25RampT: 10 })
		this.setVariableValues({ Pst26RampT: 10 })
		this.setVariableValues({ Pst27RampT: 10 })
		this.setVariableValues({ Pst28RampT: 10 })
		this.setVariableValues({ Pst29RampT: 10 })
		this.setVariableValues({ Pst30RampT: 10 })
		this.setVariableValues({ Lp0RunT: 50 })
		this.setVariableValues({ Lp1RunT: 50 })
		this.setVariableValues({ Lp2RunT: 50 })
		this.setVariableValues({ Lp3RunT: 50 })
		this.setVariableValues({ Lp4RunT: 50 })
		this.setVariableValues({ Lp5RunT: 50 })
		this.setVariableValues({ Lp6RunT: 50 })
		this.setVariableValues({ Lp7RunT: 50 })
		this.setVariableValues({ Lp8RunT: 50 })
		this.setVariableValues({ Lp0RampT: 10 })
		this.setVariableValues({ Lp1RampT: 10 })
		this.setVariableValues({ Lp2RampT: 10 })
		this.setVariableValues({ Lp3RampT: 10 })
		this.setVariableValues({ Lp4RampT: 10 })
		this.setVariableValues({ Lp5RampT: 10 })
		this.setVariableValues({ Lp6RampT: 10 })
		this.setVariableValues({ Lp7RampT: 10 })
		this.setVariableValues({ Lp8RampT: 10 })
		this.setVariableValues({ Lp0APoint: 0 })
		this.setVariableValues({ Lp1APoint: 0 })
		this.setVariableValues({ Lp2APoint: 0 })
		this.setVariableValues({ Lp3APoint: 0 })
		this.setVariableValues({ Lp4APoint: 0 })
		this.setVariableValues({ Lp5APoint: 0 })
		this.setVariableValues({ Lp6APoint: 0 })
		this.setVariableValues({ Lp7APoint: 0 })
		this.setVariableValues({ Lp0BPoint: 0 })
		this.setVariableValues({ Lp1BPoint: 0 })
		this.setVariableValues({ Lp2BPoint: 0 })
		this.setVariableValues({ Lp3BPoint: 0 })
		this.setVariableValues({ Lp4BPoint: 0 })
		this.setVariableValues({ Lp5BPoint: 0 })
		this.setVariableValues({ Lp6BPoint: 0 })
		this.setVariableValues({ Lp7BPoint: 0 })
		this.setVariableValues({ LpActive: -1 })
		this.setVariableValues({ PanStopA: 0 })
		this.setVariableValues({ PanStopB: 0 })
		this.setVariableValues({ TiltStopA: 0 })
		this.setVariableValues({ TiltStopB: 0 })
		this.setVariableValues({ M3StopA: 0 })
		this.setVariableValues({ M3StopB: 0 })
		this.setVariableValues({ M4StopA: 0 })
		this.setVariableValues({ M4StopB: 0 })
		this.setVariableValues({ TNFocusStopA: 0 })
		this.setVariableValues({ TNFocusStopB: 0 })
		this.setVariableValues({ TNIrisStopA: 0 })
		this.setVariableValues({ TNIrisStopB: 0 })
		this.setVariableValues({ TNZoomStopA: 0 })
		this.setVariableValues({ TNZoomStopB: 0 })
		this.setVariableValues({ RSRollStopA: 0 })
		this.setVariableValues({ RSRollStopB: 0 })
		this.setVariableValues({ RSFocusStopA: 0 })
		this.setVariableValues({ RSFocusStopB: 0 })
		this.setVariableValues({ CurrentPstSet: 0 })
		this.setVariableValues({ CurrentPstSetRun: 50 })
		this.setVariableValues({ CurrentPstSetRamp: 10 })
		this.setVariableValues({ CurrentLpSet: 0 })
		this.setVariableValues({ CurrentLpA: 0 })
		this.setVariableValues({ CurrentLpB: 0 })
		this.setVariableValues({ CurrentLpRun: 50 })
		this.setVariableValues({ CurrentLpRamp: 10 })
		this.setVariableValues({ CurrentMtrSet: 1 })
		this.setVariableValues({ CurrentMtrStr: 'Pan' })
		this.setVariableValues({ CurrentMtrPosStr: 'Pan Right' })
		this.setVariableValues({ CurrentMtrNegStr: 'Pan Left' })
		this.setVariableValues({ CurrentMtrSpeed: 100 })
		this.setVariableValues({ PanInversion: 1 })
		this.setVariableValues({ TiltInversion: 1 })
		this.setVariableValues({ M3Inversion: 1 })
		this.setVariableValues({ M4Inversion: 1 })
		this.setVariableValues({ TN1Inversion: 1 })
		this.setVariableValues({ TN2Inversion: 1 })
		this.setVariableValues({ TN3Inversion: 1 })
		this.setVariableValues({ RollInversion: -1 })
		this.setVariableValues({ FocusInversion: 1 })
		this.setVariableValues({ CurrentMtrInversion: 'Normal' })
	}
}

runEntrypoint(eMotimoModuleInstance, UpgradeScripts)
