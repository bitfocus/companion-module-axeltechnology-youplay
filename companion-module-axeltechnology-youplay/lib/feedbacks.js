const { ICON_NOT_REC,ICON_REC,ICON_PLAY,ICON_STOP} = require("../icons/icons")

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
					png64: ICON_STOP,
				}
				} else if (this.PlayerInfo[this.YPinstance-1].PlayerStatus == 1) {
				return {
					png64: ICON_PLAY,
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


		var ChannelColor = (function (feedback) {

			if(feedback.options.InstChoise!=this.YPinstance){
				return{
					bgcolor: this.rgb(64,64,64)
				}

			}else if(feedback.options.InstChoise == "All"){
				return{
					bgcolor: this.bgColor[0]
				}
			}else{
				return{
					bgcolor: this.bgColor[feedback.options.InstChoise]
				}
			}

		}).bind(this)


		
		//changes mode button color and text depending on player status
		var ModeChangeCallBack = (function (feedback) {

			if(this.YPinstance=="All"){
				return {
					bgcolor: this.bgColor[0],		
					text: "Mode //n switcher" ,
				}
			}

			if (this.PlayerInfo[this.YPinstance-1].CaptureMode) {
				return {
					bgcolor: this.bgColor[this.YPinstance],		
					text: feedback.options.Rtext ,
				}
			} else {
				return {
					bgcolor: this.rgb(64,64,64),
					text: feedback.options.Ptext 
				}
			}

        }).bind(this)

		//changes icon and color of a button depending on the play mode status
		
		var PlayModeCallBack = (function (feedback) {
				var mode = 4
				if(this.YPinstance=="All"){
					return {
						bgcolor: this.bgColor[0],
						
					}
				}

				if (this.PlayerInfo[this.YPinstance-1].PlayerStartToEnd) {

					mode = 0
				} else if (this.PlayerInfo[this.YPinstance-1].PlayerOneAtATime) {
					mode = 1
				} else if(this.PlayerInfo[this.YPinstance-1].PlayerLoop){
					mode = 2
				}
			
			if (mode == feedback.options.ModeChoise) {
				return { bgcolor: this.bgColor[this.YPinstance] }
			} else {
				return { bgcolor: this.rgb(64,64,64)}
			}

		}).bind(this)

		var recstopCallBack = (function (feedback) {

			if(this.YPinstance=="All"){
				return {bgcolor: this.bgColor[0],png64:ICON_REC}

			}else if (this.RecorderInfo[this.YPinstance-1].CaptureState == 2) {
				return {

					bgcolor: this.bgColor[this.YPinstance],
					png64:ICON_REC

				}
			} else {
				return {
					bgcolor: this.rgb(64,64,64),
					png64:ICON_NOT_REC,
				}
			}


		}).bind(this)

		var mixerCallback = (function (feedback) {

				if(this.YPinstance=="All"){
					return{
						bgcolor: this.bgColor[0]
					}
				}else if (this.PlayerInfo[this.YPinstance-1].PlayerMixerEnabled) {
					return{
						bgcolor: this.bgColor[this.YPinstance]
					}
				} else {
					return{
						bgcolor: this.rgb(64,64,64)
					}
				}

		}).bind(this)

		var CgCallback = (function (feedback) {

				if(this.YPinstance=="All"){
					return{
						bgcolor: this.bgColor[0]
					}
				}else if (this.PlayerInfo[this.YPinstance-1].PlayerLogoEnabled) {
					return{
						bgcolor: this.bgColor[this.YPinstance]
					}
				} else {
					return{
						bgcolor: this.rgb(64,64,64)
					}
				}

		}).bind(this)

		var PlayerAudioPreviewCallback = (function (feedback) {

			if(this.YPinstance=="All"){
				return{
					bgcolor: this.bgColor[0]
				}
			}else if (this.PlayerInfo[this.YPinstance-1].PlayerAudioPreviewEnabled) {
				return{
					bgcolor: this.bgColor[this.YPinstance]
				}
			} else {
				return{
					bgcolor: this.rgb(64,64,64)
				}
			}

		}).bind(this)

		var CaptureAudioPreviewCallback = (function (feedback) {

			if(this.YPinstance=="All"){
				return{
					bgcolor: this.bgColor[0]
				}
			}else if (this.RecorderInfo[this.YPinstance-1].AudioPreviewEnabled) {
				return{
					bgcolor: this.bgColor[this.YPinstance]
				}
			} else {
				return{
					bgcolor: this.rgb(64,64,64)
				}
			}

		}).bind(this)

		var CaptureAddToPlaylistCallback = (function (feedback) {

			if(this.YPinstance=="All"){
				return{
					bgcolor: this.bgColor[0]
				}
			}else if (this.RecorderInfo[this.YPinstance-1].AddToThePlaylist) {
				return{
					bgcolor: this.bgColor[this.YPinstance]
				}
			} else {
				return{
					bgcolor: this.rgb(64,64,64)
				}
			}

		}).bind(this)

		var ChangeCaptureSchedulerCallback = (function (feedback) {

			if(this.YPinstance=="All"){
				return{
					bgcolor: this.bgColor[0]
				}
			}else if (this.RecorderInfo[this.YPinstance-1].ScheduleEnabled) {
				return{
					bgcolor: this.bgColor[this.YPinstance]
				}
			} else {
				return{
					bgcolor: this.rgb(64,64,64)
				}
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

		feedbacks['ChannelColor'] = {
			type: 'advanced',
			label: 'Change channel button background depending on setting',
			description: 'Change button background depending on instance',
			options: [{
				type: 'dropdown',
				label: 'which Instance',
				id: 'InstChoise',
				default: '1',
				tooltip: 'Which instance?',
				choices: [
					{ id: '1', label: '1' },
					{ id: '2', label: '2' },
					{ id: '3', label: '3' },
					{ id: '4', label: '4' },
					{ id: 'All', label: 'All' },
				],
			}],

			callback: ChannelColor
		},


		//called in the mode switcher
		feedbacks['ModeChange'] = {

				type: 'advanced',
				label: 'Changes button color depending on You play status (player/recorder)',
				description: 'Button changes depending on the youPlay instance status ',
				options: [
					{
						type: 'textinput',
						label: 'Player Text',
						id: 'Ptext',
						default: 'Player'
					},
					{
						type: 'textinput',
						label: 'Recorder Text',
						id: 'Rtext',
						default: 'Recorder'
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
						type: 'dropdown',
						label: 'which Mode',
						id: 'ModeChoise',
						default: '1',
						tooltip: 'Which Mode?',
						choices: [
							{ id: '0', label: 'Start to End' },
							{ id: '1', label: 'One at a time' },
							{ id: '2', label: 'Loop' },
						],
	
					}],

				callback: PlayModeCallBack
			}

		//called on the rec button
		feedbacks['Rec/Stop'] = {
			type: 'advanced',
			label: 'Change bar Status when recording',
			description: 'When recording a clip background and clip duration will be changed',
			
			callback: recstopCallBack
		}

		//called in the mixer button
		feedbacks['Mixer'] = {

			type: 'advanced',
			label: 'Mixer Color',
			description: 'Button changes depending on the youPlay mixer status ',
			
			callback: mixerCallback
		},
			//called in the CG button
			feedbacks['LogoCg'] = {

				type: 'advanced',
				label: 'Cg Color',
				description: 'Button changes depending on the youPlay Cg status ',
				
				callback: CgCallback
			},

			feedbacks['PlayerAudioPreview'] = {

				type: 'advanced',
				label: 'Cg Color',
				description: 'Button changes depending on the the player audio preview status ',
				
				callback: PlayerAudioPreviewCallback
			},

			feedbacks['CaptureAudioPreview'] = {

				type: 'advanced',
				label: 'CaptureAudioPreview',
				description: 'Button changes depending on the recorder audio preview status ',
				
				callback: CaptureAudioPreviewCallback
			},

			feedbacks['CaptureAddToPlaylist'] = {

				type: 'advanced',
				label: 'Capture Add To Playlist',
				description: 'Button changes depending on the recorder add to playlist status ',
				
				callback: CaptureAddToPlaylistCallback
			},

			feedbacks['ChangeCaptureScheduler'] = {

				type: 'advanced',
				label: 'Change Capture Scheduler',
				description: 'Button changes depending on the recorder schedule status ',
				
				callback: ChangeCaptureSchedulerCallback
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