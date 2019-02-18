<?php

class Survey {
	
	// save the ratings
	public function saveRatings($questionId, $answer, $role) {
	
		require_once './index.php';
  
		$params = array($questionId, $answer, $role);
		
		$query = "INSERT INTO `bsc_rating`(`bsc_rating_question_id`, `bsc_rating_answer`, `bsc_rating_role`) VALUES (?,?,?);";
		$res = $GLOBALS['db'] -> execute($query, $params);
		
		$succes = false;

		// check if creation was successful
		if($res['rows']>0) {
		
			$succes = true;
		  
		}
		
		return $succes;
    
	}
	
	// show the average ratings by all persons
	public function showAvgAll($questionId) {
	
		require_once './index.php';

		$params = array($questionId);
		
		if (($questionId == 7) || ($questionId == 8) || ($questionId == 9)) {
			
			// search for the text answers
			$query = "SELECT DISTINCT bsc_rating_answer FROM bsc_rating NATURAL JOIN bsc_question WHERE bsc_rating_question_id = ?;";
			$res = $GLOBALS['db'] -> all($query, $params);

			$rating = array();

			for($i=0;$i<$res['rows'];$i++) {
			
				$rating[$i] = $res['result'][$i]['bsc_rating_answer'];

			}
			
		} else {
			$query = "SELECT AVG (bsc_rating_answer) FROM bsc_rating NATURAL JOIN bsc_question WHERE bsc_rating_question_id = ?;";
			$res = $GLOBALS['db'] -> row($query, $params);

			$rating = 0;

			if($res['rows'] > 0) {
			
				$rating = $res['result']['AVG (bsc_rating_answer)'];

			}
		
		}

        return $rating;
    
	}
	
	// show the average ratings by all detectives
	public function showAvgPerRole($questionId, $role) {
	
		require_once './index.php';

		$params = array($questionId, $role);
		
		if (($questionId == 7) || ($questionId == 8) || ($questionId == 9)) {
			
			// search for the text answers
			$query = "SELECT DISTINCT bsc_rating_answer FROM bsc_rating NATURAL JOIN bsc_question WHERE bsc_rating_question_id = ? AND bsc_rating_role = ?;";
			$res = $GLOBALS['db'] -> all($query, $params);

			$rating = array();

			for($i=0;$i<$res['rows'];$i++) {
			
				$rating[$i] = $res['result'][$i]['bsc_rating_answer'];

			}
			
		} else {
		
			// search for the numeric values
			$query = "SELECT AVG (bsc_rating_answer) FROM bsc_rating NATURAL JOIN bsc_question WHERE bsc_rating_question_id = ? AND bsc_rating_role = ?;";
			$res = $GLOBALS['db'] -> row($query, $params);

			$rating = 0;

			if($res['rows'] > 0) {
			
				$rating = $res['result']['AVG (bsc_rating_answer)'];

			}
		
		}

        return $rating;
    
	}
	
	// show the total number of players
	public function countPlayers($sex) {
	
		require_once './index.php';
		
		if($sex == 'a') {
			// search for all sex
			$params = array();
			$query = "SELECT COUNT(bsc_rating_question_id) FROM bsc_rating WHERE `bsc_rating_question_id`= 11;";
		} else if ($sex == 'm' || $sex == 'w') {
			// search for only per sex
			$params = array($sex);
			$query = "SELECT COUNT(bsc_rating_question_id) FROM bsc_rating WHERE `bsc_rating_question_id`= 11 AND bsc_rating_answer = ?;";
		} else {
			// if we want to know how many use which medium for communication
			$params = array($sex);
			$query = "SELECT COUNT(bsc_rating_question_id) FROM bsc_rating WHERE `bsc_rating_question_id`= 6 AND bsc_rating_answer = ?;";
		}
		
        $res = $GLOBALS['db'] -> row($query, $params);

		$rating = 0;

        if($res['rows'] > 0) {
		
			$rating = $res['result']['COUNT(bsc_rating_question_id)'];

		}

        return $rating;
    
	}

}