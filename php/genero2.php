<?php
	header('Content-Type: application/json');
	error_reporting(0);

	$conecta = mysql_connect("localhost","root","");
	$db = mysql_select_db("venta_libros",$conecta);

	$opc = $_POST['opc'];
	
	switch ($opc) {
		case 'guardar_genero':
			guardar_genero();
		break;
	}

	function guardar_genero(){
		global $opc;
		$name = $_POST['name'];
		$response->resultado = true;
		$response->opc = $opc;
		$response->name = $name;
		
		//Generamos la inserción del dato
		//$consulta = 'INSERT INTO generos (nombre) VALUES ("'.$name.'");';
		//$consulta = "insert into generos (nombre) values ('".$name."');";
		$consulta = "insert into generos (nombre) values('".$name."')";
		$response->respuesta = mysql_query($consulta);

		if($response->respuesta == true){
			print json_encode($response);
		}
		//print json_encode($response);
	}
?>