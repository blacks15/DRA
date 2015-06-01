<?php
	header('Content-Type: application/json');
	error_reporting(0);
	
	$opc = $_POST['opc'];

	switch ($opc)
	{
		case 'guardar_genero':
			guardar_genero();
		break;
	}

	function guardar_genero()
	{
	 	$conecta = mysql_connect("localhost","root","123")or die(mysql_error());

		if (!is_resource($conecta)) {
			echo "Fallo la Conexión al Servidor";
		} else { 
		$db = mysql_select_db("venta_libros",$conecta);
		if ($db == 0) {
			echo "Error al Conectar Base de Datos";
		} else {
		$name = trim($_POST['name']); 
		$consulta = "insert into generos (nombre) values('".$name."')";

		//ejecutar consulta
		$resultado = mysql_query($consulta) or die(mysql_error());
		$respuesta = false;
		$total = mysql_num_rows($resultado);
		echo $total;
		if ($resultado)
		{
			$respuesta = true;
			$salidaJSON = array('respuesta' => $respuesta );
			print json_encode($salidaJSON);
			mysql_close($conecta);
		} else {
			echo "Ocurrio un Error";
		}
	 }
	}
  }
?>