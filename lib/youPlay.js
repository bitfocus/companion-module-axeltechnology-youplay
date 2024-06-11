/**/
let fetch
import('node-fetch').then((module) => {
	fetch = module.default
})

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

	//------------------------------------------------------------------------------------------------
	//function made to generate the functioning url, since most of the url is the same for all api's
	//------------------------------------------------------------------------------------------------

	getUrl(YPinstance,api, type) {
		if (type == 'data') {

			url = this.YouPlayUrl + YPinstance+'/REST/' + api + format
			//console.log("Data URL: " + url)
			return url

		} else if(type == 'command'){

			url = this.YouPlayUrl +YPinstance+'/REST/'+ api
			//console.log("Command URL: " + url)
			return url
			
        }
	}

	//------------------------------------------------------------------------------------------------
	//  function called when we initilialize the module, since the dynamic
	//  import of node-fetch might not have completed before the Connect method is called.
	//------------------------------------------------------------------------------------------------

	async loadFetch() {
		if (!fetch) {
			const module = await import('node-fetch')
			fetch = module.default
		}
	}

	//------------------------------------------------------------------------------------------------
	// function called in the index, it will try to connect to a default api to see if a connection is 
	// extablished
	//------------------------------------------------------------------------------------------------

	async Connect(YPinstance) {

		await this.loadFetch()


		url = this.getUrl(YPinstance,'GetApplicationInfo', 'data')

		try {
			const response = await fetch(url)

			if (response.status == 200) {
				console.log('successful YouPlay connection')
				return true
			} else {
				console.log('rejected YouPlay connection')
			}
		} catch (err) {
			console.error('Error in Connect:', err)
			return false
		}
		
	}

	//------------------------------------------------------------------------------------------------
	// function Used in the PlayerInfo class, used to return a Json data file, making it possible to 
	// store and use api data
	//------------------------------------------------------------------------------------------------

	async getPlayerStatus(YPinstance) {
		//console.log(YPinstance)
		await this.loadFetch()

		try {
			url = this.getUrl(YPinstance,'GetPlayerData', 'data')
			//console.log("getPlayerStatus url: " + url)
			const response = await fetch(url)
			const json = await response.json()
			return json;

		} catch (e) {
			console.error('Something went wrong', e)
			return null
		}
		
		
	}

	//------------------------------------------------------------------------------------------------
	// function that returns Json file whit recorder data 
	//------------------------------------------------------------------------------------------------

	async getCaptureStatus(YPinstance) {

		try {
			url = this.getUrl(YPinstance,'GetCaptureData', 'data')
			const response = await fetch(url)
			const json = await response.json()
			var dataJson = json

		} catch (e) {
			console.error('Something went wrong', e)
			return null
		}
		return dataJson;

	}

	//------------------------------------------------------------------------------------------------
	//returns if youplay is in recorder mode
	//------------------------------------------------------------------------------------------------

	async getCaptureMode(YPinstance) {
		
		url = this.getUrl(YPinstance,'IsCaptureMode', 'data')
		const response = await fetch(url)
		const json = await response.json()

		return json
    }

	//----------------------------------------------------------------------
	//PLAYER APIS
	//----------------------------------------------------------------------

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
	//audio preview in player
	PlayerAudioPreview(number,YPinstance) {
		
		url = this.getUrl(YPinstance,'PlayerAudioPreview?enabled=' + number, 'command')
		console.log('audio '+number+ 'url '+url )
		fetch(url)
	}

	//multi use function that activates 3 differnet settings in the Youplay interface(PlayerLoop,OneAtATime,StopToEnd)
	switchPlayMode(mode,YPinstance) {
		url = this.getUrl(YPinstance,'PlayMode?mode=' + mode, 'command')
		fetch(url)
	}
//---------------------------------------------------------------------------------------------------------
//RECORDER APIS
//---------------------------------------------------------------------------------------------------------

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
	//
	CaptureTakeSnapshot(YPinstance) {
		url = this.getUrl(YPinstance,'CaptureTakeSnapshot', 'command')
		fetch(url)
    }
	//
	ChangeCaptureScheduler(value,YPinstance) {
		url = this.getUrl(YPinstance,'ChangeCaptureScheduler?enabled=' + value, 'command')
		console.log(url)
		fetch(url)
	}
	//
	CaptureAddToPlaylist(value,YPinstance) {
		url = this.getUrl(YPinstance,'CaptureAddToPlaylist?value=' + value, 'command')
		fetch(url)
	}
	//
	CaptureAudioPreview(number,YPinstance) {
		url = this.getUrl(YPinstance,'CaptureAudioPreview?enabled=' + number, 'command')
		console.log('audio '+number+ 'url '+url )
		fetch(url)
	}

	//switches from player to recorder mode
	switchCaptureMode(YPinstance) {
		url = this.getUrl(YPinstance,'SwitchCaptureMode', 'command')
		fetch(url)
    }

	//---------------------------------------------------------------------------------------------------------
	//KEYPAD API
	//---------------------------------------------------------------------------------------------------------

	//function that plays the clip of the passed index thanks to a numerical keyboard implemented in the module
	
	playNumerClip(number,YPinstance) {
		url = this.getUrl(YPinstance,'PrepareAndPlay?clipNumber='+number, 'command')
		console.log(url)
		fetch(url)
    }

	//------------------------------------------------------------------------------------
	//MARKER FUNCTIONS
	//------------------------------------------------------------------------------------


	//function that sets the mark-in in the OnAir Clip	
	setOnAirMarkIn(YPinstance) {
		url = this.getUrl(YPinstance,'SetOnAirMarkIn', 'command')
		fetch(url)
    }
	
	//function that sets the mark-out in the OnAir Clip	
	setOnAirMarkOut(YPinstance) {
		url = this.getUrl(YPinstance,'SetOnAirMarkOut', 'command')
		fetch(url)
    }

	//function that applies the marker
	applyOnAirMarkers(YPinstance) {
		url = this.getUrl(YPinstance,'ApplyOnAirMarkers', 'command')
		fetch(url)
    }

	//function that resets the marker
	resetOnAirMarkers(YPinstance) {
		url = this.getUrl(YPinstance,'ResetOnAirMarkers', 'command')
		fetch(url)
    }
}

module.exports = YouPlay;
/**/