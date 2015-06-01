<?php
	// $opc = $_POST['opc'];
	// switch ($opc) {
	// 	case 'guardar_proveedor':
	// 		guardar_proveedor();
	// 	break;
	// }

	// function guardar_proveedor()
	// {
		$conecta = mysql_connect("localhost","root","123")or die(mysql_error());

		if (!is_resource($conecta)) {
			echo "Fallo la Conexio al Servidor";
		} else {
			$db = mysql_select_db("venta_libros",$conecta);
			if ($db == 0) {
				echo "Error al Conectar con la Base de Datos";
			} else {
				$estado = 'ACTIVO';
				echo "ok ";
				echo $estado;
			}
		}
	//}
?>