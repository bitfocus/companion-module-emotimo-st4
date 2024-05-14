module.exports = async function (self) {
	self.setVariableDefinitions([
		{ name: 'PanPosition', variableId: 'PPos' },
		{ name: 'TiltPosition', variableId: 'TPos' },
		{ name: 'SlidePosition', variableId: 'SPos' },
		{ name: 'M4Position', variableId: 'MPos' },
		{ name: 'FocusPosition', variableId: 'FPos' },
		{ name: 'IrisPosition', variableId: 'IPos' },
		{ name: 'ZoomPosition', variableId: 'ZPos' },
		{ name: 'RollPosition', variableId: 'RPos' },
		{ name: 'PanIncrement', variableId: 'PStep' },
		{ name: 'TiltIncrement', variableId: 'TStep' },
		{ name: 'SlideIncrement', variableId: 'SStep' },
		{ name: 'M4Increment', variableId: 'MStep' },
		{ name: 'FocusIncrement', variableId: 'FStep' },
		{ name: 'IrisIncrement', variableId: 'IStep' },
		{ name: 'ZoomIncrement', variableId: 'ZStep' },
		{ name: 'RollIncrement', variableId: 'RStep' },
		{ name: 'PanJogSpeed', variableId: 'PanSpeed' },
		{ name: 'TiltJogSpeed', variableId: 'TiltSpeed' },
		{ name: 'M3JogSpeed', variableId: 'M3Speed' },
		{ name: 'M4JogSpeed', variableId: 'M4Speed' },
		{ name: 'TN1Speed', variableId: 'TN1Speed' },
		{ name: 'TN2Speed', variableId: 'TN2Speed' },
		{ name: 'TN3Speed', variableId: 'TN3Speed' },
		{ name: 'RollSpeed', variableId: 'RollSpeed' },
		{ name: 'FocusSpeed', variableId: 'FocusSpeed' },
		{ name: 'PanInversion', variableId: 'PanInversion' },
		{ name: 'TiltInversion', variableId: 'TiltInversion' },
		{ name: 'M3Inversion', variableId: 'M3Inversion' },
		{ name: 'M4Inversion', variableId: 'M4Inversion' },
		{ name: 'TN1Inversion', variableId: 'TN1Inversion' },
		{ name: 'TN2Inversion', variableId: 'TN2Inversion' },
		{ name: 'TN3Inversion', variableId: 'TN3Inversion' },
		{ name: 'RollInversion', variableId: 'RollInversion' },
		{ name: 'FocusInversion', variableId: 'FocusInversion' },
		{ name: 'CurrentMotorSetup', variableId: 'CurrentMtrSet'},
		{ name: 'CurrentMotorStr', variableId: 'CurrentMtrStr'},
		{ name: 'CurrentMotorPosDirStr', variableId: 'CurrentMtrPosStr'},
		{ name: 'CurrentMotorNegDirStr', variableId: 'CurrentMtrNegStr'},
		{ name: 'CurrentMotorInversion', variableId: 'CurrentMtrInversion'},
		{ name: 'CurrentMotorSpeed', variableId: 'CurrentMtrSpeed'},
		{ name: 'CurrentPresetSetup', variableId: 'CurrentPstSet'},
		{ name: 'CurrentPresetSetupRun', variableId: 'CurrentPstSetRun'},
		{ name: 'CurrentPresetSetupRamp', variableId: 'CurrentPstSetRamp'},
		{ name: 'CurrentLoopSetup', variableId: 'CurrentLpSet'},
		{ name: 'CurrentLoopAPoint', variableId: 'CurrentLpA'},
		{ name: 'CurrentLoopBPoint', variableId: 'CurrentLpB'},
		{ name: 'CurrentLoopRunTime', variableId: 'CurrentLpRun'},
		{ name: 'CurrentLoopRampTime', variableId: 'CurrentLpRamp'},
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
		{ name: 'Preset11Status', variableId: 'Pst11Stat'},
		{ name: 'Preset12Status', variableId: 'Pst12Stat'},
		{ name: 'Preset13Status', variableId: 'Pst13Stat'},
		{ name: 'Preset14Status', variableId: 'Pst14Stat'},
		{ name: 'Preset15Status', variableId: 'Pst15Stat'},
		{ name: 'Preset16Status', variableId: 'Pst16Stat'},
		{ name: 'Preset17Status', variableId: 'Pst17Stat'},
		{ name: 'Preset18Status', variableId: 'Pst18Stat'},
		{ name: 'Preset19Status', variableId: 'Pst19Stat'},
		{ name: 'Preset20Status', variableId: 'Pst20Stat'},
		{ name: 'Preset21Status', variableId: 'Pst21Stat'},
		{ name: 'Preset22Status', variableId: 'Pst22Stat'},
		{ name: 'Preset23Status', variableId: 'Pst23Stat'},
		{ name: 'Preset24Status', variableId: 'Pst24Stat'},
		{ name: 'Preset25Status', variableId: 'Pst25Stat'},
		{ name: 'Preset26Status', variableId: 'Pst26Stat'},
		{ name: 'Preset27Status', variableId: 'Pst27Stat'},
		{ name: 'Preset28Status', variableId: 'Pst28Stat'},
		{ name: 'Preset29Status', variableId: 'Pst29Stat'},
		{ name: 'Preset30Status', variableId: 'Pst30Stat'},
		{ name: 'Preset0RunT', variableId: 'Pst0RunT'},
		{ name: 'Preset1RunT', variableId: 'Pst1RunT'},
		{ name: 'Preset2RunT', variableId: 'Pst2RunT'},
		{ name: 'Preset3RunT', variableId: 'Pst3RunT'},
		{ name: 'Preset4RunT', variableId: 'Pst4RunT'},
		{ name: 'Preset5RunT', variableId: 'Pst5RunT'},
		{ name: 'Preset6RunT', variableId: 'Pst6RunT'},
		{ name: 'Preset7RunT', variableId: 'Pst7RunT'},
		{ name: 'Preset8RunT', variableId: 'Pst8RunT'},
		{ name: 'Preset9RunT', variableId: 'Pst9RunT'},
		{ name: 'Preset10RunT', variableId: 'Pst10RunT'},
		{ name: 'Preset11RunT', variableId: 'Pst11RunT'},
		{ name: 'Preset12RunT', variableId: 'Pst12RunT'},
		{ name: 'Preset13RunT', variableId: 'Pst13RunT'},
		{ name: 'Preset14RunT', variableId: 'Pst14RunT'},
		{ name: 'Preset15RunT', variableId: 'Pst15RunT'},
		{ name: 'Preset16RunT', variableId: 'Pst16RunT'},
		{ name: 'Preset17RunT', variableId: 'Pst17RunT'},
		{ name: 'Preset18RunT', variableId: 'Pst18RunT'},
		{ name: 'Preset19RunT', variableId: 'Pst19RunT'},
		{ name: 'Preset20RunT', variableId: 'Pst20RunT'},
		{ name: 'Preset21RunT', variableId: 'Pst21RunT'},
		{ name: 'Preset22RunT', variableId: 'Pst22RunT'},
		{ name: 'Preset23RunT', variableId: 'Pst23RunT'},
		{ name: 'Preset24RunT', variableId: 'Pst24RunT'},
		{ name: 'Preset25RunT', variableId: 'Pst25RunT'},
		{ name: 'Preset26RunT', variableId: 'Pst26RunT'},
		{ name: 'Preset27RunT', variableId: 'Pst27RunT'},
		{ name: 'Preset28RunT', variableId: 'Pst28RunT'},
		{ name: 'Preset29RunT', variableId: 'Pst29RunT'},
		{ name: 'Preset30RunT', variableId: 'Pst30RunT'},
		{ name: 'Preset0RampT', variableId: 'Pst0RampT'},
		{ name: 'Preset1RampT', variableId: 'Pst1RampT'},
		{ name: 'Preset2RampT', variableId: 'Pst2RampT'},
		{ name: 'Preset3RampT', variableId: 'Pst3RampT'},
		{ name: 'Preset4RampT', variableId: 'Pst4RampT'},
		{ name: 'Preset5RampT', variableId: 'Pst5RampT'},
		{ name: 'Preset6RampT', variableId: 'Pst6RampT'},
		{ name: 'Preset7RampT', variableId: 'Pst7RampT'},
		{ name: 'Preset8RampT', variableId: 'Pst8RampT'},
		{ name: 'Preset9RampT', variableId: 'Pst9RampT'},
		{ name: 'Preset10RampT', variableId: 'Pst10RampT'},
		{ name: 'Preset11RampT', variableId: 'Pst11RampT'},
		{ name: 'Preset12RampT', variableId: 'Pst12RampT'},
		{ name: 'Preset13RampT', variableId: 'Pst13RampT'},
		{ name: 'Preset14RampT', variableId: 'Pst14RampT'},
		{ name: 'Preset15RampT', variableId: 'Pst15RampT'},
		{ name: 'Preset16RampT', variableId: 'Pst16RampT'},
		{ name: 'Preset17RampT', variableId: 'Pst17RampT'},
		{ name: 'Preset18RampT', variableId: 'Pst18RampT'},
		{ name: 'Preset19RampT', variableId: 'Pst19RampT'},
		{ name: 'Preset20RampT', variableId: 'Pst20RampT'},
		{ name: 'Preset21RampT', variableId: 'Pst21RampT'},
		{ name: 'Preset22RampT', variableId: 'Pst22RampT'},
		{ name: 'Preset23RampT', variableId: 'Pst23RampT'},
		{ name: 'Preset24RampT', variableId: 'Pst24RampT'},
		{ name: 'Preset25RampT', variableId: 'Pst25RampT'},
		{ name: 'Preset26RampT', variableId: 'Pst26RampT'},
		{ name: 'Preset27RampT', variableId: 'Pst27RampT'},
		{ name: 'Preset28RampT', variableId: 'Pst28RampT'},
		{ name: 'Preset29RampT', variableId: 'Pst29RampT'},
		{ name: 'Preset30RampT', variableId: 'Pst30RampT'},
		{ name: 'Loop0RunT', variableId: 'Lp0RunT'},
		{ name: 'Loop1RunT', variableId: 'Lp1RunT'},
		{ name: 'Loop2RunT', variableId: 'Lp2RunT'},
		{ name: 'Loop3RunT', variableId: 'Lp3RunT'},
		{ name: 'Loop4RunT', variableId: 'Lp4RunT'},
		{ name: 'Loop5RunT', variableId: 'Lp5RunT'},
		{ name: 'Loop6RunT', variableId: 'Lp6RunT'},
		{ name: 'Loop7RunT', variableId: 'Lp7RunT'},
		{ name: 'Loop8RunT', variableId: 'Lp8RunT'},
		{ name: 'Loop0RampT', variableId: 'Lp0RampT'},
		{ name: 'Loop1RampT', variableId: 'Lp1RampT'},
		{ name: 'Loop2RampT', variableId: 'Lp2RampT'},
		{ name: 'Loop3RampT', variableId: 'Lp3RampT'},
		{ name: 'Loop4RampT', variableId: 'Lp4RampT'},
		{ name: 'Loop5RampT', variableId: 'Lp5RampT'},
		{ name: 'Loop6RampT', variableId: 'Lp6RampT'},
		{ name: 'Loop7RampT', variableId: 'Lp7RampT'},
		{ name: 'Loop8RampT', variableId: 'Lp8RampT'},
		{ name: 'Loop0APoint', variableId: 'Lp0APoint'},
		{ name: 'Loop1APoint', variableId: 'Lp1APoint'},
		{ name: 'Loop2APoint', variableId: 'Lp2APoint'},
		{ name: 'Loop3APoint', variableId: 'Lp3APoint'},
		{ name: 'Loop4APoint', variableId: 'Lp4APoint'},
		{ name: 'Loop5APoint', variableId: 'Lp5APoint'},
		{ name: 'Loop6APoint', variableId: 'Lp6APoint'},
		{ name: 'Loop7APoint', variableId: 'Lp7APoint'},
		{ name: 'Loop0BPoint', variableId: 'Lp0BPoint'},
		{ name: 'Loop1BPoint', variableId: 'Lp1BPoint'},
		{ name: 'Loop2BPoint', variableId: 'Lp2BPoint'},
		{ name: 'Loop3BPoint', variableId: 'Lp3BPoint'},
		{ name: 'Loop4BPoint', variableId: 'Lp4BPoint'},
		{ name: 'Loop5BPoint', variableId: 'Lp5BPoint'},
		{ name: 'Loop6BPoint', variableId: 'Lp6BPoint'},
		{ name: 'Loop7BPoint', variableId: 'Lp7BPoint'},
		{ name: 'LoopActive', variableId: 'LpActive'},
		{ name: 'PanStopA', variableId: 'PanStopA'},
		{ name: 'PanStopB', variableId: 'PanStopB'},
		{ name: 'TiltStopA', variableId: 'TiltStopA'},
		{ name: 'TiltStopB', variableId: 'TiltStopB'},
		{ name: 'M3StopA', variableId: 'M3StopA'},
		{ name: 'M3StopB', variableId: 'M3StopB'},
		{ name: 'M4StopA', variableId: 'M4StopA'},
		{ name: 'M4StopB', variableId: 'M4StopB'},
		{ name: 'TNFocusStopA', variableId: 'TNFocusStopA'},
		{ name: 'TNFocusStopB', variableId: 'TNFocusStopB'},
		{ name: 'TNIrisStopA', variableId: 'TNIrisStopA'},
		{ name: 'TNIrisStopB', variableId: 'TNIrisStopB'},
		{ name: 'TNZoomStopA', variableId: 'TNZoomStopA'},
		{ name: 'TNZoomStopB', variableId: 'TNZoomStopB'},
		{ name: 'RSRollStopA', variableId: 'RSRollStopA'},
		{ name: 'RSRollStopB', variableId: 'RSRollStopB'},
		{ name: 'RSFocusStopA', variableId: 'RSFocusStopA'},
		{ name: 'RSFocusStopB', variableId: 'RSFocusStopB'},
		{ name: 'Last TCP Response', variableId: 'tcp_response' }
	])
}
