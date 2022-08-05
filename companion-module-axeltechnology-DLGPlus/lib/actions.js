/**/
module.exports = {

    //these are the functions that the action will use upon call
    //Player function do if(not (IsCaptureMode))

    //Play/pause function that uses the player status to define which action to run 
    async Play_PauseClip() {
        if (!this.PlayerInfo.CaptureMode) {
            if (this.PlayerInfo.PlayerStatus != 2) {
                this.GetApi.playClip()
            } else if (this.PlayerInfo.PlayerStatus == 2) {
                this.GetApi.pauseClip()
                this.checkFeedbacks('Play/Pause')
            }
        }
    },



}
/**/