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
const { set } = require('lodash')


//Main Code
class YouPlayInstance extends instance_skel {

	//value used in the keypad reset timeout, used to prevent multiple timeouts to be created
	interval = 0
	YPinstance = 1
	bgColor = []
	

	//Constructor
	constructor(system, id, config) {
		super(system, id, config)

			this.bgColor[0]=15761408
			this.bgColor[1]=33008
			this.bgColor[2]=4245504
			this.bgColor[3]=15745088
			this.bgColor[4]=14448860

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
		this.inityouplay(this.config,this.YPinstance)
		this.initVarPresFeed()
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
			this.GetApi = new YouPlay(config.youPlayIp,config.ipPort)

			//config PlayerInfo passing the YouPlay object
			this.PlayerInfo = [new PlayerInfo(this.GetApi),
								new PlayerInfo(this.GetApi),
								new PlayerInfo(this.GetApi),
								new PlayerInfo(this.GetApi)
								]
			//config RecorderInfo passing the YouPlay object
			this.RecorderInfo = [new RecorderInfo(this.GetApi),
									new RecorderInfo(this.GetApi),
									new RecorderInfo(this.GetApi),
									new RecorderInfo(this.GetApi)
								]
			//instance KeyPad
			this.KeyPad = new Keypad()
			//page background colors
			
			
			//Get Connection status from Api
			let res = await this.GetApi.Connect(this.YPinstance)

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
	//checks on which instance to work on
	checkYPInstance(){
		if(this.YPinstance=='All'){
			return true
		}else{
			return false
		}
	}

	saveColor(color,index){
		if(index=="All"){
			this.bgColor[0] = color
		}else{
			this.bgColor[index] = color
		}
	}

	setColor(index){
		return this.bgColor[index]
	}

	//async function that is looped in a setInterval() js function, thanks to this function we can get constant data updates
	//we use several PlayerInfo class functions to update the used variables
	async changeVariable() {
		//check if youplay is in player or recorder mode
		for(var i=0;i<4;i++){
			
			//console.log(await this.PlayerInfo[i].PlayerDataStatus(i+1))
			if(await this.PlayerInfo[i].PlayerDataStatus(i+1)!=null){

				await this.PlayerInfo[i].IsCapture(i+1)

				if (this.PlayerInfo[i].CaptureMode) {
					//recorder mode
					await this.RecorderInfo[i].RecorderDataStatus(i+1)
					
					
					this.setVariable('CTime_Left', 'recording')
				}
			}
			this.checkFeedbacks('ChannelColor')
			this.checkFeedbacks('InstaceBg')
			this.checkFeedbacks('Play/Pause')
			this.checkFeedbacks('ClipPlaying')
			this.setVariable('CTP',this.KeyPad.ClipToPlay)
			this.checkFeedbacks('Mixer')
			this.checkFeedbacks('LogoCg')
			this.checkFeedbacks('STE/OAAT/LOOP')
			this.checkFeedbacks('ModeChange')
			this.checkFeedbacks('PlayerAudioPreview')
			this.checkFeedbacks('CaptureAudioPreview')
			this.checkFeedbacks('CaptureAddToPlaylist')
			this.checkFeedbacks('ChangeCaptureScheduler')
			this.checkFeedbacks('Rec/Stop')
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


	//action initializer, defines the function that will be launched on action call, if all = true 
	//launches the command on all instances
	action({ action, options }) {
		switch (action) {
//---------------------------------------------------------------------------------
			case 'InstanceToControl':{
				this.InstanceToControl(options.InstChoise)
				this.saveColor(options.ChColor,options.InstChoise)
			}
			break;
//---------------------------------------------------------------------------------
			case 'Play_PauseClip':
				if(this.checkYPInstance()){
					for(var i=0;i<=4;i++){
						this.Play_PauseClip(i)
					}
				}else{
					this.Play_PauseClip(this.YPinstance)
				}
				
				break;
//---------------------------------------------------------------------------------
			case 'StopClip':
				if(this.checkYPInstance()){
					for(var i=0;i<=4;i++){
						this.StopClip(i)
					}
				}else{
					this.StopClip(this.YPinstance)
				}
				break;
//--------------------------------------------------------------------------------
			case 'skipClip':
				if(this.checkYPInstance()){
					for(var i=0;i<=4;i++){
						this.skipClip(i)
					}
				}else{
					this.skipClip(this.YPinstance)
				}
				break;
//-------------------------------------------------------------------------------
			case 'switchPlayMode':
				if(this.checkYPInstance()){
					for(var i=0;i<=4;i++){
						this.switchPlayMode(options.ModeChoise,i)
					}
				}else{
					this.switchPlayMode(options.ModeChoise,this.YPinstance)
				}
				break;
//-------------------------------------------------------------------------------
			case 'switchCaptureMode':
				if(this.checkYPInstance()){
					for(var i=0;i<=4;i++){
						this.switchCaptureMode(i)
					}
				}else{
					this.switchCaptureMode(this.YPinstance)
				}
				break;
//-------------------------------------------------------------------------------
			case 'CaptureStart':
				if(this.checkYPInstance()){
					for(var i=0;i<=4;i++){
						this.CaptureStart(i)
					}
				}else{
					this.CaptureStart(this.YPinstance)
				}
				break;
//-------------------------------------------------------------------------------
			case 'CaptureSwitch':
				if(this.checkYPInstance()){
					for(var i=0;i<=4;i++){
						this.CaptureSwitch(i)
					}
				}else{
					this.CaptureSwitch(this.YPinstance)
				}
				break;

//-------------------------------------------------------------------------------
			case 'switchCaptureMode':
				if(this.checkYPInstance()){
					for(var i=0;i<=4;i++){
						this.switchCaptureMode(i)
					}
				}else{
					this.switchCaptureMode(this.YPinstance)
				}
				break;
//-------------------------------------------------------------------------------
			case 'previousClip':
				if(this.checkYPInstance()){
					for(var i=0;i<=4;i++){
						this.previousClip(i)
					}
				}else{
					this.previousClip(this.YPinstance)
				}
				break;
//-------------------------------------------------------------------------------
			case 'Mixer':
				if(this.checkYPInstance()){
					for(var i=0;i<=4;i++){
						this.Mixer(i)
					}
				}else{
					this.Mixer(this.YPinstance)
				}
				break;
//-------------------------------------------------------------------------------
			case 'LogoCg':
				if(this.checkYPInstance()){
					for(var i=0;i<=4;i++){
						this.LogoCg(i)
					}
				}else{
					this.LogoCg(this.YPinstance)
				}
				break;
//-------------------------------------------------------------------------------
			case 'PlayerAudioPreview':
				if(this.checkYPInstance()){
					for(var i=0;i<=4;i++){
						this.PlayerAudioPreview(i)
					}
				}else{
					this.PlayerAudioPreview(this.YPinstance)
				}
				break;
//-------------------------------------------------------------------------------			
			case 'CaptureAudioPreview':
				if(this.checkYPInstance()){
					for(var i=0;i<=4;i++){
						this.CaptureAudioPreview(i)
					}
				}else{
					this.CaptureAudioPreview(this.YPinstance)
				}
				break;
//-------------------------------------------------------------------------------			
			case 'CaptureAddToPlaylist':
				if(this.checkYPInstance()){
					for(var i=0;i<=4;i++){
						this.CaptureAddToPlaylist(i)
					}
				}else{
					this.CaptureAddToPlaylist(this.YPinstance)
				}
				break;
//-------------------------------------------------------------------------------			
			case 'ChangeCaptureScheduler':
				if(this.checkYPInstance()){
					for(var i=0;i<=4;i++){
						this.ChangeCaptureScheduler(i)
					}
				}else{
					this.ChangeCaptureScheduler(this.YPinstance)
				}
				break;
//-------------------------------------------------------------------------------			
			case 'CaptureTakeSnapshot':
				if(this.checkYPInstance()){
					for(var i=0;i<=4;i++){
						this.CaptureTakeSnapshot(i)
					}
				}else{
					this.CaptureTakeSnapshot(this.YPinstance)
				}
				break;
//-------------------------------------------------------------------------------
			case 'addNumber':
				this.KeyPad.keypress(options.NumChoise,this.YPinstance)
				if (this.interval == 0) {
					this.ClipTM = setTimeout(function () { this.KeyPad.reset(), this.interval= 0 }.bind(this), 3000)
					this.interval =1 
				}
				break;
//-------------------------------------------------------------------------------
			case 'playNumerClip':
				this.playNumerClip(this.KeyPad.ClipToPlay,this.YPinstance)
				
				break;
//-------------------------------------------------------------------------------
			case 'setOnAirMarkIn':
				if(this.checkYPInstance()){
					for(var i=0;i<=4;i++){
						this.setOnAirMarkIn(i)
					}
				}else{
					this.setOnAirMarkIn(this.YPinstance)
				}

			break;
//-------------------------------------------------------------------------------
			case 'setOnAirMarkOut':
				if(this.checkYPInstance()){
					for(var i=0;i<=4;i++){
						this.setOnAirMarkOut(i)
					}
				}else{
					this.setOnAirMarkOut(this.YPinstance)
				}
//-------------------------------------------------------------------------------
			case 'applyOnAirMarkers':
				if(this.checkYPInstance()){
					for(var i=0;i<=4;i++){
						this.applyOnAirMarkers(i)
					}
				}else{
					this.applyOnAirMarkers(this.YPinstance)
				}
			break;
//-------------------------------------------------------------------------------
			case 'resetOnAirMarkers':
				if(this.checkYPInstance()){
					for(var i=0;i<=4;i++){
						this.resetOnAirMarkers(i)
					}
				}else{
					this.resetOnAirMarkers(this.YPinstance)
				}
			break;
//-------------------------------------------------------------------------------
			default:
				return
        }
			
	}

}

module.exports = YouPlayInstance
/**/