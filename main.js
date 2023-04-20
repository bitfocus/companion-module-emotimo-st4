const { InstanceBase, Regex, runEntrypoint, InstanceStatus, TCPHelper } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')

const config = require('./config')
const { MODELS } = require('./models.js')

class eMotimoModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		// Assign the methods from the listed files to this class
		// Object.assign(this, {
		// 	...config,
		// 	...UpdateActions,
		// 	...UpdateFeedbacks,
		// 	...UpdateVariableDefinitions,
		// })
	}

	async init(config) {
		this.config = config
		this.log('debug', 'Instance Init');
		// this.updateStatus(InstanceStatus.Ok)

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions

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
					"This module controls ST4, ST4.3 and SA2",
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
			{
				type: 'static-text',
				id: 'intervalInfo',
				width: 12,
				label: 'Update Interval',
				value:
					'Please enter the amount of time in milliseconds to request new information from the camera. Set to 0 to disable.',
			},
			{
				type: 'textinput',
				id: 'interval',
				label: 'Update Interval',
				width: 3,
				default: 5000,
			},
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

	sendEmotimoAPICommand = function (str) {
		var self = this;

		// if (self.tcp !== undefined) {
		// 	var buf = Buffer.from(str, 'binary');
		// 	self.tcp.send(buf);
		// 	console.log('Sending: %s', buf);
		// }

		// var cmd = 'G500/n'
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
			})

			this.log('debug', "Heartbeat Initialized");
			this.heartbeatInterval = setInterval(() => {
				// var cmd = '\x01\xFF';
				// self.sendVISCACommand(cmd);
				var cmd = 'G500\n';
				// var cmd = '\x45\x4D\x07\x00\x00\xC1\xA4';
				this.sendEmotimoAPICommand(cmd);
			}, 3000)
		} else {
			this.updateStatus(InstanceStatus.BadConfig)
		}
	}

	init_tcp_variables() {
		this.setVariableDefinitions([{ name: 'Last TCP Response', variableId: 'tcp_response' }])

		this.setVariableValues({ tcp_response: '' })
	}
}

runEntrypoint(eMotimoModuleInstance, UpgradeScripts)
