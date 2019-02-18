$(function() {
	
	currentgameid = 1;
	currentgameid = $("#currentgameid").text();
	
	banditname = 1;
	banditname = $("#banditname").text();
	
	gamePlayerRole = 1;
	
	url = 'https://platinpanda.com/bsc/lobbyfunctions.php';
		
	$.post(

		url,

		{ "currentgameid": currentgameid, "banditname": banditname, "gamePlayerRole": gamePlayerRole },

		function(data) {
		   
			console.log(data);

		}, 

		"json"
		
	);
	
});