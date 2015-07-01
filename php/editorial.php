<?php
	require_once('conexion.php');
	header('Content-Type: application/json');
	error_reporting(0);

	conectarse();

	$opc = $_POST['opc'];
	switch ($opc) 
	{
		case 'guardar_editorial':
			guardar_editorial();
		break;
	}

	function guardar_editorial()
	{
	    $name = trim($_POST['name']);
	 	$estado = 'Activo';
	 	
 		$consulta = "insert into editoriales(nombre,estado) values('".$name."','".$estado."')";
	 		 //ejecutar consulta
		 $resultado = mysql_query($consulta)or die(mysql_error());
		 $respuesta = false;
 		
		if ($resultado == true{
			$respuesta = true;
			$salidaJSON = array('respuesta' => $respuesta );
			print json_encode($salidaJSON);
		} else {
			echo "Ocurrio un Error";
		}
		
	}
?>