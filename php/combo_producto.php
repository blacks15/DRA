<?php 
	header('Content-Type: application/json');
	error_reporting(0);
	require_once("conexion.php");
	conectarse();

	$opciones = null;
	//$opciones->opcion_libro = '';
	$opciones->opcion_proveedor = '';
	
	//mostrar_libro();
	mostrar_proveedor();

	// function mostrar_libro(){
	// 		global $opciones;
	// 		$consulta = "select clave_autor,concat(firstname_autor,' ',lastname_autor) as nombre from autores where estado = 'Activo'";
	// 		$opciones_aut = '<option value="0">SELECCIONE </option>';
	// 		$resultado = mysql_query($consulta) or die(mysql_error());
	// 		 while ($fila = mysql_fetch_array($resultado)) {
	// 		 	$opciones_aut .= '<option value = "'.$fila["clave_autor"].'">'.$fila["nombre"].' </option>';
	// 		 }
	// 		 mysql_free_result($resultado);
	// 		 $opciones->opcion_aut = $opciones_aut;
	// }
	function mostrar_proveedor(){
			global $opciones;
			$consulta = "select clave_proveedor, nombre from proveedores where estado = 'ACTIVO'";
			$opcion_proveedor = '<option value="0">SELECCIONE </option>';
			$resultado = mysql_query($consulta) or die(mysql_error());
			 while ($fila = mysql_fetch_array($resultado)) {
			 	$opcion_proveedor .= '<option value = "'.$fila["clave_proveedor"].'">'.$fila["nombre"].'</option>';
			 }
			 mysql_free_result($resultado);
			 $opciones->opcion_proveedor = $opcion_proveedor;
	}		

	print json_encode($opciones);
 ?>