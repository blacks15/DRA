<?php 
	header('Content-Type: application/json');
	error_reporting(0);
	require_once("conexion.php");
	conectarse();

	$opciones = null;
	$opciones->opcion_libro = '';
	$opciones->opcion_proveedor = '';
	
	mostrar_libro();
	mostrar_proveedor();

	function mostrar_libro(){
			global $opciones;
			$consulta = "select clave_libro,nombre_libro from libros where status = 'DISPONIBLE'";
			$resultado = mysql_query($consulta) or die(mysql_error());
			 while ($fila = mysql_fetch_array($resultado)) {
			 	$opciones_libro .= '<option value = "'.$fila["clave_libro"].'">'.$fila["nombre_libro"].' </option>';
			 }
			 mysql_free_result($resultado);
			 $opciones->opcion_libro = $opciones_libro;
	}
	function mostrar_proveedor(){
			global $opciones;
			$consulta = "select clave_proveedor, nombre from proveedores where status = 'ACTIVO'";
			$resultado = mysql_query($consulta) or die(mysql_error());
			 while ($fila = mysql_fetch_array($resultado)) {
			 	$opcion_proveedor .= '<option value = "'.$fila["clave_proveedor"].'">'.$fila["nombre"].'</option>';
			 }
			 mysql_free_result($resultado);
			 $opciones->opcion_proveedor = $opcion_proveedor;
	}		

	print json_encode($opciones);
 ?>