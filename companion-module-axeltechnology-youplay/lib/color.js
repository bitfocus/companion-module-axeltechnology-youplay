/**/
//class made to save page background colors
class Color{
    r=0
    g=0
    b=0

    constructor(r,g,b) {
		this.r=r
        this.g=g
        this.b=b
	}

    /*constructor(intValue){
        b = intValue \ 65536
        g = (intValue - b * 65536)  256
        r = intValue - b * 65536 - g * 256
    }*/


    setColor(r,g,b){
        this.r=r
        this.g=g
        this.b=b
    }

    toInt(){

    }
}
module.exports = Color;
/**/