<?php
	$opc = $_POST['opc'];
	switch ($opc) 
	{
		case 'guardar_editorial':
			guardar_editorial();
		break;
		
		case 'baja_editorial':
			baja_editorial();
		break;

		case 'consultar_editorial':
			consultar_editorial();
		break;

		case 'modificar_editorial':
			modificar_editorial();
		break;
	}

	function guardar_editorial()
	{
		$conecta = mysql_connect("localhost","root","") or die(mysql_error());

		if (!is_resource($conecta)) {
			echo "Fallo la Conexion al Servidor";
		}else{
			$db = mysql_select_db("venta_libros",$conecta);
			if ($db == 0) {
				echo "Error al Conectar a la Base de Datos";
			}else{
				$name = trim($_POST['name']);
				$estado = 'Activo';
				$valid = "select * from editoriales where nombre = '".$name."' and estado = '".$estado."'" ;
				if (!$valid) {
					echo "La Editorial ya Existe";
				}else{
					$consulta = "insert into editoriales(nombre,estado) values('".$name."','".$estado."')";
				  //ejecutar consulta
					$resultado = mysql_query($consulta,$conecta)or die(mysql_error());
					$respuesta = false;
					
				if ($resultado){
					$respuesta = true;
					$salidaJSON = array('respuesta' => $respuesta );
					print json_encode($salidaJSON);
					mysql_close($conecta);
				} else{
					echo "Ocurrio un Error";
					}
	   			}
		    }
		}
	}
?>