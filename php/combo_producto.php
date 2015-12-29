<?php 
	header('Content-Type: application/json');
	error_reporting(0);
	require_once("conexion.php");
	conectarse();

	$opciones = null;
	$opciones->opcion_libro = '';
	$opciones->opcion_proveedor = '';
	$opciones->opcion_producto = "";

	mostrar_producto();
	mostrar_libro();
	mostrar_proveedor();

	function mostrar_producto(){
		global $opciones;
		$opciones_producto = '<option value="0">SELECCIONE </option>';
		$sql = "select clave_producto,nombre_libro 
			from productos p
			inner join libros l on l.clave_libro = p.nombre_producto";
		$resultado = mysql_query($sql) or die(mysql_error());
		while ($fila = mysql_fetch_array($resultado)) {
			$opciones_producto.= '<option value = "'.$fila["clave_producto"].'">'.utf8_encode($fila["nombre_producto"]).' </option>';
		}
		mysql_free_result($resultado);
		$opciones->opcion_producto = $opciones_producto;
	}

	function mostrar_libro(){
			global $opciones;
			$opciones_libro = '<option value="0">SELECCIONE </option>';
			$consulta = "select clave_libro,nombre_libro from libros";
			$resultado = mysql_query($consulta) or die(mysql_error());
			 while ($fila = mysql_fetch_array($resultado)) {
			 	$opciones_libro .= '<option value = "'.$fila["clave_libro"].'">'.utf8_encode($fila["nombre_libro"]).' </option>';
			 }
			 mysql_free_result($resultado);
			 $opciones->opcion_libro = $opciones_libro;
	}
	function mostrar_proveedor(){
			global $opciones;
			$opcion_proveedor = '<option value="0">SELECCIONE </option>';
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