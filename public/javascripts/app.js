
		//////////------------------------    Beat Hero    --------------------//////////////

		//-------------------------------- Global Variables --------------------------------//


// global score value to carry through the whole song (saved and updated round-by-round)
let score = 0;

// name variable set by user after a round 
let name = "";

// global variable to keep track of current round
let round = 1;

// store Web Audio audioBuffer objects converted from HTML 'data-sound' file
const bufSoundObj = {};
// key = sound description (ex: kick)
// value = audioBuffer object

let kick = bufSoundObj.kick
let snare = bufSoundObj.snare
let hihat = bufSoundObj.hihat
let clap = bufSoundObj.clap

// global audio context that the Web Audio API outputs through
const context = new AudioContext();

let now = context.currentTime;

// stated by the begining of the last round to be started. (used to calculate the targetHitTimes)
let roundStart = 0;

let metal = "fail";

		//--------------------------------  Arrays  --------------------------------//
 
const kickHits1 = [
	2.4,
	3,
	4.5,
	4.8,
	5.4,
	6.9,
	7.2,
	7.79,
	9.29,
	9.59,
	10.19,
	11.79,
];

const snareHits1 = [
	3.6,
	5.1,
	6,
	6.45,
	8.39,
	9.89,
	10.79,
	11.24,
];

const hihatHits2 = [

];

const clapHits2 = [

];

		//-------------------------------- Event Listeners --------------------------------//

// run through the pads and link audio to audiocontext (on-load)
$(function() {
	$('.pad-container div').each(function() {
        addAudioProperties(this);
    });

// play sample and display pad animation
    $('.pad-container div').on('mousedown', function() {
        this.play();

        // glow animation
        $(this).children('.pad-glow').remove()
        let glowDiv = $('<div class="pad-glow">')
        $(this).append(glowDiv)
        glowDiv.fadeOut('50')
        $(this).addClass('padHit');

        hitCheck(this.id, roundStart);
    });
});

// play-round-one
$('#play-round-one').on('click', function(){
	roundOne.play()
})

// preview of round one 
$('#round-one-preview').on('click', function(){
	roundOneSample.play()
})

// preview full beat...
$('#full-preview').on('click', function(){
	fullRhythmSample.play()
})

// about button
$('#about').on('click', function(){
	showMetal();
})

// Map out the pads on the keys

$(document).keypress(function(e) {
    if(e.which == 90) {
        console.log("z triggered pad1: kick");
        padGlow('#pad1');
        playPad(bufSoundObj.kick, '#pad1')
    } else if(e.which == 88){
    	console.log("x triggered pad2: snare");
        padGlow('#pad2');
        playPad(bufSoundObj.snare, '#pad2')
    } else if(e.which == 67){
    	console.log("c triggered pad3: hihat");
        padGlow('#pad3');
        playPad(bufSoundObj.hihat, '#pad3')
    } else if(e.which == 86){
    	console.log("v triggered pad4: clap");
        padGlow('#pad4');
        playPad(bufSoundObj.clap, '#pad4')
    } 
});

// print the score variable
$(document).on('mousedown', function() {
	$('.scoreTic').text(score)
});

$('.skip').on('click', function(){
	closeModal();
})

		//-------------------------------- Functions --------------------------------//

// Pad class change animation
const fadeClass = (pad) => {
	console.log(pad, 'pad from fadeClass');
	$(pad).switchClass('pads', 'padHit'/*, 1000, 'swing'*/)
	// resetClass(pad);

}

const resetClass = (pad) => {
	console.log(pad);
	$(pad).switchClass('padHit', 'pads'/*, 1000, 'swing'*/)
}

