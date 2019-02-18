<?php

// initialize htmltemplate	
require_once './inc/generalClasses/htmltemplate.php';
$html = new HTMLtemplate();	
$htmlTemplate = array();


$htmlTemplate['title'] = 'Aktivieren | Bandit Grendel';
$htmlTemplate['description'] = 'Aktiviere die Accounts von Bandit Grendel.';
$htmlTemplate['active'] = 'activate';

require './mailer.php';
$mailer = new Mailer();

$activationSuccessful = false;
$activationSuccessful = $mailer -> my_custom_doubleoptinproof();
		
if($activationSuccessful == 1) {

	$htmlTemplate['content'] = '<div class="hgroup"><h1>Ihr Account wurde aktiviert!</h1></div>
	<div id="imprint">
		Ihr Account wurde erfolgreich aktiviert. Sie k&ouml;nnen sich nun in Ihrem Account in der Bandit Grendel APP einloggen.
	</div>';
	
} else {
	
	$htmlTemplate['content'] = '<div class="hgroup"><h1>Ihr Account wurde nicht aktiviert!</h1></div>
	<div id="imprint">
		Es gab ein Problem. Ihr Account wurde leider nicht aktiviert. Bitte versuchen Sie es sp&auml;ter noch einmal.
	</div>';
	
}
$html->createHTMLtemplate($htmlTemplate['title'], $htmlTemplate['description'], $htmlTemplate['active'], $htmlTemplate['content']);