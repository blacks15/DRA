<?php

	require_once("conexion.php");
	header('Content-Type: application/json');
	error_reporting(0);

	conectarse();

	$opc = $_POST['opc'];

	switch ($opc) {
		case 'guardar_proveedor':
			guardar_proveedor();
		break;

		case 'baja_proveedor':
			baja_proveedor();
			break;
	}

	function guardar_proveedor(){
		$name = trim($_POST['name']);
		$contacto = trim($_POST['contacto']);
		$obs = trim($_POST['obs']);
		$dir = trim($_POST['dir']);
		$col = trim($_POST['col']);
		$tel = trim($_POST['tel']);
		$cel = trim($_POST['cel']);
		$email = trim($_POST['email']);
		$estado = 'ACTIVO';
				
		$consulta = "insert into proveedores (nombre,contacto,observaciones,direccion,colonia,telefono,celular,email,estado )values('".$name."','".$contacto."','".$obs."','".$dir."','".$col."','".$tel."','".$cel."','".$email."','".$estado."')";
		 //ejecutamos la consulta
		  $resultado = mysql_query($consulta)or die(mysql_error());
		  $respuesta = false;
		  $total = mysql_num_rows($resultado);
		  echo $total;

		if ($resultado) {
			$respuesta = true;
			$salidaJSON = array('respuesta' => $respuesta );
			print json_encode($salidaJSON);
		} else {
			echo "Ocurrio un Error";
		}
	}
		

	function baja_proveedor(){
  		$clave_proveedor = trim($_POST['clave_proveedor']);
  		$estado = 'Baja';

  		$consulta = "update proveedores set estado='".$estado."' where clave_proveedor = '".$clave_proveedor."'";
  		
  		$resultado = mysql_query($consulta) or die(mysql_error());
		$respuesta = false;

		if ($resultado){
			$respuesta = true;
			$salidaJSON = array('respuesta' => $respuesta );
			print json_encode($salidaJSON);
		}else{
			echo "Ocurrio un Error";
		}
  	}
?>