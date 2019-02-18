var timeUntilEnd = 10000000;

var armodeActive = 0;

var soundActive = 0;

var joinedGames = 0;

var loggedIn = '';
if(window.localStorage.getItem('loggedinPlayerName') != undefined) {
	loggedIn = window.localStorage.getItem('loggedinPlayerName');
}

var loggedInID = '';
if(window.localStorage.getItem("loggedinID") != undefined) {
	loggedInID = window.localStorage.getItem("loggedinID");
}

var winLossRatioLS = 0;
if(window.localStorage.getItem("successRatioLS") != undefined) {
	winLossRatioLS = window.localStorage.getItem("successRatioLS");
}

var loggedinAvatar = 0;
if(window.localStorage.getItem("loggedinAvatar") != undefined) {
	loggedinAvatar = window.localStorage.getItem("loggedinAvatar");
}