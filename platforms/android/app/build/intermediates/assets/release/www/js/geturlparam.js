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
	
	var playername = GetURLParameter('name');
	$("#banditname").html(playername);
	$("#hiddenBanditName").val(playername);

	var playerid = GetURLParameter('id');
	$("#currentgameid").html(playerid);
	$("#hiddenGameid").val(playerid);
	
	var playerpw = GetURLParameter('pw');
	$("#currentgamepwid").html(playerpw);
	
	var playingtime = GetURLParameter('gametime');
	$("#gametime").val(playingtime);
	
	var gamematchid = GetURLParameter('hiddenGameid');
	if(gamematchid != undefined) {
		$("#gamematchid").val(gamematchid);
	}
	
	var gameplayerid = GetURLParameter('hiddenBanditId');
	$("#gameplayerid").val(gameplayerid);

});