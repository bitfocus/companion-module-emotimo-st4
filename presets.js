const { combineRgb } = require('@companion-module/base')

let { MODELS, SERIES_SPECS } = require('./models.js')

//This solution is working but not very progromatic for GoToFrames and other Preset Arrays
// const foregroundColor = combineRgb(255, 255, 255) // White
// const backgroundColorRed = combineRgb(255, 0, 0) // Red
// const backgroundColorGreen = combineRgb(0, 255, 0) // Green
// const backgroundColorOrange = combineRgb(255, 102, 0) // Orange

// module.exports = function (self) {
//     self.setPresetDefinitions({
//         // ########################
// 		// #### System Presets ####
// 		// ########################
//         VirtUp: {
//             category: 'System',
//             type: 'button',
//             name: 'Nav Up',
//             style: {
//                 text: 'Up\\n',
//                 size: '18',
//                 color: '16777215',
//                 bgcolor: combineRgb(0, 0, 0),
//             },
//             steps: [
//                 {
//                     down: [
//                         {
//                             actionId: 'virtualInput',
//                             options: {
//                                 vbutton: 1,
//                             }
//                         }
//                     ],
//                     up: [],
//                 },
//             ],
//             feedbacks: [
//                 {
//                     style: {
//                         color: foregroundColor,
//                         bgcolor: backgroundColorRed,
//                     }
//                 }
//             ]
//         },
//         VirtRight: {
//             category: 'System',
//             type: 'button',
//             name: 'Nav Right',
//             style: {
//                 text: 'Right\\n',
//                 size: '18',
//                 color: '16777215',
//                 bgcolor: combineRgb(0, 0, 0),
//             },
//             steps: [
//                 {
//                     down: [
//                         {
//                             actionId: 'virtualInput',
//                             options: {
//                                 vbutton: 2,
//                             }
//                         }
//                     ],
//                     up: [],
//                 },
//             ],
//             feedbacks: [
//                 {
//                     style: {
//                         color: foregroundColor,
//                         bgcolor: backgroundColorRed,
//                     }
//                 }
//             ]
//         },
//         VirtDown: {
//             category: 'System',
//             type: 'button',
//             name: 'Nav Down',
//             style: {
//                 text: 'Down\\n',
//                 size: '18',
//                 color: '16777215',
//                 bgcolor: combineRgb(0, 0, 0),
//             },
//             steps: [
//                 {
//                     down: [
//                         {
//                             actionId: 'virtualInput',
//                             options: {
//                                 vbutton: 3,
//                             }
//                         }
//                     ],
//                     up: [],
//                 },
//             ],
//             feedbacks: [
//                 {
//                     style: {
//                         color: foregroundColor,
//                         bgcolor: backgroundColorRed,
//                     }
//                 }
//             ]
//         },
//         VirtLeft: {
//             category: 'System',
//             type: 'button',
//             name: 'Nav Left',
//             style: {
//                 text: 'Left\\n',
//                 size: '18',
//                 color: '16777215',
//                 bgcolor: combineRgb(0, 0, 0),
//             },
//             steps: [
//                 {
//                     down: [
//                         {
//                             actionId: 'virtualInput',
//                             options: {
//                                 vbutton: 4,
//                             }
//                         }
//                     ],
//                     up: [],
//                 },
//             ],
//             feedbacks: [
//                 {
//                     style: {
//                         color: foregroundColor,
//                         bgcolor: backgroundColorRed,
//                     }
//                 }
//             ]
//         },
//         VirtEnter: {
//             category: 'System',
//             type: 'button',
//             name: 'Nav Enter',
//             style: {
//                 text: 'Select\\n',
//                 size: '18',
//                 color: '16777215',
//                 bgcolor: combineRgb(0, 0, 0),
//             },
//             steps: [
//                 {
//                     down: [
//                         {
//                             actionId: 'virtualInput',
//                             options: {
//                                 vbutton: 0,
//                             }
//                         },
//                         {
//                             actionId: 'virtualInput',
//                             delay:  2000,
//                             options: {
//                                 vbutton: 6,
//                             }
//                         },
//                     ],
//                     up: [],
//                 },
//             ],
//             feedbacks: [
//                 {
//                     style: {
//                         color: foregroundColor,
//                         bgcolor: backgroundColorRed,
//                     }
//                 }
//             ]
//         },
//         VirtBack: {
//             category: 'System',
//             type: 'button',
//             name: 'Nav Back',
//             style: {
//                 text: 'Escape\\n',
//                 size: '18',
//                 color: '16777215',
//                 bgcolor: combineRgb(0, 0, 0),
//             },
//             steps: [
//                 {
//                     down: [
//                         {
//                             actionId: 'virtualInput',
//                             options: {
//                                 vbutton: 5,
//                             }
//                         }
//                     ],
//                     up: [],
//                 },
//             ],
//             feedbacks: [
//                 {
//                     style: {
//                         color: foregroundColor,
//                         bgcolor: backgroundColorRed,
//                     }
//                 }
//             ]
//         },
//         // ########################
// 		// #### Motor  Presets ####
// 		// ########################
//         MotPanNeg: {
//             category: 'Motors',
//             type: 'button',
//             name: 'Pan Neg',
//             style: {
//                 text: 'Pan Neg\\n',
//                 size: '18',
//                 color: '16777215',
//                 bgcolor: combineRgb(0, 0, 0),
//             },
//             steps: [
//                 {
//                     down: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 1,
//                                 id_speed: -50000,
//                             }
//                         }
//                     ],
//                     up: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 1,
//                                 id_speed: 0,
//                             }
//                         }
//                     ],
//                 },
//             ],
//             feedbacks: [
//                 {
//                     style: {
//                         color: foregroundColor,
//                         bgcolor: backgroundColorRed,
//                     }
//                 }
//             ]
//         },
//         MotPanPos: {
//             category: 'Motors',
//             type: 'button',
//             name: 'Pan Pos',
//             style: {
//                 text: 'Pan Pos\\n',
//                 size: '18',
//                 color: '16777215',
//                 bgcolor: combineRgb(0, 0, 0),
//             },
//             steps: [
//                 {
//                     down: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 1,
//                                 id_speed: 50000,
//                             }
//                         }
//                     ],
//                     up: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 1,
//                                 id_speed: 0,
//                             }
//                         }
//                     ],
//                 },
//             ],
//             feedbacks: [
//                 {
//                     style: {
//                         color: foregroundColor,
//                         bgcolor: backgroundColorRed,
//                     }
//                 }
//             ]
//         },

