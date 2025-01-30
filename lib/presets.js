/**/
const { ICON_ALL, ICON_MIXER, ICON_CG } = require("../icons/icons")
const { combineRgb } = require('@companion-module/base')

module.exports = function (self) {

	//preset initializer, in self function we declare which configuration and which actionIds will the preset function use
		const presets = []

			//previous clip
		presets.push({
			type: 'button',
			category: 'Player',
			name: 'Previous',
			style: {
				text: '',
				textaligment: 'center:top',
				png64: self.ICON_PREV,
				pngalignment: 'center:center',
				size: '14',
				color: combineRgb(255,255,255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [{
				
				down: [{
					actionId: 'previousClip',
				}]
			}],
			feedbacks: [
				{
					feedbackId:'InstaceBg',
				},
			],
		}),
//-------------------------------------------------------------------------------
		//play/pause button
		presets.push({
			type: 'button',
			category: 'Player',
			name: 'Play / Pause',
			style: {
				textaligment: 'center:center',
				png64: self.ICON_PLAY,
				pngalignment: 'center:center',
				size: '14',
				color: combineRgb(255,255,255),
			},
			steps: [{
				
				down: [{
					actionId: 'Play_PauseClip',
				}]
			}],

			feedbacks: [
				{
					feedbackId: 'Play_Pause',
				},
				{
					feedbackId:'InstaceBg',
				}
				
			],
		}),
//-------------------------------------------------------------------------------
		//stop button
		presets.push({
			type: 'button',
			category: 'Player',
			name: 'Stop',
			style: {
				text: '',
				textaligment: 'center:top',
				png64: self.ICON_STOP,
				pngalignment: 'center:center',
				size: '14',
				color: combineRgb(255,255,255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [{

				down: [{
					actionId: 'StopClip',
				}]

			}],
			feedbacks: [
				{
					feedbackId:'InstaceBg',
				},
			],

		}),
//-------------------------------------------------------------------------------
		//skip button
		presets.push({
			type: 'button',
			category: 'Player',
			name: 'Skip',
			style: {
				text: '',
				textaligment: 'center:top',
				png64: self.ICON_SKIP,
				pngalignment: 'center:center',
				size: '14',
				color: combineRgb(255,255,255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [{
			
				down: [{
					actionId: 'skipClip',
				}]
			}],
			feedbacks: [
				{
					feedbackId:'InstaceBg',
				},
			],

		}),
//-------------------------------------------------------------------------------
		//STE Button
		presets.push({
			type: 'button',
			category: 'Player',
			name: 'Start To End',
			style: {
				text: '',
				textaligment: 'center:top',
				png64: self.ICON_STE,
				pngalignment: 'center:center',
				size: '14',
				color: combineRgb(255,255,255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [{
				
				down: [{
					actionId: 'switchPlayMode',
					options: {
						ModeChoise: 0,
					}
				}]
			}],
			feedbacks: [
			{
				feedbackId: 'STE_OAAT_LOOP',
				options: {
					ModeChoise:0
                }
            }]

		}),
		//OAAT Button
		presets.push({
			type: 'button',
			category: 'Player',
			name: 'One at a time',
			style: {
				text: '',
				textaligment: 'center:top',
				png64: self.ICON_OAAT,
				pngalignment: 'center:center',
				size: '14',
				color: combineRgb(255,255,255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [{
				
				down: [{
					actionId: 'switchPlayMode',
					options: {
						ModeChoise: 1,
					}
				}]
			}],
			feedbacks: [
			{
				feedbackId: 'STE_OAAT_LOOP',
				options: {
					ModeChoise: 1
				}
			}]

		})
		//Loop Button
		presets.push({
			type: 'button',
			category: 'Player',
			name: 'Loop',
			style: {
				text: '',
				textaligment: 'center:top',
				png64: self.ICON_LOOP,
				pngalignment: 'center:center',
				size: '14',
				color: combineRgb(255,255,255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [{
				
				down: [{
					actionId: 'switchPlayMode',
					options: {
						ModeChoise: 2,
					}
				}]
			}],
			feedbacks: [
			{
				feedbackId: 'STE_OAAT_LOOP',
				options: {
					ModeChoise: 2
				}
			}]

		})

//-------------------------------------------------------------------------------
		//Mixer Button
		presets.push({
			type: 'button',
			category: 'Player',
			name: 'Mixer',
			style: {
				png64: self.ICON_MIXER,
				pngalignment: 'center:center',
				size: '24',
				color: combineRgb(255,255,255),
			},
			steps: [{
				
				down: [{
					actionId: 'Mixer',
				}]
			}],
			feedbacks: [
			{
				feedbackId: 'Mixer',

			}]

		})
//-------------------------------------------------------------------------------
		//Logo Cg Button	
		presets.push({
			type: 'button',
			category: 'Player',
			name: 'Player Audio Preview',
			style: {
				png64: self.ICON_AUDIO_PREVIEW,
				pngalignment: 'center:center',
				size: '24',
				color: combineRgb(255,255,255),
			},
			steps: [{
				
				down: [{
					actionId: 'PlayerAudioPreview',
				}]

			}],
			feedbacks: [
			{
				feedbackId: 'PlayerAudioPreview',
			}]

		})
//-------------------------------------------------------------------------------
		presets.push({
			type: 'button',
			category: 'Recorder',
			name: 'Capture Audio Preview',
			style: {
				png64: self.ICON_AUDIO_PREVIEW,
				pngalignment: 'center:center',
				size: '24',
				color: combineRgb(255,255,255),
			},
			steps: [{
				
				down: [{
					actionId: 'CaptureAudioPreview',
				}]
			}],
			feedbacks: [
			{
				feedbackId: 'CaptureAudioPreview',
			}]

		})
//-------------------------------------------------------------------------------
		presets.push({
			type: 'button',
			category: 'Recorder',
			name: 'Capture Add To Playlist',
			style: {
				png64: self.ICON_ADDTOPLAYLIST,
				pngalignment: 'center:center',
				size: '24',
				color: combineRgb(255,255,255),
			},
			steps: [{
				
				down: [{
					actionId: 'CaptureAddToPlaylist',
				}]
			}],
			feedbacks: [
			{
				feedbackId: 'CaptureAddToPlaylist',
			}]

		})
//-------------------------------------------------------------------------------
		presets.push({
			type: 'button',
			category: 'Recorder',
			name: 'Change Capture Scheduler',
			style: {
				png64: self.ICON_SCHEDULE,
				pngalignment: 'center:center',
				size: '24',
				color: combineRgb(255,255,255),
			},
			steps: [{
				
				down: [{
					actionId: 'ChangeCaptureScheduler',
				}]
			}],
			feedbacks: [
			{
				feedbackId: 'ChangeCaptureScheduler',
			}]

		})
//-------------------------------------------------------------------------------
		

		
		presets.push({
			type: 'button',
			category: 'Player',
			name: 'setOnAirMarkIn',
			style: {
				png64: self.ICON_MARK_IN,
				pngalignment: 'center:center',
				size: '24',
				color: combineRgb(255,255,255),
			},
			steps: [{
				
				down: [{
					actionId: 'setOnAirMarkIn',
				}]
			}],
			feedbacks: [
			{
				feedbackId: 'InstaceBg',
			}]

		})
//-------------------------------------------------------------------------------
		presets.push({
			type: 'button',
			category: 'Player',
			name: 'setOnAirMarkOut',
			style: {
				png64: self.ICON_MARK_OUT,
				pngalignment: 'center:center',
				size: '24',
				color: combineRgb(255,255,255),
			},
			steps: [{
				
				down: [{
					actionId: 'setOnAirMarkOut',
				}]
			}],
			feedbacks: [
			{
				feedbackId: 'InstaceBg',
			}]

		})
//-------------------------------------------------------------------------------
		presets.push({
			type: 'button',
			category: 'Player',
			name: 'applyOnAirMarkers',
			style: {
				png64: self.ICON_MARK_YES,
				pngalignment: 'center:center',
				size: '24',
				color: combineRgb(255,255,255),
			},
			steps: [{
				
				down: [{
					actionId: 'applyOnAirMarkers',
				}]
			}],
			feedbacks: [
			{
				feedbackId: 'InstaceBg',
			}]

		})
//-------------------------------------------------------------------------------
		presets.push({
			type: 'button',
			category: 'Player',
			name: 'resetOnAirMarkers',
			style: {
				png64: self.ICON_MARK_NO,
				pngalignment: 'center:center',
				size: '24',
				color: combineRgb(255,255,255),
			},
			steps: [{
				
				down: [{
					actionId: 'resetOnAirMarkers',
				}]
			}],
			feedbacks: [
			{
				feedbackId: 'InstaceBg',
			}]

		})

//-------------------------------------------------------------------------------
		//Mode Switcher
		presets.push({
			type: 'button',
			category: 'Player',
			name: 'ModeSwitcher',
			style: {
				text: 'Mode Switcher',
				color: combineRgb(255,255,255),
				textaligment: 'center:top',
				size: '14',
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [{
				
				down: [{
					actionId: 'switchCaptureMode',
				}]
			}],
			feedbacks: [
			{
				feedbackId: 'ModeChange',
				options: {
					Ptext: 'Player',
					Rtext: 'Recorder'
                }
			}]

		})
//-------------------------------------------------------------------------------
		//Rec Button
		presets.push({
			type: 'button',
			category: 'Recorder',
			name: 'Start/Stop recording',
			style: {
				color: combineRgb(255,255,255),
				png64: self.ICON_REC,
				textaligment: 'center:center',
				size: '14',
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [{
				
				down: [{
					actionId: 'CaptureStart',
				}]
			}],
			feedbacks: [
			{
				feedbackId: 'Rec_Stop',
			}]

		})

//--------------------------------------
		//Mode Switcher
		presets.push({
			type: 'button',
			category: 'Recorder',
			name: 'CaptureTakeSnapshot',
			style: {
				png64: self.ICON_SNAPSHOT,
				color: combineRgb(255,255,255),
				textaligment: 'center:top',
				size: '14',
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [{
				
				down: [{
					actionId: 'CaptureTakeSnapshot',
				}]
			}],
			feedbacks: [
			{
				feedbackId: 'InstaceBg',

			}]

		})
		

//-------------------------------------------------------------------------------
		//Keypad Buttons
		for (var i = 0; i <= 9; i++) {

			is = i.toString()
			//Number Button
			presets.push({
				type: 'button',
				category: 'KeyPad',
				name: is,
				style: {
					text: is,
					color: combineRgb(255,255,255),
					textaligment: 'center:center',
					size: '30',
					bgcolor: combineRgb(0, 0, 0),
				},
				steps: [{
				
					down: [{
						actionId: 'addNumber',
						options: {
							NumChoise: i,
						}
					}]
				}],
				feedbacks: [
				{
					feedbackId:'InstaceBg',
				}],

			})
        }
//-------------------------------------------------------------------------------       
		//Rec Button
		presets.push({
			type: 'button',
			category: 'KeyPad',
			name: 'Launch Clip',
			style: {
				text: 'Play: ',
				color: combineRgb(255,255,255),
				textaligment: 'center:center',
				size: '14',
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [{
				
				down: [{
					actionId: 'playNumerClip',
				}]
			}],
			feedbacks: [
			{
				feedbackId: 'ClipPlaying',
				options: {
					toPlayTxT:'Play:',
				}
			},
			{
				feedbackId:'InstaceBg',
			}]

		})

//-------------------------------------------------------------------------------	
		//Channel controls
		presets.push({
			type: 'button',
			category: 'Channels',
			name: 'Select Channel',
			style: {
				text: '',
				pngalignment: 'center:center',
				png64:self.ICON_ALL,
				textaligment: 'center:center',
				bgcolor: self.setColor(0),
			},
			steps: [{
				
				down: [{
					actionId: 'InstanceToControl',
					options: {
						InstChoise:"All",
						ChColor: self.setColor(0),
					}
				}]
			}],
			feedbacks: [
			{
				feedbackId: 'ChannelColor',
				options: {
					InstChoise: "All"
				}
			}]

		})
//-------------------------------------------------------------------------------	
		presets.push({
			type: 'button',
			category: 'Channels',
			name: 'Select Channel',
			style: {
				text: '',
				pngalignment: 'center:center',
				png64:self.ICON_1,
				textaligment: 'center:center',
				bgcolor: self.setColor(1),
			},
			steps: [{
				
				down: [{
					actionId: 'InstanceToControl',
					options: {
						InstChoise:"1",
						ChColor: self.setColor(1),
					}
				}]
			}],
			feedbacks: [
			{
				feedbackId: 'ChannelColor',
				options: {
					InstChoise: "1"
				}
			}]

		})
//-------------------------------------------------------------------------------	
		presets.push({
			type: 'button',
			category: 'Channels',
			name: 'Select Channel',
			style: {
				text: '',
				pngalignment: 'center:center',
				png64:self.ICON_2,
				textaligment: 'center:center',
				bgcolor: self.setColor(2),
			},
			steps: [{
				
				down: [{
					actionId: 'InstanceToControl',
					options: {
						InstChoise:"2",
						ChColor: self.setColor(2),
					}
				}]
			}],
			feedbacks: [
			{
				feedbackId: 'ChannelColor',
				options: {
					InstChoise: "2"
				}
			}]

		})
//-------------------------------------------------------------------------------
		presets.push({
			type: 'button',
			category: 'Channels',
			name: 'Select Channel',
			style: {
				text: '',
				pngalignment: 'center:center',
				png64:self.ICON_3,
				textaligment: 'center:center',
				bgcolor: self.setColor(3),
			},
			steps: [{
				
				down: [{
					actionId: 'InstanceToControl',
					options: {
						InstChoise:"3",
						ChColor: self.setColor(3),
					}
				}]
			}],
			feedbacks: [
			{
				feedbackId: 'ChannelColor',
				options: {
					InstChoise: "3"
				}
			}]

		})
//-------------------------------------------------------------------------------
		presets.push({
			type: 'button',
			category: 'Channels', 
			name: 'Select Channel',
			style: {
				text: '',
				pngalignment: 'center:center',
				png64:self.ICON_4,
				textaligment: 'center:center',
				bgcolor: self.setColor(4),
			},
			steps: [{
				
				down: [{
					actionId: 'InstanceToControl',
					options: {
						InstChoise:"4",
						ChColor: self.setColor(4),
					}
				}]
			}],
			feedbacks: [
			{
				feedbackId: 'ChannelColor',
				options: {
					InstChoise: "4"
				}
			}]

		})
//-------------------------------------------------------------------------------
		presets.push({
			type: 'button',
			category: 'Empty',
			name: 'Empty Button',
			style: {
				text: '',
				pngalignment: 'center:center',
				textaligment: 'center:center',
			},
			
			feedbacks: [
			{
				feedbackId: 'InstaceBg',
			}]

		})

		self.setPresetDefinitions(presets)
	
}
/**/