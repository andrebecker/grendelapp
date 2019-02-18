$(function() {
	
	$('#joinGameNow').click(function() {
		
		checkPW = '';
		checkPW = $('#inputGamePW').val();
		
		detename = '';
		detename = $('#detectivename').val();
		
		inputGameId = '';
		inputGameId = $('#inputGameId').val();

		url = 'https://platinpanda.com/bsc/lobbyfunctions.php';
		
		$.post(

			url,

			{ "checkPW": checkPW, "detename": detename, "inputGameId": inputGameId },

			function(data) {

				if(data == 1) {
					$("a[href='gamelobby.html?detename=']").attr("href", "gamelobby.html?detename="+$('#detectivename').val()+"&id="+$('#inputGameId').val()+"");
				
					referToMainLobbyAsDete.click();
				} else if(data == 2) {
					$('body').append('<div class="errorMsg">Der Name ist bereits vergeben!</div>');
				} else {
					$('body').append('<div class="errorMsg">Das eingegebene Passwort ist falsch!</div>');
				}

			}, 

			"json"
		
		);

	});
	
	if(loggedIn != '') {
		$('#detectivename').val(loggedIn);
		$('#detectivename').attr('readonly', true);
	}
	
});