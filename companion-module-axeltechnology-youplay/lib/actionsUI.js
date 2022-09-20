/**/
module.exports = {
	//function called in the intYouPlay to get the actions array
	//UI OF EACH ACTION
	getActions() {
		return {

			InstanceToControl: {
				label: 'Decide wich instance to control using this action',
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
                },
				{

					type: 'colorpicker',
					label: 'Channel color',
					id: 'ChColor',
					default: this.rgb(0, 0, 0)

				},]
            },

			Play_PauseClip: {
				label: 'Play or Pause current clip depending on player status'
			},
			skipClip: {
				label: 'Skip to netx clip',
				
			},

			StopClip:{
				label: 'Stop player clip'
			},
			previousClip: {
				label: 'Previous clip'
            },

			playNumerClip: {
				label: 'Play clip digited with the keypad',
            },

			switchPlayMode: {
				label: 'Select Player Mode by clicking (One At A Time, Start To End, Loop)',
				options: [{
					type: 'dropdown',
					label: 'which mode',
					id: 'ModeChoise',
					default: '1',
					tooltip: 'Which mode does this activate?',
					choices: [
						{ id: '0', label: 'Start to End' },
						{ id: '1', label: 'One at a time' },
						{ id: '2', label: 'Loop' },
					],
					minChoicesForSearch: 0
                }],
            },

			CaptureTakeSnapshot:{
				label: 'Capture snapshot',
            },

			switchCaptureMode: {
				label: 'Switch Capture and player mode'
			},
			CaptureStart: {
				label: 'starts/stops recording in recorder mode'
			},
			Mixer: {
				label: 'toggle Mixer in player'
            },
			LogoCg: {
				label: 'toggle CG in player'
			},
			PlayerAudioPreview:{
				label: 'toggle audio preview in player'
			},
			CaptureAudioPreview:{
				label: 'toggle audio preview in recorder'
			},
			CaptureAddToPlaylist:{
				label: 'ass to playlist in recorder'
			},
			ChangeCaptureScheduler:{
				label: 'toggle scheduler in recorder'
			},

			CaptureSwitch: {
				label:'switchs clip while recording'
			},

			addNumber: {
				label: 'assign Clip Number',
				options: [{
					type: 'dropdown',
					label: 'which Number',
					id: 'NumChoise',
					default: '0',
					tooltip: 'Which number to add?',
					choices: [
						{ id: '0', label: '0' },
						{ id: '1', label: '1' },
						{ id: '2', label: '2' },
						{ id: '3', label: '3' },
						{ id: '4', label: '4' },
						{ id: '5', label: '5' },
						{ id: '6', label: '6' },
						{ id: '7', label: '7' },
						{ id: '8', label: '8' },
						{ id: '9', label: '9' }

					],
                }]
            },
			setOnAirMarkIn:{
				label: 'Set mark-in in the current clip'
			},
			 setOnAirMarkOut:{
				label: 'set mark-out in te current clip'
			},
			 applyOnAirMarkers:{
				label: 'apply markers'
			},
			 resetOnAirMarkers: {
				label: 'Reset markers'
			},
	
		}
	},

}
/**/