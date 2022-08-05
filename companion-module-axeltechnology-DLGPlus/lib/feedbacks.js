const { ICON_STE, ICON_OAAT, ICON_LOOP } = require("../icons/icons")

/**/
module.exports = {
	//feedbacks initializer, this function describes which effect will the feedback have and condition to make it work
	init_feedbacks(){

		const feedbacks = {}

		//callbacks, external from feedback declaration for variable issues
		var playPauseCallback = (function (feedback) {
			var orgTime = ''
			if (feedback.options.Stime) {
				orgTime = this.setTimeString(this.PlayerInfo.OnAirRemain)
			}
			if (this.PlayerInfo.PlayerStatus == 2) {
				return {

					bgcolor: feedback.options.bg,
					png64: this.Progressbar[this.PICON],
					text: feedback.options.Playtext + '\\n' + orgTime,

				}

			} else if (this.PlayerInfo.PlayerStatus == 1) {
				return {
					bgcolor: feedback.options.PC,
					png64: this.Progressbar[this.PICON],
					text: feedback.options.Pausetext + '\\n' + orgTime,
				}
			} else if (this.PlayerInfo.CaptureMode) {
				return {
					bgcolor: feedback.options.RC,
					png64: this.Progressbar[this.PICON],
					text: feedback.options.Rtext + '\\n' + orgTime,
				}
			} else {
				return {
					bgcolor: feedback.options.SC,
					png64: this.Progressbar[this.PICON],
					text: feedback.options.Stext + '\\n' + orgTime,
				}
            }
		}).bind(this)

		


		//called in the play button
		feedbacks['Play/Pause'] = {
			type: 'advanced',
			label: 'Change bar Status when clip is playing',
			description: 'When the clip is playing, background, remaining time and Progress bar will be changed',
			options: [{
				
					type: 'colorpicker',
					label: 'Playing color',
					id: 'bg',
					default: this.rgb(255, 0, 0)
				
			},
				{

					type: 'colorpicker',
					label: 'Paused color',
					id: 'PC',
					default: this.rgb(0, 0, 0)

				},
				{

					type: 'colorpicker',
					label: 'Stopped color',
					id: 'SC',
					default: this.rgb(0, 0, 0)

				},
				{

					type: 'colorpicker',
					label: 'Recording color',
					id: 'RC',
					default: this.rgb(0, 0, 0)

				},
				{
					type: 'textinput',
					label: 'Playing Text',
					id: 'Playtext',
					default: 'Playing'
				},
				{
					type: 'textinput',
					label: 'Paused Text',
					id: 'Pausetext',
					default: 'Paused'
				},
				{
					type: 'textinput',
					label: 'Stopped Text',
					id: 'Stext',
					default: 'Stopped'
				},
				{
					type: 'textinput',
					label: 'Recording Text',
					id: 'Rtext',
					default: 'Recording'
				},
				{
					type: 'checkbox',
					label: 'ShowTime',
					id: 'Stime',
					default: true
				}

			],

			callback: playPauseCallback
		}

		this.setFeedbackDefinitions(feedbacks)
	}
}
/**/