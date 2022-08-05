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
				value: 'This module uses YouPlay Api to execute basic comands with the elgato streamdeck, we suggest using prefabs'
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
			},
			{
				type: 'dropdown',
				id: 'YPversion',
				label: 'YouPlay instance',
				width: 12,
				default: '1',
				tooltip: 'Which YouPlay instance are you currently using?',
				choices: [
					{ id: '1', label: '1' },
					{ id: '2', label: '2' },
					{ id: '3', label: '3' },
					{ id: '4', label: '4' }
				],
				required: true
			}
		]
	}
}
/**/