// Web Audio API load audio from HTML 'data-sound'
const loadAudio = (object, audioLink) => {

    let request = new XMLHttpRequest();
    request.open('GET', audioLink, true);
    request.responseType = 'arraybuffer';

// buffer and convert 'data-sound' into usable audioBuffer object
    request.onload = function() {
        context.decodeAudioData(request.response, function(buffer) {
            object.buffer = buffer;
            //add audioBuffer to bufSoundObj with HTML 'data-soundname' as key and converted HTML 'data-sound' as value
            soundName = $(object).data('soundname');
            bufSoundObj[soundName] = object.buffer;
        });
    }
    request.send();
}



// function to run on load that calls loadAudio and sets up play functionality to the audioBuffers connected to the pads
const addAudioProperties = (object) => {
    object.name = object.id;
    object.source = $(object).data('sound');
    soundName = $(object).data('soundname');
    loadAudio(object, object.source);
    object.play = () => {
        var s = context.createBufferSource();
        s.buffer = object.buffer;
        s.connect(context.destination);
        s.start(0);
        object.s = s;
    }
}

// function to trigger pad glow
const padGlow = (pad) => {
	console.log(pad);
	$(pad).children('.pad-glow').remove()
    let glowDiv = $('<div class="pad-glow">')
    $(pad).append(glowDiv)
    glowDiv.fadeOut('50')
    $(pad).addClass('padHit');
    // console.log(context.currentTime + ' --- This is when(padGlow ran');
}

// rangeCheck to score hit
const rangeCheck = (roundPosition, target) => {
	let break1 = target - .2;
	let break2 = target - .07;
	let break3 = target - .02;
	let break4 = target + .02;
	let break5 = target + .07;
	let break6 = target + .2;
	if (break3 <= roundPosition && roundPosition <= break4) {
		score += 200;
		console.log("Perfect! Score: " + score);
	} else if (break2 <= roundPosition && roundPosition <= break5) {
		score += 125;
		console.log("Great! Score: " + score);
	} else if (break1 <= roundPosition && roundPosition <= break6) {
		score += 75;
		console.log("Good! Score:  " + score);
	}
};

// hitCheck function to constantly check pad hits against roundStart and 

const hitCheck = (pad, roundStart) => {
	let rndStart = roundStart;
	let now = context.currentTime;
	let roundPosition = now - roundStart;
	if (rndStart == 0) {
		console.log("now = " + now);
		console.log("The round hasn't started yet rndStart = " + rndStart);
	} else if (roundPosition >= 13) {
		console.log("the round has ended");
		console.log("roundPosition = " + roundPosition);
	} else if (roundPosition < 0) {
		console.log("hitCheck failure");
		console.log("roundPosition = " + roundPosition);
	} else {
		if (pad == "pad1") {
			if (roundPosition < 7.05) {
				if (roundPosition >= 2.2 && roundPosition < 2.6) {
					rangeCheck(roundPosition, 2.4);
				} else if (roundPosition >= 2.8 && roundPosition < 3.2) {
					rangeCheck(roundPosition, 3);
				} else if (roundPosition >= 4.3 && roundPosition < 4.65) {
					rangeCheck(roundPosition, 4.5);
				} else if (roundPosition >= 4.65 && roundPosition < 5) {
					rangeCheck(roundPosition, 4.8);
				} else if (roundPosition >= 5.2 && roundPosition < 5.6) {
					rangeCheck(roundPosition, 5.4);
				} else if (roundPosition >= 6.7 && roundPosition < 7.05) {
					rangeCheck(roundPosition, 6.9);
				} else {
					score -= 100;
					console.log("Miss! : " + score);
				}
			} else {
				if (roundPosition >= 7.05 && roundPosition < 7.4) {
					rangeCheck(roundPosition, 7.2);
				} else if (roundPosition >= 7.59 && roundPosition < 7.99) {
					rangeCheck(roundPosition, 7.79);
				} else if (roundPosition >= 9.08 && roundPosition < 9.43) {
					rangeCheck(roundPosition, 9.28);
				} else if (roundPosition >= 9.43 && roundPosition < 9.79) {
					rangeCheck(roundPosition, 9.59);
				} else if (roundPosition >= 9.99 && roundPosition < 10.39) {
					rangeCheck(roundPosition, 10.19);
				} else if (roundPosition >= 11.59 && roundPosition < 11.99) {
					rangeCheck(roundPosition, 11.79);
				} else {
					score -= 100;
					console.log("Miss! : " + score);
				}
			}
		} else if (pad == "pad2") {
			if (roundPosition < 7.05) {
				if (roundPosition >= 3.4  && roundPosition < 3.8) {
					rangeCheck(roundPosition, 3.6)
				} else if (roundPosition >= 4.9 && roundPosition < 5.3) {
					rangeCheck(roundPosition, 5.1)
				} else if (roundPosition >= 5.8 && roundPosition < 6.2) {
					rangeCheck(roundPosition, 6)
				} else if (roundPosition >= 6.25 && roundPosition < 6.65) {
					rangeCheck(roundPosition, 6.45)
				} else {
					score -= 100;
					console.log("Miss! : " + score);
				}
			} else {
				if (roundPosition >= 8.09 && roundPosition < 8.59) {
					rangeCheck(roundPosition, 8.39)
				} else if (roundPosition >= 9.59 && roundPosition < 10.09) {
					rangeCheck(roundPosition, 9.89)
				} else if (roundPosition >= 10.49 && roundPosition < 10.99) {
					rangeCheck(roundPosition, 10.79)
				} else if (roundPosition >= 11.04 && roundPosition < 11.44) {
					rangeCheck(roundPosition, 11.24)
				} else {
					score -= 100;
					console.log("Miss! : " + score);
				}
			}
		} else if (pad == "pad3") {
			console.log(pad + " hit at " + roundPosition);
		} else if (pad == "pad4") {
			console.log(pad + " hit at " + roundPosition);
		} else {
			console.log("hitCheck missed all checks");
		}
 	}
}

