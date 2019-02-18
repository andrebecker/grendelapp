<?php

// initialize htmltemplate	
require_once './inc/generalClasses/htmltemplate.php';
$html = new HTMLtemplate();	
$htmlTemplate = array();


$htmlTemplate['title'] = 'Impressum | Bsc-Projekt';
$htmlTemplate['description'] = 'Das Impressum von Andres Bsc-Projekt.';
$htmlTemplate['active'] = 'imprint';

$htmlTemplate['content'] = '<div class="hgroup"><h1>Impressum</h1></div>
	<div id="imprint">
		<p><strong><u>Impressum</u></strong></p><p><strong>Angaben gem&auml;&szlig; § 5 TMG:</strong></p><p>
		Andr&eacute; Becker - Andr&eacute; Becker<br>Vivaldistra&szlig;e, 4<br>37154 Northeim</p><p><strong>Kontakt:</strong><br>
		E-Mail: <a href="mailto:beckeran@uni-hildesheim.de">beckeran@uni-hildesheim.de</a><br>Tel.: 017691462448<br>Fax: - 
		Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie hier finden http://ec.europa.eu/consumers/odr/.
		Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht bereit.</p>
	</div>';
$html->createHTMLtemplate($htmlTemplate['title'], $htmlTemplate['description'], $htmlTemplate['active'], $htmlTemplate['content']);