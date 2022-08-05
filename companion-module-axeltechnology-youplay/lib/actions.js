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

    async StopClip() {
        if (!this.PlayerInfo.CaptureMode) {
            this.GetApi.StopClip()
        }
    },


    //skip function
    async skipClip() {
        if (!this.PlayerInfo.CaptureMode) {
            this.GetApi.skipClip()
        }
    },

    async previousClip() {
        if (!this.PlayerInfo.CaptureMode) {
            this.GetApi.previousClip()
        }
    },


    //swich Play Mode
    async switchPlayMode() {
        if (!this.PlayerInfo.CaptureMode) {
            mode = 0
            if (this.PlayerInfo.PlayerStartToEnd) {
                mode=1
                
            } else if (this.PlayerInfo.PlayerOneAtATime) {
                mode=2
            } else {
                mode = 0
            }
            this.GetApi.switchPlayMode(mode)
        }
    },

    async Mixer() {
        if (!this.PlayerInfo.CaptureMode) {
            if (this.PlayerInfo.PlayerMixerEnabled) {
                this.GetApi.Mixer(0)
            } else {
                this.GetApi.Mixer(1)
            }
        }
    },

    async LogoCg() {
        if (!this.PlayerInfo.CaptureMode) {
            if (this.PlayerInfo.PlayerLogoEnabled) {
                this.GetApi.LogoCg(0)
            } else {
                this.GetApi.LogoCg(1)
            }
        }
    },


    //switch capture mode
    async switchCaptureMode() {
        this.GetApi.switchCaptureMode()
    },

    async CaptureStart() {
        if (this.PlayerInfo.CaptureMode) {
            if (this.RecorderInfo.CaptureState == 2) {
                this.GetApi.CaptureStop()
            } else {
                this.GetApi.CaptureStart()
            }
        }
    },
	//function made to pause current clip

    async CaptureSwitch() {
        if (this.PlayerInfo.CaptureMode) {
            this.GetApi.CaptureSwitch()
        }
        
    },

    async playNumerClip(number) {

        var num = Number(number) 

        if(!this.PlayerInfo.CaptureMode) {

            if (num != 0) {
                this.GetApi.playNumerClip(num-1)
            }

        }

    }


}
/**/