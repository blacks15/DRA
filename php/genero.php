<?php
	require_once("conexion.php");
	header('Content-type: application/json');
	//error_reporting(0);
	
	conectarse();

	$opc = $_POST['opc'];

	switch ($opc){
		case 'guardar_genero':
			guardar_genero();
		break;
	}

	function guardar_genero(){
		$name = trim($_POST['name']); 
		$consulta = "insert into generos (nombre) values('".$name."')";
					//ejecutar consulta
		$resultado = mysql_query($consulta) or die(mysql_error());
		$respuesta = false;
		if ($resultado == true) {
			$respuesta = true;
			$salidaJSON = array('respuesta' => $respuesta );
			print(json_encode($salidaJSON));
		} else {
			echo "Ocurrio un Error";
		}

  }
?>