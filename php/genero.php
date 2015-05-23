<?php
	header('Content-Type: application/json');
	error_reporting(0);
	/*
	$opc = $_POST['opc'];
	switch ($opc) {
		case 'guardar_genero':
			guardar_genero();
			break;
	}
	*/
	 function guardar_genero(){
	 	global $name;
	 	$conecta = mysql_connect("localhost","root",""));
		$db = mysql_select_db("venta_libros",$conecta);

		//$name = $_POST['name'];
			//ejecutar consulta
		$consulta = "insert into generos (nombre) values ('".$name."')";
		$resultado  = mysql_query($consulta);
		$response = $resultado;
		print json_encode($response);
		/*
		if ($resultado){
			//$respuesta = true;
			$response->respuesta = $respuesta;
		 	//$salidaJSON = array('respuesta' => $respuesta );
		 	print json_encode($response);
		 } else{
		 	echo "Error al Insertar Datos";
		 }
		 */
  }
  $name = 'aaaa';
  guardar_genero();
?>