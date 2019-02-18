<?php
header("Access-Control-Allow-Origin: *");

// create a new match in the db
if(!empty($_POST['hostgamePW']) && !empty($_POST['hosttime']) && !empty($_POST['chooseMode'])) {

	$conf = array(
		'host' => 'xxx',
		'bank' => 'xxx',
		'user' => 'xxx',
		'pass' => 'xxx',
	);

	/*
	 * db class 
	 */
	require './inc/generalClasses/db.php';
	
	if($_POST['chooseMode'] == 'frei') {
		$chooseMode = 1;
	} else {
		$chooseMode = 0;
	}

	// connect to db
	$GLOBALS['db'] = new db($conf['host'], $conf['bank'], $conf['user'], $conf['pass'], 'mysql');
	//require_once './index.php';

	// get the data from the other players
	$params = array($_POST['hostgamePW'], $_POST['hosttime'], $chooseMode);
	$query = "INSERT INTO `bsc_match`(`bsc_match_pw`, `bsc_match_started`, `bsc_match_time`, `bsc_match_mode`) VALUES (?, 0, ?, ?);";
	$res = $GLOBALS['db'] -> execute($query, $params);
	
	// get the gameid
	$params = array($_POST['hostgamePW']);
    $query = "SELECT MAX(bsc_match_id) AS maxid FROM `bsc_match` WHERE bsc_match_pw=?;";
    $res = $GLOBALS['db'] -> row($query, $params);

	$gameid = 0;

	if($res['rows']>0) {
		
		$gameid = $res['result']['maxid'];
			
	}
	
	
	/*	
	$succes = false;

	// check if insertion was successful
	if($res['rows']>0) {
		
		$succes = true;
		  
	}*/

    echo json_encode($gameid);
    exit;

}

// add player to game in db
if(!empty($_POST['currentgameid']) && !empty($_POST['banditname']) && !empty($_POST['gamePlayerRole']) && !empty($_POST['lat']) && !empty($_POST['lon'])) {

	$conf = array(
		'host' => 'xxx',
		'bank' => 'xxx',
		'user' => 'xxx',
		'pass' => 'xxx',
	);

	/*
	 * db class 
	 */
	require './inc/generalClasses/db.php';

	// connect to db
	$GLOBALS['db'] = new db($conf['host'], $conf['bank'], $conf['user'], $conf['pass'], 'mysql');
	//require_once './index.php';
	
	
	// set playerrole zero because the gps might not bepreloaded until now
	if($_POST['gamePlayerRole'] == 2) {
		$_POST['gamePlayerRole'] = 0;
	}
	
	
	if(!empty($_POST['loggedinplayerid'])) {
		
		// get the data from the other players
		$params = array($_POST['currentgameid'], $_POST['banditname'], $_POST['gamePlayerRole'], $_POST['loggedinplayerid']);
		$query = "UPDATE `bsc_player` SET `bsc_player_matchid`=?, `bsc_player_name`=?, `bsc_player_role`=? WHERE `bsc_player_id`=?;";
		
	} else {
	
		// get the data from the other players
		$params = array($_POST['currentgameid'], $_POST['banditname'], $_POST['gamePlayerRole']);
		$query = "INSERT INTO `bsc_player`(`bsc_player_matchid`, `bsc_player_name`, `bsc_player_role`) VALUES (?, ?, ?);";
	
	}
	
	$res = $GLOBALS['db'] -> execute($query, $params);
	

	// get the data from the other players
	$params = array($_POST['currentgameid']);
	$query = "SELECT * FROM `bsc_player` WHERE bsc_player_matchid = ?;";
	$res = $GLOBALS['db'] -> all($query, $params);
		
	$id = 0;
	$name = '';
	
	$matchArr = array();
	$matchArr1 = array();
	$matchArr2 = array();

	// check if insertion was successful
	for($i=0;$i<$res['rows'];$i++) {
		
		$matchArr1[$i] = $res['result'][$i]['bsc_player_id'];
		$matchArr2[$i] = $res['result'][$i]['bsc_player_name'];
		
		$matchArr[$i] = $matchArr1[$i].','.$matchArr2[$i];
		  
	}

	$today = date("H:i:s");                         // 17:16:18
	if(empty($_POST['loggedinplayerid'])) {
		// HIER MUSS DIE ABFRAGE REIN LETZTE ID INSERTEN IN LOCATION
		$ma2length = sizeof($matchArr2);
		$ma2length -= 1; // to get the last element
		// save the data from playerid in the locationdb

		$params2 = array($today, $_POST['lat'], $_POST['lon'], $matchArr1[$ma2length]);
		$query2 = "INSERT INTO `bsc_location`(`bsc_location_time`, `bsc_location_lat`, `bsc_location_lon`, `bsc_location_playerid`) VALUES (?,?,?,?);";
	} else {
		$params2 = array($today, $_POST['lat'], $_POST['lon'], $_POST['loggedinplayerid'], $_POST['loggedinplayerid']);
		//$query2 = "INSERT INTO `bsc_location`(`bsc_location_time`, `bsc_location_lat`, `bsc_location_lon`, `bsc_location_playerid`) VALUES (?,?,?,?);";
		$query2 = "UPDATE `bsc_location` SET  `bsc_location_time`=?, `bsc_location_lat`=?, `bsc_location_lon`=?, `bsc_location_playerid`=? WHERE `bsc_location_playerid`=?;";
	}
	$res2 = $GLOBALS['db'] -> execute($query2, $params2);
	
    echo json_encode($matchArr);
    exit;

}

