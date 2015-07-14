<?php 
	require_once('conexion.php');
	header('Content-Type: application/json');
	error_reporting(0);
	conectarse();

	$opc = $_POST['opc'];

	switch ($opc) {
		case 'guardar_libro':
			guardar_libro();
		break;
	}

	function guardar_libro(){
		parse_str($_POST["cadena"], $_POST);
		$name = trim($_POST['nombre']);
		$isbn = trim($_POST['isbn']);
		$genero = trim($_POST['genero']);
		$autor = trim($_POST['autor']);
		$editorial = trim($_POST['editorial']);
		$pag = trim($_POST['pag']);
		$obs = trim($_POST['obs']);
		$status = 'DISPONIBLE';

			//COMPROBAMOS SI EXISTE EL LIBRO
		$sql = "select * from libros where nombre = '".$name."' or isbn = '".$isbn."' ";
		$res = mysql_query($sql) or die(mysql_error());
		if (mysql_num_rows($res) > 0) {
			$existe = true;
			$existeJSON = array('existe' => $existe);
			print(json_encode($existeJSON));
		} else {
				//REALIZAMOS LA CONSULTA
			$consulta = "insert into libros (nombre_libro,isbn,genero,autor,editorial,
			pag,descripcion,status) values ('".$name."','".$isbn."','".$genero."','".$autor."','".$editorial."',
			'".$pag."','".$obs."','".$status."')";
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

 ?>