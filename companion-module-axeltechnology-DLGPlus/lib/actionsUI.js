/**/
module.exports = {
	//function called in the intYouPlay to get the actions array
	//UI OF EACH ACTION
	getActions() {
		return {

			OnAirPage: {
				label: 'Play or Pause current clip depending on player status',
				options: [{
					type: 'dropdown',
					label: 'Wich Channel Does it operate',
					id: 'NumChoise',
					default: '0',
					tooltip: 'Which Channel to link?',
					choices: [
						{ id: '1', label: 'Channel 1' },
						{ id: '2', label: 'Channel 2' },
						{ id: '3', label: 'Channel 3' },
						{ id: '4', label: 'Channel 4' },
						

					],
                }]
			},
			
            
	
		}
	},

}
/**/