//         MotTiltNeg: {
//             category: 'Motors',
//             type: 'button',
//             name: 'Tilt Neg',
//             style: {
//                 text: 'Tilt Neg\\n',
//                 size: '18',
//                 color: '16777215',
//                 bgcolor: combineRgb(0, 0, 0),
//             },
//             steps: [
//                 {
//                     down: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 2,
//                                 id_speed: -50000,
//                             }
//                         }
//                     ],
//                     up: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 2,
//                                 id_speed: 0,
//                             }
//                         }
//                     ],
//                 },
//             ],
//             feedbacks: [
//                 {
//                     style: {
//                         color: foregroundColor,
//                         bgcolor: backgroundColorRed,
//                     }
//                 }
//             ]
//         },
//         MotTiltPos: {
//             category: 'Motors',
//             type: 'button',
//             name: 'Tilt Pos',
//             style: {
//                 text: 'Tilt Pos\\n',
//                 size: '18',
//                 color: '16777215',
//                 bgcolor: combineRgb(0, 0, 0),
//             },
//             steps: [
//                 {
//                     down: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 2,
//                                 id_speed: 50000,
//                             }
//                         }
//                     ],
//                     up: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 2,
//                                 id_speed: 0,
//                             }
//                         }
//                     ],
//                 },
//             ],
//             feedbacks: [
//                 {
//                     style: {
//                         color: foregroundColor,
//                         bgcolor: backgroundColorRed,
//                     }
//                 }
//             ]
//         },

//         MotSlideNeg: {
//             category: 'Motors',
//             type: 'button',
//             name: 'Slide Neg',
//             style: {
//                 text: 'Slide Neg\\n',
//                 size: '18',
//                 color: '16777215',
//                 bgcolor: combineRgb(0, 0, 0),
//             },
//             steps: [
//                 {
//                     down: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 3,
//                                 id_speed: -50000,
//                             }
//                         }
//                     ],
//                     up: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 3,
//                                 id_speed: 0,
//                             }
//                         }
//                     ],
//                 },
//             ],
//             feedbacks: [
//                 {
//                     style: {
//                         color: foregroundColor,
//                         bgcolor: backgroundColorRed,
//                     }
//                 }
//             ]
//         },
//         MotSlidePos: {
//             category: 'Motors',
//             type: 'button',
//             name: 'Slide Pos',
//             style: {
//                 text: 'Slide Pos\\n',
//                 size: '18',
//                 color: '16777215',
//                 bgcolor: combineRgb(0, 0, 0),
//             },
//             steps: [
//                 {
//                     down: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 3,
//                                 id_speed: 50000,
//                             }
//                         }
//                     ],
//                     up: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 3,
//                                 id_speed: 0,
//                             }
//                         }
//                     ],
//                 },
//             ],
//             feedbacks: [
//                 {
//                     style: {
//                         color: foregroundColor,
//                         bgcolor: backgroundColorRed,
//                     }
//                 }
//             ]
//         },

//         MotTurnTableNeg: {
//             category: 'Motors',
//             type: 'button',
//             name: 'TurnTable Neg',
//             style: {
//                 text: 'TT Neg\\n',
//                 size: '18',
//                 color: '16777215',
//                 bgcolor: combineRgb(0, 0, 0),
//             },
//             steps: [
//                 {
//                     down: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 4,
//                                 id_speed: -50000,
//                             }
//                         }
//                     ],
//                     up: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 4,
//                                 id_speed: 0,
//                             }
//                         }
//                     ],
//                 },
//             ],
//             feedbacks: [
//                 {
//                     style: {
//                         color: foregroundColor,
//                         bgcolor: backgroundColorRed,
//                     }
//                 }
//             ]
//         },
//         MotTurnTablePos: {
//             category: 'Motors',
//             type: 'button',
//             name: 'TurnTable Pos',
//             style: {
//                 text: 'TT Pos\\n',
//                 size: '18',
//                 color: '16777215',
//                 bgcolor: combineRgb(0, 0, 0),
//             },
//             steps: [
//                 {
//                     down: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 4,
//                                 id_speed: 50000,
//                             }
//                         }
//                     ],
//                     up: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 4,
//                                 id_speed: 0,
//                             }
//                         }
//                     ],
//                 },
//             ],
//             feedbacks: [
//                 {
//                     style: {
//                         color: foregroundColor,
//                         bgcolor: backgroundColorRed,
//                     }
//                 }
//             ]
//         },

