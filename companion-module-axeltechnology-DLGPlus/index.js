/**/

//Here all the external files are linked, making it possible to use external code

//Companion !!PARENT CLASS!!  required to make the module work on the companion plugin
const instance_skel = require('../../instance_skel')

//classes
const YouPlay = require('./lib/youPlay')


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
		//this.inityouplay(this.config)
		this.initVarPresFeed()
		this.SetProgressArray()
	}

	//Companion function called when instance configurations are saved
	updateConfig(config) {
		this.config = config;
		//this.inityouplay(this.config)
		this.initVarPresFeed()	
	}

	//Companion function called when module is deleted
	destroy() {
		this.debug('destroy', this.id)
		console.log('destroyed')
		//clear the infinite loop
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