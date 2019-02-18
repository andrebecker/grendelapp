$(function() {

	// Function to check if gps is active location
	navigator.geolocation.getCurrentPosition(function (pos) {
		var lat = pos.coords.latitude;
		if (lat == null) {
			alert("Bitte aktivieren Sie jetzt GPS! Sonst können Sie leider nicht spielen.");
		}
	});
 
});