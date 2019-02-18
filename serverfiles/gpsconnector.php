<?php
header("Access-Control-Allow-Origin: *");

// save the new position
if(!empty($_POST['time']) && !empty($_POST['longitude']) && !empty($_POST['latitude']) && !empty($_POST['userid']) && isset($_POST['flareLon']) && isset($_POST['flareLat'])) {

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
	
	$params = array($_POST['time'], $_POST['latitude'], $_POST['longitude'], $_POST['flareLon'], $_POST['flareLat'], $_POST['userid']);
	$query = "UPDATE bsc_location SET bsc_location_time=?, bsc_location_lat=?, bsc_location_lon=?, bsc_location_flare_lon=?, bsc_location_flare_lat=? WHERE bsc_location_playerid=?;";
	$res = $GLOBALS['db'] -> execute($query, $params);
	
	$updateFinished = 'n';

	// check if insertion was successful
	if($res['rows'] > 0) {
		
		$updateFinished = 'y';
		  
	}

    echo json_encode($updateFinished);
    exit;

}

// old function to get the location data
if(!empty($_POST['userid']) && !empty($_POST['nottheactive'])) {

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
	$params1 = array($_POST['userid']);
	$query1 = "SELECT bsc_location_lat, bsc_location_lon FROM bsc_location WHERE bsc_location_playerid=?;";
	$res1 = $GLOBALS['db'] -> all($query1, $params1);
	
	$latArr = array();
	$lonArr = array();

    for($i=0;$i<$res1['rows'];$i++) {
		
		$latArr[$i] = $res1['result'][$i]['bsc_location_lat'];
		$lonArr[$i] = $res1['result'][$i]['bsc_location_lon'];

	}
		
	$callResultList = array($latArr, $lonArr);
	

    echo json_encode($callResultList);
    exit;

}

// get the number of players
if(!empty($_POST['playerCountMatchid'])) {

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
	$params1 = array($_POST['playerCountMatchid']);
	$query1 = "SELECT COUNT(bsc_player_id) AS playercount FROM bsc_player WHERE bsc_player_matchid = ?;";
	$res1 = $GLOBALS['db'] -> row($query1, $params1);
	
	$playerCount = 0;

	// check if insertion was successful
	if($res1['rows'] > 0) {
		
		$playerCount = $res1['result']['playercount'];
		  
	}
	

    echo json_encode($playerCount);
    exit;

}

// get the location data of the playyers and their flare gun data
if(!empty($_POST['getplayerids'])) {

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
	$params1 = array($_POST['getplayerids']);
	$query1 = "SELECT bsc_location_lat, bsc_location_lon, bsc_player_id, bsc_player_role, bsc_location_flare_lon, bsc_location_flare_lat FROM bsc_location LEFT JOIN bsc_player ON bsc_location_playerid = bsc_player_id WHERE bsc_player_matchid = ?;";
	$res1 = $GLOBALS['db'] -> all($query1, $params1);
	
	$latArr = array();
	$lonArr = array();
	$idArr = array();
	$roleArr = array();
	$flareLonArr = array();
	$flareLatArr = array();

    for($i=0;$i<$res1['rows'];$i++) {
		
		$latArr[$i] = $res1['result'][$i]['bsc_location_lat'];
		$lonArr[$i] = $res1['result'][$i]['bsc_location_lon'];
		$idArr[$i] = $res1['result'][$i]['bsc_player_id'];
		$roleArr[$i] = $res1['result'][$i]['bsc_player_role'];
		$flareLonArr[$i] = $res1['result'][$i]['bsc_location_flare_lon'];
		$flareLatArr[$i] = $res1['result'][$i]['bsc_location_flare_lat'];

	}
		
	$callResultList = array($latArr, $lonArr, $idArr, $roleArr, $flareLonArr, $flareLatArr);
	

    echo json_encode($callResultList);
    exit;

}

