<?php
	header('Content-Type: application/json');
error_reporting(0);
session_start();
$respuesta = false;
if($_SESSION['autentificado']!='si'){
$respuesta = true;
}
$salidaJSON = array('respuesta'=>$respuesta);
print(json_encode($salidaJSON));
?>