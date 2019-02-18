$(function() {
	$("#closebutton").click(function() {
        if (navigator.app) {
			loggedIn = 0;
			window.localStorage.removeItem("loggedinPlayerName");
			window.localStorage.removeItem("loggedinID");
			window.localStorage.removeItem("firstLoad");
			window.localStorage.clear();
			navigator.app.exitApp();
		} else if (navigator.device) {
			loggedIn = 0;
			window.localStorage.removeItem("loggedinPlayerName");
			window.localStorage.removeItem("loggedinID");
			window.localStorage.removeItem("firstLoad");
			window.localStorage.clear();
			navigator.device.exitApp();
		} else {
			loggedIn = 0;
			window.localStorage.removeItem("loggedinPlayerName");
			window.localStorage.removeItem("loggedinID");
			window.localStorage.removeItem("firstLoad");
			window.localStorage.clear();
			window.close();
		}
    });
	
	$(".backbutton").click(function() {
        history.go(-1);
		navigator.app.backHistory();
    });
});