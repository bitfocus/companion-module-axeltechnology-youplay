/**/

//Here all the external files are linked, making it possible to use external code

//Companion !!PARENT CLASS!!  required to make the module work on the companion plugin
const instance_skel = require('../../instance_skel')

//classes
const YouPlay = require('./lib/youPlay')
const PlayerInfo = require('./lib/playerInfo')
const RecorderInfo = require('./lib/recorderInfo')
const Keypad = require('./lib/keypad')

//companion visualized elements
const actions = require('./lib/actions')
const actionUI = require('./lib/actionsUI')
const icons = require('./icons/icons')
const presets = require('./lib/presets')
const feedbacks = require('./lib/feedbacks')
const variables = require('./lib/variables')
const configs = require('./lib/configs')


//Main Code
class YouPlayInstance extends instance_skel {

	//value used in the keypad reset timeout, used to prevent multiple timeouts to be created
	interval = 0

	//Constructor
	constructor(system, id, config) {
		super(system, id, config)

		//assign const variables to the class, this way you can use their function/classes whit this.VARIABLE/FUNCTION
		Object.assign(this, {
			...actionUI,
			...actions,
			...icons,
			...presets,
			...feedbacks,
			...variables,
			...configs,
			...Keypad,
		})

		this.initVarPresFeed()
	}

	//Companion function called once the status.ok is called??
	init() {
		this.inityouplay(this.config)
		this.initVarPresFeed()
		this.SetProgressArray()
	}

	//Companion function called when instance configurations are saved
	updateConfig(config) {
		this.config = config;
		this.inityouplay(this.config)
		this.initVarPresFeed()	
	}

	//Companion function called when module is deleted
	destroy() {
		this.debug('destroy', this.id)
		console.log('destroyed')
		//clear the infinite loo�
		clearInterval(this.createClock)
	}

	//function that calls all external initializations at the same time
	initVarPresFeed() {
		this.init_variables()
		this.init_feedbacks()
		this.init_presets()
    }


	//initializer function that makes us able to use the various classes (youPlay,playerInfo,KeyPad)
	//made to only have 1 instance of each class in the code
	//if a connection is established then the actions will be initialized and the changeVAriable clock will start to work
	async inityouplay(config) {


		try {
			//config Youplay whit thi.config:fields
			this.GetApi = new YouPlay(config.youPlayIp, config.YPversion, config.ipPort)

			//config PlayerInfo passing the YouPlay object
			this.PlayerInfo = new PlayerInfo(this.GetApi)
			//config RecorderInfo passing the YouPlay object
			this.RecorderInfo = new RecorderInfo(this.GetApi)
			//instance KeyPad
			this.KeyPad = new Keypad()
			//Get Connection status from Api
			let res = await this.GetApi.Connect()

			if (res !== 200) {
				this.debug(e.message)
				this.status(this.status_warning, 'no connection')
			} else {
				//action initialization
				this.system.emit('instance_actions', this.id, this.getActions())

				this.status(this.status_ok, 'ok')

				//creates a infinite loop, 
				this.createclock = setInterval(function () {
					this.changeVariable()
				}.bind(this), 100)
				
			}
		} catch (e) {
			this.debug('error', e)
        }

    }

	//function that returns the Player data time passed in 00m:00s,00
	setTimeString(time) {

		var seconds, minutes, milliseconds, frames
		//console.log('time '+ time)
		
		seconds = Math.floor(time / 100)
		frames = time - (seconds * 100)
		milliseconds = Math.floor(frames / 4)
		
		minutes = Math.floor(seconds / 60)
		seconds -= minutes * 60

		function pad(n) {
			if (n < 10) {
				return '0' + n
			} else {
				return n
            }
		}
		var result = (pad(minutes)+':'+pad(seconds)+','+pad(milliseconds))

		return result
	}


	//function that returns the Recorder info time in 00m.00s,00m since 
	setTimeStringRecorder(time) {

		var seconds, minutes, milliseconds
		//console.log('time '+ time)

		seconds = Math.floor(time / 1)
		milliseconds = Math.trunc((time - seconds) * 100) 

		minutes = Math.floor(seconds / 60)
		seconds -= minutes * 60

		function pad(n) {
			if (n < 10) {
				return '0' + n
			} else {
				return n
			}
		}
		var result = (pad(minutes) + ':' + pad(seconds) + ',' + pad(milliseconds))

		return result
	}




