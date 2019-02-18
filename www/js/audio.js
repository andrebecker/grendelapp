$(function() {
	
	// start audio
	$('#sound-on').click(function() {

		$('#sound-on').hide();
		$('#sound-off').show();
		soundActive = 1;
		
		return false;
	});
	
	// stop audio
	$('#sound-off').click(function() {

		$('#sound-off').hide();
		$('#sound-on').show();
		soundActive = 0;
		
		return false;
	});
 
});

// get the audioelement
var footstepsAudio = document.getElementById("audiostream");

// Function to active or deactivate the footsteps sound
function playAudio() {
		
	if(soundActive == 1) {
		footstepsAudio.play();
		footstepsAudio.loop = true; 
	} else {
		footstepsAudio.pause();
		footstepsAudio.loop = false; 
	}
		
}