
	function getAchievements(playerid) {

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
		$('#champmedailleBandit').hide();
		$('#noAchievement').hide();
		
		$('#blechdiv').show();
		$('#bronzediv').show();
		$('#silberdiv').show();
		$('#golddiv').show();
		$('#champdiv').show();
		
		$('#blechdivDete').show();
		$('#bronzedivDete').show();
		$('#silberdivDete').show();
		$('#golddivDete').show();
		$('#champdivDete').show();
		
		$('#blechdivBandit').show();
		$('#bronzedivBandit').show();
		$('#silberdivBandit').show();
		$('#golddivBandit').show();
		$('#champdivBandit').show();

		checkForAchievements = 1;

		url = 'https://platinpanda.com/bsc/lobbyfunctions.php';

		$.post(

			url,

			{ "checkForAchievements": checkForAchievements, "playerid": playerid },

			function(data) {

				if(data[0] >= 1 && data[0]< 10) {
					$('#blechmedaille').show();
					$('#blechdiv').hide();
					
					if(data[1] >= 1 && data[1]< 10) {
						$('#blechmedailleBandit').show();
						$('#blechdivBandit').hide();
					}
					
					if(data[2] >= 1 && data[2]< 10) {
						$('#blechmedailleDete').show();
						$('#blechdivDete').hide();
					}
					
				} else if (data[0]>= 10 && data[0]< 50) {
					$('#blechmedaille').show();
					$('#bronzemedaille').show();
					$('#blechdiv').hide();
					$('#bronzediv').hide();
					
					if(data[1] >= 10 && data[1]< 50) {
						$('#blechmedailleBandit').show();
						$('#bronzemedailleBandit').show();
						$('#blechdivBandit').hide();
						$('#bronzedivBandit').hide();
					}
					
					if(data[2] >= 10 && data[2]< 50) {
						$('#blechmedailleDete').show();
						$('#bronzemedailleDete').show();
						$('#blechdivDete').hide();
						$('#bronzedivDete').hide();
					}
					
				} else if (data[0]>= 50 && data[0]< 250) {
					$('#blechmedaille').show();
					$('#bronzemedaille').show();
					$('#silbermedaille').show();
					$('#blechdiv').hide();
					$('#bronzediv').hide();
					$('#silberdiv').hide();
					
					if (data[1]>= 50 && data[1]< 250) {
						$('#blechmedailleBandit').show();
						$('#bronzemedailleBandit').show();
						$('#silbermedailleBandit').show();
						$('#blechdivBandit').hide();
						$('#bronzedivBandit').hide();
						$('#silberdivBandit').hide();
					}
					
					if (data[2]>= 50 && data[2]< 250) {
						$('#blechmedailleDete').show();
						$('#bronzemedailleDete').show();
						$('#silbermedailleDete').show();
						$('#blechdivDete').hide();
						$('#bronzedivDete').hide();
						$('#silberdivDete').hide();
					}
					
				} else if (data[0]>= 250 && data[0]< 1000) {
					$('#blechmedaille').show();
					$('#bronzemedaille').show();
					$('#silbermedaille').show();
					$('#goldmedaille').show();
					$('#blechdiv').hide();
					$('#bronzediv').hide();
					$('#silberdiv').hide();
					$('#golddiv').hide();
					
					if (data[1]>= 250 && data[1]< 1000) {
						$('#blechmedailleBandit').show();
						$('#bronzemedailleBandit').show();
						$('#silbermedailleBandit').show();
						$('#goldmedailleBandit').show();
						$('#blechdivBandit').hide();
						$('#bronzedivBandit').hide();
						$('#silberdivBandit').hide();
						$('#golddivBandit').hide();
					}
					
					if (data[2]>= 250 && data[2]< 1000) {
						$('#blechmedailleDete').show();
						$('#bronzemedaillDete').show();
						$('#silbermedailleDete').show();
						$('#goldmedailleDete').show();
						$('#blechdivDete').hide();
						$('#bronzedivDete').hide();
						$('#silberdivDete').hide();
						$('#golddivDete').hide();
					}
					
				} else if (data[0]>= 1000) {
					$('#blechmedaille').show();
					$('#bronzemedaille').show();
					$('#silbermedaille').show();
					$('#goldmedaille').show();
					$('#champmedaille').show();
					$('#blechdiv').hide();
					$('#bronzediv').hide();
					$('#silberdiv').hide();
					$('#golddiv').hide();
					$('#champdiv').hide();
					
					if (data[1]>= 1000) {
						$('#blechmedailleBandit').show();
						$('#bronzemedailleBandit').show();
						$('#silbermedailleBandit').show();
						$('#goldmedailleBandit').show();
						$('#champmedailleBandit').show();
						$('#blechdivBandit').hide();
						$('#bronzedivBandit').hide();
						$('#silberdivBandit').hide();
						$('#golddivBandit').hide();
						$('#champdivBandit').hide();
					}
					
					if (data[2]>= 1000) {
						$('#blechmedailleDete').show();
						$('#bronzemedailleDete').show();
						$('#silbermedailleDete').show();
						$('#goldmedailleDete').show();
						$('#champmedailleDete').show();
						$('#blechdivDete').hide();
						$('#bronzedivDete').hide();
						$('#silberdivDete').hide();
						$('#golddivDete').hide();
						$('#champdivDete').hide();
					}
					
				} else {
					$('#noAchievement').show();
				}
				
				$('#accWins').val(data[0]);
				$('#accWinsBandit').val(data[1]);
				$('#accWinsDetective').val(data[2]);
				
				// save the win / loss ratio to use it ingame
				winLossRatio = (data[1] / data[2]);
				var successRatioLS = window.localStorage.getItem('successRatioLS');
				if (!successRatioLS) {
					// open popup
					window.localStorage.setItem("successRatioLS", winLossRatio);
				}
			}, 

			"json"
			
		);
		
		checkForLosses = 1;
		$.post(

			url,

			{ "checkForLosses": checkForLosses, "playerid": playerid },

			function(data) {
				$('#accLosses').val(data[0]);
				$('#accLossesBandit').val(data[1]);
				$('#accLossesDetective').val(data[2]);
			}, 

			"json"
			
		);
	
	}
	
	function saveReuslts() {
		$.post(

			url,

			{ "saveAchievements": checkForAchievements, "playerid": playerid },

			function(data) {

			}, 

			"json"
			
		);
	}