// get the playername
if((!empty($_POST['checkPW'])) && (!empty($_POST['detename'])) && (!empty($_POST['inputGameId']))) {

	$conf = array(
		'host' => 'xxx',
		'bank' => 'xxx',
		'user' => 'xxx',
		'pass' => 'xxx',
	);

	/*
	 * db class 
	 */
	require './inc/generalClasses/db.php';

	// connect to db
	$GLOBALS['db'] = new db($conf['host'], $conf['bank'], $conf['user'], $conf['pass'], 'mysql');
	//require_once './index.php';	
	
	$params = array($_POST['checkPW'], $_POST['inputGameId']);
    $query = "SELECT bsc_match_mode FROM `bsc_match` WHERE bsc_match_pw=? AND bsc_match_id=?;";
    $res = $GLOBALS['db'] -> row($query, $params);

	$pwmatch = 0;

	if($res['rows']>0) {
		
		$params2 = array($_POST['inputGameId'], $_POST['detename']);
		$query2 = "SELECT DISTINCT bsc_player_name FROM `bsc_player` WHERE (`bsc_player_matchid`=? AND `bsc_player_name`=?);";
		$res2 = $GLOBALS['db'] -> row($query2, $params2);

		if($res2['rows']>0) {
		
			$pwmatch = 2;
			
		} else {
			
			$pwmatch = 1;
			
		}
			
	}

    echo json_encode($pwmatch);
    exit;

}

// check if the game is set to start
if(!empty($_POST['checkForStart'])) {

	$conf = array(
		'host' => 'xxx',
		'bank' => 'xxx',
		'user' => 'xxx',
		'pass' => 'xxx',
	);

	/*
	 * db class 
	 */
	require './inc/generalClasses/db.php';

	// connect to db
	$GLOBALS['db'] = new db($conf['host'], $conf['bank'], $conf['user'], $conf['pass'], 'mysql');
	//require_once './index.php';	
	
	$params = array($_POST['checkForStart']);
    $query = "SELECT bsc_match_started FROM `bsc_match` WHERE bsc_match_id=?;";
    $res = $GLOBALS['db'] -> row($query, $params);

	$pwmatch = 0;

	if($res['rows']>0) {
		
		$pwmatch = $res['result']['bsc_match_started'];
			
	}

    echo json_encode($pwmatch);
    exit;

}

// get the number of minutes of the game
if(!empty($_POST['checkForTime'])) {

	$conf = array(
		'host' => 'xxx',
		'bank' => 'xxx',
		'user' => 'xxx',
		'pass' => 'xxx',
	);

	/*
	 * db class 
	 */
	require './inc/generalClasses/db.php';

	// connect to db
	$GLOBALS['db'] = new db($conf['host'], $conf['bank'], $conf['user'], $conf['pass'], 'mysql');
	//require_once './index.php';	
	
	$params = array($_POST['checkForTime']);
    $query = "SELECT bsc_match_time FROM `bsc_match` WHERE bsc_match_id=?;";
    $res = $GLOBALS['db'] -> row($query, $params);

	$pwmatch = 0;

	if($res['rows']>0) {
		
		$pwmatch = $res['result']['bsc_match_time'];
			
	}

    echo json_encode($pwmatch);
    exit;

}

