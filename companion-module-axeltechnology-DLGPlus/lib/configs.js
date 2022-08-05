/**/
module.exports = {
	//Companion function Needed to configure which configurations will the module use
	//in this case we have the ip adress, the port used and the youplay instance used
	config_fields() {
		return [
			{
				type: 'text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module lets you interact whit YouPlay'
			},
			{
				type: 'textinput',
				id: 'youPlayIp',
				label: 'YouPlay IP ',
				default: '192.168.99.157',
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
			}
		]
	}
}
/**/
