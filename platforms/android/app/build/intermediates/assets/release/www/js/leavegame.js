$(function() {
	
	$(".leaveGame").click(function() {
		
		inputGameId = '';
		inputGameId = $('#gamematchid').val();
		
		leaveTheGame = 1;
		
		playerid = '';
		playerid = $('#gameplayerid').val();
		
		newurl = 'https://platinpanda.com/bsc/lobbyfunctions.php';

		$.post(

			newurl,

			{ "inputGameId": inputGameId, "leaveTheGame": leaveTheGame, "playerid": playerid },

			function(data) {

				history.go(-2);
				navigator.app.backHistory();

			}, 

			"json"
		
		);
		
    });
	
});