// save the gamestart
if(!empty($_POST['currentgameid']) && !empty($_POST['updatestart'])) {

	$conf = array(
		'host' => 'xxx',
		'bank' => 'xxx',
		'user' => 'xxx',
		'pass' => 'xxx',
	);

	/*
	 * db class 
	 */
	require './inc/generalClasses/db.php';

	// connect to db
	$GLOBALS['db'] = new db($conf['host'], $conf['bank'], $conf['user'], $conf['pass'], 'mysql');

	$time = $_POST['time'];
	
	$params = array($_POST['currentgameid']);
	$query0 = "SELECT bsc_location_lat, bsc_location_lon FROM bsc_location LEFT JOIN bsc_player ON bsc_location_playerid = bsc_player_id WHERE bsc_player_matchid = ?;";
	$res0 = $GLOBALS['db'] -> all($query0, $params);
	
	$latArr = array();
	$lonArr = array();
	$startedArr = array();
	
	// to prevent an update while it still searches for gelocation
	$emptylatlon = 0;

	// check if insertion was successful
	for($i=0;$i<$res['rows'];$i++) {
		
		$latArr[$i] = $res['result'][$i]['bsc_location_lat'];
		$lonArr[$i] = $res['result'][$i]['bsc_location_lon'];
		 
		if((empty($latArr[$i])) || (empty($lonArr[$i]))) {
			$emptylatlon = 1;
		}
	}
	
	if ((in_array("0.000001", $latArr) && in_array("0.000001", $lonArr)) || !empty($emptylatlon)) {
		$updateFinished = 0;
	} else {
		
		// check whether ar least 2 players are in the gamelobby
		$params = array($_POST['currentgameid']);
		$query = "SELECT COUNT(bsc_location_id) AS bsc_location_count FROM bsc_location LEFT JOIN bsc_player ON bsc_location_playerid = bsc_player_id WHERE bsc_player_matchid = ?;";
		$res = $GLOBALS['db'] -> row($query, $params);

		if($res['result']['bsc_location_count']>1) {
			
				$query2 = "UPDATE `bsc_match` SET `bsc_match_started`=1 WHERE `bsc_match_id`=?;";
				$res2 = $GLOBALS['db'] -> execute($query2, $params);

				// check if update was successful
				if($res2['rows'] > 0) {
					
					$updateFinished = 1;
					  
				}

		}

	}

    echo json_encode($updateFinished);
    exit;

}

// get the playerlist
if(!empty($_POST['currentgameid']) && !empty($_POST['showlist'])) {

	$conf = array(
		'host' => 'xxx',
		'bank' => 'xxx',
		'user' => 'xxx',
		'pass' => 'xxx',
	);

	/*
	 * db class 
	 */
	require './inc/generalClasses/db.php';

	// connect to db
	$GLOBALS['db'] = new db($conf['host'], $conf['bank'], $conf['user'], $conf['pass'], 'mysql');
	//require_once './index.php';

	// get the data from the other players
	$params = array($_POST['currentgameid']);
	$query = "SELECT bsc_player_id, bsc_player_name FROM `bsc_player` WHERE bsc_player_matchid = ? AND bsc_player_role != 0;";
	$res = $GLOBALS['db'] -> all($query, $params);
		
	$id = 0;
	$name = '';
	
	$matchArr = array();
	$matchArr1 = array();
	$matchArr2 = array();

	// check if search was successful
	for($i=0;$i<$res['rows'];$i++) {
		
		$matchArr1[$i] = $res['result'][$i]['bsc_player_id'];
		$matchArr2[$i] = $res['result'][$i]['bsc_player_name'];
		
		$matchArr[$i] = $matchArr1[$i].','.$matchArr2[$i];
		  
	}
	
    echo json_encode($matchArr);
    exit;

}

