/**/
const fetch = require('node-fetch')

//variables used to build the api request link
let url
let urlSuffix = 'http://'
let format = '?format=json'


//Class used to work whit the youplay api's
class YouPlay {

	//the constructor uses the Ip,YPversion and url port specified by the user 
	constructor(youPlayIp, urlPort) {
		this.YouPlayUrl = urlSuffix + youPlayIp + ':' + urlPort + '/YouPlay'
	}

	//function made to generate the functioning url, since most of the url is the same for all api's
	getUrl(YPinstance,api, type) {
		if (type == 'data') {
			return url = this.YouPlayUrl + YPinstance+'/REST/' + api + format
		} else if(type == 'command'){
			return url = this.YouPlayUrl +YPinstance+'/REST/'+ api
        }
	}

	//function Used in the PlayerInfo class, used to return a Json data file, making it possible to store and use api data
	async getPlayerStatus(YPinstance) {
		//console.log(YPinstance)
		try {
			url = this.getUrl(YPinstance,'GetPlayerData', 'data')
			const response = await fetch(url)
			const json = await response.json()
			var dataJson = json
			
		} catch (e) {
			console.error('Something went wrong', e)
		}
		return dataJson;
		
	}
	//function that returns Json file whit recorder data 
	async getCaptureStatus(YPinstance) {

		try {
			url = this.getUrl(YPinstance,'BatchCaptureStatusGet', 'data')
			const response = await fetch(url)
			const json = await response.json()
			var dataJson = json

		} catch (e) {
			console.error('Something went wrong', e)
		}
		return dataJson;

	}

	//returns if youplay is in recorder mode
	async getCaptureMode(YPinstance) {

		url = this.getUrl(YPinstance,'IsCaptureMode', 'command')
		const response = await fetch(url)
		const json = await response.json()

		return json
    }


	//function called in the index, it will try to connect to a default api to see if a connection is extablished
	Connect(YPinstance) {
		return new Promise((resolve, reject) => {
			url = this.getUrl(YPinstance,'GetApplicationInfo', 'data')
			fetch(url)
				// fetch(url + this.token, this.GETOption())
				.then((res) => {
					
					if (res.status == 200) {
						console.log('successful YouPlay connection')
						resolve(res.status)
					} else {
						console.log('rejected YouPlay connection')
						reject(res.status)
					}
				})
				.catch((err) => {
					reject(err)
				})
		})
	}

	//actions functions

	//function made to play current clip
	playClip(YPinstance) {
		url = this.getUrl(YPinstance,'Play', 'command')
		fetch(url)
	}
	//function made to pause current clip
	pauseClip(YPinstance) {
		url = this.getUrl(YPinstance,'Pause', 'command')
		fetch(url)
	}
	//function made to stop clip
	StopClip(YPinstance) {
		url = this.getUrl(YPinstance,'Stop', 'command')
		fetch(url)
    }

	//function made to start recording
	CaptureStart(YPinstance) {
		url = this.getUrl(YPinstance,'CaptureStart', 'command')
		fetch(url)
	}
	//function made to pause current clip
	CaptureStop(YPinstance) {
		url = this.getUrl(YPinstance,'CaptureStop', 'command')
		fetch(url)
	}
	//function made to activate recorder switch, !NEED TO IMPLEMENT ACTION!
	CaptureSwitch(YPinstance) {
		url = this.getUrl(YPinstance,'CaptureSwitch', 'command')
		fetch(url)
    }

	//function made to skip current clip and move to the next one
	skipClip(YPinstance) {
		url = this.getUrl(YPinstance,'Skip', 'command')
		fetch(url)
	}
	//function made to play previous clip
	previousClip(YPinstance) {
		url = this.getUrl(YPinstance,'Previous', 'command')
		fetch(url)
	}
	//function made to toggle mixer mode in player
	Mixer(number,YPinstance) {
		url = this.getUrl(YPinstance,'Mixer?value=' + number, 'command')
		fetch(url)
	}
	//function made to toggle Logo in player
	LogoCg(number,YPinstance) {
		url = this.getUrl(YPinstance,'Logo?value=' + number, 'command')
		fetch(url)
	}

	//multi use function that activates 3 differnet settings in the Youplay interface(PlayerLoop,OneAtATime,StopToEnd)
	switchPlayMode(mode,YPinstance) {
		url = this.getUrl(YPinstance,'PlayMode?mode=' + mode, 'command')
		fetch(url)
	}
	//switches from player to recorder mode
	switchCaptureMode(YPinstance) {
		url = this.getUrl(YPinstance,'SwitchCaptureMode', 'command')
		fetch(url)
    }
	//function that plays the clip of the passed index thanks to a numerical keyboard implemented in the module
	playNumerClip(number,YPinstance) {
		url = this.getUrl(YPinstance,'PrepareAndPlay?clipNumber='+ number, 'command')
		fetch(url)
    }

}

module.exports = YouPlay;
/**/