<?php 

	require_once("conexion.php");
	header('Content-Type: application/json');
	header("Content-Type: text/html;charset=utf-8");
	error_reporting(0);

	conectarse();

	$opc = $_POST['opc'];
	switch ($opc) {
		case 'guardar_cliente':
			guardar_cliente();
		break;

		case 'baja_clientes':
			baja_clientes();
		break;

		case 'modificar_cliente':
			modificar_cliente();
		break;
	}

	function guardar_cliente(){
		//RECIBIMOS EL SERIALIZE() Y LO ASIGNAMOS A VARIABLES
		parse_str($_POST["cadena"], $_POST);
		$empresa = trim($_POST['empresa']);
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
		$email = trim($_POST['correo']);
		$status = 'ACTIVO';

		$sql = "select * from clientes where nombre_contacto = '".$nombre."' or empresa = '".$empresa."' ";
	 	$res = mysql_query($sql) or die(mysql_error());
	 	
	 	if (mysql_num_rows($res) > 0){
	 		$existe = true;
	 		$existeJson = array('existe' => $existe);
	 		print (json_encode($existeJson));
	 	} else {
				//GENERAMOS LA CONSULTA
			$consulta = "insert into clientes (empresa,nombre_contacto,apellido_paterno,apellido_materno,
					calle,numero,colonia,ciudad,estado,telefono,celular,email,status) values 
					('".$empresa."','".$nombre."','".$apaterno."','".$amaterno."','".$calle."','".$num."',
					'".$col."','".$city."','".$edo."','".$tel."','".$cel."','".$email."','".$status."')";
				//EJECUTAMOS LA CONSULTA
			$resultado = mysql_query($consulta) or die(mysql_error());
			$respuesta = false;

			if ($resultado == true) {
				$respuesta = true;
				$salidaJSON = array('respuesta' => $respuesta );
				print json_encode($salidaJSON);
			} else {
				echo "Ocurrio un Error";
			}	
		}		
	}

	function baja_clientes(){
  		$matricula = trim($_POST['matricula']);
  		$estado = 'BAJA';

  		$consulta = "update clientes set status='".$estado."' where matricula = '".$matricula."'";
  		
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

  	function modificar_cliente(){
  		//RECIBIMOS EL SERIALIZE() Y LO ASIGNAMOS A VARIABLES
		parse_str($_POST["cadena"], $_POST);
		$codigo = trim($_POST['codigo']);
		$empresa = trim($_POST['empresa']);
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
		$email = trim($_POST['correo']);
		$status = trim($_POST['status']);
			//GENERAMOS LA CONSULTA
		$consulta = "update clientes set matricula = '".$codigo."',empresa = '".$empresa."',
		nombre_contacto = '".$nombre."',apellido_paterno = '".$apaterno."',apellido_materno = '".$amaterno."',
		calle = '".$calle."',numero = '".$num."',colonia = '".$col."',ciudad = '".$city."',
		estado = '".$edo."',telefono = '".$tel."',celular = '".$cel."',email = '".$email."',
		status = '".$status."' where matricula = '".$codigo."' ";
		
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