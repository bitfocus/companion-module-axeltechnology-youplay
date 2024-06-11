/**/
//New Module system for companion plugins
const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
//Here all the external files are linked, making it possible to use external code

//custom classes
const YouPlay = require('./lib/youPlay')
const PlayerInfo = require('./lib/playerInfo')
const RecorderInfo = require('./lib/recorderInfo')
const Keypad = require('./lib/keypad')

//companion visualized elements
const UpdateActions = require('./lib/actions')
const icons = require('./icons/icons')
const UpdatePresets = require('./lib/presets')
const UpdateFeedbacks = require('./lib/feedbacks')
const UpdateVariableDefinitions = require('./lib/variables')
const UpgradeScripts = require('./lib/upgrades')

const { combineRgb } = require('@companion-module/base')

//Main Code (Here we basically connect everything to the companion InstanceBase and define custom functionality if needed)
class YouPlayInstance extends InstanceBase {
	
	//------------------------------------------------------------------------------------------------
	//	[interval] :value used in the keypad reset timeout, used to prevent multiple timeouts to be created
	// 	[YPinstance] : default index connects to the first instance of youplay
	// 	[bgColor] : array used to draw backgrounds based on the selected instance to control
	//------------------------------------------------------------------------------------------------
	
	interval = 0
	YPinstance = 1
	bgColor = []
	
	//------------------------------------------------------------------------------------------------
	// here we define default bg colors for instances and connect the index to the additional classes
	//------------------------------------------------------------------------------------------------

	constructor(internal) {
		super(internal)

			this.bgColor[0]= combineRgb(255, 195, 0)
			this.bgColor[1]=combineRgb(27, 85, 219)
			this.bgColor[2]=combineRgb(46, 204, 113)
			this.bgColor[3]=combineRgb(129, 109, 205)
			this.bgColor[4]=combineRgb(224, 31, 31)

		//assign const variables to the class, this way you can use their function/classes whit this.VARIABLE/FUNCTION
		Object.assign(this, {
			...UpdateActions,
			...icons,
			...UpdateVariableDefinitions,
			...UpdatePresets,
			...UpdateFeedbacks,
			...Keypad,
		})

	}

	//------------------------------------------------------------------------------------------------
	// internal function that defines the configuration set user-side, here we need the ip and port
	// of the machine that is running YOUPLAY to establish an endpoint connection thanks to the api's
	//------------------------------------------------------------------------------------------------

	getConfigFields() {
		return [
			{
				type: 'text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module uses YouPlay Api to execute basic comands with the elgato streamdeck, we suggest using prefabs'
			},
			{
				type: 'textinput',
				id: 'youPlayIp',
				label: 'YouPlay IP ',
				default: '192.168.99.25',
				width: 12,
				tooltip: 'Write down the IP on which YouPlay is currently running',
				required: true
			},
			{
				type: 'textinput',
				id: 'ipPort',
				label: 'port ',
				width: 12,
				default: '8090',
				tooltip: 'Write down the port you intend to use',
				required: true
			},
		]
	}

	//------------------------------------------------------------------------------------------------
	// Internal function that sets everything up once the module is added to companion
	//------------------------------------------------------------------------------------------------

	async init(config) {

		this.config = config

		// export actions
		this.updateVariableDefinitions() // export variable definitions
		this.updatePresets()// export presets
		this.updateFeedbacks() // export feedbacks

		this.initClasses(this.config)// initialize classes
		await this.checkConnectionStatus() // check connection status

	}

	//------------------------------------------------------------------------------------------------
	//  initialize connection with the GetApi, PlayerInfo and KeyPad
	//  [GetApi] makes it possible to make api calls to the YouPlay api interface
	//  [PlayerInfo] instead stores the data of each instance and is needed for feedback and api calls
	//  [RecorderInfo] stores the recorder side information, same purpouse as the class above
	//  [Keypad makes] it possible to use a simulated keypad to play specific clips on nuber input
	//------------------------------------------------------------------------------------------------

	initClasses = (config) => {
		this.log('initCGPlus', config)

		this.GetApi = new YouPlay(config.youPlayIp,config.ipPort)

		this.updateActions()

		//config PlayerInfo passing the YouPlay object
		this.PlayerInfo = [new PlayerInfo(this.GetApi),
							new PlayerInfo(this.GetApi),
							new PlayerInfo(this.GetApi),
							new PlayerInfo(this.GetApi)]

		//config RecorderInfo passing the YouPlay object
		this.RecorderInfo = [new RecorderInfo(this.GetApi),
							new RecorderInfo(this.GetApi),
							new RecorderInfo(this.GetApi),
							new RecorderInfo(this.GetApi)]

		//instance KeyPad
		this.KeyPad = new Keypad()
	}

	//------------------------------------------------------------------------------------------------
	//  This function is fundamental to determine if the machine that the user set in the configs is
	//  avaiable and running, it will return an appropriate status dependig on the response
	//  if connection is established, creates status clocks, that will keep running until either
	//  connection is destroyed or machine gets disconnected
	//------------------------------------------------------------------------------------------------

