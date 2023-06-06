// import { Regex } from '@companion-module/base'

const { MODELS } = require('./models.js')

module.exports = {
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
}