	//function made to fill the array whit all the different progress bar frames+
	//the icon will later be returned thanks to The PICON, a variable that constantly updates whit the index of the array
	SetProgressArray() {

		this.Progressbar = [21]

		for (var i = 0; i <= 20; i++) {
			switch (i) {
				case 0:
					this.Progressbar[i] = this.ICON_PBAR0
					break;
				case 1:
					this.Progressbar[i] = this.ICON_PBAR5
					break;
				case 2:
					this.Progressbar[i] = this.ICON_PBAR10
					break;
				case 3:
					this.Progressbar[i] = this.ICON_PBAR15
					break;
				case 4:
					this.Progressbar[i] = this.ICON_PBAR20
					break;
				case 5:
					this.Progressbar[i] = this.ICON_PBAR25
					break;
				case 6:
					this.Progressbar[i] = this.ICON_PBAR30
					break;
				case 7:
					this.Progressbar[i] = this.ICON_PBAR35
					break;
				case 8:
					this.Progressbar[i] = this.ICON_PBAR40
					break;
				case 9:
					this.Progressbar[i] = this.ICON_PBAR45
					break;
				case 10:
					this.Progressbar[i] = this.ICON_PBAR50
					break;
				case 11:
					this.Progressbar[i] = this.ICON_PBAR55
					break;
				case 12:
					this.Progressbar[i] = this.ICON_PBAR60
					break;
				case 13:
					this.Progressbar[i] = this.ICON_PBAR65
					break;
				case 14:
					this.Progressbar[i] = this.ICON_PBAR70
					break;
				case 15:
					this.Progressbar[i] = this.ICON_PBAR75
					break;
				case 16:
					this.Progressbar[i] = this.ICON_PBAR80
					break;
				case 17:
					this.Progressbar[i] = this.ICON_PBAR85
					break;
				case 18:
					this.Progressbar[i] = this.ICON_PBAR90
					break;
				case 19:
					this.Progressbar[i] = this.ICON_PBAR95
					break;
				case 20:
					this.Progressbar[i] = this.ICON_PBAR100
					break;
			}
        }

    }

	//Function that can be optimized
	//this function returns the percentage index, this function is used to check at which position is 
	//the current clip at, every 5% the index will increase, and the index.js will get the new index and update
	//the feedback progressbar

	//can be optimized whit checking if the playing clip is the same, if not it won't generate the percentages again
	//since right now it will generate them everytime the function is called, once the clip changes it will recalculate
	//percentages, will optimeze speed since function is called every 0.1s
	progressBar(status) {
		
		var percentage = [21]
		var P5 = this.PlayerInfo.OnAirDuration / 20
		var i = 0

		//make all the controlls in the if statements to make code unbreakble

		if (status == 1 || status == 2) {
			
			if (this.PlayerInfo.OnAirDuration != 0 && this.PlayerInfo.OnAirPosition != 0) {
					
					//generate all percentage values
					for (let tmp = 0; tmp <= 21; tmp++) {

						percentage[tmp] = P5 * tmp
						if (this.PlayerInfo.OnAirPosition >= percentage[tmp] && this.PlayerInfo.OnAirPosition < percentage[tmp]+P5) {
							return tmp+1;
						}
						
					}
				
			}
		}

		return i
	}

	//async function that is looped in a setInterval() js function, thanks to this function we can get constant data updates
	//we use several PlayerInfo class functions to update the used variables
	async changeVariable() {

		//Value not used, intendet to use it for progress bar function 
		this.ClipCheck = this.PlayerInfo.OnAirUniqueID

		//check if youplay is in player or recorder mode
		await this.PlayerInfo.IsCapture()

		if (this.PlayerInfo.CaptureMode) {
			//recorder mode
			this.RecorderInfo.RecorderDataStatus()
			                                             
			this.setVariable('CTime_Left', 'recording')

			

		} else {
			//player mdoe
			await this.PlayerInfo.PlayerDataStatus()
			this.setVariable('CTime_Left', this.setTimeString(this.PlayerInfo.OnAirRemain))	
			this.setVariable('CTP',this.KeyPad.ClipToPlay)
			this.PICON = this.progressBar(this.PlayerInfo.PlayerStatus)
			this.checkFeedbacks('STE/OAAT/LOOP')
			this.checkFeedbacks('Mixer')
			this.checkFeedbacks('LogoCg')
		}
		//companion function to call feedback callback
		this.checkFeedbacks('Rec/Stop')

		this.checkFeedbacks('Play/Pause')	

		this.checkFeedbacks('ModeChange')
		this.checkFeedbacks('ClipPlaying')
		
	}

	//connection issues
	handleConnectionError() {
		this.log('error', 'YouPlay connection lost')
		this.status(this.STATUS_ERROR, 'Connection error')
	}

	handleError(error) {
		if (error.code === 'ECONNREFUSED') {
			return this.handleConnectionError()
		} else {
			this.log('error', error.message)
			this.debug(error)
		}
	}


	//action initializer, defines the function that will be launched on action call
	action({ action, options }) {
		switch (action) {
			case 'Play_PauseClip':
				this.Play_PauseClip()
				break;
			case 'StopClip':
				this.StopClip()
				break;
			case 'skipClip':
				this.skipClip()
				break;
			case 'switchPlayMode':
				this.switchPlayMode()
				break;
			case 'switchCaptureMode':
				this.switchCaptureMode()
				break;
			case 'CaptureStart_Stop':
				this.CaptureStart()
				break;

			case 'CaptureSwitch':
				this.CaptureSwitch()
				break;
			case 'previousClip':
				this.previousClip()
				break;
			case 'Mixer':
				this.Mixer()
				break;
			case 'LogoCg':
				this.LogoCg()
				break;
			case 'addNumber':
				this.KeyPad.keypress(options.NumChoise)
				if (this.interval == 0) {
					this.ClipTM = setTimeout(function () { this.KeyPad.reset(), this.interval= 0 }.bind(this), 2500)
					this.interval =1 
				}
				break;
			case 'playNumerClip':
				this.playNumerClip(this.KeyPad.ClipToPlay)
				clearInterval(this.ClipTM)
				this.KeyPad.reset()
				this.interval =0
				break;
			default:
				return
        }
			
	}

}

module.exports = YouPlayInstance
/**/