<?php
	require_once("conexion.php");
	header('Content-type: application/json');
	error_reporting(0);
	
	conectarse();

	$opc = $_POST['opc'];

	switch ($opc){
		case 'guardar_genero':
			guardar_genero();
		break;

		case 'baja_genero':
			baja_genero();
		break;

		case 'modificar_genero':
			modificar_genero();
		break;
	}

	function guardar_genero(){
		$name = trim($_POST['name']); 
		$estado = 'ACTIVO';
		$respuesta = false;
		
		$sql = "select * from generos where nombre_genero = '".$name."' ";
	 	$res = mysql_query($sql) or die(mysql_error());
	 	
	 	if (mysql_num_rows($res) > 0){
	 		$existe = true;
	 		$existeJson = array('existe' => $existe);
	 		print (json_encode($existeJson));
	 	} else {
			//ejecutar consulta
			$consulta = "insert into generos (nombre_genero,status) values('".$name."','".$estado."')";
	 	
			$resultado = mysql_query($consulta) or die(mysql_error());

			if ($resultado == true) {
				$respuesta = true;
				$salidaJSON = array('respuesta' => $respuesta );
				print(json_encode($salidaJSON));
			} else {
				echo "Ocurrio un Error";
			}
		}

  }
  function baja_genero(){
  	$clave_genero = trim($_POST['clave_genero']);
  	$status = 'BAJA';

  	$consulta = "update generos set status ='".$status."'where clave_genero = '".$clave_genero."'";
  		
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

  function modificar_genero(){
  	$codigo = trim($_POST['codigo']);
  	$name = trim($_POST['name']);
  	$status = trim($_POST['status']);

  	$consulta = "update generos set clave_genero = '".$codigo."',nombre_genero = '".$name."',
  	status = '".$status."' where clave_genero = '".$codigo."' ";
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