//         MotFocusNeg: {
//             category: 'Motors',
//             type: 'button',
//             name: 'Focus Neg',
//             style: {
//                 text: 'Focus Neg\\n',
//                 size: '18',
//                 color: '16777215',
//                 bgcolor: combineRgb(0, 0, 0),
//             },
//             steps: [
//                 {
//                     down: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 5,
//                                 id_speed: -50000,
//                             }
//                         }
//                     ],
//                     up: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 5,
//                                 id_speed: 0,
//                             }
//                         }
//                     ],
//                 },
//             ],
//             feedbacks: [
//                 {
//                     style: {
//                         color: foregroundColor,
//                         bgcolor: backgroundColorRed,
//                     }
//                 }
//             ]
//         },
//         MotFocusPos: {
//             category: 'Motors',
//             type: 'button',
//             name: 'Focus Pos',
//             style: {
//                 text: 'Focus Pos\\n',
//                 size: '18',
//                 color: '16777215',
//                 bgcolor: combineRgb(0, 0, 0),
//             },
//             steps: [
//                 {
//                     down: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 5,
//                                 id_speed: 50000,
//                             }
//                         }
//                     ],
//                     up: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 5,
//                                 id_speed: 0,
//                             }
//                         }
//                     ],
//                 },
//             ],
//             feedbacks: [
//                 {
//                     style: {
//                         color: foregroundColor,
//                         bgcolor: backgroundColorRed,
//                     }
//                 }
//             ]
//         },

//         MotIrisNeg: {
//             category: 'Motors',
//             type: 'button',
//             name: 'Iris Neg',
//             style: {
//                 text: 'Iris Neg\\n',
//                 size: '18',
//                 color: '16777215',
//                 bgcolor: combineRgb(0, 0, 0),
//             },
//             steps: [
//                 {
//                     down: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 6,
//                                 id_speed: -50000,
//                             }
//                         }
//                     ],
//                     up: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 6,
//                                 id_speed: 0,
//                             }
//                         }
//                     ],
//                 },
//             ],
//             feedbacks: [
//                 {
//                     style: {
//                         color: foregroundColor,
//                         bgcolor: backgroundColorRed,
//                     }
//                 }
//             ]
//         },
//         MotIrisPos: {
//             category: 'Motors',
//             type: 'button',
//             name: 'Iris Pos',
//             style: {
//                 text: 'Iris Pos\\n',
//                 size: '18',
//                 color: '16777215',
//                 bgcolor: combineRgb(0, 0, 0),
//             },
//             steps: [
//                 {
//                     down: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 6,
//                                 id_speed: 50000,
//                             }
//                         }
//                     ],
//                     up: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 6,
//                                 id_speed: 0,
//                             }
//                         }
//                     ],
//                 },
//             ],
//             feedbacks: [
//                 {
//                     style: {
//                         color: foregroundColor,
//                         bgcolor: backgroundColorRed,
//                     }
//                 }
//             ]
//         },

//         MotZoomNeg: {
//             category: 'Motors',
//             type: 'button',
//             name: 'Zoom Neg',
//             style: {
//                 text: 'Zoom Neg\\n',
//                 size: '18',
//                 color: '16777215',
//                 bgcolor: combineRgb(0, 0, 0),
//             },
//             steps: [
//                 {
//                     down: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 7,
//                                 id_speed: -50000,
//                             }
//                         }
//                     ],
//                     up: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 7,
//                                 id_speed: 0,
//                             }
//                         }
//                     ],
//                 },
//             ],
//             feedbacks: [
//                 {
//                     style: {
//                         color: foregroundColor,
//                         bgcolor: backgroundColorRed,
//                     }
//                 }
//             ]
//         },
//         MotZoomPos: {
//             category: 'Motors',
//             type: 'button',
//             name: 'Zoom Pos',
//             style: {
//                 text: 'Zoom Pos\\n',
//                 size: '18',
//                 color: '16777215',
//                 bgcolor: combineRgb(0, 0, 0),
//             },
//             steps: [
//                 {
//                     down: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 7,
//                                 id_speed: 50000,
//                             }
//                         }
//                     ],
//                     up: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 7,
//                                 id_speed: 0,
//                             }
//                         }
//                     ],
//                 },
//             ],
//             feedbacks: [
//                 {
//                     style: {
//                         color: foregroundColor,
//                         bgcolor: backgroundColorRed,
//                     }
//                 }
//             ]
//         },

//         MotRollNeg: {
//             category: 'Motors',
//             type: 'button',
//             name: 'Roll Neg',
//             style: {
//                 text: 'Roll Neg\\n',
//                 size: '18',
//                 color: '16777215',
//                 bgcolor: combineRgb(0, 0, 0),
//             },
//             steps: [
//                 {
//                     down: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 8,
//                                 id_speed: -50000,
//                             }
//                         }
//                     ],
//                     up: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 8,
//                                 id_speed: 0,
//                             }
//                         }
//                     ],
//                 },
//             ],
//             feedbacks: [
//                 {
//                     style: {
//                         color: foregroundColor,
//                         bgcolor: backgroundColorRed,
//                     }
//                 }
//             ]
//         },
//         MotRollPos: {
//             category: 'Motors',
//             type: 'button',
//             name: 'Roll Pos',
//             style: {
//                 text: 'Roll Pos\\n',
//                 size: '18',
//                 color: '16777215',
//                 bgcolor: combineRgb(0, 0, 0),
//             },
//             steps: [
//                 {
//                     down: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 8,
//                                 id_speed: 50000,
//                             }
//                         }
//                     ],
//                     up: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 8,
//                                 id_speed: 0,
//                             }
//                         }
//                     ],
//                 },
//             ],
//             feedbacks: [
//                 {
//                     style: {
//                         color: foregroundColor,
//                         bgcolor: backgroundColorRed,
//                     }
//                 }
//             ]
//         },

