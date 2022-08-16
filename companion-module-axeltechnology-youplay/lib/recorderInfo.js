/**/
//Class storing all required data we get from the capture api
class RecorderInfo {


	CaptureState = 0
	CurrenDuration = 0
	Duration = 0

	//constructor, here getData will have a YouPlay obj to get a Json
	constructor(api) {
		this.getData = api
	}

	//function that updates the local variables whit the Json data recived from the YouPlay class
	async RecorderDataStatus(instance) {

		this.data = await this.getData.getCaptureStatus(instance)

		this.CaptureState = this.data['CaptureState']
		this.Duration = this.data['Duration']
	}


}

module.exports = RecorderInfo;
/**/