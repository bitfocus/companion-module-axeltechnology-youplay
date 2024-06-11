/**/
//Class storing all required data we get from the player api
class PlayerInfo {
	Instance
	OnAirUniqueID=0
	OnAirRemain = 0
	PlayerStatus=0
	PlayerLoop=false
	PlayerOneAtATime=false
	PlayerStartToEnd=false
	OnAirDuration=0
	OnAirPosition = 0
	CaptureMode = false
	PlayerMixerEnabled = false
	PlayerLogoEnabled =false
	PlayerAudioPreviewEnabled = false

	//consturctor, here getData will have a YouPlay obj to get a Json
	constructor(api) {
		this.getData=api
		//this.PlayerDataStatus()
	}

	//function that updates the local variables whit the Json data recived from the YouPlay class
	async PlayerDataStatus(instance) {

		var data = await this.getData.getPlayerStatus(instance)
		//console.log("[playerInfo]:",data)

		if(data==null){
		
		}else{

			this.Instance = instance
			this.PlayerStatus = data['PlayerStatus']
			this.PlayerLoop = data['PlayerLoop']
			this.PlayerOneAtATime = data['PlayerOneAtATime']
			this.PlayerStartToEnd = data['PlayerStartToEnd']
			this.OnAirDuration = data['OnAirDuration']
			this.OnAirPosition = data['OnAirPosition']
			this.OnAirRemain = data['OnAirRemain']
			this.OnAirUniqueID = data['OnAirUniqueID']
			this.PlayerMixerEnabled = data['PlayerMixerEnabled']
			this.PlayerLogoEnabled = data['PlayerLogoEnabled']
			this.PlayerAudioPreviewEnabled = data['PlayerAudioPreviewEnabled']
		}
		return data
	}
	//function made to check youplay state 
	async IsCapture(instance) {
		this.CaptureMode = await this.getData.getCaptureMode(instance)
    }


	//debug function used to see which variables are currently stored in the local variables
	ShowPlayerData() {
		console.log('instance: '+this.Instance)
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