//         MotRSFocusNeg: {
//             category: 'Motors',
//             type: 'button',
//             name: 'RSFocus Neg',
//             style: {
//                 text: 'RSFocus Neg\\n',
//                 size: '18',
//                 color: '16777215',
//                 bgcolor: combineRgb(0, 0, 0),
//             },
//             steps: [
//                 {
//                     down: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 9,
//                                 id_speed: -50000,
//                             }
//                         }
//                     ],
//                     up: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 9,
//                                 id_speed: 0,
//                             }
//                         }
//                     ],
//                 },
//             ],
//             feedbacks: [
//                 {
//                     style: {
//                         color: foregroundColor,
//                         bgcolor: backgroundColorRed,
//                     }
//                 }
//             ]
//         },
//         MotRSFocusPos: {
//             category: 'Motors',
//             type: 'button',
//             name: 'RSFocus Pos',
//             style: {
//                 text: 'RSFocus Pos\\n',
//                 size: '18',
//                 color: '16777215',
//                 bgcolor: combineRgb(0, 0, 0),
//             },
//             steps: [
//                 {
//                     down: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 9,
//                                 id_speed: 50000,
//                             }
//                         }
//                     ],
//                     up: [
//                         {
//                             actionId: 'jogMotor',
//                             options: {
//                                 id_mot: 9,
//                                 id_speed: 0,
//                             }
//                         }
//                     ],
//                 },
//             ],
//             feedbacks: [
//                 {
//                     style: {
//                         color: foregroundColor,
//                         bgcolor: backgroundColorRed,
//                     }
//                 }
//             ]
//         },
//         // ########################
// 		// #### Other  Presets ####
// 		// ########################

//     })
// }

