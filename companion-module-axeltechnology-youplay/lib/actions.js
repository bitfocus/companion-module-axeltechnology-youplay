/**/
module.exports = {

    //these are the functions that the action will use upon call
    //Player function do if(not (IsCaptureMode))

    InstanceToControl(instance){
        this.YPinstance = instance
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
    async switchPlayMode(mode,YPinstance) {
        if (!this.PlayerInfo[YPinstance-1].CaptureMode) {
            
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

    async PlayerAudioPreview(YPinstance) {
        if (!this.PlayerInfo[YPinstance-1].CaptureMode) {
            if (this.PlayerInfo[YPinstance-1].PlayerAudioPreviewEnabled) {
                this.GetApi.PlayerAudioPreview(0,YPinstance)
            } else {
                this.GetApi.PlayerAudioPreview(1,YPinstance)
            }
        }
    },
    
    async CaptureAudioPreview(YPinstance) {
        if (this.PlayerInfo[YPinstance-1].CaptureMode) {
            if (this.RecorderInfo[YPinstance-1].AudioPreviewEnabled) {
                this.GetApi.CaptureAudioPreview(0,YPinstance)
            } else {
                this.GetApi.CaptureAudioPreview(1,YPinstance)
            }
        }
    },
    async CaptureAddToPlaylist(YPinstance) {
        if (this.PlayerInfo[YPinstance-1].CaptureMode) {
            if (this.RecorderInfo[YPinstance-1].AddToThePlaylist) {
                this.GetApi.CaptureAddToPlaylist(0,YPinstance)
            } else {
                this.GetApi.CaptureAddToPlaylist(1,YPinstance)
            }
        }
    },
    async ChangeCaptureScheduler(YPinstance) {
        if (this.PlayerInfo[YPinstance-1].CaptureMode) {
            if (this.RecorderInfo[YPinstance-1].ScheduleEnabled) {
                this.GetApi.ChangeCaptureScheduler(0,YPinstance)
            } else {
                this.GetApi.ChangeCaptureScheduler(1,YPinstance)
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

    async CaptureTakeSnapshot(YPinstance) {
        if (this.PlayerInfo[YPinstance-1].CaptureMode) {
            this.GetApi.CaptureTakeSnapshot(YPinstance)
        }
        
    },

	//function made to pause current clip

    async CaptureSwitch(YPinstance) {
        if (this.PlayerInfo[YPinstance-1].CaptureMode) {
            this.GetApi.CaptureSwitch(YPinstance)
        }
        
    },

    async playNumerClip(number,YPinstance) {

        //var num = Number(number) 
        console.log('n'+number)
        
            if (number != 0) {
                this.GetApi.playNumerClip(number-1,YPinstance)
            }
        

    },

    async setOnAirMarkIn(YPinstance) {
        if (!this.PlayerInfo[YPinstance-1].CaptureMode) {
            this.GetApi.setOnAirMarkIn(YPinstance)
        }
    },
    async setOnAirMarkOut(YPinstance) {
        if (!this.PlayerInfo[YPinstance-1].CaptureMode) {
            this.GetApi.setOnAirMarkOut(YPinstance)
        }
    },
    async applyOnAirMarkers(YPinstance) {
        if (!this.PlayerInfo[YPinstance-1].CaptureMode) {
            this.GetApi.applyOnAirMarkers(YPinstance)
        }
    },
    async resetOnAirMarkers(YPinstance) {
        if (!this.PlayerInfo[YPinstance-1].CaptureMode) {
            this.GetApi.resetOnAirMarkers(YPinstance)
        }
    },


}
/**/