// check if some player won
if(!empty($_POST['checkForWin']) && !empty($_POST['matchid'])) {

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

	// get the data from the other players
	$params1 = array($_POST['matchid']);
	//$query1 = "SELECT bsc_location_lat, bsc_location_lon, bsc_player_role FROM bsc_location LEFT JOIN bsc_player ON bsc_location_playerid = bsc_player_id WHERE bsc_player_matchid = ?;";
	$query1 = "SELECT DISTINCT bsc_location_lat, bsc_location_lon, bsc_player_role, bsc_match_started, bsc_location_disguise FROM bsc_location LEFT JOIN bsc_player ON bsc_location_playerid = bsc_player_id LEFT JOIN 
	bsc_match ON bsc_player_matchid = bsc_match_id WHERE bsc_player_matchid = ?;";
	$res1 = $GLOBALS['db'] -> all($query1, $params1);
	
	$latArr = array();
	$lonArr = array();
	$roleArr = array();
	$disguiseArr = array();
	$resultArr = array();
	
	for($i=0;$i<$res1['rows'];$i++) {
		
		$latArr[$i] = $res1['result'][$i]['bsc_location_lat'];
		$lonArr[$i] = $res1['result'][$i]['bsc_location_lon'];
		$roleArr[$i] = $res1['result'][$i]['bsc_player_role'];
		$resultArr[$i] = $res1['result'][$i]['bsc_match_started'];
		$disguiseArr[$i] = $res1['result'][$i]['bsc_location_disguise'];

	}
	
	$hasacatch = 'n';
	
	
	// if bandit is in disguise, do not give info about the bandit
	$temp = array_filter($disguiseArr, function($value){
		return $value > 0;
	});
	if (count($temp) >= 1) { // > 1 because of minimal delay
		
		$hasacatch = 'noinfo';

	} else {
	
		$latDiff = 1;						
		$lonDiff = 1;
		for($i=0;$i<$res1['rows'];$i++) {
			
			if($i > 0) {
				$j = $i - 1;
				$latDiff = abs($latArr[$i] - $latArr[$j]);
				$lonDiff = abs($lonArr[$i] - $lonArr[$j]);
				
				if($roleArr[$i] == 1 || $roleArr[$j] == 1) { // check only if one of the players is bandit
					
					if(($latDiff <= 0.0002 && $lonDiff <= 0.0002)  || ($resultArr[$i] == 2)){ // check for catch
						if((($latArr[$i] != '0.000001') && ($latArr[$j] != '0.000001')) && (($lonArr[$i] != '0.000001') && ($lonArr[$j] != '0.000001'))) { // check whether it was not a sec ago resettet
							if($_POST['formattedVision'] > 6 && $_POST['formattedVision'] < 18) {
								$hasacatch = 'y';
							} else {
								if($latDiff <= 0.00016 && $lonDiff <= 0.00016) { // 20% less vision at night
									$hasacatch = 'y';
								}
							}
						}
					} else if($latDiff > 0.0002 && $lonDiff > 0.0002 && $latDiff < 0.00099 && $lonDiff < 0.00099) { // check for shadow
						$hasacatch = 's';
					} else if($latDiff >= 0.00099 && $lonDiff >= 0.00099 && $latDiff < 0.19 && $lonDiff < 0.19) { // check for steps (audio)
						$hasacatch = 'a';
					} else { // check for hints
					
						// Multiply with factors to get the distance -> see: https://www.kompf.de/gps/distcalc.html
						$latDiff = $latDiff * 71.5;
						$lonDiff = $lonDiff * 111.3;
					
						if($latDiff > $lonDiff) { // multiply by 2 because there are 360 latitudes but only 180 logitudes and numbers below one have to be doubled for this
							
							if($roleArr[$i] == 1) {
								
								if($latArr[$i] < $latArr[$j]) {
									$hasacatch = 'south';
								} else if($latArr[$i] > $latArr[$j]) {
									$hasacatch = 'north';
								} else {
									$hasacatch = 'noinfo';
								}
								
							} else {
								
								if($latArr[$i] < $latArr[$j]) {
									$hasacatch = 'north';
								} else if($latArr[$i] > $latArr[$j]) {
									$hasacatch = 'south';
								} else {
									$hasacatch = 'noinfo';
								}
								
							}
							
						} else if($latDiff < $lonDiff) {
							
							if($roleArr[$i] == 1) {
								
								if($lonArr[$i] > $lonArr[$j]) {
									$hasacatch = 'west';
								} else if($lonArr[$i] < $lonArr[$j]) {
									$hasacatch = 'east';
								} else {
									$hasacatch = 'noinfo';
								}
								
							} else {
								
								if($lonArr[$i] < $lonArr[$j]) {
									$hasacatch = 'east';
								} else if($lonArr[$i] > $lonArr[$j]) {
									$hasacatch = 'west';
								} else {
									$hasacatch = 'noinfo';
								}
								
							}
							
						}
						
					}
				
				}

			}

		}
	
	}
	
	if(in_array(2, $resultArr)) {// if the game was finished but some cachingbug lead to the game not reporting it
		$hasacatch = 'y';
	}

    echo json_encode($hasacatch);
    exit;

}

