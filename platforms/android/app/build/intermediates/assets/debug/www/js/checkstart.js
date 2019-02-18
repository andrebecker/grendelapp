$(function() {

	interval = setInterval(function() {
	
		checkForStart = '';
		checkForStart = $('#currentgameiddete').html();

		url = 'https://platinpanda.com/bsc/lobbyfunctions.php';

		$.post(

			url,

			{ "checkForStart": checkForStart },

			function(data) {

				if(data == 1 && $(".hiddenLat").val() != 1 && $(".hiddenLon").val() != 1) {
					referToGameLobbyAsDete.click();
				}

			}, 

			"json"
		
		);

	}, 100);

});