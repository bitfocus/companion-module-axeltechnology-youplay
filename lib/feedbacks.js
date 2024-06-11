const { ICON_NOT_REC,ICON_REC,ICON_PLAY,ICON_PAUSE} = require("../icons/icons")
const { combineRgb } = require('@companion-module/base')
/**/
module.exports = async function (self) {
	//feedbacks initializer, this function describes which effect will the feedback have and condition to make it work

	self.setFeedbackDefinitions({
		Play_Pause: {

			name: 'Change button Status when clip is playing',
			type: 'advanced',
			label: 'When the clip is playing, background will be changed',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			callback: () => {

				if(self.YPinstance == "All"){

				}else{
					
					if (self.PlayerInfo[self.YPinstance-1].PlayerStatus == 2) {

						return {
							png64: ICON_PAUSE,
						}
					} else if (self.PlayerInfo[self.YPinstance-1].PlayerStatus == 1) {
						return {
							png64: ICON_PLAY,
						}
					} 
				}
				},
		},

		InstaceBg:{

			name: 'Change button background depending on instance',
			type: 'advanced',
			label: 'Change button background depending on instance',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			callback: () => {

				if(self.YPinstance=="All"){
					return{
						bgcolor: self.setColor(0)
					}
				}else{
					return{
						bgcolor: self.setColor(self.YPinstance)
					}
				}
			}
		},
		ChannelColor:{

			type: 'advanced',
			name: 'Change channel button background depending on setting',
			label: 'Change button background depending on instance',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [{
				type: 'dropdown',
				label: 'which Instance',
				id: 'InstChoise',
				default: '1',
				tooltip: 'Which instance to control?',
				choices: [
					{ id: '1', label: '1' },
					{ id: '2', label: '2' },
					{ id: '3', label: '3' },
					{ id: '4', label: '4' },
					{ id: 'All', label: 'All' },
				],
			}],
	
			callback: (feedback) => {

				if(feedback.options.InstChoise!=self.YPinstance){
					return{
						bgcolor: combineRgb(64,64,64)
					}
		
				}else if(feedback.options.InstChoise == "All"){
					return{
						bgcolor: self.bgColor[0]
					}
				}else{
					return{
						bgcolor: self.bgColor[feedback.options.InstChoise]
					}
				}
		
			}
		},
		ModeChange: {
			type: 'advanced',
			name: 'Changes button color depending on You play status (player/recorder)',
			label: 'Button changes depending on the youPlay instance status ',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
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

			callback: (feedback)=>{
				if(self.YPinstance=="All"){
					return {
						bgcolor: self.bgColor[0],		
						text: "Mode //n switcher" ,
					}
				}
		
				if (self.PlayerInfo[self.YPinstance-1].CaptureMode) {
					return {
						bgcolor: self.bgColor[self.YPinstance],		
						text: feedback.options.Rtext ,
					}
				} else {
					return {
						bgcolor: combineRgb(64,64,64),
						text: feedback.options.Ptext 
					}
				}
			}
		},
		STE_OAAT_LOOP : {

			type: 'advanced',
			name: 'Changes button color when Player has the same mode as the button',
			label: 'When the player mode(Start to end,one at  time, loop) equals the one set in the feedback, the color changes',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
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

			callback: (feedback) =>{

				var mode = 4

				if(self.YPinstance=="All"){
					return {
						bgcolor: self.bgColor[0],
						
					}
				}

				if (self.PlayerInfo[self.YPinstance-1].PlayerStartToEnd) {
					mode = 0
				} else if (self.PlayerInfo[self.YPinstance-1].PlayerOneAtATime) {
					mode = 1
				} else if(self.PlayerInfo[self.YPinstance-1].PlayerLoop){
					mode = 2
				}
				
				if (mode == feedback.options.ModeChoise) {
					return { bgcolor: self.bgColor[self.YPinstance] }
				} else {
					return { bgcolor: combineRgb(64,64,64)}
				}
			}
		},
		Rec_Stop :{
			type: 'advanced',
			name: 'Change bar Status when recording',
			label: 'When recording a clip background and clip duration will be changed',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			
			callback: () =>{

				if(self.YPinstance=="All"){
					return {bgcolor: self.bgColor[0],png64:ICON_REC}
		
				}else if (self.RecorderInfo[self.YPinstance-1].CaptureState == 2) {
					return {
		
						bgcolor: self.bgColor[self.YPinstance],
						png64:ICON_REC
		
					}
				} else {
					return {
						bgcolor: combineRgb(64,64,64),
						png64:ICON_NOT_REC,
					}
				}
			}
		},
		Mixer:{

			type: 'advanced',
			name: 'Mixer Color',
			label: 'Button changes depending on the youPlay mixer status ',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			callback: () =>{

				if(self.YPinstance=="All"){
					return{
						bgcolor: self.bgColor[0]
					}
				}else if (self.PlayerInfo[self.YPinstance-1].PlayerMixerEnabled) {
					return{
						bgcolor: self.bgColor[self.YPinstance]
					}
				} else {
					return{
						bgcolor: combineRgb(64,64,64)
					}
				}
			}
		},
		LogoCg: {

			type: 'advanced',
			name: 'Cg Color',
			label: 'Button changes depending on the youPlay Cg status ',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			callback: ()=>{

				if(self.YPinstance=="All"){
					return{
						bgcolor: self.bgColor[0]
					}
				}else if (self.PlayerInfo[self.YPinstance-1].PlayerLogoEnabled) {
					return{
						bgcolor: self.bgColor[self.YPinstance]
					}
				} else {
					return{
						bgcolor: combineRgb(64,64,64)
					}
				}
			}
		},
		PlayerAudioPreview:{

			type: 'advanced',
			name: 'Cg Color',
			label: 'Button changes depending on the the player audio preview status ',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			callback: () =>{

				if(self.YPinstance=="All"){
					return{
						bgcolor: self.bgColor[0]
					}
				}else if (self.PlayerInfo[self.YPinstance-1].PlayerAudioPreviewEnabled) {
					return{
						bgcolor: self.bgColor[self.YPinstance]
					}
				} else {
					return{
						bgcolor: combineRgb(64,64,64)
					}
				}
			}
		},
		CaptureAudioPreview: {

			type: 'advanced',
			name: 'CaptureAudioPreview',
			label: 'Button changes depending on the recorder audio preview status ',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			callback: () => {

				if(self.YPinstance=="All"){
					return{
						bgcolor: self.bgColor[0]
					}
				}else if (self.RecorderInfo[self.YPinstance-1].AudioPreviewEnabled) {
					return{
						bgcolor: self.bgColor[self.YPinstance]
					}
				} else {
					return{
						bgcolor: combineRgb(64,64,64)
					}
				}
			}
		},
		CaptureAddToPlaylist:{

			type: 'advanced',
			name: 'Capture Add To Playlist',
			label: 'Button changes depending on the recorder add to playlist status ',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			callback: () => {

				if(self.YPinstance=="All"){
					return{
						bgcolor: self.bgColor[0]
					}
				}else if (self.RecorderInfo[self.YPinstance-1].AddToThePlaylist) {
					return{
						bgcolor: self.bgColor[self.YPinstance]
					}
				} else {
					return{
						bgcolor: combineRgb(64,64,64)
					}
				}
			}
		},
		ChangeCaptureScheduler: {

			type: 'advanced',
			name: 'Change Capture Scheduler',
			label: 'Button changes depending on the recorder schedule status ',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			callback: () => {
				if(self.YPinstance=="All"){
					return{
						bgcolor: self.bgColor[0]
					}
				}else if (self.RecorderInfo[self.YPinstance-1].ScheduleEnabled) {
					return{
						bgcolor: self.bgColor[self.YPinstance]
					}
				} else {
					return{
						bgcolor: combineRgb(64,64,64)
					}
				}
			}
		},
		ClipPlaying:{

			type: 'advanced',
			name: 'Changes Text to clip digited',
			label: 'Shows clip digited on the keypad',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					type: 'textinput',
					label: 'Background color',
					id: 'toPlayTxT',
					default: 'Play:',
				}
			],

			callback: (feedback) => {
				var CTP = self.KeyPad.ClipToPlay;
				return {
					text: feedback.options.toPlayTxT + '\\n' + CTP
				}
			}
		},
	})

	
}
/**/