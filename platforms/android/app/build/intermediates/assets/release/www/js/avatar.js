$(function() {
		
	$('#chooseAvatar').click(function(event) {
		event.preventDefault();
		$('#galleryTableAsPopup').css("display", "block");
	});
	
	// to prevent an error onload
	var avaLoad = 0;

	// set the avatar
	$('.gallery').click(function(event) {
		images = $('#'+event.target.id).attr('src');
		$('#avararBlank').attr("src",images);
		
		url = 'https://platinpanda.com/bsc/lobbyfunctions.php';
		
		$.post(

			url,

			{ "playerIdAvatar": window.localStorage.getItem('loggedinID'), "avatarid": images },

			function(data) {
				if(data > 0) {
					if(avaLoad%2 > 0) {
						alert('Der Avatar wurde erfolgreich gespeichert!');
						$('#galleryTableAsPopup').css("display", "none");
						window.localStorage.setItem("loggedinAvatar", images);
					}
				} else {
					if(avaLoad%2 > 0) {
						alert('Es gab einen Fehler beim speichern des Avatars!');
					}
				}
				avaLoad++;
			}, 

			"json"
		);
	});
	 
});