const { ICON_ALL, ICON_MIXER, ICON_CG } = require("../icons/icons")
/**/
module.exports = {

	//preset initializer, in this function we declare which configuration and which actions will the preset function use
	init_presets() {
		const presets = []

			//previous clip
		presets.push({
			category: 'Player',
			label: 'Previous',
			bank: {
				style: 'text',
				text: '',
				textaligment: 'center:top',
				png64: this.ICON_PREV,
				pngalignment: 'center:center',
				size: '14',
				color: '16777215',
				bgcolor: this.rgb(0, 0, 0),
			},
			actions: [{
				action: 'previousClip',
			}],
			feedbacks: [
				{
					type:'InstaceBg',
				},
			],
		}),
//-------------------------------------------------------------------------------
		//play/pause button
		presets.push({
			category: 'Player',
			label: 'Play / Pause',
			bank: {
				style: 'text',
				textaligment: 'center:center',
				png64: this.ICON_PLAY,
				pngalignment: 'center:center',
				size: '14',
				color: '16777215',
			},
			actions: [{
				action: 'Play_PauseClip',

			}],

			feedbacks: [
				{
					type: 'Play/Pause',
				},
				{
					type:'InstaceBg',
				}
				
			],
		}),
//-------------------------------------------------------------------------------
		//stop button
		presets.push({
			category: 'Player',
			label: 'Stop',
			bank: {
				style: 'text',
				text: '',
				textaligment: 'center:top',
				png64: this.ICON_STOP,
				pngalignment: 'center:center',
				size: '14',
				color: '16777215',
				bgcolor: this.rgb(0, 0, 0),
			},
			actions: [{
				action: 'StopClip',

			}],
			feedbacks: [
				{
					type:'InstaceBg',
				},
			],

		}),
//-------------------------------------------------------------------------------
		//skip button
		presets.push({
				category: 'Player',
				label: 'Skip',
				bank: {
					style: 'text',
					text: '',
					textaligment: 'center:top',
					png64: this.ICON_SKIP,
					pngalignment: 'center:center',
					size: '14',
					color: '16777215',
					bgcolor: this.rgb(0, 0, 0),
				},
				actions: [{
					action: 'skipClip',

				}],
				feedbacks: [
					{
						type:'InstaceBg',
					},
				],

		}),
//-------------------------------------------------------------------------------
		//STE Button
		presets.push({
			category: 'Player',
			label: 'Start To End',
			bank: {
				style: 'text',
				text: '',
				textaligment: 'center:top',
				png64: this.ICON_STE,
				pngalignment: 'center:center',
				size: '14',
				color: '16777215',
				bgcolor: this.rgb(0, 0, 0),
			},
			actions: [{
				action: 'switchPlayMode',
				options: {
					ModeChoise: 0,
                }
			}],
			feedbacks: [{
				type: 'STE/OAAT/LOOP',
				options: {
					ModeChoise:0
                }
            }]

		}),
		//OAAT Button
		presets.push({
				category: 'Player',
				label: 'One at a time',
				bank: {
					style: 'text',
					text: '',
					textaligment: 'center:top',
					png64: this.ICON_OAAT,
					pngalignment: 'center:center',
					size: '14',
					color: '16777215',
					bgcolor: this.rgb(0, 0, 0),
				},
			actions: [{
				action: 'switchPlayMode',
				options: {
					ModeChoise: 1,
				}
			}],
			feedbacks: [{
				type: 'STE/OAAT/LOOP',
				options: {
					ModeChoise: 1
				}
			}]

		})
		//Loop Button
		presets.push({
			category: 'Player',
			label: 'Loop',
			bank: {
				style: 'text',
				text: '',
				textaligment: 'center:top',
				png64: this.ICON_LOOP,
				pngalignment: 'center:center',
				size: '14',
				color: '16777215',
				bgcolor: this.rgb(0, 0, 0),
			},
			actions: [{
				action: 'switchPlayMode',
				options: {
					ModeChoise: 2,
				}
			}],
			feedbacks: [{
				type: 'STE/OAAT/LOOP',
				options: {
					ModeChoise: 2
				}
			}]

		})

//-------------------------------------------------------------------------------
		//Mixer Button
		presets.push({
			category: 'Player',
			label: 'Mixer',
			bank: {
				style: 'text',
				png64: this.ICON_MIXER,
				pngalignment: 'center:center',
				size: '24',
				color: '16777215',
			},
			actions: [{
				action: 'Mixer',

			}],
			feedbacks: [{
				type: 'Mixer',

			}]

		})
//-------------------------------------------------------------------------------
		//Logo Cg Button	
		presets.push({
			category: 'Player',
			label: 'Player Audio Preview',
			bank: {
				style: 'text',
				png64: this.ICON_AUDIO_PREVIEW,
				pngalignment: 'center:center',
				size: '24',
				color: '16777215',
			},
			actions: [{
				action: 'PlayerAudioPreview',

			}],
			feedbacks: [{
				type: 'PlayerAudioPreview',
			}]

		})
//-------------------------------------------------------------------------------
		presets.push({
			category: 'Recorder',
			label: 'Capture Audio Preview',
			bank: {
				style: 'text',
				png64: this.ICON_AUDIO_PREVIEW,
				pngalignment: 'center:center',
				size: '24',
				color: '16777215',
			},
			actions: [{
				action: 'CaptureAudioPreview',

			}],
			feedbacks: [{
				type: 'CaptureAudioPreview',
			}]

		})
//-------------------------------------------------------------------------------
		presets.push({
			category: 'Recorder',
			label: 'Capture Add To Playlist',
			bank: {
				style: 'text',
				png64: this.ICON_ADDTOPLAYLIST,
				pngalignment: 'center:center',
				size: '24',
				color: '16777215',
			},
			actions: [{
				action: 'CaptureAddToPlaylist',

			}],
			feedbacks: [{
				type: 'CaptureAddToPlaylist',
			}]

		})
//-------------------------------------------------------------------------------
		presets.push({
			category: 'Recorder',
			label: 'Change Capture Scheduler',
			bank: {
				style: 'text',
				png64: this.ICON_SCHEDULE,
				pngalignment: 'center:center',
				size: '24',
				color: '16777215',
			},
			actions: [{
				action: 'ChangeCaptureScheduler',

			}],
			feedbacks: [{
				type: 'ChangeCaptureScheduler',
			}]

		})
//-------------------------------------------------------------------------------
		

		
		presets.push({
			category: 'Player',
			label: 'setOnAirMarkIn',
			bank: {
				style: 'text',
				png64: this.ICON_MARK_IN,
				pngalignment: 'center:center',
				size: '24',
				color: '16777215',
			},
			actions: [{
				action: 'setOnAirMarkIn',

			}],
			feedbacks: [{
				type: 'InstaceBg',
			}]

		})
//-------------------------------------------------------------------------------
		presets.push({
			category: 'Player',
			label: 'setOnAirMarkOut',
			bank: {
				style: 'text',
				png64: this.ICON_MARK_OUT,
				pngalignment: 'center:center',
				size: '24',
				color: '16777215',
			},
			actions: [{
				action: 'setOnAirMarkOut',

			}],
			feedbacks: [{
				type: 'InstaceBg',
			}]

		})
//-------------------------------------------------------------------------------
		presets.push({
			category: 'Player',
			label: 'applyOnAirMarkers',
			bank: {
				style: 'text',
				png64: this.ICON_MARK_YES,
				pngalignment: 'center:center',
				size: '24',
				color: '16777215',
			},
			actions: [{
				action: 'applyOnAirMarkers',

			}],
			feedbacks: [{
				type: 'InstaceBg',
			}]

		})
//-------------------------------------------------------------------------------
		presets.push({
			category: 'Player',
			label: 'resetOnAirMarkers',
			bank: {
				style: 'text',
				png64: this.ICON_MARK_NO,
				pngalignment: 'center:center',
				size: '24',
				color: '16777215',
			},
			actions: [{
				action: 'resetOnAirMarkers',

			}],
			feedbacks: [{
				type: 'InstaceBg',
			}]

		})

//-------------------------------------------------------------------------------
		//Mode Switcher
		presets.push({
			category: 'Player',
			label: 'ModeSwitcher',
			bank: {
				style: 'text',
				text: 'Mode Switcher',
				color: '16777215',
				textaligment: 'center:top',
				size: '14',
				bgcolor: this.rgb(0, 0, 0),
			},
			actions: [{
				action: 'switchCaptureMode',

			}],
			feedbacks: [{
				type: 'ModeChange',
				options: {
					Ptext: 'Player',
					Rtext: 'Recorder'
                }
			}]

		})
//-------------------------------------------------------------------------------
		//Rec Button
		presets.push({
			category: 'Recorder',
			label: 'Start/Stop recording',
			bank: {
				style: 'text',
				color: '16777215',
				png64: this.ICON_REC,
				textaligment: 'center:center',
				size: '14',
				bgcolor: this.rgb(0, 0, 0),
			},
			actions: [{
				action: 'CaptureStart',

			}],
			feedbacks: [{
				type: 'Rec/Stop',
			}]

		})

//--------------------------------------
		//Mode Switcher
		presets.push({
			category: 'Recorder',
			label: 'CaptureTakeSnapshot',
			bank: {
				style: 'text',
				png64: this.ICON_SNAPSHOT,
				color: '16777215',
				textaligment: 'center:top',
				size: '14',
				bgcolor: this.rgb(0, 0, 0),
			},
			actions: [{
				action: 'CaptureTakeSnapshot',

			}],
			feedbacks: [{
				type: 'InstaceBg',

			}]

		})
		

//-------------------------------------------------------------------------------
		//Keypad Buttons
		for (var i = 0; i <= 9; i++) {

			is = i.toString()
			//Number Button
			presets.push({
				category: 'KeyPad',
				label: is,
				bank: {
					style: 'text',
					text: is,
					color: '16777215',
					textaligment: 'center:center',
					size: '30',
					bgcolor: this.rgb(0, 0, 0),
				},
				actions: [{
					action: 'addNumber',
					options: {
						NumChoise: i,
                    }

				}],
				feedbacks: [
					{
						type:'InstaceBg',
					},
				],

			})
        }
//-------------------------------------------------------------------------------       
		//Rec Button
		presets.push({
			category: 'KeyPad',
			label: 'Launch Clip',
			bank: {
				style: 'text',
				text: 'Play: ',
				color: '16777215',
				textaligment: 'center:center',
				size: '14',
				bgcolor: this.rgb(0, 0, 0),
			},
			actions: [{
				action: 'playNumerClip',

			}],
			feedbacks: [{
				type: 'ClipPlaying',
				options: {
					toPlayTxT:'Play:',
					
				}
			}]

		})

//-------------------------------------------------------------------------------	
		//Channel controls
		presets.push({
			category: 'Channels',
			label: 'Select Channel',
			bank: {
				style: 'text',
				text: '',
				pngalignment: 'center:center',
				png64:this.ICON_ALL,
				textaligment: 'center:center',
				bgcolor: this.setColor(0),
			},
			actions: [{
				action: 'InstanceToControl',
				options: {
					InstChoise:"All",
					ChColor: this.setColor(0),
				}
			}],
			feedbacks: [{
				type: 'ChannelColor',
				options: {
					InstChoise: "All"
				}
			}]

		})
//-------------------------------------------------------------------------------	
		presets.push({
			category: 'Channels',
			label: 'Select Channel',
			bank: {
				style: 'text',
				text: '',
				pngalignment: 'center:center',
				png64:this.ICON_1,
				textaligment: 'center:center',
				bgcolor: this.setColor(1),
			},
			actions: [{
				action: 'InstanceToControl',
				options: {
					InstChoise:"1",
					ChColor: this.setColor(1),
				}
			}],
			feedbacks: [{
				type: 'ChannelColor',
				options: {
					InstChoise: "1"
				}
			}]

		})
//-------------------------------------------------------------------------------	
		presets.push({
			category: 'Channels',
			label: 'Select Channel',
			bank: {
				style: 'text',
				text: '',
				pngalignment: 'center:center',
				png64:this.ICON_2,
				textaligment: 'center:center',
				bgcolor: this.setColor(2),
			},
			actions: [{
				action: 'InstanceToControl',
				options: {
					InstChoise:"2",
					ChColor: this.setColor(2),
				}
			}],
			feedbacks: [{
				type: 'ChannelColor',
				options: {
					InstChoise: "2"
				}
			}]

		})
//-------------------------------------------------------------------------------
		presets.push({
			category: 'Channels',
			label: 'Select Channel',
			bank: {
				style: 'text',
				text: '',
				pngalignment: 'center:center',
				png64:this.ICON_3,
				textaligment: 'center:center',
				bgcolor: this.setColor(3),
			},
			actions: [{
				action: 'InstanceToControl',
				options: {
					InstChoise:"3",
					ChColor: this.setColor(3),
				}
			}],
			feedbacks: [{
				type: 'ChannelColor',
				options: {
					InstChoise: "3"
				}
			}]

		})
//-------------------------------------------------------------------------------
		presets.push({
			category: 'Channels',
			label: 'Select Channel',
			bank: {
				style: 'text',
				text: '',
				pngalignment: 'center:center',
				png64:this.ICON_4,
				textaligment: 'center:center',
				bgcolor: this.setColor(4),
			},
			actions: [{
				action: 'InstanceToControl',
				options: {
					InstChoise:"4",
					ChColor: this.setColor(4),
				}
			}],
			feedbacks: [{
				type: 'ChannelColor',
				options: {
					InstChoise: "4"
				}
			}]

		})
//-------------------------------------------------------------------------------
		presets.push({
			category: 'Empty',
			label: 'Empty Button',
			bank: {
				style: 'text',
				text: '',
				pngalignment: 'center:center',
				textaligment: 'center:center',
			},
			actions: [{
			}],
			feedbacks: [{
				type: 'InstaceBg',
			}]

		})

		this.setPresetDefinitions(presets)
	}
}
/**/