module.exports = {
    initPresets: function () {
        let presets = {}
        let SERIES = {}

        const foregroundColor = combineRgb(255, 255, 255) // White
        const backgroundColorRed = combineRgb(255, 0, 0) // Red
        const backgroundColorGreen = combineRgb(0, 255, 0) // Green
        const backgroundColorOrange = combineRgb(255, 102, 0) // Orange

        // ########################
        // #### System Presets ####
        // ########################
        presets.VirtUp = {
            category: 'System',
            type: 'button',
            name: 'Nav Up',
            style: {
                text: 'Up\\n',
                size: '18',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'virtualInput',
                            options: {
                                vbutton: 1,
                            }
                        }
                    ],
                    up: [],
                },
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
            presets.VirtRight = {
                category: 'System',
                type: 'button',
                name: 'Nav Right',
                style: {
                    text: 'Right\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'virtualInput',
                                options: {
                                    vbutton: 2,
                                }
                            }
                        ],
                        up: [],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.VirtDown = {
                category: 'System',
                type: 'button',
                name: 'Nav Down',
                style: {
                    text: 'Down\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'virtualInput',
                                options: {
                                    vbutton: 3,
                                }
                            }
                        ],
                        up: [],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.VirtLeft = {
                category: 'System',
                type: 'button',
                name: 'Nav Left',
                style: {
                    text: 'Left\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'virtualInput',
                                options: {
                                    vbutton: 4,
                                }
                            }
                        ],
                        up: [],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.VirtEnter = {
                category: 'System',
                type: 'button',
                name: 'Nav Enter',
                style: {
                    text: 'Select\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'virtualInput',
                                options: {
                                    vbutton: 0,
                                }
                            },
                            {
                                // actionId: 'virtualInput',
                                // delay: 2000,
                                // options: {
                                //     vbutton: 6,
                                // }
                            },
                        ],
                        up: [
                            //Abort Delayed Actions Here
                        ],
                        2000: { //Duration Group Example
                            options: {
                                runWhileHeld: true,
                            },
                            actions: [
                                {
                                    actionId: 'virtualInput',
                                    options: {
                                        vbutton: 6,
                                    },
                                    delay: 0,
                                },
                            ],
                        },
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.VirtBack = {
                category: 'System',
                type: 'button',
                name: 'Nav Back',
                style: {
                    text: 'Escape\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'virtualInput',
                                options: {
                                    vbutton: 5,
                                }
                            }
                        ],
                        up: [],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            // ########################
            // #### Motor  Presets ####
            // ########################
            presets.MotPanNeg = {
                category: 'Motors',
                type: 'button',
                name: 'Pan Neg',
                style: {
                    text: 'Pan Neg\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 1,
                        //             id_speed: -50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 1,
                                    direction: -1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 1,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.MotPanPos = {
                category: 'Motors',
                type: 'button',
                name: 'Pan Pos',
                style: {
                    text: 'Pan Pos\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 1,
                        //             id_speed: 50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 1,
                                    direction: 1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 1,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },

            presets.MotTiltNeg = {
                category: 'Motors',
                type: 'button',
                name: 'Tilt Neg',
                style: {
                    text: 'Tilt Neg\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 2,
                        //             id_speed: -50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 2,
                                    direction: -1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 2,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.MotTiltPos = {
                category: 'Motors',
                type: 'button',
                name: 'Tilt Pos',
                style: {
                    text: 'Tilt Pos\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 2,
                        //             id_speed: 50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 2,
                                    direction: 1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 2,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },

            presets.MotSlideNeg = {
                category: 'Motors',
                type: 'button',
                name: 'Slide Neg',
                style: {
                    text: 'Slide Neg\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 3,
                        //             id_speed: -50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 3,
                                    direction: -1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 3,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.MotSlidePos = {
                category: 'Motors',
                type: 'button',
                name: 'Slide Pos',
                style: {
                    text: 'Slide Pos\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 3,
                        //             id_speed: 50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 3,
                                    direction: 1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 3,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },

            presets.MotTurnTableNeg = {
                category: 'Motors',
                type: 'button',
                name: 'TurnTable Neg',
                style: {
                    text: 'TT Neg\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 4,
                        //             id_speed: -50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 4,
                                    direction: -1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 4,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.MotTurnTablePos = {
                category: 'Motors',
                type: 'button',
                name: 'TurnTable Pos',
                style: {
                    text: 'TT Pos\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 4,
                        //             id_speed: 50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 4,
                                    direction: 1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 4,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },

            presets.MotFocusNeg = {
                category: 'Motors',
                type: 'button',
                name: 'Focus Neg',
                style: {
                    text: 'Focus Neg\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 5,
                        //             id_speed: -50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 5,
                                    direction: -1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 5,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.MotFocusPos = {
                category: 'Motors',
                type: 'button',
                name: 'Focus Pos',
                style: {
                    text: 'Focus Pos\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 5,
                        //             id_speed: 50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 5,
                                    direction: 1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 5,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },

            presets.MotIrisNeg = {
                category: 'Motors',
                type: 'button',
                name: 'Iris Neg',
                style: {
                    text: 'Iris Neg\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 6,
                        //             id_speed: -50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 6,
                                    direction: -1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 6,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.MotIrisPos = {
                category: 'Motors',
                type: 'button',
                name: 'Iris Pos',
                style: {
                    text: 'Iris Pos\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 6,
                        //             id_speed: 50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 6,
                                    direction: 1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 6,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },

            presets.MotZoomNeg = {
                category: 'Motors',
                type: 'button',
                name: 'Zoom Neg',
                style: {
                    text: 'Zoom Neg\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 7,
                        //             id_speed: -50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 7,
                                    direction: -1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 7,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.MotZoomPos = {
                category: 'Motors',
                type: 'button',
                name: 'Zoom Pos',
                style: {
                    text: 'Zoom Pos\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 7,
                        //             id_speed: 50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 7,
                                    direction: 1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 7,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },

            presets.MotRollNeg = {
                category: 'Motors',
                type: 'button',
                name: 'Roll Neg',
                style: {
                    text: 'Roll Neg\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 8,
                        //             id_speed: -50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 8,
                                    direction: -1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 8,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.MotRollPos = {
                category: 'Motors',
                type: 'button',
                name: 'Roll Pos',
                style: {
                    text: 'Roll Pos\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 8,
                        //             id_speed: 50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 8,
                                    direction: 1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 8,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },

            presets.MotRSFocusNeg = {
                category: 'Motors',
                type: 'button',
                name: 'RSFocus Neg',
                style: {
                    text: 'RSFocus Neg\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 9,
                        //             id_speed: -50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 9,
                                    direction: -1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 9,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.MotRSFocusPos = {
                category: 'Motors',
                type: 'button',
                name: 'RSFocus Pos',
                style: {
                    text: 'RSFocus Pos\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 9,
                        //             id_speed: 50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 9,
                                    direction: 1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 9,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.StopMotors = {
                category: 'Motors',
                type: 'button',
                name: 'Stop All Motors',
                style: {
                    text: 'E-Stop\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'stopMotors',
                            }
                        ],
                        up: [
                            {
                                actionId: 'stopMotors',
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },

            // ########################
            // #### Motor  Speeds  ####
            // ########################


            presets.panSpeedLimit = {
                category: 'Motors',
                type: 'button',
                name: 'Pan Speed',
                style: {
                    text: 'Pan\\nSpeed:\\n$(companion-module-emotimo-st4-3:PanSpeed)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'resetJogSpeed',
                                options: {
                                    id_mot: 1
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.tiltSpeedLimit = {
                category: 'Motors',
                type: 'button',
                name: 'Tilt Speed',
                style: {
                    text: 'Tilt\\nSpeed:\\n$(companion-module-emotimo-st4-3:TiltSpeed)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'resetJogSpeed',
                                options: {
                                    id_mot: 2
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.m3SpeedLimit = {
                category: 'Motors',
                type: 'button',
                name: 'M3 Speed',
                style: {
                    text: 'M3\\nSpeed:\\n$(companion-module-emotimo-st4-3:M3Speed)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'resetJogSpeed',
                                options: {
                                    id_mot: 3
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.m4SpeedLimit = {
                category: 'Motors',
                type: 'button',
                name: 'M4 Speed',
                style: {
                    text: 'M4\\nSpeed:\\n$(companion-module-emotimo-st4-3:M4Speed)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'resetJogSpeed',
                                options: {
                                    id_mot: 4
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.focusSpeedLimit = {
                category: 'Motors',
                type: 'button',
                name: 'Focus Speed',
                style: {
                    text: 'Focus\\nSpeed:\\n$(companion-module-emotimo-st4-3:TN1Speed)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'resetJogSpeed',
                                options: {
                                    id_mot: 5
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.irisSpeedLimit = {
                category: 'Motors',
                type: 'button',
                name: 'Iris Speed',
                style: {
                    text: 'Iris\\nSpeed:\\n$(companion-module-emotimo-st4-3:TN2Speed)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'resetJogSpeed',
                                options: {
                                    id_mot: 6
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.zoomSpeedLimit = {
                category: 'Motors',
                type: 'button',
                name: 'Zoom Speed',
                style: {
                    text: 'Zoom\\nSpeed:\\n$(companion-module-emotimo-st4-3:TN3Speed)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'resetJogSpeed',
                                options: {
                                    id_mot: 7
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.rollSpeedLimit = {
                category: 'Motors',
                type: 'button',
                name: 'Roll Speed',
                style: {
                    text: 'Roll\\nSpeed:\\n$(companion-module-emotimo-st4-3:RollSpeed)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'resetJogSpeed',
                                options: {
                                    id_mot: 8
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            }

        for (let inc = 1; inc < 9; inc++) {
            presets['motorSpeedInc' + inc] = {
                category: 'Motors',
                type: 'button',
                name: 'Motor' + inc + ' Increment',
                style: {
                    text: '⬆️ ' + inc,
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 100),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'setJogSpeed',
                                options: {
                                    id_mot: inc,
                                    direction: 1
                                }
                            }
                        ],
                        up: [
                        ]
                    }
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
                presets['motorSpeedDec' + inc] = {
                    category: 'Motors',
                    type: 'button',
                    name: 'Motor' + inc + ' Decrement',
                    style: {
                        text: '⬇️ ' + inc,
                        color: '16777215',
                        bgcolor: combineRgb(0, 0, 100),
                        // show_topbar: 0          //Hides the Top Bar
                    },
                    steps: [
                        {
                            down: [
                                {
                                    actionId: 'setJogSpeed',
                                    options: {
                                        id_mot: inc,
                                        direction: -1
                                    }
                                }
                            ],
                            up: [
                            ]
                        }
                    ],
                    feedbacks: [
                        {
                            style: {
                                color: foregroundColor,
                                bgcolor: backgroundColorRed,
                            }
                        }
                    ]
                }
        }

        // presets.motorSpeed = {
        //     category: 'Temp',
        //     type: 'button',
        //     name: 'Increment Speed',
        //     style: {
        //         text: 'Test',
        //         size: 44,
        //         color: '16777215',
        //         bgcolor: combineRgb(0, 0, 0),
        //     },
        //     steps: [
        //         {
        //             down: [
        //                 {
        //                     actionId: 'setJogSpeed',
        //                     options: {
        //                         id_mot: 1,
        //                         direction: 1
        //                     }
        //                 }
        //             ],
        //             up: [
        //             ]
        //         },
        //     ],
        //     feedbacks: [
        //         {
        //             style: {
        //                 color: foregroundColor,
        //                 bgcolor: backgroundColorRed,
        //             }
        //         }
        //     ]
        // }

        // ########################
        // #### Go To  Presets ####
        // ########################

        // for (let save = 0; save < 30; save++) {
        //     presets['savePreset' + save] = {
        //         category: 'Save Preset',
        //         type: 'button',
        //         name: 'Save Preset ' + save,
        //         style: {
        //             text: 'Save\\nPSET\\n' + save,
        //             size: '14',
        //             color: '16777215',
        //             bgcolor: combineRgb(0, 0, 0),
        //         },
        //         steps: [
        //             {
        //                 down: [
        //                     {
        //                         actionId: 'savePset',
        //                         options: {
        //                             num: save
        //                         }
        //                     }
        //                 ],
        //                 up: []
        //             },
        //         ],
        //         feedbacks: [
        //             {
        //                 style: {
        //                     color: foregroundColor,
        //                     bgcolor: backgroundColorRed,
        //                 }
        //             }
        //         ]
        //     }
        // }

        for (let recall = 0; recall < 30; recall++) {
            presets['recallPreset' + recall] = {
                category: 'Preset',
                type: 'button',
                name: 'Preset ' + recall,
                style: {
                    text: 'Pre ' + recall,
                    color: '16777215',
                    bgcolor: combineRgb(200, 0, 0),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                        ],
                        up: [
                            {
                                actionId: 'recallPset',
                                options: {
                                    num: recall
                                }
                            }
                        ],
                        2000: {
                            options: {
                                runWhileHeld: true,
                            },
                            actions: [
                                {
                                    actionId: 'savePset',
                                    options: {
                                        num: recall
                                    },
                                    delay: 0,
                                },
                            ],
                        },
                    },
                ],
                feedbacks: [
                    {
                        feedbackId: 'SetPreset',
                        options: {
                            presetNum: recall
                        },
                        style: {
                            bgcolor: combineRgb(0, 127, 0),
                            color: combineRgb(0, 0, 0),
                        },
                    },
                ]
            }
        }

        for (let inc = 0; inc < 30; inc++) {
            presets['increaseRunTime' + inc] = {
                category: 'Preset Timing',
                type: 'button',
                name: 'Increase RunTime Preset ' + inc,
                style: {
                    text: '⬆️ ' + inc,
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 100),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'setPresetRunTime',
                                options: {
                                    id_pst: inc,
                                    direction: 1
                                }
                            }
                        ],
                        up: [
                        ]
                    }
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets['decreaseRunTime' + inc] = {
                category: 'Preset Timing',
                type: 'button',
                name: 'Decrease RunTime Preset ' + inc,
                style: {
                    text: '⬇️ ' + inc,
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 100),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'setPresetRunTime',
                                options: {
                                    id_pst: inc,
                                    direction: -1
                                }
                            }
                        ],
                        up: [
                        ]
                    }
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets['increaseRampTime' + inc] = {
                category: 'Preset Timing',
                type: 'button',
                name: 'Increase RampTime Preset ' + inc,
                style: {
                    text: '⬆️ ' + inc,
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 100),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'setPresetRampTime',
                                options: {
                                    id_pst: inc,
                                    direction: 1
                                }
                            }
                        ],
                        up: [
                        ]
                    }
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets['decreaseRampTime' + inc] = {
                category: 'Preset Timing',
                type: 'button',
                name: 'Decrease RampTime Preset ' + inc,
                style: {
                    text: '⬇️ ' + inc,
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 100),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'setPresetRampTime',
                                options: {
                                    id_pst: inc,
                                    direction: -1
                                }
                            }
                        ],
                        up: [
                        ]
                    }
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets['Preset' + inc + 'RunTime'] = {
                category: 'Preset Timing',
                type: 'button',
                name: 'Preset Run Time ' + inc,
                style: {
                    text: 'Pst\\nRunT:\\n$(companion-module-emotimo-st4-3:Pst' + inc + 'RunT)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'resetPresetRunTime',
                                options: {
                                    id_pst: inc
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets['Preset' + inc + 'RampTime'] = {
                category: 'Preset Timing',
                type: 'button',
                name: 'Preset Ramp Time ' + inc,
                style: {
                    text: 'Pst\\nRampT:\\n$(companion-module-emotimo-st4-3:Pst' + inc + 'RampT)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'resetPresetRampTime',
                                options: {
                                    id_pst: inc
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            }
        }

        for (let inc = 0; inc < 8; inc++) {
            presets['increaseLpRunTime' + inc] = {
                category: 'Loop Timing',
                type: 'button',
                name: 'Increase RunTime Loop ' + inc,
                style: {
                    text: '⬆️ ' + inc,
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 100),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'setLoopRunTime',
                                options: {
                                    id_loop: inc,
                                    direction: 1
                                }
                            }
                        ],
                        up: [
                        ]
                    }
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets['decreaseLpRunTime' + inc] = {
                category: 'Loop Timing',
                type: 'button',
                name: 'Decrease RunTime Loop ' + inc,
                style: {
                    text: '⬇️ ' + inc,
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 100),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'setLoopRunTime',
                                options: {
                                    id_loop: inc,
                                    direction: -1
                                }
                            }
                        ],
                        up: [
                        ]
                    }
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets['increaseLpRampTime' + inc] = {
                category: 'Loop Timing',
                type: 'button',
                name: 'Increase RampTime Loop ' + inc,
                style: {
                    text: '⬆️ ' + inc,
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 100),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'setLoopRampTime',
                                options: {
                                    id_loop: inc,
                                    direction: 1
                                }
                            }
                        ],
                        up: [
                        ]
                    }
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets['decreaseLpRampTime' + inc] = {
                category: 'Loop Timing',
                type: 'button',
                name: 'Decrease RampTime Loop ' + inc,
                style: {
                    text: '⬇️ ' + inc,
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 100),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'setLoopRampTime',
                                options: {
                                    id_loop: inc,
                                    direction: -1
                                }
                            }
                        ],
                        up: [
                        ]
                    }
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets['Loop' + inc + 'RunTime'] = {
                category: 'Loop Timing',
                type: 'button',
                name: 'Loop Run Time ' + inc,
                style: {
                    text: 'Loop\\nRunT:\\n$(companion-module-emotimo-st4-3:Lp' + inc + 'RunT)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'resetLoopRunTime',
                                options: {
                                    id_loop: inc
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets['Loop' + inc + 'RampTime'] = {
                category: 'Loop Timing',
                type: 'button',
                name: 'Loop Ramp Time ' + inc,
                style: {
                    text: 'Loop\\nRampT:\\n$(companion-module-emotimo-st4-3:Lp' + inc + 'RampT)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'resetLoopRampTime',
                                options: {
                                    id_loop: inc
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            }
        }

        // for (let increaseRunTime = 0; increaseRunTime < 30; increaseRunTime++) {
        //     presets['increaseRunTime' + increaseRunTime] = {
        //         category: 'Preset Timing',
        //         name: 'Increase RunTime Preset ' + increaseRunTime,
        //         type: 'button',
        //         style: {
        //             text: 'Increase Run\\nT' + increaseRunTime,
        //             size: '14',
        //             // png64: '\x2B06',
        //             color: '16777215',
        //             bgcolor: combineRgb(0, 0, 0),
        //         },
        //         steps: [
        //             {
        //                 down: [
        //                     {
        //                         actionId: 'presetRunTimeU',
        //                         options: {
        //                             num: increaseRunTime
        //                         }
        //                     }
        //                 ],
        //                 up: []
        //             },
        //         ],
        //         feedbacks: [
        //             {
        //                 style: {
        //                     color: foregroundColor,
        //                     bgcolor: backgroundColorRed,
        //                 }
        //             }
        //         ]
        //     }
        // }

        // for (let decreaseRunTime = 0; decreaseRunTime < 30; decreaseRunTime++) {
        //     presets['decreaseRunTime' + decreaseRunTime] = {
        //         category: 'Preset Timing',
        //         name: 'Decrease RunTime Preset ' + decreaseRunTime,
        //         type: 'button',
        //         style: {
        //             text: 'Decrease Run\\nT' + decreaseRunTime,
        //             size: '14',
        //             color: '16777215',
        //             bgcolor: combineRgb(0, 0, 0),
        //         },
        //         steps: [
        //             {
        //                 down: [
        //                     {
        //                         actionId: 'presetRunTimeD',
        //                         options: {
        //                             num: decreaseRunTime
        //                         }
        //                     }
        //                 ],
        //                 up: []
        //             },
        //         ],
        //         feedbacks: [
        //             {
        //                 style: {
        //                     color: foregroundColor,
        //                     bgcolor: backgroundColorRed,
        //                 }
        //             }
        //         ]
        //     }
        // }

        // for (let increaseRampTime = 0; increaseRampTime < 30; increaseRampTime++) {
        //     presets['increaseRampTime' + increaseRampTime] = {
        //         category: 'Preset Timing',
        //         name: 'Increase RampTime Preset ' + increaseRampTime,
        //         type: 'button',
        //         style: {
        //             text: 'Increase Ramp\\nT' + increaseRampTime,
        //             size: '14',
        //             color: '16777215',
        //             bgcolor: combineRgb(0, 0, 0),
        //         },
        //         steps: [
        //             {
        //                 down: [
        //                     {
        //                         actionId: 'presetRampTimeU',
        //                         options: {
        //                             num: increaseRampTime
        //                         }
        //                     }
        //                 ],
        //                 up: []
        //             },
        //         ],
        //         feedbacks: [
        //             {
        //                 style: {
        //                     color: foregroundColor,
        //                     bgcolor: backgroundColorRed,
        //                 }
        //             }
        //         ]
        //     }
        // }

        // for (let decreaseRampTime = 0; decreaseRampTime < 30; decreaseRampTime++) {
        //     presets['decreaseRampTime' + decreaseRampTime] = {
        //         category: 'Preset Timing',
        //         name: 'Decrease RampTime Preset ' + decreaseRampTime,
        //         type: 'button',
        //         style: {
        //             text: 'Decrease Ramp\\nT' + decreaseRampTime,
        //             size: '14',
        //             color: '16777215',
        //             bgcolor: combineRgb(0, 0, 0),
        //         },
        //         steps: [
        //             {
        //                 down: [
        //                     {
        //                         actionId: 'presetRampTimeD',
        //                         options: {
        //                             num: decreaseRampTime
        //                         }
        //                     }
        //                 ],
        //                 up: []
        //             },
        //         ],
        //         feedbacks: [
        //             {
        //                 style: {
        //                     color: foregroundColor,
        //                     bgcolor: backgroundColorRed,
        //                 }
        //             }
        //         ]
        //     }
        // }

        // ########################
        // #### Loop   Presets ####
        // ########################

        // for (let loopPresets = 0; loopPresets < 8; loopPresets++) {
        //     presets['saveLoopPresets' + loopPresets] = {
        //         category: 'Loops',
        //         name: 'Setup Loop ' + loopPresets,
        //         style: {
        //             text: 'Setup Loop\\n' + loopPresets,
        //             size: '14',
        //             color: '16777215',
        //             bgcolor: combineRgb(0, 0, 0),
        //         },
        //         steps: [
        //             {
        //                 down: [
        //                     {
        //                         actionId: 'setLoop',
        //                         options: {
        //                             num: loopPresets
        //                         }
        //                     }
        //                 ],
        //                 up: []
        //             },
        //         ],
        //         feedbacks: [
        //             {
        //                 style: {
        //                     color: foregroundColor,
        //                     bgcolor: backgroundColorRed,
        //                 }
        //             }
        //         ]
        //     }
        // }

        // for (let loopPresets = 0; loopPresets < 8; loopPresets++) {
        //     presets['recallLoopPresets' + loopPresets] = {
        //         category: 'Loops',
        //         name: 'Start Loop ' + loopPresets,
        //         style: {
        //             text: 'Start Loop\\n' + loopPresets,
        //             size: '14',
        //             color: '16777215',
        //             bgcolor: combineRgb(0, 0, 0),
        //         },
        //         steps: [
        //             {
        //                 down: [
        //                     {
        //                         actionId: 'startLoop',
        //                         options: {
        //                             num: loopPresets
        //                         }
        //                     }
        //                 ],
        //                 up: []
        //             },
        //         ],
        //         feedbacks: [
        //             {
        //                 style: {
        //                     color: foregroundColor,
        //                     bgcolor: backgroundColorRed,
        //                 }
        //             }
        //         ]
        //     }

        // }

        // presets.StopLoop = {
        //     category: 'Loops',
        //     name: 'Stop Loop',
        //     style: {
        //         text: 'Stop Loop\\n',
        //         size: '14',
        //         color: '16777215',
        //         bgcolor: combineRgb(0, 0, 0),
        //     },
        //     steps: [
        //         {
        //             down: [
        //                 {
        //                     actionId: 'stopLoop',
        //                 }
        //             ],
        //             up: []
        //         },
        //     ],
        //     feedbacks: [
        //         {
        //             style: {
        //                 color: foregroundColor,
        //                 bgcolor: backgroundColorRed,
        //             }
        //         }
        //     ]
        // }

        this.setPresetDefinitions(presets);
    }
}