const { combineRgb } = require('@companion-module/base')

let { MODELS, SERIES_SPECS } = require('./models.js')

const foregroundColor = combineRgb(255, 255, 255) // White
const backgroundColorRed = combineRgb(255, 0, 0) // Red
const backgroundColorGreen = combineRgb(0, 255, 0) // Green
const backgroundColorOrange = combineRgb(255, 102, 0) // Orange

module.exports = function (self) {
	// initPresets: function () {
    self.setPresetDefinitions({
		// let presets = {}
		// let SERIES = {}

		

        // ########################
		// #### System Presets ####
		// ########################
        VirtUp: {
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
        VirtRight: {
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
        VirtDown: {
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
        VirtLeft: {
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
        VirtEnter: {
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
                            actionId: 'virtualInput',
                            delay:  2000,
                            options: {
                                vbutton: 6,
                            }
                        },
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
        VirtBack: {
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
        MotPanNeg: {
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
        MotPanPos: {
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

        MotTiltNeg: {
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
        MotTiltPos: {
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

        MotSlideNeg: {
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
        MotSlidePos: {
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

        MotTurnTableNeg: {
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
        MotTurnTablePos: {
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

        MotFocusNeg: {
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
        MotFocusPos: {
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

        MotIrisNeg: {
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
        MotIrisPos: {
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

        MotZoomNeg: {
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
        MotZoomPos: {
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

        MotRollNeg: {
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
        MotRollPos: {
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

        MotRSFocusNeg: {
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
        MotRSFocusPos: {
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
        // ########################
		// #### Other  Presets ####
		// ########################

        

        // this.setPresetDefinitions(presets);
    })
}