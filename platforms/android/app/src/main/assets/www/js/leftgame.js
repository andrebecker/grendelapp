$(function() {

	url = 'https://platinpanda.com/bsc/lobbyfunctions.php';
		
	inputGameId = '';
	inputGameId = $('.hiddenGameid').val();
	
	if(loggedInID != '') {
		loggedinplayerid = loggedInID;
	} else {
		loggedinplayerid = 0;
	}
	
	gamePlayerRole = '';
	gamePlayerRole = $('.gamePlayerRole').val();
	
	// check if host has left the game
	if(gamePlayerRole != 1) {
	
		checkleftgame = 1;
		
		interval = setInterval(function() {
		
			$.post(

				url,

				{ "inputGameId": inputGameId,"checkleftgame": checkleftgame,"loggedinplayerid": loggedinplayerid },

				function(data) {

					if(data == 1) {
						
						alert("Der Bandit hat die Partie verlassen.");
						
						history.go(-1);
						navigator.app.backHistory();
					}

				}, 

				"json"
				
			);
		
		}, 1000);
		
		$(".backbutton").click(function() {
			history.go(-1);
			navigator.app.backHistory();
		});
	
	} else {
	
		$(".backbutton").click(function() {

			hostleftgame = 1;
			
			$.post(

				url,

				{ "inputGameId": inputGameId,"hostleftgame": hostleftgame,"loggedinplayerid": loggedinplayerid },

				function(data) {

					if(data == 1) {
						history.go(-2);
						navigator.app.backHistory();
					}

				}, 

				"json"
			
			);

		});
	
	}
	
});