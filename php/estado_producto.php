<?php 
	require_once('conexion.php');
	header('Content-Type: application/json');
	error_reporting(0);
	conectarse();

	$json = trim($_POST['detalle']);
	$detalle = json_decode($json,true);
	
  foreach ($detalle as $key => $value) {
	$sql = "select cantidad_actual 
		from productos where clave_producto = '".$value['clave_producto']."' ";
	$resultado = mysql_query($sql) or die(mysql_error());	
	while ($row = mysql_fetch_array($resultado)) {
		if ($row['cantidad_actual'] == 0) {
			$sql2 = "update productos set status = 'AGOTADO' 
				where clave_producto = '".$value['clave_producto']."' ";
			$ok = mysql_query($sql2) or die(mysql_error());
			if ($ok == true) {
				$respuesta = true;
				$salidaJSON = array('respuesta' => $respuesta );
				print json_encode($salidaJSON);
			} else {
				$respuesta = false;
				$salidaJSON = array('respuesta' => $respuesta );
				print json_encode($salidaJSON);
			} //END ELSE
		} // END FIRST IF
	} // END WHILE
  } //END FOREACH

 ?>