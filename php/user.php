<?php 

	require_once('conexion.php');
	header('Content-Type: application/json');
	error_reporting(0);
	conectarse();

	$opc = $_POST['opc'];

	switch ($opc) {
		case 'guardar_usuario':
			guardar_usuario();
		break;

		case 'baja_usuario':
			baja_usuario();
		break;
	}

	function guardar_usuario(){

		parse_str($_POST["cadena"], $_POST);
		
		$nombre = trim($_POST['nombre']);
		$apaterno = trim($_POST['apaterno']);
		$amaterno = trim($_POST['amaterno']);
		$usuario = trim($_POST['usuario']);
		$pass = trim($_POST['pass']);
		
		$city = trim($_POST['ciudad']);
		$edo = trim($_POST['edo']);
		$calle = trim($_POST['calle']);
		$num = trim($_POST['num']);
		$col = trim($_POST['colonia']);
		$tel = trim($_POST['telefono']);
		$cel = trim($_POST['celular']);
		$sueldo = trim($_POST['sueldo']);
		$tipo = trim($_POST['tipo']);
		$estado = 'ACTIVO';

		$consulta = "insert into users (nombre,apellido_paterno,apellido_materno,usuario,password,calle,numero,colonia,ciudad,estado,telefono,celular,sueldo,tipo,status) values ('".$nombre."','".$apaterno."','".$amaterno."','".$usuario."','".md5($pass)."','".$calle."','".$num."','".$col."','".$city."','".$edo."','".$tel."','".$cel."','".$sueldo."','".$tipo."','".$estado."')";
			//ejecutar consulta
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

	function baja_usuario(){
		$clave_usuario = trim($_POST['clave_usuario']);
  		$estado = 'BAJA';

  		$consulta = "update users set status='".$estado."'where clave_usuario = '".$clave_usuario."'";
  		
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


 ?>