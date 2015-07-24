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

		case 'modificar_proveedor':
			modificar_proveedor();
		break;
	}

	function guardar_proveedor(){

		parse_str($_POST["cadena"], $_POST);

		$name = trim($_POST['nombre']);
		$contacto = trim($_POST['c_name']);
		$obs = trim($_POST['obs']);
		$calle = trim($_POST['calle']);
		$numi = trim($_POST['numi']);
		$nume = trim($_POST['nume']);
		$col = trim($_POST['colonia']);
		$city = trim($_POST['city']);
		$edo = trim($_POST['edo']);
		$tel = trim($_POST['telefono']);
		$cel = trim($_POST['celular']);
		$email = trim($_POST['correo']);
		$estado = 'ACTIVO';
				
		$consulta = "insert into proveedores (nombre,contacto,observaciones,calle,num_ext,num_int,colonia,ciudad,estado,telefono,celular,email,status )
		values('".$name."','".$contacto."','".$obs."','".$calle."','".$nume."','".$numi."','".$col."','".$city."','".$edo."','".$tel."','".$cel."','".$email."','".$estado."')";
		 //ejecutamos la consulta
		  $resultado = mysql_query($consulta)or die(mysql_error());
		  $respuesta = false;
		  
		if ($resultado == true) {
			$respuesta = true;
			$salidaJSON = array('respuesta' => $respuesta );
			print json_encode($salidaJSON);
		} else {
			echo "Ocurrio un Error";
		}
	}
		

	function baja_proveedor(){
  		$clave_proveedor = trim($_POST['clave_proveedor']);
  		$estado = 'BAJA';

  		$consulta = "update proveedores set status='".$estado."' where clave_proveedor = '".$clave_proveedor."'";
  		
  		$resultado = mysql_query($consulta) or die(mysql_error());
		$respuesta = false;

		if ($resultado == true){
			$respuesta = true;
			$salidaJSON = array('respuesta' => $respuesta );
			print json_encode($salidaJSON);
		}else{
			echo "Ocurrio un Error";
		}
  	}

  	function modificar_proveedor(){

  		parse_str($_POST["cadena"], $_POST);

  		$codigo = trim($_POST['codigo']);
		$name = trim($_POST['nombre']);
		$contacto = trim($_POST['c_name']);
		$obs = trim($_POST['obs']);
		$calle = trim($_POST['calle']);
		$numi = trim($_POST['numi']);
		$nume = trim($_POST['nume']);
		$col = trim($_POST['colonia']);
		$city = trim($_POST['city']);
		$edo = trim($_POST['edo']);
		$tel = trim($_POST['telefono']);
		$cel = trim($_POST['celular']);
		$email = trim($_POST['correo']);
		$estado = 'ACTIVO';
				
		$consulta = "update proveedores set clave_proveedor = '".$codigo."',nombre = '".$name."',
		contacto = '".$contacto."',observaciones = '".$obs."',calle = '".$calle."',num_ext = '".$nume."',
		num_int = '".$numi."',colonia = '".$col."',ciudad = '".$city."',estado = '".$edo."',
		telefono = '".$tel."',celular = '".$cel."',email = '".$email."',status = '".$estado."'
		where clave_proveedor = '".$codigo."' ";
		 	//EJECUTAMOS LA CONSULTA
		$resultado = mysql_query($consulta)or die(mysql_error());
		$respuesta = false;
		  
		if ($resultado == true) {
			$respuesta = true;
			$salidaJSON = array('respuesta' => $respuesta );
			print json_encode($salidaJSON);
		} else {
			echo "Ocurrio un Error";
		}
  	}
?>