// create an account
if(!empty($_POST['accName']) && !empty($_POST['accPW']) && !empty($_POST['accMail'])) {

	$conf = array(
		'host' => 'xxx',
		'bank' => 'xxx',
		'user' => 'xxx',
		'pass' => 'xxx',
	);

	/*
	 * db class 
	 */
	require './inc/generalClasses/db.php';

	// connect to db
	$GLOBALS['db'] = new db($conf['host'], $conf['bank'], $conf['user'], $conf['pass'], 'mysql');
	//require_once './index.php';
	
	// get the current max id
	$params0 = array($_POST['hostgamePW']);
    $query0 = "SELECT MAX(bsc_player_id) AS maxid FROM `bsc_player`;";
    $res0 = $GLOBALS['db'] -> row($query0, $params0);

	$gameid = 0;

	if($res0['rows']>0) {
		
		$gameid = $res0['result']['maxid'];
		$gameid++;	
	}

	// get the data from the other players
	$params = array($_POST['accName'], $_POST['accPW'], $gameid, $_POST['accMail']);
	$query = "INSERT INTO `bsc_account`(`bsc_account_name`, `bsc_account_pw`, `bsc_account_playerid`, `bsc_account_email`) VALUES (?, ?, ?, ?);";
	$res = $GLOBALS['db'] -> execute($query, $params);
	
	
	$updateFinished = 0;
	
	// check if insertion was successful
	if($res['rows'] > 0) {
		
		// set dummy data for the new acc
		$params2 = array($_POST['accName']);
		$query2 = "INSERT INTO `bsc_player`(`bsc_player_matchid`, `bsc_player_name`, `bsc_player_role`) VALUES (1, ?, 2);";
		$res2 = $GLOBALS['db'] -> execute($query2, $params2);
					
		if($res2['rows'] > 0) {
			
			$params3 = array($gameid);
			$query3 = "INSERT INTO `bsc_location`(`bsc_location_time`, `bsc_location_lat`, `bsc_location_lon`, `bsc_location_playerid`) VALUES ('00:00:00','0.000001','0.000001',?);";
			$res3 = $GLOBALS['db'] -> execute($query3, $params3);
			
			if($res3['rows'] > 0) {
				
				require './mailer.php';
				$mailer = new Mailer();
				$restorePW = 0;
					
				$mailSuccessful = false;
				$mailSuccessful = $mailer -> sendMail($_POST['accMail'], $restorePW); 
							
				if($mailSuccessful == true) {

					$updateFinished = 1;

				}
				
			}
		}
					  
	}

    echo json_encode($updateFinished);
    exit;

}

// check for login
if(!empty($_POST['loginName']) && !empty($_POST['loginPW'])) {

	$conf = array(
		'host' => 'xxx',
		'bank' => 'xxx',
		'user' => 'xxx',
		'pass' => 'xxx',
	);

	/*
	 * db class 
	 */
	require './inc/generalClasses/db.php';

	// connect to db
	$GLOBALS['db'] = new db($conf['host'], $conf['bank'], $conf['user'], $conf['pass'], 'mysql');
	//require_once './index.php';

	// get the data from the other players
	$params = array($_POST['loginName'], $_POST['loginPW']);
	$query = "SELECT bsc_account_playerid, bsc_player_avatar FROM `bsc_account` LEFT JOIN `bsc_player` ON bsc_account_playerid = `bsc_player_id` WHERE bsc_account_name=? AND bsc_account_pw=? AND bsc_account_active=1;";
	
    $res = $GLOBALS['db'] -> row($query, $params);
	
	$resArr = array();

	if($res['rows']>0) {
		
		$resArr[0] = $res['result']['bsc_account_playerid'];
		$resArr[1] = $res['result']['bsc_player_avatar'];

	} else {
		$resArr[0] = 0;
	}

    echo json_encode($resArr);
    exit;

}

// send the password
if(!empty($_POST['forgotpw']) && !empty($_POST['newpwrequest'])) {

	$conf = array(
		'host' => 'xxx',
		'bank' => 'xxx',
		'user' => 'xxx',
		'pass' => 'xxx',
	);

	/*
	 * db class 
	 */
	require './inc/generalClasses/db.php';

	// connect to db
	$GLOBALS['db'] = new db($conf['host'], $conf['bank'], $conf['user'], $conf['pass'], 'mysql');
	//require_once './index.php';

	// get the data from the other players
	$params = array($_POST['forgotpw']);
	$query = "SELECT bsc_account_pw, bsc_account_email FROM `bsc_account` WHERE bsc_account_name=?;";
    $res = $GLOBALS['db'] -> row($query, $params);

	$accpw = 0;

	if($res['rows']>0) {
		
		$receiveremail = $res['result']['bsc_account_email'];
		$accpw = $res['result']['bsc_account_pw'];
		
		require './mailer.php';
		$mailer = new Mailer();
			
		$mailSuccessful = false;
		$mailSuccessful = $mailer -> sendMail($receiveremail, $accpw); 
					
		if($mailSuccessful != true) {

			$accpw = 0;

		}

	}

    echo json_encode($accpw);
    exit;

}

