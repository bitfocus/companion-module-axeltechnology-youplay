/**/
const { combineRgb } = require('@companion-module/base')

module.exports = function (instance,GetApi) {

	//these are the functions that the action will use upon call
	//Player function do if(not (IsCaptureMode))

    instance.setActionDefinitions({
        
        InstanceToControl: {
			name: 'Decide wich instance to control using this action',
			options: [{
				type: 'dropdown',
				label: 'which Instance',
				id: 'InstChoise',
				default: '1',
				tooltip: 'Which instance?',
				choices: [
					{ id: '1', label: '1' },
					{ id: '2', label: '2' },
					{ id: '3', label: '3' },
					{ id: '4', label: '4' },
					{ id: 'All', label: 'All' },
				],
			},
			{

				type: 'colorpicker',
				label: 'Channel color',
				id: 'ChColor',
				default: combineRgb(0, 0, 0)

			}],
			callback: async (event) => {

				const InstanceToControl= (inst) =>{
					instance.YPinstance = inst
					//console.log("instance to control",instance.YPinstance)

				}
				console.log("tried to save color",event.options.ChColor)
				InstanceToControl(event.options.InstChoise)
				instance.saveColor(event.options.ChColor,event.options.InstChoise)
    
			}
		},
		//----------------------------------------------------------------

		Play_PauseClip: {

			name: 'Play or Pause current clip depending on player status',

			callback: async (event) => {

				//Play/pause function that uses the player status to define which action to run 
				const Play_PauseClip= async(YPinstance) => {

					if (!instance.PlayerInfo[YPinstance-1].CaptureMode) {
						if (instance.PlayerInfo[YPinstance-1].PlayerStatus != 2) {
								await GetApi.playClip(YPinstance)
							
						} else if (instance.PlayerInfo[YPinstance-1].PlayerStatus == 2) {
							await GetApi.pauseClip(YPinstance)
							instance.checkFeedbacks('Play/Pause')
						}
					}
					
				}

				try{
					if(instance.checkYPInstance()){
						for(var i=1;i<=4;i++){
							Play_PauseClip(i)
						}
					}else{
						Play_PauseClip(instance.YPinstance)
					}
				}catch(e){
					console.error("play/pause error",e)
				}
    
			}
		},
		//----------------------------------------------------------------
		skipClip: {
			name: 'Skip to netx clip',
			
			callback: async (event) => {

				//skip function
				const skipClip= async(YPinstance) => {
					if (!instance.PlayerInfo[YPinstance-1].CaptureMode) {
						await GetApi.skipClip(YPinstance)
					}
				}
				
				if(instance.checkYPInstance()){
					for(var i=1;i<=4;i++){
						skipClip(i)
					}
				}else{
					skipClip(instance.YPinstance)
				}
			}
		},
		//----------------------------------------------------------------
		StopClip:{
			name: 'Stop player clip'
            ,
			callback: async (event) => {

				const StopClip= async(YPinstance) => {
					if (!instance.PlayerInfo[YPinstance-1].CaptureMode) {
						await GetApi.StopClip(YPinstance)
					}
				}

				if(instance.checkYPInstance()){
					for(var i=1;i<=4;i++){
						StopClip(i)
					}
				}else{
					StopClip(instance.YPinstance)
				}
				
			}
		},
		//----------------------------------------------------------------
		previousClip: {
			name: 'Previous clip'
            ,
			callback: async (event) => {

				const previousClip= async(YPinstance) => {
					if (!instance.PlayerInfo[YPinstance-1].CaptureMode) {
						await GetApi.previousClip(YPinstance)
					}
				}

				if(instance.checkYPInstance()){
					for(var i=1;i<=4;i++){
						previousClip(i)
					}
				}else{
					previousClip(instance.YPinstance)
				}    
			}
		},
		//----------------------------------------------------------------
		playNumerClip: {
			name: 'Play clip digited with the keypad',
			callback: async (event) => {

				const playNumerClip= async(number,YPinstance) =>{

					//var num = Number(number) 
					console.log('n'+number)
					
					if (number != 0) {
						await GetApi.playNumerClip(number-1,YPinstance)
					}
		
				}

				playNumerClip(instance.KeyPad.ClipToPlay,instance.YPinstance)
    
			}
		},
		//----------------------------------------------------------------
		switchPlayMode: {
			name: 'Select Player Mode by clicking (One At A Time, Start To End, Loop)',
			options: [{
				type: 'dropdown',
				label: 'which mode',
				id: 'ModeChoise',
				default: '1',
				tooltip: 'Which mode does this activate?',
				choices: [
					{ id: '0', label: 'Start to End' },
					{ id: '1', label: 'One at a time' },
					{ id: '2', label: 'Loop' },
				],
				minChoicesForSearch: 0
			}],
			callback: async (event) => {

				//swich Play Mode
				const switchPlayMode= async(mode,YPinstance) => {
					if (!instance.PlayerInfo[YPinstance-1].CaptureMode) {
						
						await GetApi.switchPlayMode(mode,YPinstance)
					}
				}

				if(instance.checkYPInstance()){
					for(var i=1;i<=4;i++){
						switchPlayMode(event.options.ModeChoise,i)
					}
				}else{
					switchPlayMode(event.options.ModeChoise,instance.YPinstance)
				}    
			}
		},
		//----------------------------------------------------------------
		CaptureTakeSnapshot:{
			name: 'Capture snapshot'
            ,
			callback: async (event) => {

				const CaptureTakeSnapshot= async(YPinstance) =>{
					if (instance.PlayerInfo[YPinstance-1].CaptureMode) {
						await GetApi.CaptureTakeSnapshot(YPinstance)
					}
					
				}

				if(instance.checkYPInstance()){
					for(var i=1;i<=4;i++){
						CaptureTakeSnapshot(i)
					}
				}else{
					CaptureTakeSnapshot(instance.YPinstance)
				}    
			}
		},
		//----------------------------------------------------------------
		switchCaptureMode: {
			name: 'Switch Capture and player mode'
            ,
			callback: async (event) => {

				//switch capture mode
				const switchCaptureMode= async(YPinstance) =>{
					await GetApi.switchCaptureMode(YPinstance)
				}

				if(instance.checkYPInstance()){
					for(var i=1;i<=4;i++){
						switchCaptureMode(i)
					}
				}else{
					switchCaptureMode(instance.YPinstance)
				}    
			}
		},
		//----------------------------------------------------------------
		CaptureStart: {
			name: 'starts/stops recording in recorder mode'
            ,
			callback: async (event) => {

				const CaptureStart= async(YPinstance) =>{
					if (instance.PlayerInfo[YPinstance-1].CaptureMode) {
						if (instance.RecorderInfo[YPinstance-1].CaptureState == 2) {
							await GetApi.CaptureStop(YPinstance)
						} else {
							await GetApi.CaptureStart(YPinstance)
						}
					}
				}

				if(instance.checkYPInstance()){
					for(var i=1;i<=4;i++){
						CaptureStart(i)
					}
				}else{
					CaptureStart(instance.YPinstance)
				}    
			}
		},
		//----------------------------------------------------------------
		Mixer: {
			name: 'toggle Mixer in player'
            ,
			callback: async (event) => {

				const Mixer= async(YPinstance) => {
					if (!instance.PlayerInfo[YPinstance-1].CaptureMode) {
						if (instance.PlayerInfo[YPinstance-1].PlayerMixerEnabled) {
							await GetApi.Mixer(0,YPinstance)
						} else {
							await GetApi.Mixer(1,YPinstance)
						}
					}
				}

				if(instance.checkYPInstance()){
					for(var i=1;i<=4;i++){
						Mixer(i)
					}
				}else{
					Mixer(instance.YPinstance)
				}    
			}
		},
		//----------------------------------------------------------------
		LogoCg: {
			name: 'toggle CG in player'
            ,
			callback: async (event) => {

				const LogoCg= async(YPinstance) => {
					if (!instance.PlayerInfo[YPinstance-1].CaptureMode) {
						if (instance.PlayerInfo[YPinstance-1].PlayerLogoEnabled) {
							await GetApi.LogoCg(0,YPinstance)
						} else {
							await GetApi.LogoCg(1,YPinstance)
						}
					}
				}

				if(instance.checkYPInstance()){
					for(var i=1;i<=4;i++){
						LogoCg(i)
					}
				}else{
					LogoCg(instance.YPinstance)
				}    
			}
		},
		//----------------------------------------------------------------
		PlayerAudioPreview:{
			name: 'toggle audio preview in player'
            ,
			callback: async (event) => {

				const PlayerAudioPreview= async(YPinstance) => {
					if (!instance.PlayerInfo[YPinstance-1].CaptureMode) {
						if (instance.PlayerInfo[YPinstance-1].PlayerAudioPreviewEnabled) {
							await GetApi.PlayerAudioPreview(0,YPinstance)
						} else {
							await GetApi.PlayerAudioPreview(1,YPinstance)
						}
					}
				}

				if(instance.checkYPInstance()){
					for(var i=1;i<=4;i++){
						PlayerAudioPreview(i)
					}
				}else{
					PlayerAudioPreview(instance.YPinstance)
				}    
			}
		},
		//----------------------------------------------------------------
		CaptureAudioPreview:{
			name: 'toggle audio preview in recorder'
            ,
			callback: async (event) => {

				const CaptureAudioPreview= async(YPinstance) =>{
					if (instance.PlayerInfo[YPinstance-1].CaptureMode) {
						if (instance.RecorderInfo[YPinstance-1].AudioPreviewEnabled) {
							await GetApi.CaptureAudioPreview(0,YPinstance)
						} else {
							await GetApi.CaptureAudioPreview(1,YPinstance)
						}
					}
				}

				if(instance.checkYPInstance()){
					for(var i=1;i<=4;i++){
						CaptureAudioPreview(i)
					}
				}else{
					CaptureAudioPreview(instance.YPinstance)
				}    
			}
		},
		//----------------------------------------------------------------
		CaptureAddToPlaylist:{
			name: 'ass to playlist in recorder'
            ,
			callback: async (event) => {

				const CaptureAddToPlaylist= async(YPinstance) =>{
					if (instance.PlayerInfo[YPinstance-1].CaptureMode) {
						if (instance.RecorderInfo[YPinstance-1].AddToThePlaylist) {
							await GetApi.CaptureAddToPlaylist(0,YPinstance)
						} else {
							await GetApi.CaptureAddToPlaylist(1,YPinstance)
						}
					}
				}

				if(instance.checkYPInstance()){
					for(var i=1;i<=4;i++){
						CaptureAddToPlaylist(i)
					}
				}else{
					CaptureAddToPlaylist(instance.YPinstance)
				}    
			}
		},
		//----------------------------------------------------------------
		ChangeCaptureScheduler:{
			name: 'toggle scheduler in recorder'
            ,
			callback: async (event) => {

				const ChangeCaptureScheduler= async(YPinstance) =>{
					if (instance.PlayerInfo[YPinstance-1].CaptureMode) {
						if (instance.RecorderInfo[YPinstance-1].ScheduleEnabled) {
							await GetApi.ChangeCaptureScheduler(0,YPinstance)
						} else {
							await GetApi.ChangeCaptureScheduler(1,YPinstance)
						}
					}
				}

				if(instance.checkYPInstance()){
					for(var i=1;i<=4;i++){
						ChangeCaptureScheduler(i)
					}
				}else{
					ChangeCaptureScheduler(instance.YPinstance)
				}    
			}
		},
		//----------------------------------------------------------------
		CaptureSwitch: {
			name:'switchs clip while recording'
            ,
			callback: async (event) => {

				const CaptureSwitch= async(YPinstance) =>{
					if (instance.PlayerInfo[YPinstance-1].CaptureMode) {
						await GetApi.CaptureSwitch(YPinstance)
					}
					
				}

				if(instance.checkYPInstance()){
					for(var i=1;i<=4;i++){
						CaptureSwitch(i)
					}
				}else{
					CaptureSwitch(instance.YPinstance)
				}    
			}
		},
		//----------------------------------------------------------------
		addNumber: {
			name: 'assign Clip Number',
			options: [{
				type: 'dropdown',
				label: 'which Number',
				id: 'NumChoise',
				default: '0',
				tooltip: 'Which number to add?',
				choices: [
					{ id: '0', label: '0' },
					{ id: '1', label: '1' },
					{ id: '2', label: '2' },
					{ id: '3', label: '3' },
					{ id: '4', label: '4' },
					{ id: '5', label: '5' },
					{ id: '6', label: '6' },
					{ id: '7', label: '7' },
					{ id: '8', label: '8' },
					{ id: '9', label: '9' }

				],
			}]
            ,
			callback: async (event) => {

				instance.KeyPad.keypress(event.options.NumChoise,instance.YPinstance)
				if (instance.interval == 0) {
					instance.ClipTM = setTimeout(function () { instance.KeyPad.reset(), instance.interval= 0 }.bind(instance), 3000)
					instance.interval =1 
				}    
			}
		},
		//----------------------------------------------------------------
		setOnAirMarkIn:{
			name: 'Set mark-in in the current clip'
            ,
			callback: async (event) => {

				const setOnAirMarkIn= async(YPinstance) =>{
					if (!instance.PlayerInfo[YPinstance-1].CaptureMode) {
						await GetApi.setOnAirMarkIn(YPinstance)
					}
				}

				if(instance.checkYPInstance()){
					for(var i=1;i<=4;i++){
						setOnAirMarkIn(i)
					}
				}else{
					setOnAirMarkIn(instance.YPinstance)
				}    
			}
		},
		//----------------------------------------------------------------
			setOnAirMarkOut:{
			name: 'set mark-out in te current clip'
            ,
			callback: async (event) => {
				
				const setOnAirMarkOut= async(YPinstance)=> {
					if (!instance.PlayerInfo[YPinstance-1].CaptureMode) {
						await GetApi.setOnAirMarkOut(YPinstance)
					}
				}

				if(instance.checkYPInstance()){
					for(var i=1;i<=4;i++){
						setOnAirMarkOut(i)
					}
				}else{
					setOnAirMarkOut(instance.YPinstance)
				}    
			}
		},
		//----------------------------------------------------------------
			applyOnAirMarkers:{
			name: 'apply markers'
            ,
			callback: async (event) => {

				const applyOnAirMarkers= async(YPinstance) => {
					if (!instance.PlayerInfo[YPinstance-1].CaptureMode) {
						await GetApi.applyOnAirMarkers(YPinstance)
					}
				}

				if(instance.checkYPInstance()){
					for(var i=1;i<=4;i++){
						applyOnAirMarkers(i)
					}
				}else{
					applyOnAirMarkers(instance.YPinstance)
				}    
			}
		},
		//----------------------------------------------------------------
			resetOnAirMarkers: {
			name: 'Reset markers'
            ,
			callback: async (event) => {

				const resetOnAirMarkers= async(YPinstance) => {
					if (!instance.PlayerInfo[YPinstance-1].CaptureMode) {
						await GetApi.resetOnAirMarkers(YPinstance)
					}
				}

				if(instance.checkYPInstance()){
					for(var i=1;i<=4;i++){
						resetOnAirMarkers(i)
					}
				}else{
					resetOnAirMarkers(instance.YPinstance)
				}    
			}
		},

	
    })

}
/**/