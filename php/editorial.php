<?php
	require_once('conexion.php');
	header('Content-Type: application/json');
	error_reporting(0);

	conectarse();

	$opc = $_POST['opc'];
	switch ($opc) {
		case 'guardar_editorial':
			guardar_editorial();
		break;

		case 'baja_editorial':
			baja_editorial();
		break;

		case 'modificar_editorial':
			modificar_editorial();	
		break;
	}

	function guardar_editorial(){
	    $name = trim($_POST['name']);
	 	$estado = 'ACTIVO';
	 	$respuesta = false;

	 	$sql = "select * from editoriales where nombre = '".$name."' ";
	 	$res = mysql_query($sql) or die(mysql_error());
	 	if (mysql_num_rows($res) > 0){
	 		$existe = true;
	 		$existeJson = array('existe' => $existe);
	 		print json_encode($existeJson);
	 	} else {
 		$consulta = "insert into editoriales(nombre,status) values('".$name."','".$estado."')";
	 		 //ejecutar consulta
		$resultado = mysql_query($consulta)or die(mysql_error());
 		
		if ($resultado == true){
			$respuesta = true;
			$salidaJSON = array('respuesta' => $respuesta );
			print json_encode($salidaJSON);
		} else {
			$respuesta = false;
			$salidaJSON = array('respuesta' => $respuesta );
			print json_encode($salidaJSON);
		}
		}
	}

	function baja_editorial(){
		$clave_editorial = trim($_POST['clave_editorial']);
	  	$status = 'BAJA';

	  	$consulta = "update editoriales set status ='".$status."'where clave_editorial = '".$clave_editorial."'";
	  		
	  	$resultado = mysql_query($consulta) or die(mysql_error());
		$respuesta = false;

			if ($resultado == true){
				$respuesta = true;
				$salidaJSON = array('respuesta' => $respuesta );
				print json_encode($salidaJSON);
			} else {
				echo "Ocurrio un Error";
			}
	}

	function modificar_editorial(){
		$codigo = trim($_POST['codigo']);
	  	$name = trim($_POST['name']);
	  	$status = trim($_POST['status']);

	  	$consulta = "update editoriales set clave_editorial = '".$codigo."',nombre = '".$name."',
	  	status = '".$status."' where clave_editorial = '".$codigo."' ";
	  		//EJECUTAMOS LA CONSULTA
	  	$resultado = mysql_query($consulta) or die(mysql_error());
		$respuesta = false;

		if ($resultado == true){
			$respuesta = true;
			$salidaJSON = array('respuesta' => $respuesta );
			print json_encode($salidaJSON);
		} else {
			echo "Ocurrio un Error";
		}
	}
?>