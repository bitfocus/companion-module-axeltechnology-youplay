/**/
//Class Whith KeyPad functions
class Keypad {

	ClipToPlay = ''


	//function that adds key pressed to ClipToPlay value
	keypress(index) {

		this.ClipToPlay += ''+ index

	}

	//reset value function
	reset() {
		this.ClipToPlay = ''
    }


}

module.exports = Keypad;
/**/