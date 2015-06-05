<?php

	header('Content-Type: application/json');
	error_reporting(0);

	$opc = $_POST['opc'];
	switch ($opc) {
		case 'guardar_proveedor':
			guardar_proveedor();
		break;
	}

	function guardar_proveedor()
	{
		$conecta = mysql_connect("localhost","root","123")or die(mysql_error());

		if (!is_resource($conecta)) {
			echo "Fallo la Conexio al Servidor";
		} else {
			$db = mysql_select_db("venta_libros",$conecta);
			if ($db == 0) {
				echo "Error al Conectar con la Base de Datos";
			} else {
				$name = trim($_POST['name']);
				$contacto = trim($_POST['contacto']);
				$obs = trim($_POST['obs']);
				$dir = trim($_POST['dir']);
				$col = trim($_POST['col']);
				$tel = trim($_POST['tel']);
				$cel = trim($_POST['cel']);
				$email = trim($_POST['email']);
				$estado = 'ACTIVO';
				
				 $consulta = "insert into proveedores (nombre,contacto,observaciones,direccion,colonia,telefono,celular,email,estado )values('".$name."','".$contacto."','".$obs."','".$dir."','".$col."','".$tel."','".$cel."','".$email."','".$estado."')";
				 //ejecutamos la consulta
				   $resultado = mysql_query($consulta)or die(mysql_error());
				 	 $respuesta = false;
				  $total = mysql_num_rows($resultado);
				  echo $total;
				  $resultado = true;

				if ($resultado) {
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