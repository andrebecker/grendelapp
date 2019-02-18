<?php
ini_set('display_errors',1);
ini_set('display_startup_errors',1);

error_reporting(-1);

header('P3P: CP=”NOI ADM DEV PSAi COM NAV OUR OTRo STP IND DEM”');

header('Set-Cookie: SIDNAME=ronty; path=/; secure');

header('Cache-Control: no-cache');

header('Pragma: no-cache');

session_start();

/*
 * Config 
 */
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

/*
 * Regex Replaces
 */
$GLOBALS['xss'] = array(

	'in' => array(

		'/&lt;(script[^>]*)&gt;/i' => '<$1>',
		'/&lt;\/(script)&gt;/i' => '<\/$1>',

		'/on([^=]+)=&quot;([^"]*)&quot;/i' => 'on$1="$2"',
		   
		'/&quot;(javascript:[^"]*)&quot;/i' => '"$1"',
	),

	'out' => array(

		'/<(script[^>]*)>/i' => '&lt;$1&gt;',
		'/<\/(script)>/i' => '&lt;/$1&gt;',

		'/on([^=]+)="([^"]*)"/i' => 'on$1=&quot;$2&quot;',
		'/on([^=]+)=\'([^"]*)\'/i' => 'on$1=&quot;$2&quot;',

		'/"(javascript:[^"]*)"/i' => '&quot;$1&quot;',
		'/\'(javascript:[^"]*)\'/i' => '&quot;$1&quot;',
	),
);

// read -> http://stackoverflow.com/questions/16388959/url-rewriting-with-php
define( 'INCLUDE_DIR', dirname( __FILE__ ) . '/inc/' );

$rules = array( 
    'imprint'   => "/imprint",    // '/impressum'
    'activate'   => "/activate/(?'text'[^/]+)",    // '/activate/some-text'
    'privacy'   => "/privacy",    // '/datenschutz'
    'main'      => "/"                                      // '/'
);

$uri = rtrim( dirname($_SERVER["SCRIPT_NAME"]), '/' );
$uri = '/' . trim( str_replace( $uri, '', $_SERVER['REQUEST_URI'] ), '/' );
$uri = urldecode( $uri );

foreach ( $rules as $action => $rule ) {
    if ( preg_match( '~^'.$rule.'$~i', $uri, $params ) ) {
        /* now you know the action and parameters so you can 
         * include appropriate template file ( or proceed in some other way )
         */

		include( INCLUDE_DIR . 'output/out_'. $action . '.php' );

        // exit to avoid the 404 message 
        exit();
    }
}

// nothing is found so handle the 404 error
include( INCLUDE_DIR . 'output/out_404.php' );