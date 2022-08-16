/**/
module.exports = {

    //these are the functions that the action will use upon call
    //Player function do if(not (IsCaptureMode))

    //Play/pause function that uses the player status to define which action to run 
    async OnAirPage(Channel,Page) {
        this.GetApi.OnAirPage(Channel,Page)
    },



}
/**/