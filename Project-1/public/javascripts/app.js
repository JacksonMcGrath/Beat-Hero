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
            console.log(object.buffer);
            soundBuffers.push(object.buffer);
        });
    }
    request.send();
}

function addAudioProperties(object) {
    object.name = object.id;
    object.source = $(object).data('sound');
    object.soundName = $(object).data('soundname')
    loadAudio(object, object.source);
    object.play = function () {
        var s = context.createBufferSource();
        s.buffer = object.buffer;
        console.log(soundBuffers);
        s.connect(context.destination);
        s.start(0);
        object.s = s;
    }
}

var RhythmSample = {
};

RhythmSample.play = function() {
  	function playSound(buffer, time) {
	    var source = context.createBufferSource();
	    source.buffer = buffer;
	    source.connect(context.destination);
	    if (!source.start)
	    source.start = source.noteOn;
	    source.start(time);
  	}

	var kick = soundBuffers[0]
	var snare = soundBuffers[1]
  	var hihat = soundBuffers[2]

	// We'll start playing the rhythm 100 milliseconds from "now"
	var startTime = context.currentTime + 0.100;
	var tempo = 120; // BPM (beats per minute)
   	var eighthNoteTime = (60 / tempo) / 2;

	// Play 2 bars of the following:
	for (var bar = 0; bar < 2; bar++) {
	   	var time = startTime + bar * 8 * eighthNoteTime;
	    // Play the bass (kick) drum on beats 1, 5
	    playSound(kick, time);
	    playSound(kick, time + 4 * eighthNoteTime);

	    // Play the snare drum on beats 3, 7
	    playSound(snare, time + 2 * eighthNoteTime);
	    playSound(snare, time + 6 * eighthNoteTime);

	    // Play the hi-hat every eighthh note.
	    for (var i = 0; i < 8; ++i) {
	      playSound(hihat, time + i * eighthNoteTime);
	    }
	}
};

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
		
		//non Web Audio API solution

	// linkPad () {
	// 	let $padAudio = $('<audio>').attr('src', this.sound);
	// 	console.log($padAudio);
	// 	$(this.id).on('mousedown', () => {
	// 		console.log(this.name + ' was triggered');
	// 		$padAudio[0].play();
	// 		// $(this.id).addClass('padHit');
	// 	});
	// }

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
// let padOne = new pad ('kick', 1, sounds[0], '#pad1');
// console.log(padOne);
// padOne.linkPad();

// let padTwo = new pad ('snare', 2, sounds[1], '#pad2');

// padTwo.linkPad();

// let padThree = new pad ('hiHat', 3, sounds[2], '#pad3');

// padThree.linkPad();