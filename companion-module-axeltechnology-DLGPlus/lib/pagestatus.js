/**/

const Page = require("./page");

class PageStatus{

    OnAirChannel= new Array()
    
    //constructor, here getData will have a dlgplus obj to get a Json
	constructor(api) {
		this.getData=api
        setOnairChannel()
	}


    //checks which channels are active (array because multiple channels can be active at the same time)
    setOnairChannel(){

        for(i=1;i<=4;i++){
            channeldata= await this.getData.getChannelinfo(i)

            if(channeldata['Active']){
                this.OnAirChannel[i]=true
            }else{
                this.OnAirChannel[i]=false
            }
        }

    }

    //
    getNumberPages(Channel){

        channeldata= await this.getData.getChannelinfo(Channel);
        var pages,[] =new Page()

        channeldata.array.forEach(element => {
            if(element.channeldata['Index']>0&&element.channeldata['Index']<100){
                pages[element.channeldata['Index']-1].index=element.channeldata['Index']
                pages[element.channeldata['Index']-1].Name=element.channeldata['PageName']
                pages[element.channeldata['Index']-1].desc=element.channeldata['PageDescription']
                pages[element.channeldata['Index']-1].onAir=element.channeldata['OnAir']

            }
        });

        return pages
    }

    getLetterPages(){
        channeldata= await this.getData.getChannelinfo(Channel);
        var pages,[] =new Page()

        channeldata.array.forEach(element => {
            if(element.channeldata['Index']>500&&element.channeldata['Index']<600){
                pages[element.channeldata['Index']-1].index=element.channeldata['Index']
                pages[element.channeldata['Index']-1].Name=element.channeldata['PageName']
                pages[element.channeldata['Index']-1].desc=element.channeldata['PageDescription']
                pages[element.channeldata['Index']-1].onAir=element.channeldata['OnAir']

            }
        });
        
        return pages
    }


}
module.exports = PageStatus;