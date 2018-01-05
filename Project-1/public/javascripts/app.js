// run through the pads and link audio to audiocontext

$(function() {
	$('.container div').each(function() {
        addAudioProperties(this);
    });

//initiate event listener
    $('.container div').on('mousedown', function() {
        this.play();
        console.log(context.currentTime);
    });
});

//initiate event listener for preview of round one 
$('#round-one-preview').on('click', function(){
	console.log(context.currentTime);
	roundOneSample.play()
})

// global variables
	// score
	// sounds

let score = 0;

let soundBuffers = [];

const bufSoundObj = {};

//global audio context
var context = new AudioContext();

//Web Audio API load audio from data-sound html
function loadAudio(object, audioLink) {

    var request = new XMLHttpRequest();
    request.open('GET', audioLink, true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
        context.decodeAudioData(request.response, function(buffer) {
            object.buffer = buffer;
            soundName = $(object).data('soundname');
            bufSoundObj[soundName] = object.buffer;
        });
    }
    request.send();
}

function addAudioProperties(object) {
    object.name = object.id;
    object.source = $(object).data('sound');
    soundName = $(object).data('soundname');
    loadAudio(object, object.source);
    object.play = function () {
        var s = context.createBufferSource();
        s.buffer = object.buffer;
        s.connect(context.destination);
        s.start(0);
        object.s = s;
    }
}

var fullRhythmSample = {
};

fullRhythmSample.play = function() {
  	function playSound(buffer, time) {
	    var source = context.createBufferSource();
	    source.buffer = buffer;
	    source.connect(context.destination);
	    if (!source.start)
	    source.start = source.noteOn;
	    source.start(time);
	    console.log(buffer);
	    console.log(context.currentTime);
  	}

	var kick = bufSoundObj.kick
	var snare = bufSoundObj.snare
  	var hihat = bufSoundObj.hihat
  	var clap = bufSoundObj.clap

	//start playing the rhythm
	var startTime = context.currentTime;
	var tempo = 113; // BPM (beats per minute)
   	var eighthNoteTime = (60 / tempo) / 2;
   	var sixteenthNoteTime = (60/ tempo) / 4;

	// Play 2 bars of the following:
	for (var bar = 0; bar < 4; bar++) {
	   	var time = startTime + bar * 32 * sixteenthNoteTime;
	    
	    // Play the bass (kick) drum on beats 1, 5, 15, 17, 21, 31 
	    playSound(kick, time);
	    playSound(kick, time + 4 * sixteenthNoteTime);
	    playSound(kick, time + 14 * sixteenthNoteTime);
	    playSound(kick, time + 16 * sixteenthNoteTime);
	    playSound(kick, time + 20 * sixteenthNoteTime);
	    playSound(kick, time + 30 * sixteenthNoteTime);

	    // Play the snare drum on beats 9, 19, 25, 28
	    playSound(snare, time + 8 * sixteenthNoteTime);
	    playSound(snare, time + 18 * sixteenthNoteTime);
	    playSound(snare, time + 24 * sixteenthNoteTime);
	    playSound(snare, time + 27 * sixteenthNoteTime);

	    // Play the hihat on beats 3, 7, 13, 19, 22, 29
	    playSound(hihat, time + 2 * sixteenthNoteTime);
	    playSound(hihat, time + 6 * sixteenthNoteTime);
	    playSound(hihat, time + 12 * sixteenthNoteTime);
	    playSound(hihat, time + 18 * sixteenthNoteTime);
	    playSound(hihat, time + 21 * sixteenthNoteTime);
	    playSound(hihat, time + 28 * sixteenthNoteTime);

	    // Play the clap on beats 9, 11, 27
	    playSound(clap, time + 8 * sixteenthNoteTime);
	    playSound(clap, time + 10 * sixteenthNoteTime);
	    playSound(clap, time + 26 * sixteenthNoteTime);
	}
};

var roundOneSample = {
};

roundOneSample.play = function() {
  	function playSound(buffer, time) {
	    var source = context.createBufferSource();
	    source.buffer = buffer;
	    source.connect(context.destination);
	    if (!source.start)
	    source.start = source.noteOn;
	    source.start(time);
  	}

	var kick = bufSoundObj.kick
	var snare = bufSoundObj.snare

	//start playing the rhythm
	var startTime = context.currentTime;
	var tempo = 113; // BPM (beats per minute)
   	var eighthNoteTime = (60 / tempo) / 2;
   	var sixteenthNoteTime = (60/ tempo) / 4;

	// Play 2 bars of the following:
	for (var bar = 0; bar < 4; bar++) {
	   	var time = startTime + bar * 32 * sixteenthNoteTime;
	    
	    // Play the bass (kick) drum on beats 1, 5, 15, 17, 21, 31 
	    playSound(kick, time);
	    playSound(kick, time + 4 * sixteenthNoteTime);
	    playSound(kick, time + 14 * sixteenthNoteTime);
	    playSound(kick, time + 16 * sixteenthNoteTime);
	    playSound(kick, time + 20 * sixteenthNoteTime);
	    playSound(kick, time + 30 * sixteenthNoteTime);

	    // Play the snare drum on beats 9, 19, 25, 28
	    playSound(snare, time + 8 * sixteenthNoteTime);
	    playSound(snare, time + 18 * sixteenthNoteTime);
	    playSound(snare, time + 24 * sixteenthNoteTime);
	    playSound(snare, time + 27 * sixteenthNoteTime);
	}
};

//function that initiates a round using the hitCheck function and calculating using the start time of the round
const startRound1 = function () {
	let timeOfStart = context.currentTime;

}

// function to check against rhythmSample and upgrade score (function for each round)
	//needs to log the start of the round and subtract that time from the other hits against the standard timing

const hitCheck = function() {
	
}

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
}

// classes for each round
	// a sequence to replicate (triggered by Preview button)
		// a full audio sample to attempt to replicate 
		// a matching timed visual sequence that shows the correct pads to hit
	// a timer (triggered by Start button)
	// a scoreboard
	// log of pad hits with serial numbers and timestamp (to check against)