// get count of wins of the player
if((!empty($_POST['checkForAchievements'])) && (!empty($_POST['playerid']))) {

	$conf = array(
		'host' => 'xxx',
		'bank' => 'xxx',
		'user' => 'xxx',
		'pass' => 'xxx',
	);

	/*
	 * db class 
	 */
	require './inc/generalClasses/db.php';

	// connect to db
	$GLOBALS['db'] = new db($conf['host'], $conf['bank'], $conf['user'], $conf['pass'], 'mysql');
	//require_once './index.php';	
	
	// check for wins in general
	$params = array($_POST['playerid']);
    $query = "SELECT COUNT(bsc_result_win) FROM bsc_result WHERE bsc_result_playerid = ? AND bsc_result_win = 1;";
    $res = $GLOBALS['db'] -> row($query, $params);

	$resWin = array();

	if($res['rows']>0) {
		
		if($res['result']['COUNT(bsc_result_win)'] != NULL) {
			$resWin[0] = $res['result']['COUNT(bsc_result_win)'];
			
			// check for wins as bandit
			$query2 = "SELECT COUNT(bsc_result_win) FROM bsc_result WHERE bsc_result_playerid = ? AND bsc_result_win = 1 AND bsc_result_role = 1;";
			$res2 = $GLOBALS['db'] -> row($query2, $params);
			
			if($res2['rows']>0) {
				if($res2['result']['COUNT(bsc_result_win)'] != NULL) {
					$resWin[1] = $res2['result']['COUNT(bsc_result_win)'];
				}
			}
			
			// check for wins as detective
			$query3 = "SELECT COUNT(bsc_result_win) FROM bsc_result WHERE bsc_result_playerid = ? AND bsc_result_win = 1 AND bsc_result_role = 2;";
			$res3 = $GLOBALS['db'] -> row($query3, $params);
			
			if($res3['rows']>0) {
				if($res3['result']['COUNT(bsc_result_win)'] != NULL) {
					$resWin[2] = $res3['result']['COUNT(bsc_result_win)'];
				}
			}
		}

	}

    echo json_encode($resWin);
    exit;

}

// get count of losses of the player
if((!empty($_POST['checkForLosses'])) && (!empty($_POST['playerid']))) {

	$conf = array(
		'host' => 'xxx',
		'bank' => 'xxx',
		'user' => 'xxx',
		'pass' => 'xxx',
	);

	/*
	 * db class 
	 */
	require './inc/generalClasses/db.php';

	// connect to db
	$GLOBALS['db'] = new db($conf['host'], $conf['bank'], $conf['user'], $conf['pass'], 'mysql');
	//require_once './index.php';	
	
	// check for losses in general
	$params = array($_POST['playerid']);
    $query = "SELECT COUNT(bsc_result_win) FROM bsc_result WHERE bsc_result_playerid = ? AND bsc_result_win = 0;";
    $res = $GLOBALS['db'] -> row($query, $params);

	$resLos = array();

	if($res['rows']>0) {
		
		if($res['result']['COUNT(bsc_result_win)'] != NULL) {
			$resLos[0] = $res['result']['COUNT(bsc_result_win)'];
			
			// check for losses as bandit
			$query2 = "SELECT COUNT(bsc_result_win) FROM bsc_result WHERE bsc_result_playerid = ? AND bsc_result_win = 0 AND bsc_result_role = 1;";
			$res2 = $GLOBALS['db'] -> row($query2, $params);
			
			if($res2['rows']>0) {
				if($res2['result']['COUNT(bsc_result_win)'] != NULL) {
					$resLos[1] = $res2['result']['COUNT(bsc_result_win)'];
				}
			}
			
			// check for losses as detective
			$query3 = "SELECT COUNT(bsc_result_win) FROM bsc_result WHERE bsc_result_playerid = ? AND bsc_result_win = 0 AND bsc_result_role = 2;";
			$res3 = $GLOBALS['db'] -> row($query3, $params);
			
			if($res3['rows']>0) {
				if($res3['result']['COUNT(bsc_result_win)'] != NULL) {
					$resLos[2] = $res3['result']['COUNT(bsc_result_win)'];
				}
			}
		}

	}

    echo json_encode($resLos);
    exit;

}

