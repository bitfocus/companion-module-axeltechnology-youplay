const fetch = require('node-fetch')

//variables used to build the api request link
let url
let urlSuffix = 'http://'
let format = '?format=json'
let format2 = '&format=json'



class DLGplus {

    constructor(DLGPlusIp, urlPort) {
		this.DLGPlusUrl = urlSuffix + DLGPlusIp + ':' + urlPort + '/DLGPlus/' + 'REST/'
	}

    //function made to generate the functioning url, since most of the url are the same for all api's
	getUrl(api, type) {
		if (type == 'data') {
			return url = this.DLGPlusUrl + api + format
		} else if(type == 'command'){
			return url = this.DLGPlusUrl + api
        }else if(type== 'data2'){
			return url = this.DLGPlusUrl + api + format2
		}
	}

	//function to get channel info
	async getChannelinfo(channel){

		try {
			url = this.getUrl('GetChannel?ChannelName=Channel'+channel, 'data2')
			const response = await fetch(url)
			const json = await response.json()
			var dataJson = json

		} catch (e) {
			console.error('Something went wrong', e)
		}
		return dataJson;


	}

	//function that returns all enabled pages in the channel 
	async getPagesStatus(channel) {

		try {
			url = this.getUrl('GetInfoPages?ChannelName='+channel, 'data2')
			const response = await fetch(url)
			const json = await response.json()
			var dataJson = json

		} catch (e) {
			console.error('Something went wrong', e)
		}
		return dataJson;

	}


	//function called in the index, it will try to connect to a default api to see if a connection is extablished
	Connect() {
		return new Promise((resolve, reject) => {
			url = this.getUrl('GetNameChannels', 'data')
			fetch(url)
				// fetch(url + this.token, this.GETOption())
				.then((res) => {
					
					if (res.status == 200) {
						console.log('sucess DLG connection')
						resolve(res.status)
					} else {
						console.log('reject DLG connection')
						reject(res.status)
					}
				})
				.catch((err) => {
					reject(err)
				})
		})
	}

	//action functions

	//function that takes a page on air (one way only)
	OnAirPage(Channel,Page){

		url = this.getUrl('TakePage?ChannelName=Channel+'+Channel+'&PageName='+Page,'command')
		fetch(url)

	}








}

module.exports = DLGplus;