<?php
	$opc = $_POST["opc"];
	switch ($opc) 
	{
		case 'guardar_genero':
			guardar_genero();
		break;
		
		case 'baja_genero':
			baja_genero();
		break;

		case 'consultar_genero':
			consultar_genero();
		break;

		case 'modificar_genero':
			modificar_genero();
		break;
	}

	function guardar_genero()
	{
		$conecta = mysql_connect("localhost","root","")or die(mysql_error());

		if (!is_resource($conecta)) {
			echo "Fallo la Conexión al Servidor";
		}else{
			$db = mysql_select_db("venta_libros",$conecta);
			if ($db == 0) {
				echo "Error al Conectar Base de Datos";
			}else {
				$name = $_POST['name'];
				$valid = "select * from generos where nombre = '".$name."'";
				if (!$valid) {
					echo "El Genero ya Existe";
				}else{

					$consulta = "insert into generos (nombre) values('".$name."')";
						//ejecutar consulta
					$resultado = mysql_query($consulta);
					$respuesta = false;
					echo $resultado;
					//$resultado = true;
				if ($resultado){
					$respuesta = true;
					$salidaJSON = array('respuesta' => $respuesta );
					print json_encode($salidaJSON);
					mysql_close($conecta);
				} else{
					echo "Error al Insertar Datos";
				}
	 		 }
		 }
	}
  }
?>