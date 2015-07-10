<?php

	require_once('conexion.php');
	header('Content-Type: application/json');
	error_reporting(0);
	conectarse();

	$opc = $_POST["opc"];
	switch ($opc) {
		case 'inicio_sesion':
			inicio_sesion();
		break;
		
		case 'guardar_usuario':
			guardar_usuario();
		break;

	}

	function inicio_sesion(){

		$usuario = trim($_POST['usuario']);
		$pass = trim($_POST['pass']);
		$respuesta = false;
		$consulta = "select matricula,nombre_usuario,password from usuarios WHERE nombre_usuario = '".$usuario."'  ";
		$resultado = mysql_query($consulta) or die(mysql_error());

		$count = mysql_num_rows($resultado);
		if ($count == 1) {
			$row = mysql_fetch_array($resultado);
			$user = $row['nombre_usuario'];
			if ((password_verify($pass,$row['password'])) && ($usuario == $user) ) {
					$respuesta = true;
					$_SESSION['loggedin'] = true;
					$_SESSION['username'] = $row['nombre_usuario'];
					$_SESSION['start'] = time();
					$_SESSION['expire'] = $_SESSION['start'] + (5 * 60) ;
					$salidaJSON = array('respuesta' => $respuesta,
										'usuario' => $usuario);
					print(json_encode($salidaJSON));
				} else {
					$fallo = true;
					$falloJSON = array('fallo' => $fallo );
					print json_encode($falloJSON);
				}
		} else {
			$fallo = true;
			$falloJSON = array('fallo' => $fallo );
			print json_encode($falloJSON);
		}
	}

	
	function guardar_usuario(){
		parse_str($_POST["cadena"], $_POST);
		$matricula = trim($_POST['codigo']);
		$usuario = trim($_POST['usuario']);
		$pass = trim($_POST['pass']);
		$estado = 'ACTIVO';
		$hoy = date("F j, Y, g:i ");   
		$fecha = date('Y-m-d H:i:s',strtotime($hoy));
		$respuesta = false;
		$clave = password_hash($pass, PASSWORD_DEFAULT);

			//VALIDAMOS SI EXISTE EL USUARIO
		$sql = "select * from usuarios where matricula = '".$matricula."' or nombre_usuario = '".$usuario."' ";
		$res = mysql_query($sql) or die(mysql_error());
		if (mysql_num_rows($res) > 0) {
			$existe = true;
			$existeJSON = array('existe' => $existe);
			print(json_encode($existeJSON));
		} else {
			$consulta = "insert into usuarios (matricula,nombre_usuario,password,status,fecha_actualizacion)
			 values('".$matricula."','".$usuario."','".$clave."','".$estado."','".$fecha."')";
				//EJECUTAR CONSULTA
			$resultado = mysql_query($consulta) or die(mysql_error());

			if ($resultado == true){
				$respuesta = true;
				$salidaJSON = array('respuesta' => $respuesta );
				print json_encode($salidaJSON);
			} else {
				$fallo = true;
				$falloJSON = array('fallo' => $fallo );
				print json_encode($falloJSON);
			}
		}
}

	// function buscausuario()
	// {
	// 	$respuesta = false;
	// 	$usuario   = $_POST["usuario"];
	// 	$conecta   = mysql_connect("localhost","root","");
	// 	mysql_select_db("venta_libros");
	// 	$clave   = "";
	// 	$nombre  = "";
	// 	$status = "";
	// 	$e="";
	// 	$consulta = "select * from usuarios where usuario='".$usuario."'";
	// 	$resultado = mysql_query($consulta);
	// 	if($registro = mysql_fetch_array($resultado))
	// 	{
	// 		$respuesta = true;
	// 		$clave = $registro["id_usuario"];
	// 		$nombre   = $registro["nombre_usuario"];
	// 		$status      = $registro["estado"];
	// 		switch ($status) 
	// 		{
	// 			case 'Activo':
	// 				$e = "Activo";
	// 				break;
	// 			case 'Baja':
	// 				$e = "Baja";
	// 				break;
	// 		}
	// 	}
	// 	$salidaJSON = array('respuesta' => $respuesta,
	// 						'id_usuario'     => $clave,
	// 						'nombre_usuario'   => $nombre,
	// 						'estado'      => $e);
	// 	print json_encode($salidaJSON);
	// }
	
?>