	async checkConnectionStatus() {

		this.log('checkConnectionStatus')

		let res = await this.GetApi.Connect(this.YPinstance)

		console.log('res', res)
		
		if (res) {
			
			this.log('CONNECTION SUCCESSFUL')
			this.updateStatus(InstanceStatus.Ok)

			//creates a infinite loop,
			this.createclock = setInterval(function () {
				this.changeVariable()
			}.bind(this), 500)

		} else {
			this.log('error', 'no connection')
			this.updateStatus(InstanceStatus.UnknownError)
		}

    }

	//------------------------------------------------------------------------------------------------
	//  internal function called when module is alredy added but the configuration got changed
	//  we need to reinitialize classes,connection status, and all actions
	//------------------------------------------------------------------------------------------------

	async configUpdated(config) {
		
		console.log('CONFIGS !!! UPDATED', this.config)
		this.config = config
		console.log('CONFIGS UPDATED', this.config)

		this.updateActions() // export actions
		this.updateVariableDefinitions() // export variable definitions
		this.updatePresets()// export presets
		this.updateFeedbacks() // export feedbacks

		this.initClasses(config)
		await this.checkConnectionStatus() // check connection status
	}

	//------------------------------------------------------------------------------------------------
	//  internal function called when module is deleted
	//------------------------------------------------------------------------------------------------

	async destroy() {
		console.log('destroyed')
		clearInterval(this.createClock)
	}

	//------------------------------------------------------------------------------------------------
	//  function that returns the Player data time passed in 00m:00s,00
	//------------------------------------------------------------------------------------------------

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

	//------------------------------------------------------------------------------------------------
	// function that returns the Recorder info time in 00m.00s,00m since 
	//------------------------------------------------------------------------------------------------

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

	//------------------------------------------------------------------------------------------------
	// checks on which instance to work on
	//------------------------------------------------------------------------------------------------

	checkYPInstance(){
		if(this.YPinstance=='All'){
			return true
		}else{
			return false
		}
	}

	decimalToRGB(decimalColor) {
		// Extracting individual color components
		var red = (decimalColor >> 16) & 255;
		var green = (decimalColor >> 8) & 255;
		var blue = decimalColor & 255;
	
		// Returning as an object
		return {
			red: red,
			green: green,
			blue: blue
		};
	}

	saveColor(color,index){
		
		if(index=="All"){
			var rgb = this.decimalToRGB(color)
			//console.log("RGB: ",rgb)
			this.bgColor[0] = combineRgb(rgb.red,rgb.green,rgb.blue)
			console.log("bgColor: ",bgColor)
		}else{
			var rgb = this.decimalToRGB(color)
			//console.log("RGB: ",rgb)
			this.bgColor[index] = combineRgb(rgb.red,rgb.green,rgb.blue)
			console.log("bgColor: ",this.bgColor)
		}
	}

	setColor(index){
		return this.bgColor[index]
	}

	//------------------------------------------------------------------------------------------------
	// async function that is looped in a setInterval() js function, thanks to this function we can get constant data updates
	// we use several PlayerInfo class functions to update the used variables
	//------------------------------------------------------------------------------------------------

	async changeVariable() {
		//check if youplay is in player or recorder mode
		for(var i=0;i<4;i++){
			
			//console.log(await this.PlayerInfo[i].PlayerDataStatus(i+1))
			if(await this.PlayerInfo[i].PlayerDataStatus(i+1)!=null){

				await this.PlayerInfo[i].IsCapture(i+1)

				if (this.PlayerInfo[i].CaptureMode) {
					//recorder mode
					await this.RecorderInfo[i].RecorderDataStatus(i+1)
					
					this.setVariableValues({
						'CTime_Left':  'recording'
					})
				}
			}
			this.checkFeedbacks('ChannelColor')
			this.checkFeedbacks('InstaceBg')
			this.checkFeedbacks('Play_Pause')
			this.checkFeedbacks('ClipPlaying')
			this.setVariableValues({
				'CTP': this.KeyPad.ClipToPlay
			})
			this.checkFeedbacks('Mixer')
			this.checkFeedbacks('LogoCg')
			this.checkFeedbacks('STE_OAAT_LOOP')
			this.checkFeedbacks('ModeChange')
			this.checkFeedbacks('PlayerAudioPreview')
			this.checkFeedbacks('CaptureAudioPreview')
			this.checkFeedbacks('CaptureAddToPlaylist')
			this.checkFeedbacks('ChangeCaptureScheduler')
			this.checkFeedbacks('Rec_Stop')
		}
		
		
	}

	//------------------------------------------------------------------------------------------------
	//connection issues
	//------------------------------------------------------------------------------------------------

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

	//--------------------------------------------------------------------------

	updateActions() {
		UpdateActions(this,this.GetApi)
	}

	//--------------------------------------------------------------------------

	updatePresets(){
		UpdatePresets(this)
	}

	//--------------------------------------------------------------------------

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	//--------------------------------------------------------------------------

	updateVariableDefinitions() {
		console.log("Should Update Variables Here and Now")
		UpdateVariableDefinitions(this)
	}

	//--------------------------------------------------------------------------

}

runEntrypoint(YouPlayInstance, UpgradeScripts)
/**/