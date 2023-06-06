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
                        down: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 1,
                                    id_speed: -50000,
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
                        down: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 1,
                                    id_speed: 50000,
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
                        down: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 2,
                                    id_speed: -50000,
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
                        down: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 2,
                                    id_speed: 50000,
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
                        down: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 3,
                                    id_speed: -50000,
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
                        down: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 3,
                                    id_speed: 50000,
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
                        down: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 4,
                                    id_speed: -50000,
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
                        down: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 4,
                                    id_speed: 50000,
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
                        down: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 5,
                                    id_speed: -50000,
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
                        down: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 5,
                                    id_speed: 50000,
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
                        down: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 6,
                                    id_speed: -50000,
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
                        down: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 6,
                                    id_speed: 50000,
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
                        down: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 7,
                                    id_speed: -50000,
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
                        down: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 7,
                                    id_speed: 50000,
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
                        down: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 8,
                                    id_speed: -50000,
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
                        down: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 8,
                                    id_speed: 50000,
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
                        down: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 9,
                                    id_speed: -50000,
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
                        down: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 9,
                                    id_speed: 50000,
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
            }
        // ########################
        // #### Go To  Presets ####
        // ########################

        for (let save = 0; save < 128; save++) {
            presets['savePreset' + save] = {
                category: 'Save Preset',
                type: 'button',
                name: 'Save Preset ' + save,
                style: {
                    text: 'Save\\nPSET\\n' + save,
                    size: '14',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'savePset',
                                options: {
                                    num: save
                                }
                            }
                        ],
                        up: []
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

        for (let recall = 0; recall < 128; recall++) {
            presets['recallPreset' + recall] = {
                category: 'Recall Preset',
                type: 'button',
                name: 'Recall Preset ' + recall,
                style: {
                    text: 'Recall\\nPSET\\n' + recall,
                    size: '14',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            // {
                            //     actionId: 'recallPset',
                            //     options: {
                            //         num: recall
                            //     }
                            // }
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
                        //         {
                        //             actionId: 'buttonFeedback',
                        //             options: { bol: '1' },
                        //             delay: 0,
                        //         },
                            ],
                        },
                        // 2001: [
                        //     {
                        //         actionId: 'buttonFeedback',
                        //         options: { bol: '0' },
                        //     },
                        // ],
                    },
                ],
                // feedbacks: [
                //     {
                //         feedbackId: 'heldFeedback',
                //         options: {},
                //         style: {
                //             color: combineRgb(0, 0, 0),//COLORS.BLACK,
				//             bgcolor: combineRgb(255, 255, 0),//COLORS.YELLOW,
                //         },
                //     },
                // ],
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

        for (let increaseRunTime = 0; increaseRunTime < 128; increaseRunTime++) {
            presets['increaseRunTime' + increaseRunTime] = {
                category: 'Preset Timing',
                name: 'Increase RunTime Preset ' + increaseRunTime,
                type: 'button',
                style: {
                    text: 'Increase Run\\nT' + increaseRunTime,
                    size: '14',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'presetRunTimeU',
                                options: {
                                    num: increaseRunTime
                                }
                            }
                        ],
                        up: []
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

        for (let decreaseRunTime = 0; decreaseRunTime < 128; decreaseRunTime++) {
            presets['decreaseRunTime' + decreaseRunTime] = {
                category: 'Preset Timing',
                name: 'Decrease RunTime Preset ' + decreaseRunTime,
                type: 'button',
                style: {
                    text: 'Decrease Run\\nT' + decreaseRunTime,
                    size: '14',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'presetRunTimeD',
                                options: {
                                    num: decreaseRunTime
                                }
                            }
                        ],
                        up: []
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

        for (let increaseRampTime = 0; increaseRampTime < 128; increaseRampTime++) {
            presets['increaseRampTime' + increaseRampTime] = {
                category: 'Preset Timing',
                name: 'Increase RampTime Preset ' + increaseRampTime,
                type: 'button',
                style: {
                    text: 'Increase Ramp\\nT' + increaseRampTime,
                    size: '14',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'presetRampTimeU',
                                options: {
                                    num: increaseRampTime
                                }
                            }
                        ],
                        up: []
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

        for (let decreaseRampTime = 0; decreaseRampTime < 128; decreaseRampTime++) {
            presets['decreaseRampTime' + decreaseRampTime] = {
                category: 'Preset Timing',
                name: 'Decrease RampTime Preset ' + decreaseRampTime,
                type: 'button',
                style: {
                    text: 'Decrease Ramp\\nT' + decreaseRampTime,
                    size: '14',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'presetRampTimeD',
                                options: {
                                    num: decreaseRampTime
                                }
                            }
                        ],
                        up: []
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