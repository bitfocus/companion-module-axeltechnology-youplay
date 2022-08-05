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
		}),

			//play/pause button
			presets.push({
				category: 'Player',
				label: 'Play / Pause',
				bank: {
					style: 'text',
					text: 'Play/Pause',
					textaligment: 'center:center',
					png64: this.ICON_PBAR0,
					pngalignment: 'center:center',
					size: '14',
					color: '16777215',
					bgcolor: this.rgb(0, 0, 0),
				},
				actions: [{
					action: 'Play_PauseClip',

				}],

				feedbacks: [
					{
						type: 'Play/Pause',
						options: {
							RC: this.rgb(255, 0, 0),
							bg: this.rgb(0, 0, 255),
							SC: this.rgb(0, 0, 0),
							PC: this.rgb(100, 0, 100),
							Playtext: 'Playing',
							Pausetext: 'Paused',
							Stext: 'Stopped',
							Rtext: 'Recording',
							Stime: true
						}
					},
				],
			}),

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

				}),

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

		}),

		//STE Button
		presets.push({
			category: 'Player',
			label: 'Player Mode Changer',
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
		
		//Mixer Button
		presets.push({
			category: 'Player',
			label: 'Mixer',
			bank: {
				style: 'text',
				text: 'Mixer',
				textaligment: 'center:top',
				size: '24',
				color: '16777215',
				bgcolor: this.rgb(0, 0, 0),
			},
			actions: [{
				action: 'Mixer',

			}],
			feedbacks: [{
				type: 'Mixer',
				style: {

					color: this.rgb(255, 255, 255),
					bgcolor: this.rgb(255, 0, 0)
				},

			}]

		})

		//Logo Cg Button
		presets.push({
			category: 'Player',
			label: 'LogoCg',
			bank: {
				style: 'text',
				text: 'Cg',
				textaligment: 'center:top',
				size: '24',
				color: '16777215',
				bgcolor: this.rgb(0, 0, 0),
			},
			actions: [{
				action: 'LogoCg',

			}],
			feedbacks: [{
				type: 'LogoCg',
				style: {

					color: this.rgb(255, 255, 255),
					bgcolor: this.rgb(255, 0, 0)
				},
			}]

		})
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
					RC: this.rgb(255, 0, 0),
					PC: this.rgb(0, 0, 255),
					Ptext: 'Player',
					Rtext: 'Recorder'
                }
			}]

		})
		//Rec Button
		presets.push({
			category: 'Recorder',
			label: 'Start/Stop recording',
			bank: {
				style: 'text',
				text: 'Start/Stop \\n Recording',
				color: '16777215',
				textaligment: 'center:center',
				size: '14',
				bgcolor: this.rgb(0, 0, 0),
			},
			actions: [{
				action: 'CaptureStart_Stop',

			}],
			feedbacks: [{
				type: 'Rec/Stop',
				options: {
					RC:this.rgb(255,0,0),
					SC: this.rgb(0, 0, 0),
					PC: this.rgb(155, 0, 155),
				}
			}]

		})

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

			})
        }
        
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

		//ClipPlaying

		this.setPresetDefinitions(presets)
	}
}
/**/