// functions to play each pad (to trigger on keypress)
const playPad = (buffer, pad) => {
	let source = context.createBufferSource();
    source.buffer = buffer;
    let kick = bufSoundObj.kick;
    source.connect(context.destination);
    if (!source.start)
    source.start = source.noteOn;
    source.start(0);
    console.log("playPad ran " + buffer);
};

const roundEnd = () => {
	handleMetal();
	showMetal();
	console.log("roundEnd ran");
}

// modal pop up calls according to what the score is 

const showMetal = () => {
	$(".modal1").css('display','block');
	$("." + metal).css('display','block');
	console.log(metal + ":: showMetal ran");
};

const closeModal = () => {
	$(".modal1").css('display','none');
	console.log("closeModal ran");
}

// change metal value based on current store
const handleMetal = () => {
	if(score < 1800) {
		metal = "fail";
	} else if (score >= 1800 && score < 2400) {
		metal = "bronze";
	} else if (score >= 2400 && score < 3000) {
		metal = "silver";
	} else if (score >= 3000) {
		metal = "gold";
	}
}


		//-------------------------------- Objects --------------------------------//

const roundOne = { 
	play: () => {

		setTimeout(function() {
			roundEnd()
		}, 13000);

	  	playSound = (buffer, time, pad) => {
		    let source = context.createBufferSource();
		    source.buffer = buffer;
		    source.connect(context.destination);
		    if (!source.start)
		    source.start = source.noteOn;
		    source.start(time);

		    roundStart = context.currentTime;
		    console.log(pad + "'s calculated targetHit = " + (time - roundStart));
	  	}

	  	let kick = bufSoundObj.kick
		let snare = bufSoundObj.snare
		let hihat = bufSoundObj.hihat
		let clap = bufSoundObj.clap

		let now = context.currentTime;
		let tempo = 100; // BPM (beats per minute)
	   	let eighthNoteTime = (60 / tempo) / 2;
	   	let sixteenthNoteTime = (60/ tempo) / 4;

		// Play 2 bars of the following:
		for (let bar = 0; bar < 2; bar++) {
		   	let time = now + bar * 32 * sixteenthNoteTime;

		    // Play the clap on beats 1,5,9,13,17,21,25,29,33,37,41,45
		    playSound(clap, time);
		    playSound(clap, time + 4 * sixteenthNoteTime);
		    playSound(clap, time + 8 * sixteenthNoteTime);
		    playSound(clap, time + 12 * sixteenthNoteTime);
		    playSound(clap, time + 16 * sixteenthNoteTime);
		    playSound(clap, time + 20 * sixteenthNoteTime);
		    playSound(clap, time + 24 * sixteenthNoteTime);
		    playSound(clap, time + 28 * sixteenthNoteTime);
		    playSound(clap, time + 32 * sixteenthNoteTime);
		    playSound(clap, time + 36 * sixteenthNoteTime);
		    playSound(clap, time + 40 * sixteenthNoteTime);
		    playSound(clap, time + 44 * sixteenthNoteTime);

		    // Play the kick drum on beats 1, 5, 15, 17, 21, 31
		    playSound(kick, time + 16 * sixteenthNoteTime, '#pad1');
		    playSound(kick, time + 20 * sixteenthNoteTime, '#pad1');
		    playSound(kick, time + 30 * sixteenthNoteTime, '#pad1');
		    playSound(kick, time + 32 * sixteenthNoteTime, '#pad1');
		    playSound(kick, time + 36 * sixteenthNoteTime, '#pad1');
		    playSound(kick, time + 46 * sixteenthNoteTime, '#pad1');

		    // Play the snare drum on beats 9, 19, 25, 28
		    playSound(snare, time + 24 * sixteenthNoteTime, '#pad2');
		    playSound(snare, time + 34 * sixteenthNoteTime, '#pad2');
		    playSound(snare, time + 40 * sixteenthNoteTime, '#pad2');
		    playSound(snare, time + 43 * sixteenthNoteTime, '#pad2');
		}
	}
};

