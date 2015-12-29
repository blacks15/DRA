<?php 
	header('Content-Type: application/json');
	error_reporting(0);
	require_once('conexion.php');
	conectarse();

	$opc = $_POST['opc'];
	switch ($opc) {
		case 'guardar_retiro':
			guardar_retiro();
		break;

		case 'modificar_retiro':
			modificar_retiro();
		break;
	}
	function modificar_retiro(){
		parse_str($_POST["cadena"], $_POST);
		$codigo = trim($_POST['codigo']);
		$date = trim($_POST['date']);
		$fecha = date('Y-m-d',strtotime($date));
		$user = trim($_POST['usuario']);
		$retiro = trim($_POST['retiro']);
		$obs = trim($_POST['obs']);

		$sql = "update retiros set id_retiro = '".$codigo."',fecha = '".$fecha."',empleado = '".$user."',
		 retiro = '".$retiro."',observacion = '".$obs."' where id_retiro = '".$codigo."' ";
		$resultado = mysql_query($sql) or die(mysql_error());
		if ($resultado == true) {
			$respuesta = true;
			$salidaJSON = array('respuesta' => $respuesta );
			print json_encode($salidaJSON);
		}
	}

	function guardar_retiro(){
		//RECIBIMOS EL SERIALIZE() Y LO ASIGNAMOS A VARIABLES
		parse_str($_POST["cadena"], $_POST);
		$date = trim($_POST['date']);
		$fecha = date('Y-m-d',strtotime($date));
		$user = trim($_POST['usuario']);
		$retiro = trim($_POST['retiro']);
		$obs = trim($_POST['obs']);

		$sql = "insert into retiros (fecha,empleado,retiro,observacion) 
				values('".$fecha."','".$user."','".$retiro."','".$obs."') ";
		$resultado = mysql_query($sql) or die(mysql_error());
		if ($resultado == true) {
			$respuesta = true;
				$salidaJSON = array('respuesta' => $respuesta );
				print json_encode($salidaJSON);
			} else {
				$fallo = true;
				$falloJSON = array('fallo' => $fallo);
				print(json_encode($falloJSON));
			}
	}
 ?>