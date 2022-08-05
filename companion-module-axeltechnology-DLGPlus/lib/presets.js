/**/
module.exports = {
	//preset initializer, in this function we declare which configuration and which actions will the preset function use
	init_presets() {
		const presets = []

		
		//Keypad Buttons
		for (var i = 0; i <= 9; i++) {

			is = i.toString()
			//Number Button
			presets.push({
				category: 'KeyPad',
				label: is,
				bank: {
					style: 'text',
					text: is,
					color: '16777215',
					textaligment: 'center:center',
					size: '30',
					bgcolor: this.rgb(0, 0, 0),
				},
				actions: [{
					action: 'addNumber',
					options: {
						NumChoise: i,
                    }

				}],

			})
        }
        



		this.setPresetDefinitions(presets)
	}
}
/**/