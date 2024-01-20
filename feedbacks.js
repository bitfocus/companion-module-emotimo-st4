const { combineRgb } = require('@companion-module/base')

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
		SetPresetSmart: {
			name: 'Set Preset',
			type: 'boolean',
			label: 'Channel State',
			defaultStyle: {
				bgcolor: combineRgb(0, 127, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				
			],
			callback: (feedback) => {
				var presetID = self.getVariableValue('CurrentPstSet')

				var presetStr = 'Pst' + presetID + 'Stat'
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
				bgcolor: combineRgb(0, 127, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				
			],
			callback: (feedback) => {
				// console.log('Hello world!', feedback.options.num)
				var state = self.getVariableValue('LpActive')
				if(state >= 0) {
					// feedback.defaultStyle.bgcolor = combineRgb(127, 0, 0)
					return true
				} else {
					// feedback.defaultStyle.bgcolor = combineRgb(0, 127, 0)
					return false
				}
			},
		},
		StopAStatus: {
			name: 'Stop A Status',
			type: 'boolean',
			label: 'Stop A Status',
			defaultStyle: {
				bgcolor: combineRgb(0, 127, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					type: 'dropdown',
					id: 'id_mot',
					label: 'Motor ID',
					default: 1,
					choices: MOTOR_ID,
				},
			],
			callback: (feedback) => {
				// console.log('Hello world!', feedback.options.num)
				var state = 0

				if (feedback.options.id_mot == 1) {
					state = self.getVariableValue('PanStopA')
				} else if (feedback.options.id_mot == 2) {
					state = self.getVariableValue('TiltStopA')
				} else if (feedback.options.id_mot == 3) {
					state = self.getVariableValue('M3StopA')
				} else if (feedback.options.id_mot == 4) {
					state = self.getVariableValue('M4StopA')
				} else if (feedback.options.id_mot == 5) {
					state = self.getVariableValue('TNFocusStopA')
				} else if (feedback.options.id_mot == 6) {
					state = self.getVariableValue('TNIrisStopA')
				} else if (feedback.options.id_mot == 7) {
					state = self.getVariableValue('TNZoomStopA')
				} else if (feedback.options.id_mot == 8) {
					state = self.getVariableValue('RSRollStopA')
				} else if (feedback.options.id_mot == 9) {
					state = self.getVariableValue('RSFocusStopA')
				}
				
				if(state == 1) {
					// feedback.defaultStyle.bgcolor = combineRgb(127, 0, 0)
					return true
				} else {
					// feedback.defaultStyle.bgcolor = combineRgb(0, 127, 0)
					return false
				}
			},
		},
		StopBStatus: {
			name: 'Stop B Status',
			type: 'boolean',
			label: 'Stop B Status',
			defaultStyle: {
				bgcolor: combineRgb(0, 127, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					type: 'dropdown',
					id: 'id_mot',
					label: 'Motor ID',
					default: 1,
					choices: MOTOR_ID,
				},
			],
			callback: (feedback) => {
				// console.log('Hello world!', feedback.options.num)
				var state = 0

				if (feedback.options.id_mot == 1) {
					state = self.getVariableValue('PanStopB')
				} else if (feedback.options.id_mot == 2) {
					state = self.getVariableValue('TiltStopB')
				} else if (feedback.options.id_mot == 3) {
					state = self.getVariableValue('M3StopB')
				} else if (feedback.options.id_mot == 4) {
					state = self.getVariableValue('M4StopB')
				} else if (feedback.options.id_mot == 5) {
					state = self.getVariableValue('TNFocusStopB')
				} else if (feedback.options.id_mot == 6) {
					state = self.getVariableValue('TNIrisStopB')
				} else if (feedback.options.id_mot == 7) {
					state = self.getVariableValue('TNZoomStopB')
				} else if (feedback.options.id_mot == 8) {
					state = self.getVariableValue('RSRollStopB')
				} else if (feedback.options.id_mot == 9) {
					state = self.getVariableValue('RSFocusStopB')
				}
				
				if(state == 1) {
					// feedback.defaultStyle.bgcolor = combineRgb(127, 0, 0)
					return true
				} else {
					// feedback.defaultStyle.bgcolor = combineRgb(0, 127, 0)
					return false
				}
			},
		},
		StopAStatusSmart: {
			name: 'Stop A Status Smart',
			type: 'boolean',
			label: 'Stop A Status Smart',
			defaultStyle: {
				bgcolor: combineRgb(0, 127, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				
			],
			callback: (feedback) => {
				var motorID = self.getVariableValue('CurrentMtrSet')

				

				if (motorID == 1) {
					state = self.getVariableValue('PanStopA')
				} else if (motorID == 2) {
					state = self.getVariableValue('TiltStopA')
				} else if (motorID == 3) {
					state = self.getVariableValue('M3StopA')
				} else if (motorID == 4) {
					state = self.getVariableValue('M4StopA')
				} else if (motorID == 5) {
					state = self.getVariableValue('TNFocusStopA')
				} else if (motorID == 6) {
					state = self.getVariableValue('TNIrisStopA')
				} else if (motorID == 7) {
					state = self.getVariableValue('TNZoomStopA')
				} else if (motorID == 8) {
					state = self.getVariableValue('RSRollStopA')
				} else if (motorID == 9) {
					state = self.getVariableValue('RSFocusStopA')
				}

				console.log("A Status: " + state + " Motor: " + motorID +"\n")
				if(state) {
					return true
				} else {
					return false
				}
			},
		},
		StopBStatusSmart: {
			name: 'Stop B Status Smart',
			type: 'boolean',
			label: 'Stop B Status Smart',
			defaultStyle: {
				bgcolor: combineRgb(0, 127, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				
			],
			callback: (feedback) => {
				var motorID = self.getVariableValue('CurrentMtrSet')

				

				if (motorID == 1) {
					state = self.getVariableValue('PanStopB')
				} else if (motorID == 2) {
					state = self.getVariableValue('TiltStopB')
				} else if (motorID == 3) {
					state = self.getVariableValue('M3StopB')
				} else if (motorID == 4) {
					state = self.getVariableValue('M4StopB')
				} else if (motorID == 5) {
					state = self.getVariableValue('TNFocusStopB')
				} else if (motorID == 6) {
					state = self.getVariableValue('TNIrisStopB')
				} else if (motorID == 7) {
					state = self.getVariableValue('TNZoomStopB')
				} else if (motorID == 8) {
					state = self.getVariableValue('RSRollStopB')
				} else if (motorID == 9) {
					state = self.getVariableValue('RSFocusStopB')
				}

				console.log("B Status: " + state + " Motor: " + motorID +"\n")
				if(state) {
					return true
				} else {
					return false
				}
			},
		},
		// CurrentAxisSpeed: {
			//Can we use a feedback to dynamically change the Current Axis Speed Text
		// }
		
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