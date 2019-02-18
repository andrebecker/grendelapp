$(function() {
	
	var firstLoad = window.localStorage.getItem('firstLoad');
	if (!firstLoad) {
		window.localStorage.setItem("firstLoad", joinedGames);
		joinedGames++;
	}
	
	currentgameid = 1;
	currentgameid = $(".currentgameid").text();
	
	banditname = 1;
	banditname = $(".banditname").text();
	
	gamePlayerRole = 1;
	gamePlayerRole = $(".gamePlayerRole").val();
	
	url = 'https://platinpanda.com/bsc/lobbyfunctions.php';
	
	checkForTime = currentgameid;
	
	$.post(

		url,

		{ "checkForTime": checkForTime },

		function(data) {

			$('#chosenTime').val(data);
			gameid = $("#hiddenGameid").val();
			$("a[href='game.html?gametime=']").attr("href", "game.html?id=0&gamePlayerRole="+gamePlayerRole+"&gametime="+$('#chosenTime').val()+"&hiddenGameid="+gameid+"&hiddenPlayerName="+banditname+"");

		}, 

		"json"
		
	);
	
	lat = 0;
	lon = 0;
	nowready = 0;
	minusOneSec = navigator.geolocation.getCurrentPosition(
		function(position){ // Position konnte bestimmt werden
			lat = position.coords.latitude; 
			lon = position.coords.longitude;
			
			if(loggedInID != '') {
				loggedinplayerid = loggedInID;
			} else {
				loggedinplayerid = 0;
			}

			$.post(

				url,

				{ "currentgameid": currentgameid, "banditname": banditname, "gamePlayerRole": gamePlayerRole, "lat": lat, "lon": lon, "loggedinplayerid": loggedinplayerid },

				function(data) {

					$.each(data, function(key, value) {
						var newString = value.split(',');
						
						var is_last_item = (key == (data.length - 1));
						if(is_last_item == true) {

							if($("#referToGameLobbyAsDete").attr("href")) {
								tester = $("#referToGameLobbyAsDete").attr("href");
								
								if(loggedInID == '') {
									tester = tester.replace("0", newString[0]); // value = 9:61
									$("#referToGameLobbyAsDete").attr("href", tester);
									setDeteReady(newString[0]);
								} else {
									tester = tester.replace("0", loggedInID); // value = 9:61
									$("#referToGameLobbyAsDete").attr("href", tester);
									setDeteReady(loggedInID);
								}
								
							}
							
							if($("#hiddenBanditId").val() == 1) {
								if(loggedInID == '') {
									$("#hiddenBanditId").val(newString[0]);
								} else {
									$("#hiddenBanditId").val(loggedInID);
								}
							}
							
						}
						
					});

				}, 

				"json"
				
			);

		}, 
		function(){ // Positionsbestimmung gescheitert
		},{enableHighAccuracy: true}
	);
	
	// set the player now ready
	function setDeteReady(playerid) {
			
		nowReady = 1;
		$.post(

			url,

			{ "currentgameid": currentgameid, "loggedinplayerid": playerid, "nowReady": nowReady },

			function(data) {

			//	$('#chosenTime').val(data);
				gameid = $("#hiddenGameid").val();
				$("a[href='game.html?gametime=']").attr("href", "game.html?id=0&gamePlayerRole="+gamePlayerRole+"&gametime="+$('#chosenTime').val()+"&hiddenGameid="+gameid+"&hiddenPlayerName="+banditname+"");

			}, 

			"json"
							
		);
	}
	
});