$(function() {
	
	$("#newAccountCreated").hide();
	$("#newAccountFailed").hide();
	$("#accCreationFailed").hide();
	$("#newPWSent").hide();
	$("#noPW").hide();
	$("#pleaseActivateAcc").hide();
	
	var oneAccButtonClicked = 0; // to prevent the showing of error messages, after clicking a second button
	
	$("#login").click(function() {
		
		loginName = '';
		loginName = $('#loginName').val();
		
		loginPW = '';
		loginPW = $('#loginPW').val();

		url = 'https://platinpanda.com/bsc/lobbyfunctions.php';

		$.post(

			url,

			{ "loginName": loginName, "loginPW": loginPW },

			function(data) {
			
				if(data[0] != 0) {
					loggedIn = loginName;
					
					var loggedinPlayerName = window.localStorage.getItem('loggedinPlayerName');
					if (!loggedinPlayerName) {
						window.localStorage.setItem("loggedinPlayerName", loggedIn);
					}
					
					var loggedinID = window.localStorage.getItem('loggedinID');
					if (!loggedinID) {
						window.localStorage.setItem("loggedinID", data[0]);
					}
					
					$(".accDiv").hide();
					$(".centerDivAcc").show();
					$(".centerDivAchieve").show();
					$("#newAccountFailed").hide();
					$("#emailDiv").hide();
					
					$('#accName').val(loginName);
					$('#accPW').val(loginPW);
					
					getAchievements(data[0]);

					if(data[1] != null) {
						imagesAva = data[1];
						$('#avararBlank').attr("src",imagesAva);
						
						var loggedinAvatar = window.localStorage.getItem('loggedinAvatar');
						if (!loggedinAvatar) {
							window.localStorage.setItem("loggedinAvatar", data[1]);
						}
					}
				} else {
					
					$("#newAccountFailed").show();
					oneAccButtonClicked = 1;
					
				}
				
			}, 

			"json"
			
		);
		
		if(oneAccButtonClicked == 2) {
			$("#newPWSent").hide();
		} else if(oneAccButtonClicked == 3) {
			$("#noPW").hide();
		} else if(oneAccButtonClicked == 4) {
			$("#accCreationFailed").hide();
		}
		
    });
	
	newpwrequest = 0;
	
	$("#forgotpw").click(function() {
		
		forgotpw = '';
		forgotpw = $('#loginName').val();
		
		if(forgotpw != '') {
			newpwrequest = 1;

			url = 'https://platinpanda.com/bsc/lobbyfunctions.php';

			$.post(

				url,

				{ "forgotpw": forgotpw, "newpwrequest": newpwrequest },

				function(data) {
					
					if(data != 0) {
						$("#forgotpw").hide();
						$("#newPWSent").show();
						oneAccButtonClicked = 2;
						
						if(oneAccButtonClicked == 1) {
							$("#newAccountFailed").hide();
						} else if(oneAccButtonClicked == 3) {
							$("#noPW").hide();
						} else if(oneAccButtonClicked == 4) {
							$("#accCreationFailed").hide();
						}
					}
				}, 

				"json"
				
			);
		} else {
			$("#noPW").show();
			oneAccButtonClicked = 3;
			
			if(oneAccButtonClicked == 1) {
				$("#newAccountFailed").hide();
			} else if(oneAccButtonClicked == 2) {
				$("#newPWSent").hide();
			} else if(oneAccButtonClicked == 4) {
				$("#accCreationFailed").hide();
			}
		}
		
    });
	
	if(loggedIn != '')  {
		$(".accDiv").hide();
		$("#emailDiv").hide();
		$(".centerDivAcc").hide();
		
		if(window.localStorage.getItem("loggedinAvatar") != undefined) {
			$('#avararBlank').attr("src",window.localStorage.getItem("loggedinAvatar"));
		}
		
		if(window.localStorage.getItem("loggedinID") != undefined && window.localStorage.getItem("loggedinID") != '')  {
			$(".centerDivAchieve").show();
			getAchievements(window.localStorage.getItem("loggedinID"));
		}
	} else {
		$(".accDiv").show();
		$(".centerDivAcc").hide();
		$(".centerDivAchieve").hide();
	}
	
	$("#newAccount").click(function() {
		
		$(".accDiv").hide();
		$(".centerDivAcc").show();
		
		if(oneAccButtonClicked == 1) {
			$("#newAccountFailed").hide();
		} else if(oneAccButtonClicked == 2) {
			$("#newPWSent").hide();
		} else if(oneAccButtonClicked == 3) {
			$("#noPW").hide();
		} else if(oneAccButtonClicked == 4) {
			$("#accCreationFailed").hide();
		}
		
    });

	$("#createAcc").click(function() {
		
		accName = '';
		accName = $('#accName').val();
		
		accPW = '';
		accPW = $('#accPW').val();
		
		accMail = '';
		accMail = $('#accMail').val();

		url = 'https://platinpanda.com/bsc/lobbyfunctions.php';

		$.post(

			url,

			{ "accName": accName, "accPW": accPW, "accMail": accMail },

			function(data) {
				
				if(data > 0) {
			
					$("#pleaseActivateAcc").show();
				/*	var loggedinPlayerName = window.localStorage.getItem('loggedinPlayerName');
					if (!loggedinPlayerName) {
						// open popup
						window.localStorage.setItem("loggedinPlayerName", loggedIn);
					}
					
					$(".accDiv").hide();
					$(".centerDivAcc").show();
					$("#createAcc").hide();
					$("#newAccountCreated").show();
					$(".centerDivAchieve").show();
					
					$('#blechmedaille').hide();
					$('#bronzemedaille').hide();
					$('#silbermedaille').hide();
					$('#goldmedaille').hide();
					$('#champmedaille').hide();
					$('#blechmedailleDete').hide();
					$('#bronzemedailleDete').hide();
					$('#silbermedailleDete').hide();
					$('#goldmedailleDete').hide();
					$('#champmedailleDete').hide();
					$('#blechmedailleBandit').hide();
					$('#bronzemedailleBandit').hide();
					$('#silbermedailleBandit').hide();
					$('#goldmedailleBandit').hide();
					$('#champmedailleBandit').hide();*/
				
				} else {
					
					$("#accCreationFailed").show();
					oneAccButtonClicked = 4;

				}
			
			}, 

			"json"
			
		);
		
		if(oneAccButtonClicked == 1) {
			$("#newAccountFailed").hide();
		} else if(oneAccButtonClicked == 2) {
			$("#newPWSent").hide();
		} else if(oneAccButtonClicked == 3) {
			$("#noPW").hide();
		}
		
    });

});