// Audio sequence of the completed song
const fullRhythmSample = {
	play: (buffer, time, pad) => {

		playSound = (buffer, time, pad) => {
		    let source = context.createBufferSource();
		    source.buffer = buffer;
		    source.connect(context.destination);
		    if (!source.start)
		    source.start = source.noteOn;
		    source.start(time);

		    console.log("roundStart: " + roundStart);
		    console.log(time + " : " + pad + " was hit");
		    console.log("calculated targetHit = " + (time - roundStart));

		    // pad glow effect
		    const calculatedTime = (time - now) * 1000;
		    setTimeout(padGlow, calculatedTime, pad);
		}

	  	let kick = bufSoundObj.kick
		let snare = bufSoundObj.snare
		let hihat = bufSoundObj.hihat
		let clap = bufSoundObj.clap

		// start playing the rhythm
		let now = context.currentTime;
		let tempo = 100; // BPM (beats per minute)
	   	let eighthNoteTime = (60 / tempo) / 2;
	   	let sixteenthNoteTime = (60/ tempo) / 4;

		// Play 2 bars of the following:
		for (let bar = 0; bar < 4; bar++) {
		   	let time = now + bar * 32 * sixteenthNoteTime;
		    
		    // Play the kick drum on beats 1, 5, 15, 17, 21, 31 
		    playSound(kick, time, '#pad1');
		    playSound(kick, time + 4 * sixteenthNoteTime, '#pad1');
		    playSound(kick, time + 14 * sixteenthNoteTime, '#pad1');
		    playSound(kick, time + 16 * sixteenthNoteTime, '#pad1');
		    playSound(kick, time + 20 * sixteenthNoteTime, '#pad1');
		    playSound(kick, time + 30 * sixteenthNoteTime, '#pad1');

		    // Play the snare drum on beats 9, 19, 25, 28
		    playSound(snare, time + 8 * sixteenthNoteTime, '#pad2');
		    playSound(snare, time + 18 * sixteenthNoteTime, '#pad2');
		    playSound(snare, time + 24 * sixteenthNoteTime, '#pad2');
		    playSound(snare, time + 27 * sixteenthNoteTime, '#pad2');

		    // Play the hihat on beats 3, 7, 13, 19, 22, 29
		    playSound(hihat, time + 2 * sixteenthNoteTime, '#pad3');
		    playSound(hihat, time + 6 * sixteenthNoteTime, '#pad3');
		    playSound(hihat, time + 12 * sixteenthNoteTime, '#pad3');
		    playSound(hihat, time + 18 * sixteenthNoteTime, '#pad3');
		    playSound(hihat, time + 21 * sixteenthNoteTime, '#pad3');
		    playSound(hihat, time + 28 * sixteenthNoteTime, '#pad3');

		    // Play the clap on beats 9, 11, 27
		    playSound(clap, time + 8 * sixteenthNoteTime, '#pad4');
		    playSound(clap, time + 10 * sixteenthNoteTime, '#pad4');
		    playSound(clap, time + 26 * sixteenthNoteTime, '#pad4');
		}
	}
};

