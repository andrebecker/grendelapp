$(function() {
	
	$('#hostGameNow').click(function() {
		hostgamePW = '';
		hostgamePW = $('#inputGamePW').val();
		
		hostname = '';
		hostname = $('#banditHostname').val();
		
		hosttime = '';
		hosttime = $('#gametime').val();
		
		chooseMode = '';
		chooseMode = $('#chooseMode').val();
		
		url = 'https://platinpanda.com/bsc/lobbyfunctions.php';
		
		$.post(

			url,

			{ "hostgamePW": hostgamePW, "hosttime": hosttime, "chooseMode": chooseMode },

			function(data) {
		   
				$('#hiddenPlayerID').val(data);
				console.log($('#hiddenPlayerID').val());
				//$('#banditHostForm').submit();
				//$("a[href='banditmenu.html?id=']").attr("href", "banditmenu.html?id="+$('#hiddenPlayerID').val()+"&pw="+hostgamePW+"");
				$("a[href='banditmenu.html?id=']").attr("href", "banditmenu.html?id="+$('#hiddenPlayerID').val()+"&name="+hostname+"&pw="+hostgamePW+"&gametime="+hosttime+"&mode="+chooseMode+"");
			
				referToMainLobby.click();

			}, 

			"json"
		
		);
		
	});
	
	if(loggedIn != '') {
		$('#banditHostname').val(loggedIn);
		$('#banditHostname').attr('readonly', true);
	}
	
});