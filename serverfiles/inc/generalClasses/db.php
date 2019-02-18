<?php

class db {

 /*
  * Config
  */

 protected $data = array(
  'query' => '',
  'result' => '',
  'info' => '',
  'rows' => '',
 );

 protected $conn;
 protected $result;
 protected $info;
 protected $dsn;

 /*
  * Connect
  */

 public function __construct($host, $bank, $user, $pass, $driver) {

  switch ($driver) {

   //case 'sqlsrv': $this -> dsn = array('sqlsrv:Server='.$host.';Database='.$bank, $user, $pass); break;
  // case 'odbc': $this -> dsn = array('odbc:Driver={SQL Server};Server='.$host.';Database='.$bank.';Uid='.$user.';Pwd='.$pass.';', '', ''); break;
   case 'mysql': $this -> dsn = array('mysql:host='.$host.';dbname='.$bank.';charset=utf8', $user, $pass); break;
 //  case 'pgsql': $this -> dsn = array('pgsql:host='.$host.';port=5432;dbname='.$bank.';', $user, $pass); break;
   
   default : $this -> dsn = array('', '', '');
  }

  try {
   $this -> conn = new PDO($this -> dsn[0], $this -> dsn[1], $this -> dsn[2]);
  } catch (PDOException $e) {
   die('Error!: '.$e -> getMessage());
  }
 }

 /* 
  * Execute
  */

 public function exe($query = '', $params = array()) {

  $this -> result = $this -> conn -> prepare($query);
  $this -> result -> execute($params);

  $this -> data['query'] = $query;
  $this -> data['info'] = $this -> result -> errorInfo();
  $this -> data['rows'] = $this -> result -> rowCount();
 }

 /*
  * All
  */

 public function all($query, $params = array()) {

  $this -> exe($query, $params);
  $this -> data['result'] = $this -> result -> fetchAll(PDO::FETCH_ASSOC);

  return $this -> data;
 }

 /*
  * Row
  */

 public function row($query, $params = array()) {

  $this -> exe($query, $params);
  $this -> data['result'] = $this -> result -> fetch(PDO::FETCH_ASSOC);

  return $this -> data;
 }

 /*
  * Update, Delete
  */

 public function execute($query, $params = array()) {

  $this -> exe($query, $params);
  $this -> data['result'] = '';

  return $this -> data;
 }
}