/**/
module.exports = {
	//variable initializer, this functions declares variables that the user can freely use to visualize their content
	init_variables() {
		const variables= [
			{
				label: 'Clip time left',
				name: 'CTime_Left'
			},
			{
				label: 'Clip to Play',
				name: 'CTP'
			},

		]

		this.setVariableDefinitions(variables)
	}
}
/**/