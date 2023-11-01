module.exports = async function (self) {
	self.setVariableDefinitions([
		{ name: 'FocusPosition', variableId: 'FPos' },
		{ name: 'IrisPosition', variableId: 'IPos' },
		{ name: 'ZoomPosition', variableId: 'ZPos' },
		{ name: 'FocusIncrement', variableId: 'FStep' },
		{ name: 'IrisIncrement', variableId: 'IStep' },
		{ name: 'ZoomIncrement', variableId: 'ZStep' },
		{ name: 'PanJogSpeed', variableId: 'PanSpeed' },
		{ name: 'TiltJogSpeed', variableId: 'TiltSpeed' },
		{ name: 'M3JogSpeed', variableId: 'M3Speed' },
		{ name: 'M4JogSpeed', variableId: 'M4Speed' },
		{ name: 'TN1Speed', variableId: 'TN1Speed' },
		{ name: 'TN2Speed', variableId: 'TN2Speed' },
		{ name: 'TN3Speed', variableId: 'TN3Speed' },
		{ name: 'RollSpeed', variableId: 'RollSpeed' },
		{ name: 'FocusSpeed', variableId: 'FocusSpeed' },
		{ name: 'Preset0Status', variableId: 'Pst0Stat'},
		{ name: 'Preset1Status', variableId: 'Pst1Stat'},
		{ name: 'Preset2Status', variableId: 'Pst2Stat'},
		{ name: 'Preset3Status', variableId: 'Pst3Stat'},
		{ name: 'Preset4Status', variableId: 'Pst4Stat'},
		{ name: 'Preset5Status', variableId: 'Pst5Stat'},
		{ name: 'Preset6Status', variableId: 'Pst6Stat'},
		{ name: 'Preset7Status', variableId: 'Pst7Stat'},
		{ name: 'Preset8Status', variableId: 'Pst8Stat'},
		{ name: 'Preset9Status', variableId: 'Pst9Stat'},
		{ name: 'Preset10Status', variableId: 'Pst10Stat'},
		{ name: 'Last TCP Response', variableId: 'tcp_response' }
	])
}
