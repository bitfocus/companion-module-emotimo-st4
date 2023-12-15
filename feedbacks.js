const { combineRgb } = require('@companion-module/base')

module.exports = async function (self) {

	self.setFeedbackDefinitions({
		ChannelState: {
			name: 'Example Feedback',
			type: 'boolean',
			label: 'Channel State',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Test',
					default: 5,
					min: 0,
					max: 10,
				},
			],
			callback: (feedback) => {
				console.log('Hello world!', feedback.options.num)
				if(feedback.options.num > 5) {
					return true
				} else {
					return false
				}
			},
		},
		SetPreset: {
			name: 'Set Preset',
			type: 'boolean',
			label: 'Channel State',
			defaultStyle: {
				bgcolor: combineRgb(0, 127, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'presetNum',
					type: 'number',
					label: 'Preset Number',
					default: 0,
					min: 0,
					max: 30,
				},
			],
			callback: (feedback) => {
				var presetStr = 'Pst' + feedback.options.presetNum + 'Stat'
				// console.log(presetStr);
				var state = self.getVariableValue(presetStr)
				if(state) {
					console.log(presetStr);
					return true
				} else {
					return false
				}
			},
		},
		LoopStatus: {
			name: 'Looping Status',
			type: 'boolean',
			label: 'Looping Status',
			defaultStyle: {
				bgcolor: combineRgb(127, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Test',
					default: 5,
					min: 0,
					max: 10,
				},
			],
			callback: (feedback) => {
				console.log('Hello world!', feedback.options.num)
				var state = self.getVariableValue('LpActive')
				if(state) {
					// feedback.defaultStyle.bgcolor = combineRgb(127, 0, 0)
					return true
				} else {
					// feedback.defaultStyle.bgcolor = combineRgb(0, 127, 0)
					return false
				}
			},
		},
	})
}


	// const { COLORS } = require('./colors.js')
// import { COLORS } from './colors.js'	

// heldFeedback: {
		// 	type: 'boolean',
		// 	name: 'Button Hold Time Reached',
		// 	description: 'Indicate if button is held long enough for secondary action',
		// 	defaultStyle: {
		// 		color: combineRgb(0, 0, 0),//COLORS.BLACK,
		// 		bgcolor: combineRgb(255, 255, 0),//COLORS.YELLOW,
		// 	},
		// 	options: [],
		// 	callback: function () {
		// 		return self.state.heldThresholdReached
		// 	},
		// },