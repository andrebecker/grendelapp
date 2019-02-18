$(function() {
	
	currentgameid = 1;
	currentgameid = $(".currentgameid").text();
	
	showlist = 1;
	
	loginprevention = 0;

	interval = setInterval(function() {
		$.post(

			url,

			{ "currentgameid": currentgameid, "showlist": showlist },

			function(data) {

				$.each(data, function(key, value) {
					var newString = value.split(',');

					oldstring = $(".playerlist").html();
					
					var compareStringLast = oldstring.split('>');
					if(!compareStringLast) {
						compareStringLast = [];
					}
							
					changePl = 1;
					i = 0;
					while(i<=compareStringLast.length) {
						last_part = compareStringLast[compareStringLast.length-i];
						
						if(!last_part) {
							last_part_sup = '';
						} else {
							last_part_sup = last_part.split(' ')[0];
						}
		
						if (last_part_sup == newString[1]) {
							changePl = 0;
						}

						i++;
					}
					
					if (changePl == 1) {
						if($(".gamePlayerRole").val() ==1) {
							$("#itIsTimeToStart").hide();
							loginprevention = 5;
						}
						if(oldstring == '<br>-') {
							$(".playerlist").html(newString[1]);
						} else {
							$(".playerlist").html(oldstring + ' <br>' + newString[1]);
						}
					}
					
					if(loginprevention < 1 && ($(".gamePlayerRole").val() ==1)) {
						$("#itIsTimeToStart").show();
					}
					
					loginprevention--;
					
				})

			}, 

			"json"
			
		);				
	}, 1000);
	
	latitude = 0;
	longitude = 0;

	minusOneSec = navigator.geolocation.getCurrentPosition(
		function(position){ // Position konnte bestimmt werden
			latitude = position.coords.latitude; 
			longitude = position.coords.longitude;

			$(".hiddenLon").val(longitude);
			$(".hiddenLat").val(latitude);

			if($("#referToGameLobbyAsDete").attr("href")) {
				tester = $("#referToGameLobbyAsDete").attr("href");
				tester = tester + "&hiddenLat=" + latitude + "&hiddenLon=" + longitude;
				$("#referToGameLobbyAsDete").attr("href", tester);
			}

		}, 
		function(){ // Positionsbestimmung gescheitert
		},{enableHighAccuracy: true}
	);
	
});