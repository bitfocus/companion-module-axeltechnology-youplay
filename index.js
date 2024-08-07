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
class YouPlayInstance extends InstanceBase 
{
	//------------------------------------------------------------------------------------------------
	//	[interval] :value used in the keypad reset timeout, used to prevent multiple timeouts to be created
	// 	[YPinstance] : default index connects to the first instance of youplay
	// 	[bgColor] : array used to draw backgrounds based on the selected instance to control
	//------------------------------------------------------------------------------------------------
	interval = 0
	YPinstance = 1
	activeInstances = []
	bgColor = []
	//------------------------------------------------------------------------------------------------
	// 	here we define default bg colors for instances and connect the index to the additional classes
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
	// 	internal function that defines the configuration set user-side, here we need the ip and port
	// 	of the machine that is running YOUPLAY to establish an endpoint connection thanks to the api's
	//------------------------------------------------------------------------------------------------
	getConfigFields() {
		return (
			[
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
		)
	}
	//------------------------------------------------------------------------------------------------
	//  This function manages the logging, since we cant use this.log elsewhere we'll have to pass this 
	//	function as callback to custom elements (i hope this is the right way ^^)
	//------------------------------------------------------------------------------------------------
	LogManager = (eType, message) => 
	{
		try
		 {
			if (eType === 'error' || eType === 'warn' || eType === 'info' || eType === 'debug')
			{
				this.log(eType, message);
			} 
			else 
			{
				console.error('Unknown log type:', eType);
			}
		} 
		catch (error) 
		{
			console.error('Error in LogManager:', error);
		}
	}
	//------------------------------------------------------------------------------------------------
	// 	Internal function that sets everything up once the module is added to companion
	//------------------------------------------------------------------------------------------------
	async init(config) 
	{
		this.config = config
		// export actions
		this.updateVariableDefinitions() // export variable definitions
		this.updatePresets()// export presets
		this.updateFeedbacks() // export feedbacks
		this.initClasses(this.config)// initialize classes
		this.initPolling() // initialize polling
		this.initFastPolling(); // initialize feedback line
		await this.checkConnectionStatus(config) // check connection status
	}
	//------------------------------------------------------------------------------------------------
	//  initialize connection with the GetApi, PlayerInfo and KeyPad
	//  [GetApi] makes it possible to make api calls to the YouPlay api interface
	//  [PlayerInfo] instead stores the data of each instance and is needed for feedback and api calls
	//  [RecorderInfo] stores the recorder side information, same purpouse as the class above
	//  [Keypad makes] it possible to use a simulated keypad to play specific clips on nuber input
	//------------------------------------------------------------------------------------------------
	initClasses = (config) => 
	{
		this.log('info', 'Initializing classes');
		this.GetApi = new YouPlay(config.youPlayIp,config.ipPort,this.LogManager);
		this.updateActions();
		//config PlayerInfo passing the YouPlay object
		this.PlayerInfo = [new PlayerInfo(this.GetApi),
							new PlayerInfo(this.GetApi),
							new PlayerInfo(this.GetApi),
							new PlayerInfo(this.GetApi)];
		//config RecorderInfo passing the YouPlay object
		this.RecorderInfo = [new RecorderInfo(this.GetApi),
							new RecorderInfo(this.GetApi),
							new RecorderInfo(this.GetApi),
							new RecorderInfo(this.GetApi)];
		//instance KeyPad
		this.KeyPad = new Keypad();
	}
	//------------------------------------------------------------------------------------------------
	//  This function is fundamental to determine if the machine that the user set in the configs is
	//  avaiable and running, it will return an appropriate status dependig on the response
	//  if connection is established, creates status clocks, that will keep running until either
	//  connection is destroyed or machine gets disconnected
	//------------------------------------------------------------------------------------------------

	async checkConnectionStatus(config) 
	{
		if (!config.youPlayIp || !config.ipPort) 
		{
			this.log("warn", "No configuration");
			this.updateStatus(InstanceStatus.ConnectionFailure, 'No configuration');
			return;
		}

		let retryDelay = 1000; // Start with 1 second
		const maxDelay = 60000; // Max delay of 1 minute

		const connectAndSetup = async () => 
		{
			try 
			{
				const isConnected = await this.connectAllInstances();
				if (isConnected) 
				{
					this.updateStatus(InstanceStatus.Ok);
					retryDelay = 1000; // Reset retry delay on successful connection
				} 
				else 
				{
					this.log('error', 'Connection failed. Retrying...');
					this.updateStatus(InstanceStatus.ConnectionFailure, 'Connection failed');
					
					retryDelay = Math.min(retryDelay * 2, maxDelay);
					setTimeout(connectAndSetup, retryDelay);
				}
			} 
			catch (error) 
			{
				console.error(error)
				this.log('error', 'Error during connection attempt: ' + error);
				
				retryDelay = Math.min(retryDelay * 2, maxDelay);
				setTimeout(connectAndSetup, retryDelay);
			}
		};

		await connectAndSetup();
	}

	async connectAllInstances() {
		const instances = [1, 2, 3, 4];
		this.activeInstances = [];
	
		for (const instance of instances) 
		{
			this.log('info', 'Connecting to YouPlay instance '+ instance);

			const result = await this.connectionManager(instance);
			this.activeInstances.push(result);
		}
	
		// Check if at least one instance is connected
		return this.activeInstances.some(status => status === true);
	}

	//------------------------------------------------------------------------------------------------
	async connectionManager(instance) 
	{
		try {
			const res = await this.GetApi.Connect(instance)
			this.log('info', 'Connection status for instance ' + instance + ': ' + res);
			return res;
		} catch (error) {
			this.log('error', 'API connection error for instance ' + instance + ': ' + error);
			return false;
		}
	}
	//------------------------------------------------------------------------------------------------
	//  internal function called when module is alredy added but the configuration got changed
	//  we need to reinitialize classes,connection status, and all actions
	//------------------------------------------------------------------------------------------------
	async configUpdated(config) 
	{
		this.log('info', 'Configuration updated');
		this.config = config

		this.updateActions() // export actions
		this.updateVariableDefinitions() // export variable definitions
		this.updatePresets()// export presets
		this.updateFeedbacks() // export feedbacks

		this.initClasses(config)
		this.initPolling() // reinitialize polling
		await this.checkConnectionStatus(config) // check connection status
	}
	//------------------------------------------------------------------------------------------------
	//  internal function called when module is deleted
	//------------------------------------------------------------------------------------------------
	async destroy() 
	{
		this.log('info', 'Module destroyed');
		this.stopPolling()
		this.stopFastPolling()
	}

	initPolling() {
		this.stopPolling()
		this.polling = setInterval(() => {
			this.poll()
		}, 1000) // Poll every 5 seconds
	}

	stopPolling() {
		if (this.polling) {
			clearInterval(this.polling)
			delete this.polling
		}
	}

	async poll() {
		try {
			const isConnected = await this.connectAllInstances()
			if (isConnected) {
				this.updateStatus(InstanceStatus.Ok);
			} else {
				this.updateStatus(InstanceStatus.ConnectionFailure, 'Failed to connect')
			}
		} catch (error) {
			this.updateStatus(InstanceStatus.ConnectionFailure, error.message)
		}
	}

	initFastPolling() {
		this.stopFastPolling();
		this.fastPolling = setInterval(() => {
		  this.changeVariable();
		}, 250); // Poll every 250ms
	  }

	  stopFastPolling() {
		if (this.fastPolling) {
		  clearInterval(this.fastPolling);
		  delete this.fastPolling;
		}
	  }

	//------------------------------------------------------------------------------------------------
	//  function that returns the Player data time passed in 00m:00s,00
	//------------------------------------------------------------------------------------------------
	setTimeString(time) 
	{
		var seconds, minutes, milliseconds, frames;
		//console.log('time '+ time)
		seconds = Math.floor(time / 100);
		frames = time - (seconds * 100);
		milliseconds = Math.floor(frames / 4);
		minutes = Math.floor(seconds / 60);
		seconds -= minutes * 60;
		function pad(n) 
		{
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
	setTimeStringRecorder(time) 
	{
		var seconds, minutes, milliseconds;
		seconds = Math.floor(time / 1);
		milliseconds = Math.trunc((time - seconds) * 100);
		minutes = Math.floor(seconds / 60);
		seconds -= minutes * 60;

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
	checkYPInstance()
	{
		if(this.YPinstance=='All'){
			return true
		}else{
			return false
		}
	}
	decimalToRGB(decimalColor) 
	{
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
	saveColor(color,index)
	{
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
	setColor(index)
	{
		return this.bgColor[index]
	}
	//------------------------------------------------------------------------------------------------
	// async function that is looped in a setInterval() js function, thanks to this function we can get constant data updates
	// we use several PlayerInfo class functions to update the used variables
	//------------------------------------------------------------------------------------------------
	async changeVariable() 
	{
		//check if youplay is in player or recorder mode
		for(var i=0;i<4;i++)
		{
			//console.log(await this.PlayerInfo[i].PlayerDataStatus(i+1))
			await this.PlayerInfo[i].IsCapture(i+1);
			if(this.PlayerInfo[i].CaptureMode != null)
			{
				console.log("this.PlayerInfo[i].CaptureMode ",this.PlayerInfo[i].CaptureMode )
				if (this.PlayerInfo[i].CaptureMode != null) 
				{
					//recorder mode
					await this.RecorderInfo[i].RecorderDataStatus(i+1)
					this.setVariableValues({'CTime_Left':  'recording'})
				}
				else
				{
					await this.PlayerInfo[i].PlayerDataStatus(i+1)
				}
			}
			
			this.checkFeedbacks('ChannelColor')
			this.checkFeedbacks('InstaceBg')
			this.checkFeedbacks('Play_Pause')
			this.checkFeedbacks('ClipPlaying')
			this.setVariableValues({'CTP': this.KeyPad.ClipToPlay})
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
	//------------------------------------------------------------------------------------------------z
	handleConnectionError() 
	{
		this.log('error', 'YouPlay connection lost')
		this.updateStatus(InstanceStatus.ConnectionFailure, 'Connection lost')
	}
	handleError(error) 
	{
		if (error.code === 'ECONNREFUSED') {
			return this.handleConnectionError()
		} else {
			this.log('error', 'Error: ' + error.message)
			this.debug(error)
		}
	}
	//--------------------------------------------------------------------------
	updateActions() 
	{
		UpdateActions(this,this.GetApi)
	}
	//--------------------------------------------------------------------------
	updatePresets()
	{
		UpdatePresets(this)
	}
	//--------------------------------------------------------------------------
	updateFeedbacks() 
	{
		UpdateFeedbacks(this)
	}
	//--------------------------------------------------------------------------
	updateVariableDefinitions()
	{
		console.log("Should Update Variables Here and Now")
		UpdateVariableDefinitions(this)
	}
	//--------------------------------------------------------------------------
}

runEntrypoint(YouPlayInstance, UpgradeScripts)
/**/