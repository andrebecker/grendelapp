$(function() {
	
	if($("#gameplayerrole").val() == 1) {
		$('#describeGP').html('Als erstes m&uuml;ssen Sie Ihre Startposition w&auml;hlen. Tippen Sie daf&uuml;r auf der Spielkarte auf den Wunschort. Wenn das System Ihren Klick erkannt hat, wird dort ein roter Marker eingeblendet. '+
		'Ist das nicht gelungen, m&uuml;ssen Sie diesen Vorgang solange wiederholen bis das gelungen ist. Je nach Displaysensivit&auml;t kann dieses Problem auftreten. Danach nutzen Sie die Pfeile auf dem Display ums ich fortzubewegen. '+
		'Des Weiteren haben Sie die Option sich f&uuml;r ein paar Sekunden zu verstecken. Klicken sie daf&uuml;r auf den Baum. Ansonsten k&ouml;nnen Sie noch einen kurzen Sprint einlegen. Klicken Sie daf&uuml;r auf den Button '+
		'mit dem Sprinter.<br> Dieser Dialog wird in ein paar Sekunden automatisch geschlossen.');
	} else {
		$('#describeGP').html('Laufen Sie durch die Gegend um den Banditen zu fangen. Sie haben eine Pistole, mit welcher Sie Ihren Kollegen ein Signal setzen k&ouml;nnen. Des Weiteren k&ouml;nnen Sie f&uuml;r eine Sekunde den Banditen via Radar aufdecken. '+
		'Klicken Sie daf&uuml;r auf den Radarbutton. sie erhalten, sofern Sie sich nah am Banditen befinden, Audiohinweise. Dieses k&ouml;nnen Sie &uuml;ber den Lautsprecherbutton ein- bzw. ausschalten. Ebenso erhalten Sie extra Hinweise '+
		'&uuml;ber die Kamera. Wenn Sie auf die Lupe klicken, wird Ihr Kamerabild eingeblendet. Sind Sie nahe genug am Banditen, so werden dort Spuren angeziegt. Aber die Richtung ist immer n&ouml;rdlich, obwohl der Bandit auch '+
		'in einer anderen Richtung zu Ihnen stehen kann.<br> Dieser Dialog wird in ein paar Sekunden automatisch geschlossen.');
	}

	// Function to describe the gameplay
	var describeGP = 0;
	
	interval = setInterval(function() {
		describeGP++;
		if(describeGP > 29) {
			$('#describeGP').hide();
		}
	}, 1000);
 
});