//create the player ready table
if(!empty($_POST['createready']) && !empty($_POST['matchidready'])) {

	$conf = array(
		'host' => 'xxx',
		'bank' => 'xxx',
		'user' => 'xxx',
		'pass' => 'xxx',
	);

	/*
	 * db class 
	 */
	require './inc/generalClasses/db.php';

	// connect to db
	$GLOBALS['db'] = new db($conf['host'], $conf['bank'], $conf['user'], $conf['pass'], 'mysql');
	//require_once './index.php';

	// get the data from the other players
	$params2 = array($_POST['matchidready']);
	$query2 = "INSERT INTO bsc_ready(`bsc_ready_gameid`, `bsc_ready_playercount`) VALUES(?, 0);";
	$res2 = $GLOBALS['db'] -> execute($query2, $params2);
	
	$saved = 1;
    echo json_encode($saved);
    exit;

}

//save the players avatar
if(!empty($_POST['playerIdAvatar']) && !empty($_POST['avatarid'])) {

	$conf = array(
		'host' => 'xxx',
		'bank' => 'xxx',
		'user' => 'xxx',
		'pass' => 'xxx',
	);

	/*
	 * db class 
	 */
	require './inc/generalClasses/db.php';

	// connect to db
	$GLOBALS['db'] = new db($conf['host'], $conf['bank'], $conf['user'], $conf['pass'], 'mysql');
	//require_once './index.php';

	// get the data from the other players
	$params = array($_POST['avatarid'], $_POST['playerIdAvatar']);
	$query = "UPDATE `bsc_player` SET `bsc_player_avatar`=? WHERE `bsc_player_id`=?;";
	
	$res = $GLOBALS['db'] -> execute($query, $params);
	
	$saved = 0;
	
	if($res['rows'] > 0) {
		$saved = 1;
	}
    echo json_encode($saved);
    exit;

}


//set the detective now ready
if(!empty($_POST['currentgameid']) && !empty($_POST['loggedinplayerid']) && !empty($_POST['nowReady'])) {

	$conf = array(
		'host' => 'xxx',
		'bank' => 'xxx',
		'user' => 'xxx',
		'pass' => 'xxx',
	);

	/*
	 * db class 
	 */
	require './inc/generalClasses/db.php';

	// connect to db
	$GLOBALS['db'] = new db($conf['host'], $conf['bank'], $conf['user'], $conf['pass'], 'mysql');
	//require_once './index.php';

	// get the data from the other players
	$params = array($_POST['loggedinplayerid']);
	$query = "UPDATE `bsc_player` SET `bsc_player_role`=2 WHERE `bsc_player_id`=?;";
	
	$res = $GLOBALS['db'] -> execute($query, $params);
	
	$saved = 0;
	
	if($res['rows'] > 0) {
		$saved = 1;
	}
	
    echo json_encode($saved);
    exit;

}

//bandit leaves the gamelobby and cancels the match
if(!empty($_POST['inputGameId']) && !empty($_POST['hostleftgame'])) {

	$conf = array(
		'host' => 'xxx',
		'bank' => 'xxx',
		'user' => 'xxx',
		'pass' => 'xxx',
	);

	/*
	 * db class 
	 */
	require './inc/generalClasses/db.php';

	// connect to db
	$GLOBALS['db'] = new db($conf['host'], $conf['bank'], $conf['user'], $conf['pass'], 'mysql');
	//require_once './index.php';

	// get the data from the other players
	$params = array($_POST['inputGameId']);
	$query = "UPDATE `bsc_match` SET `bsc_match_started`=3 WHERE `bsc_match_id`=?;";
	$res = $GLOBALS['db'] -> execute($query, $params);
	
		/*
	* experimental to delete the player
	$resetMatchid = $_POST['inputGameId']- 1;
	$params = array($resetMatchid);
	$query0 = "ALTER TABLE bsc_match AUTO_INCREMENT = ?;";
	$res0 = $GLOBALS['db'] -> execute($query0, $params);
	

	
	// delete the palyer if he is not registered
	if(empty($_POST['loggedinplayerid'])) {
		
		$params5 = array($_POST['inputGameId']);
		$query5 = "SELECT bsc_location_id, bsc_player_id FROM bsc_location LEFT JOIN bsc_player ON `bsc_location_playerid` = bsc_player_id FROM bsc_location WHERE bsc_player_matchid = ?;";
		$res5 = $GLOBALS['db'] -> row($query5, $params5);
		
		// check if select was successful
		if($res5['rows'] > 0) {
			
			$resetlocationid = $res5['result']['bsc_location_id']- 1;
			$playerid = $res5['result']['bsc_player_id'];
			$resetplayeridid = $playerid- 1;
			
			$params2 = array($playerid);
			$query2 = "DELETE FROM bsc_player WHERE `bsc_player_id`=?;";
			$res2 = $GLOBALS['db'] -> execute($query2, $params2);
			
			$query3 = "DELETE FROM bsc_location WHERE `bsc_location_playerid`=?;";
			$res3 = $GLOBALS['db'] -> execute($query3, $params2);
			
			$params6 = array($resetplayeridid);
			$query6 = "ALTER TABLE bsc_player AUTO_INCREMENT = ?;";
			$res6 = $GLOBALS['db'] -> execute($query6, $params6);
			
			$params7 = array($resetlocationid);
			$query7 = "ALTER TABLE bsc_location AUTO_INCREMENT = ?;";
			$res7 = $GLOBALS['db'] -> execute($query7, $params7);
			  
		}
	}*/
	
	$saved = 1;
	
    echo json_encode($saved);
    exit;

}

