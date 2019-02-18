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
	
	var playeriddete = GetURLParameter('id');
	$("#currentgameiddete").html(playeriddete);
	$("#hiddenGameid").val(playeriddete);
	
	var detename = GetURLParameter('detename');
	$("#detename").html(detename);
	$("#hiddenPlayerName").val(detename);

});