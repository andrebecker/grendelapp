<?php
class mailer {

	// send the confirmation mail
	public function sendMail($receiver, $restorePW = 0) {
	
		require_once './swiftmailer/lib/swift_required.php';

		// Create the Transport
		$transport = Swift_SmtpTransport::newInstance('smtp.strato.de', 465, 'ssl')
			-> setUsername('webmaster@platinpanda.com')
			-> setPassword('xxx')
		  ;

		// Create the Mailer using your created Transport
		$mailer = Swift_Mailer::newInstance($transport);

		if($restorePW == 0) {
		
			$message = 'Guten Tag,<br><br>
			Bitte best&auml;tigen Sie Ihre Registrierung bei der Bandit Grendel App, indem Sie auf den nachfolgenden Link klicken: <a href="https://platinpanda.com/bsc/activate/'.base64_encode($receiver).'">
			https://platinpanda.com/bsc/activate?activate='.base64_encode($receiver).'</a>
				Wenn Sie diese E-Mail irrt&uuml;mlich erhalten haben, So können Sie diese ignorieren.
				Ihr Antrag auf ein Benutzerkonto wird in diesem Fall nach 7 Tagen von uns gel&ouml;scht.<br><br>
				---<br>
				Impressum: <a href="https://platinpanda.com/bsc/imprint">https://platinpanda.com/bsc/imprint</a> <br>
				Datenschutz: <a href="https://platinpanda.com/bsc/privacy">https://platinpanda.com/bsc/privacy</a>';
			$subject = 'Bandit Grendel APP: Ihre Registrierung';
		
		} else {
			
			$message = 'Guten Tag,<br><br>
			Ihr Passwort ist: '.$restorePW.' .Hiermit k&ouml;nnen Sie sich in der Bandit Grendel App wieder einloggen.<br><br>
			---<br>
			Impressum: <a href="https://platinpanda.com/bsc/imprint">https://platinpanda.com/bsc/imprint</a> <br>
			Datenschutz: <a href="https://platinpanda.com/bsc/privacy">https://platinpanda.com/bsc/privacy</a>';
			$subject = 'Bandit Grendel APP: Passwort vergessen';
			
		}

		// Create a message
		$message = Swift_Message::newInstance($subject)
			->setFrom(array('webmaster@platinpanda.com'))
			->setTo($receiver)	
			->setCharset('UTF-8')
			->setEncoder(Swift_Encoding::get8BitEncoding())
			->setContentType('text/html')
			->setBody('<!DOCTYPE html><html>'.
				'<head><meta http-equiv="content-type" content="text/html; charset=utf-8"><title>Bandit Grendel App</title></head>'.
				'<body>' 
				.$message.
				'</body>'.
				'</html>',
				'text/html', 'utf-8')
			;
			
		// initialize result variable
		$result = false;
		
		// if email has been sended, set result to true 
		if($mailer->send($message)) {
		
			$result = true;
			
		}
		
		return $result;
		
	}
	
	// check after click on confirmation link
	public function my_custom_doubleoptinproof() {
		
			$uri = $_SERVER['REQUEST_URI'];
			$uri = explode("/",$uri);
			
			$mail = base64_decode($uri[3]);

			// get the data from the other players
			$params = array($mail);
			$query = "UPDATE `bsc_account` SET `bsc_account_active` = '1' WHERE `bsc_account_email` = ?;";
			
			$res = $GLOBALS['db'] -> execute($query, $params);

			$updateFinished = 0;
			
			// check if insertion was successful
			if($res['rows'] > 0) {
				$updateFinished = 1;
			}

			return $updateFinished;
		
	}

}