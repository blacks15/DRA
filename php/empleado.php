<?php 

	require_once('conexion.php');
	header('Content-Type: application/json');
	error_reporting(0);
	conectarse();

	$opc = $_POST['opc'];

	switch ($opc) {
		case 'guardar_empleado':
			guardar_empleado();
		break;

		case 'baja_empleado':
			baja_empleado();
		break;

		case 'modificar_empleado':
			modificar_empleado();
		break;
	}

	function guardar_empleado(){

		parse_str($_POST["cadena"], $_POST);
		
		$nombre = trim($_POST['nombre']);
		$apaterno = trim($_POST['apaterno']);
		$amaterno = trim($_POST['amaterno']);		
		$calle = trim($_POST['calle']);
		$num = trim($_POST['num']);
		$col = trim($_POST['colonia']);
		$city = trim($_POST['ciudad']);
		$edo = trim($_POST['edo']);
		$tel = trim($_POST['telefono']);
		$cel = trim($_POST['celular']);
		$sueldo = trim($_POST['sueldo']);
		$tipo = trim($_POST['tipo']);
		$estado = 'ACTIVO';
		$respuesta = false;

			//COMPROBAMOS SI EL EMPLEAOD EXISTE
		$sql = "select * from empleados where nombre = '".$nombre."' and apellido_paterno = '".$apaterno."'
				and apellido_materno = '".$amaterno."' ";
		$res = mysql_query($sql) or die(mysql_error());
		if (mysql_num_rows($res) > 0) {
			$existe = true;
			$existeJSON = array('existe' => $existe);
			print(json_encode($existeJSON));
		} else {
				//REALIZAMOS LA CONSULTA
			$consulta = "insert into empleados (nombre,apellido_paterno,apellido_materno,calle,numero,
			colonia,ciudad,estado,telefono,celular,sueldo,tipo,status) values ('".$nombre."',
			'".$apaterno."','".$amaterno."','".$calle."','".$num."','".$col."','".$city."','".$edo."',
			'".$tel."','".$cel."','".$sueldo."','".$tipo."','".$estado."')";
				//EJECUTAMOS LA CONSULTA
			$resultado = mysql_query($consulta) or die(mysql_error());

			if ($resultado == true){
				$respuesta = true;
				$salidaJSON = array('respuesta' => $respuesta );
				print json_encode($salidaJSON);
			} else {
				$fallo = true;
				$falloJSON = array('fallo' => $fallo);
				print(json_encode($falloJSON));
			}
		}
	}

	function baja_empleado(){
		$matricula = trim($_POST['matricula']);
  		$estado = 'BAJA';

  		$consulta = "update empleados set status='".$estado."'where matricula = '".$matricula."'";
  		
  		$resultado = mysql_query($consulta) or die(mysql_error());
		$respuesta = false;

		if ($resultado == true){
			$respuesta = true;
			$salidaJSON = array('respuesta' => $respuesta );
			print json_encode($salidaJSON);
		} else {
			$fallo = true;
			$falloJSON = array('fallo' => $fallo);
			print(json_encode($falloJSON));
		}
	}

	function modificar_empleado(){
		parse_str($_POST["cadena"], $_POST);

		$codigo = trim($_POST['codigo']);
		$nombre = trim($_POST['nombre']);
		$apaterno = trim($_POST['apaterno']);
		$amaterno = trim($_POST['amaterno']);		
		$calle = trim($_POST['calle']);
		$num = trim($_POST['num']);
		$col = trim($_POST['colonia']);
		$city = trim($_POST['ciudad']);
		$edo = trim($_POST['edo']);
		$tel = trim($_POST['telefono']);
		$cel = trim($_POST['celular']);
		$sueldo = trim($_POST['sueldo']);
		$tipo = trim($_POST['tipo']);
		$estado = trim($_POST['status']);
		$respuesta = false;

		$consulta = "update empleados set matricula = '".$codigo."',nombre = '".$nombre."',
		apellido_paterno = '".$apaterno."',apellido_materno = '".$amaterno."',calle = '".$calle."',
		numero = '".$num."',colonia = '".$col."',ciudad = '".$city."',estado = '".$edo."',
		telefono = '".$tel."',celular = '".$cel."',sueldo = '".$sueldo."',tipo = '".$tipo."',
		status = '".$estado."' where matricula = '".$codigo."' ";

		$resultado = mysql_query($consulta) or die(mysql_error());
		
		if ($resultado == true){
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