// Audio sequence of the first level
const roundOneSample = {
	play: () => {
	  	playSound = (buffer, time, pad) => {
		    let source = context.createBufferSource();
		    source.buffer = buffer;
		    source.connect(context.destination);
		    if (!source.start)
		    source.start = source.noteOn;
		    source.start(time);

		    console.log("roundStart: " + roundStart);
		    console.log(time + " : " + pad + " was hit");
		    console.log("calculated targetHit = " + (time - roundStart));

		    // pad glow effect
		    const calculatedTime = (time - now) * 1000;
		    setTimeout(padGlow, calculatedTime, pad);
	  	}

		let kick = bufSoundObj.kick
		let snare = bufSoundObj.snare

		// start playing the rhythm
		let now = context.currentTime;
		let tempo = 100; // BPM (beats per minute)
	   	let eighthNoteTime = (60 / tempo) / 2;
	   	let sixteenthNoteTime = (60/ tempo) / 4;

		// Play 2 bars of the following:
		for (let bar = 0; bar < 2; bar++) {
		   	let time = now + bar * 32 * sixteenthNoteTime;
		    
		    // Play the kick drum on beats 1, 5, 15, 17, 21, 31 
		    playSound(kick, time, '#pad1');
		    playSound(kick, time + 4 * sixteenthNoteTime, '#pad1');
		    playSound(kick, time + 14 * sixteenthNoteTime, '#pad1');
		    playSound(kick, time + 16 * sixteenthNoteTime, '#pad1');
		    playSound(kick, time + 20 * sixteenthNoteTime, '#pad1');
		    playSound(kick, time + 30 * sixteenthNoteTime, '#pad1');
		    // Play the snare drum on beats 9, 19, 25, 28
		    playSound(snare, time + 8 * sixteenthNoteTime, '#pad2');
		    playSound(snare, time + 18 * sixteenthNoteTime, '#pad2');
		    playSound(snare, time + 24 * sixteenthNoteTime, '#pad2');
		    playSound(snare, time + 27 * sixteenthNoteTime, '#pad2');
		}
	}
};


		//-------------------------------- Firebase --------------------------------//

const config = {
	apiKey: "AIzaSyCiuZAUEgLH0MSqQtL_ivLJuxgAxxFneT0",
	authDomain: "beat-hero.firebaseapp.com",
	databaseURL: "https://beat-hero.firebaseio.com",
	projectId: "beat-hero",
	storageBucket: "beat-hero.appspot.com",
	messagingSenderId: "242550214376"
};

firebase.initializeApp(config);

console.log(firebase);

const database = firebase.database();

const logScore = (user, currentScore) => {
	let data = {
		name: user,
		score: currentScore
	}

	let ref = database.ref('scores');
	console.log(data);
	ref.push(data);
};
