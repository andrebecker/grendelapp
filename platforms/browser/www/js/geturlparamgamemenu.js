$(function() {

	function GetURLParameter(sParam) {
		var sPageURL = window.location.search.substring(1);
		var sURLVariables = sPageURL.split('&');
		for (var i = 0; i < sURLVariables.length; i++) {
			var sParameterName = sURLVariables[i].split('=');
			if (sParameterName[0] == sParam) {
				return decodeURIComponent(sParameterName[1]);
			}
		}
	}

	var gameplayerid = GetURLParameter('id');

	if(gameplayerid != undefined) {
		$("#gameplayerid").val(gameplayerid);
		$("#mapdiv").css("width", "90vw");
	}
	
	
	var gamePlayerRole = GetURLParameter('gamePlayerRole');

	if(gamePlayerRole != undefined) {
		$("#gameplayerrole").val(gamePlayerRole);
	}
	
	var gamePlayerLat = GetURLParameter('hiddenLat');
	var gamePlayerLon = GetURLParameter('hiddenLon');

	if(gamePlayerLat != undefined && gamePlayerLon != undefined) {
		$(".hiddenLat").val(gamePlayerLat);
		$(".hiddenLon").val(gamePlayerLon);
	}
	
	var getGamePlayerName = GetURLParameter('hiddenPlayerName');

	if(getGamePlayerName != undefined) {
		$("#getGamePlayerName").val(getGamePlayerName);
	}

});