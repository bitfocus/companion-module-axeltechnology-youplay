const { ICON_STE, ICON_OAAT, ICON_LOOP,ICON_PLAY,ICON_STOP} = require("../icons/icons")

/**/
module.exports = {
	//feedbacks initializer, this function describes which effect will the feedback have and condition to make it work
	init_feedbacks(){

		const feedbacks = {}

		//callbacks, external from feedback declaration for variable issues
		//feedback for play button,changes color depending on status and implements a progress bar made frame by frame
		var playPauseCallback = (function (feedback) {
			if(this.YPinstance == "All"){

			}else{
				if (this.PlayerInfo[this.YPinstance-1].PlayerStatus == 2) {
				return {
					png64: ICON_PLAY,
				}
				} else if (this.PlayerInfo[this.YPinstance-1].PlayerStatus == 1) {
				return {
					png64: ICON_STOP,
				}
			} 
		}
		}).bind(this)

		var InstaceBg = (function (feedback) {

			if(this.YPinstance=="All"){
				return{
					bgcolor: this.bgColor[0]
				}
			}else{
				return{
					bgcolor: this.bgColor[this.YPinstance]
				}
			}

		}).bind(this)

		//changes mode button color and text depending on player status
		var ModeChangeCallBack = (function (feedback) {

			if (this.PlayerInfo.CaptureMode) {
				return {
					bgcolor: feedback.options.RC,		
					text: feedback.options.Rtext ,
				}
			} else {
				return {
					bgcolor: feedback.options.PC,
					text: feedback.options.Ptext 
				}
			}

        }).bind(this)

		//changes icon and color of a button depending on the play mode status
		
		var PlayModeCallBack = (function (feedback) {

			if (this.PlayerInfo.PlayerStartToEnd) {
				return { bgcolor: feedback.options.bg1,
							png64: ICON_STE		
						}
			} else if (this.PlayerInfo.PlayerOneAtATime) {
				return { bgcolor: feedback.options.bg2,
							png64: ICON_OAAT		
						}
			}else{
				return { bgcolor: feedback.options.bg3,
							png64: ICON_LOOP		
						}
			}

		}).bind(this)

		var recstopCallBack = (function (feedback) {

			var recTotD = ''
			if (feedback.options.Stime) {
				recTotD = this.setTimeStringRecorder(this.RecorderInfo.Duration)
			}


			if (!this.PlayerInfo.CaptureMode) {
				return {
					bgcolor: feedback.options.PC,
					text: feedback.options.Ptext,
                }

			}else if (this.RecorderInfo.CaptureState == 2) {
				return {

					bgcolor: feedback.options.RC,
					text: feedback.options.Rtext + '\\n' + recTotD,

				}
			} else {
				return {
					bgcolor: feedback.options.SC,
					text: feedback.options.Stext + '\\n' + recTotD,
				}
			}


		}).bind(this)

		var mixerCallback = (function (feedback) {

				if (this.PlayerInfo.PlayerMixerEnabled) {
					return true
				} else {
					return false
				}

		}).bind(this)

		var CgCallback = (function (feedback) {

			if (this.PlayerInfo.PlayerLogoEnabled) {
				return true
			} else {
				return false
			}

		}).bind(this)

		var ClipToPlayCallback = (function (feedback) {
			var CTP = this.KeyPad.ClipToPlay;
			return {
				text: feedback.options.toPlayTxT + '\\n' + CTP
			}

		}).bind(this)




		//called in the play button
		feedbacks['Play/Pause'] = {
			type: 'advanced',
			label: 'Change button Status when clip is playing',
			description: 'When the clip is playing, background will be changed',

			callback: playPauseCallback
		},

		feedbacks['InstaceBg'] = {
			type: 'advanced',
			label: 'Change button background depending on instance',
			description: 'Change button background depending on instance',

			callback: InstaceBg
		},

		//called in the mode switcher
		feedbacks['ModeChange'] = {

				type: 'advanced',
				label: 'Changes button color depending on You play status (player/recorder)',
				description: 'Button changes depending on the youPlay instance status ',
				options: [
					{
						type: 'colorpicker',
						label: 'Player color',
						id: 'PC',
						default: this.rgb(0, 0, 255)
					},
					{
						type: 'colorpicker',
						label: 'Recorder color',
						id: 'RC',
						default: this.rgb(255, 0, 0)
					},
					{
						type: 'textinput',
						label: 'Player Text',
						id: 'Ptext',
						default: 'Player \\n Mode'
					},
					{
						type: 'textinput',
						label: 'Recorder Text',
						id: 'Rtext',
						default: 'Recorder \\n Mode'
					},
				],

				callback: ModeChangeCallBack
			},
		
		//called in the player state buttons
		feedbacks['STE/OAAT/LOOP'] = {

				type: 'advanced',
				label: 'Changes button color when Player has the same mode as the button',
				description: 'When the player mode(Start to end,one at  time, loop) equals the one set in the feedback, the color changes',
				options: [
				{
					type: 'colorpicker',
					label: 'Background color',
					id: 'bg1',
					default: this.rgb(255, 0, 0)
				},
				{
					type: 'colorpicker',
					label: 'Background color',
					id: 'bg2',
					default: this.rgb(0, 225, 0)
				},
				{
					type: 'colorpicker',
					label: 'Background color',
					id: 'bg3',
					default: this.rgb(0, 0, 225)
				}
				],

				callback: PlayModeCallBack
			}

		//called on the rec button
		feedbacks['Rec/Stop'] = {
			type: 'advanced',
			label: 'Change bar Status when recording',
			description: 'When recording a clip background and clip duration will be changed',
			options: [
				{

					type: 'colorpicker',
					label: 'recording color',
					id: 'RC',
					default: this.rgb(255, 0, 0)

				},
				{

					type: 'colorpicker',
					label: 'stopped color',
					id: 'SC',
					default: this.rgb(0, 0, 0)

				},
				{

					type: 'colorpicker',
					label: 'Player color',
					id: 'PC',
					default: this.rgb(0, 0, 255)

				},
				{
					type: 'textinput',
					label: 'Recording Text',
					id: 'Rtext',
					default: 'Recordin'
				},
				{
					type: 'textinput',
					label: 'Stopped text',
					id: 'Stext',
					default: 'stopped'
				},
				{
					type: 'textinput',
					label: 'Player text',
					id: 'Ptext',
					default: 'player'
				},
				{
					type: 'checkbox',
					label: 'ShowTime',
					id: 'Stime',
					default: true
				},
			],
			callback: recstopCallBack
		}

		//called in the mixer button
		feedbacks['Mixer'] = {

			type: 'boolean',
			label: 'Mixer Color',
			description: 'Button changes depending on the youPlay mixer status ',
			style: {

				color: this.rgb(255, 255, 255),
				bgcolor: this.rgb(0, 0, 0)
			},
			callback: mixerCallback
		},
			//called in the CG button
			feedbacks['LogoCg'] = {

				type: 'boolean',
				label: 'Cg Color',
				description: 'Button changes depending on the youPlay Cg status ',
				style: {

					color: this.rgb(255, 255, 255),
					bgcolor: this.rgb(0, 0, 0)
				},
				callback: CgCallback
			},

			//wanted to make feedback for keypad playclip button
			feedbacks['ClipPlaying'] = {

				type: 'advanced',
				label: 'Changes Text to clip digited',
				description: 'Shows clip digited on the keypad',
				options: [
					{
						type: 'textinput',
						label: 'Background color',
						id: 'toPlayTxT',
						default: 'Pay:',
					}
				],

				callback: ClipToPlayCallback
			},


		this.setFeedbackDefinitions(feedbacks)
	}
}
/**/