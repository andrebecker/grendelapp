$(function() {

	$("#itIsTimeToStart").click(function() {
		
		currentgameid = '';
		currentgameid = $('#hiddenGameid').val();
		
		updatestart = 1;

		url = 'https://platinpanda.com/bsc/lobbyfunctions.php';
		
		$("#plsWait").html('Das Spiel startet gleich. Bitte warten Sie einen Moment!');
		$("#plsWait").show();
		$("#itIsTimeToStart").hide();

		interval = setInterval(function() {
			
			$.post(

				url,

				{ "currentgameid": currentgameid, "updatestart": updatestart },

				function(data) {

					interval = setInterval(function() {
						if(data == 1 && $(".hiddenLat").val() != 1 && $(".hiddenLon").val() != 1) {
							
							createready = 1;
							$.post(

								url,

								{ "createready": createready, "matchidready": currentgameid },

								function(data) {
									if(data > 0) {
										startgame.click();
									}
								}, 

								"json"
							);

						}
					}, 100);

				}, 

				"json"
			
			);
		
		}, 100);
		
    });

});