// check wehther the bandit left the gamelobby without starting a match
if(!empty($_POST['inputGameId']) && !empty($_POST['checkleftgame'])) {

	$conf = array(
		'host' => 'xxx',
		'bank' => 'xxx',
		'user' => 'xxx',
		'pass' => 'xxx',
	);

	/*
	 * db class 
	 */
	require './inc/generalClasses/db.php';

	// connect to db
	$GLOBALS['db'] = new db($conf['host'], $conf['bank'], $conf['user'], $conf['pass'], 'mysql');
	//require_once './index.php';

	// get the data from the other players
	$params = array($_POST['inputGameId']);
	$query = "SELECT bsc_match_started FROM bsc_match WHERE bsc_match_id = ?;";
    $res = $GLOBALS['db'] -> row($query, $params);

	if($res['result']['bsc_match_started'] == 3) {
		$saved = 1;
	} else {
		$saved = 0;
	}
	
	/*
	* experimental to delete the player
	// delete the palyer if he is not registered
	if(empty($_POST['loggedinplayerid'])) {
		$params = array($_POST['loggedinplayerid']);
		$query2 = "DELETE FROM bsc_player WHERE `bsc_player_id`=?;";
		$res2 = $GLOBALS['db'] -> execute($query2, $params2);
		
		$query3 = "DELETE FROM bsc_location WHERE `bsc_location_playerid`=?;";
		$res3 = $GLOBALS['db'] -> execute($query3, $params2);
		
		$params5 = array($_POST['playerId']);
		$query5 = "SELECT bsc_location_id FROM bsc_location WHERE bsc_location_playerid  = ?;";
		$res5 = $GLOBALS['db'] -> row($query5, $params5);
		
		// check if select was successful
		if($res5['rows'] > 0) {
			
			$resetlocationid = $res5['result']['bsc_location_id']- 1;
			$params6 = array($resetlocationid);
			$query6 = "ALTER TABLE bsc_location AUTO_INCREMENT = ?;";
			$res6 = $GLOBALS['db'] -> execute($query6, $params6);
			  
		}
	}*/
	
    echo json_encode($saved);
    exit;

}

// check whether the player left the game
if(!empty($_POST['inputGameId']) && !empty($_POST['leaveTheGame']) && !empty($_POST['playerid'])) {
$conf = array(
		'host' => 'xxx',
		'bank' => 'xxx',
		'user' => 'xxx',
		'pass' => 'xxx',
	);

	/*
	 * db class 
	 */
	require './inc/generalClasses/db.php';

	// connect to db
	$GLOBALS['db'] = new db($conf['host'], $conf['bank'], $conf['user'], $conf['pass'], 'mysql');
	//require_once './index.php';	
	$params = array('0.000001', '0.000001', $_POST['playerid']);
	$query = "UPDATE `bsc_location` SET `bsc_location_lat`=?, `bsc_location_lon`=? WHERE `bsc_location_playerid`=?;";
	$res = $GLOBALS['db'] -> execute($query, $params);
	
	$saved = 1;
	
    echo json_encode($saved);
    exit;
}