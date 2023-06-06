const { combineRgb } = require('@companion-module/base')


// const { COLORS } = require('./colors.js')
// import { COLORS } from './colors.js'

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
	})
}


		