// this function checks for the gamemode (with roads or not - currently not implemented)
if(!empty($_POST['checkForGamemode']) && !empty($_POST['matchid'])) {

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
	$params1 = array($_POST['matchid']);
	$query1 = "SELECT bsc_match_mode FROM bsc_match WHERE bsc_match_id = ?;";
	$res1 = $GLOBALS['db'] -> row($query1, $params1);
	
	$gamemode = 0;

	// check if insertion was successful
	if($res1['rows'] > 0) {
		
		$gamemode = $res1['result']['bsc_match_mode'];
		  
	}
	
    echo json_encode($gamemode);
    exit;

}

// save the result and reset the gamedate
if(!empty($_POST['playerId']) && !empty($_POST['matchid']) && isset($_POST['rating']) && !empty($_POST['playerrole'])) {

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
	$params2 = array($_POST['matchid'], $_POST['playerId'], $_POST['rating'], $_POST['playerrole']);
	$query2 = "INSERT INTO bsc_result(bsc_result_matchid, bsc_result_playerid, bsc_result_win, bsc_result_role) VALUES(?, ?, ?, ?);";
	$res2 = $GLOBALS['db'] -> execute($query2, $params2);
	
	// reset the gamedate to prevent wrong data in the following match
	$params = array('0.000001', '0.000001', $_POST['playerId']);
	$query = "UPDATE `bsc_location` SET `bsc_location_lat`=?, `bsc_location_lon`=? WHERE `bsc_location_playerid`=?;";
	$res = $GLOBALS['db'] -> execute($query, $params);
	
	// set the game status to finished (2)
	$params0 = array($_POST['matchid']);
	$query0 = "UPDATE `bsc_match` SET `bsc_match_started`=2 WHERE `bsc_match_id`=?;";
	$res0 = $GLOBALS['db'] -> execute($query0, $params0);
	
	$saved = 1;
    echo json_encode($saved);
    exit;

}

// save the info that the player is ready
if(!empty($_POST['playerready']) && !empty($_POST['matchidready'])) {

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
	var_export($_POST['matchidready']);
	var_export($_POST['playerready']);
	$params = array($_POST['matchidready']);
	$query = "UPDATE bsc_ready SET bsc_ready_playercount= bsc_ready_playercount + 1 WHERE bsc_ready_gameid=?;";
	$res = $GLOBALS['db'] -> execute($query, $params);
	
	$updateFinished = 'n';

	// check if insertion was successful
	if($res['rows'] > 0) {
		
		$updateFinished = 'y';
		  
	}

    echo json_encode($updateFinished);
    exit;

}

// check if all players are ready
if(isset($_POST['checkallready']) && !empty($_POST['matchidready'])) {

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
	
	$params1 = array($_POST['matchidready'], $_POST['matchidready']);
	$query1 = "SELECT bsc_ready_gameid FROM bsc_ready WHERE bsc_ready_gameid  = ? AND bsc_ready_playercount = (SELECT COUNT(bsc_player_id) AS playercount FROM bsc_player WHERE bsc_player_matchid = ?);";
	$res1 = $GLOBALS['db'] -> row($query1, $params1);
	
	$ready = 0;

	// check if select was successful
	if($res1['rows'] > 0) {
		
		$ready = 1;
		  
	}

    echo json_encode($ready);
    exit;

}

// update the disguise without playermovement
if(!empty($_POST['userid']) &&  isset($_POST['disguise']) && !empty($_POST['uopdateDisg'])) {

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

	$params = array($_POST['disguise'], $_POST['userid']);
	$query = "UPDATE bsc_location SET bsc_location_disguise=? WHERE bsc_location_playerid=?;";
	$res = $GLOBALS['db'] -> execute($query, $params);
	
	$updateFinished = 'n';

	// check if insertion was successful
	if($res['rows'] > 0) {
		
		$updateFinished = 'y';
		  
	}

    echo json_encode($updateFinished);
    exit;

}