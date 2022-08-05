/**/
//Class storing all required data we get from the player api
class PlayerInfo {

	OnAirUniqueID=0
	OnAirRemain = 0
	PlayerStatus=0
	PlayerLoop=true
	PlayerOneAtATime=false
	PlayerStartToEnd=false
	OnAirDuration=0
	OnAirPosition = 0
	CaptureMode = false
	PlayerMixerEnabled = false
	PlayerLogoEnabled =false

	//consturctor, here getData will have a YouPlay obj to get a Json
	constructor(api) {
		this.getData=api
	}

	//function that updates the local variables whit the Json data recived from the YouPlay class
	async PlayerDataStatus() {

		this.data = await this.getData.getPlayerStatus()

		this.PlayerStatus = this.data['PlayerStatus']
		this.PlayerLoop = this.data['PlayerLoop']
		this.PlayerOneAtATime = this.data['PlayerOneAtATime']
		this.PlayerStartToEnd = this.data['PlayerStartToEnd']
		this.OnAirDuration = this.data['OnAirDuration']
		this.OnAirPosition = this.data['OnAirPosition']
		this.OnAirRemain = this.data['OnAirRemain']
		this.OnAirUniqueID = this.data['OnAirUniqueID']
		this.PlayerMixerEnabled = this.data['PlayerMixerEnabled']
		this.PlayerLogoEnabled = this.data['PlayerLogoEnabled']

	}
	//function made to check youplay state 
	async IsCapture() {
		this.CaptureMode = await this.getData.getCaptureMode()
    }


	//debug function used to see which variables are currently stored in the local variables
	ShowPlayerData() {

		console.log('CaptureMode: '+this.CaptureMode)
		console.log('PlayerStatus: ' + this.PlayerStatus)
		console.log('PlayerLoop: ' + this.PlayerLoop)
		console.log('PlayerOneAtATime: ' + this.PlayerOneAtATime)
		console.log('PlayerStartToEnd: ' + this.PlayerStartToEnd)
		console.log('OnAirDuration: ' + this.OnAirDuration)
		console.log('OnAirPosition: ' + this.OnAirPosition)
		console.log('OnAirRemain: ' + this.OnAirRemain)
    }

}

module.exports = PlayerInfo;
/**/