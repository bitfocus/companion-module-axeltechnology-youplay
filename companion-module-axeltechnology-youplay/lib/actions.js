/**/
module.exports = {

    //these are the functions that the action will use upon call
    //Player function do if(not (IsCaptureMode))

    InstanceToControl(instance){
        this.YPinstance = instance
        console.log(instance)
    },

    //Play/pause function that uses the player status to define which action to run 
    async Play_PauseClip(YPinstance) {

        if (!this.PlayerInfo[YPinstance-1].CaptureMode) {
            if (this.PlayerInfo[YPinstance-1].PlayerStatus != 2) {
                    this.GetApi.playClip(YPinstance)
                
            } else if (this.PlayerInfo[YPinstance-1].PlayerStatus == 2) {
                this.GetApi.pauseClip(YPinstance)
                this.checkFeedbacks('Play/Pause')
            }
        }
    },

    async StopClip(YPinstance) {
        if (!this.PlayerInfo[YPinstance-1].CaptureMode) {
            this.GetApi.StopClip(YPinstance)
        }
    },


    //skip function
    async skipClip(YPinstance) {
        if (!this.PlayerInfo[YPinstance-1].CaptureMode) {
            this.GetApi.skipClip(YPinstance)
        }
    },

    async previousClip(YPinstance) {
        if (!this.PlayerInfo[YPinstance-1].CaptureMode) {
            this.GetApi.previousClip(YPinstance)
        }
    },


    //swich Play Mode
    async switchPlayMode(YPinstance) {
        if (!this.PlayerInfo[YPinstance-1].CaptureMode) {
            mode = 0
            if (this.PlayerInfo[YPinstance-1].PlayerStartToEnd) {
                mode=1
                
            } else if (this.PlayerInfo[YPinstance-1].PlayerOneAtATime) {
                mode=2
            } else {
                mode = 0
            }
            this.GetApi.switchPlayMode(mode,YPinstance)
        }
    },

    async Mixer(YPinstance) {
        if (!this.PlayerInfo[YPinstance-1].CaptureMode) {
            if (this.PlayerInfo[YPinstance-1].PlayerMixerEnabled) {
                this.GetApi.Mixer(0,YPinstance)
            } else {
                this.GetApi.Mixer(1,YPinstance)
            }
        }
    },

    async LogoCg(YPinstance) {
        if (!this.PlayerInfo[YPinstance-1].CaptureMode) {
            if (this.PlayerInfo[YPinstance-1].PlayerLogoEnabled) {
                this.GetApi.LogoCg(0,YPinstance)
            } else {
                this.GetApi.LogoCg(1,YPinstance)
            }
        }
    },


    //switch capture mode
    async switchCaptureMode(YPinstance) {
        this.GetApi.switchCaptureMode(YPinstance)
    },

    async CaptureStart(YPinstance) {
        if (this.PlayerInfo[YPinstance-1].CaptureMode) {
            if (this.RecorderInfo[YPinstance-1].CaptureState == 2) {
                this.GetApi.CaptureStop(YPinstance)
            } else {
                this.GetApi.CaptureStart(YPinstance)
            }
        }
    },
	//function made to pause current clip

    async CaptureSwitch(YPinstance) {
        if (this.PlayerInfo[YPinstance-1].CaptureMode) {
            this.GetApi.CaptureSwitch(YPinstance)
        }
        
    },

    async playNumerClip(number,YPinstance) {

        var num = Number(number) 

        if(!this.PlayerInfo[YPinstance-1].CaptureMode) {

            if (num != 0) {
                this.GetApi.playNumerClip(num-1,YPinstance)
            }

        }

    }


}
/**/