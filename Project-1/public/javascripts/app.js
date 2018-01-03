// global variables
	// score
	// sounds?

let score = 0;

let sounds = [
"/audio/Kicks/CYCdh_AcouKick-03.wav",
"/audio/Snares/CYCdh_LudFlamC-05.wav"
]; 

// classes for each pad
	// serial number 
	// unique sounds (could be held in a global variable)
	// methods
		// play sound
		// check for timing
			// update score

class pad {
	constructor (name, number, sound, id){
		this.name = name;
		this.number = number;
		this.sound = sound;
		this.id = id;
	}
		//non Web Audio solution
	// linkPad () {
	// 	let $padAudio = $('<audio>').attr('src', this.sound);
	// 	console.log($padAudio);
	// 	$(this.id).on('mousedown', () => {
	// 		console.log(this.name + ' was triggered');
	// 		$padAudio[0].play();
	// 		// $(this.id).addClass('padHit');
	// 	});
	// }


}

		// -----------colored pad hits (add later)-------------
// $(this.id).on('mouseup', () => {
// 		$(this).fadeOut(() => {
//        	$(this).removeClass('pads').addClass('padHit').fadeIn('fast');
//    	})
// 		function () {
//    		$(this).fadeOut(function () {
//        	$(this).removeClass("class2").addClass("class1").fadeIn('fast');
//    	});
// })


// classes for each round
	// a sequence to replicate (triggered by Preview button)
		// a full audio sample to attempt to replicate 
		// a matching timed visual sequence that shows the correct pads to hit
	// a timer (triggered by Start button)
	// a scoreboard
	// log of pad hits with serial numbers and timestamp (to check against)

class round {
	constructor (name, number, sound, hitLog){
		this.name = name;
		this.number = number;
		this.sound = sound;
		this.hitLog = hitLog;
	}
}

	//link test

// console.log($('#pad1'));
let padOne = new pad ('kick', 1, sounds[0], '#pad1');
// console.log(padOne);
padOne.linkPad();

let padTwo = new pad ('snare', 2, sounds[1], '#pad2');

padTwo.linkPad();

let padThree = new pad ('hiHat', 3, sounds[2], '#pad3');

padThree.linkPad();