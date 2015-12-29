<?php 
	header('Content-Type: application/json');
	error_reporting(0);
	include("conexion.php");
	conectarse();

	$opciones = null;
	$opciones->opcion_aut = '';
	$opciones->opcion_ed = '';
	$opciones->opcion_genero = '';
	$opciones->opcion_libro = '';

	mostrar_editorial();
	mostrar_autor();
	mostrar_genero();
	mostrar_libro();

	function mostrar_libro(){
		global $opciones;
		$sql = "select clave_libro,nombre_libro from libros";
		$opciones_lib = '<option value="0">SELECCIONE </option>';
		$resultado = mysql_query($sql) or die(mysql_error());
		while ($fila = mysql_fetch_array($resultado)) {
			 	$opciones_lib .= '<option value = "'.$fila["clave_libro"].'">'.utf8_encode($fila["nombre_libro"]).' </option>';
			 }
		 mysql_free_result($resultado);
		 $opciones->opcion_libro = $opciones_lib;
	}

	function mostrar_autor(){
			global $opciones;
			$consulta = "select clave_autor,nombre_autor from autores";
			$opciones_aut = '<option value="0">SELECCIONE </option>';
			$resultado = mysql_query($consulta) or die(mysql_error());
			 while ($fila = mysql_fetch_array($resultado)) {
			 	$opciones_aut .= '<option value = "'.$fila["clave_autor"].'">'.utf8_encode($fila["nombre_autor"]).' </option>';
			 }
			 mysql_free_result($resultado);
			 $opciones->opcion_aut = $opciones_aut;
	}
	function mostrar_editorial(){
			global $opciones;
			$consulta = "select clave_editorial, nombre_editorial from editoriales";
			$opcion_ed = '<option value="0">SELECCIONE</option>';
			$resultado = mysql_query($consulta) or die(mysql_error());
			 while ($fila = mysql_fetch_array($resultado)) {
			 	$opcion_ed .= '<option value = "'.$fila["clave_editorial"].'">'.utf8_encode($fila["nombre_editorial"]).'</option>';
			 }
			 mysql_free_result($resultado);
			 $opciones->opcion_ed = $opcion_ed;
	}		
	
	function mostrar_genero(){
			global $opciones;
			$consulta = "select clave_genero,nombre_genero as nombre from generos  where status = 'ACTIVO'";
			$opcion_genero = '<option value="0">SELECCIONE </option>';
			$resultado = mysql_query($consulta) or die(mysql_error());
			 while ($fila = mysql_fetch_array($resultado)) {
			 	$opcion_genero .= '<option value = "'.$fila["clave_genero"].'">'.$fila["nombre"].' </option>';
			 }
			 mysql_free_result($resultado);
			 $opciones->opcion_genero = $opcion_genero;
	}
	print json_encode($opciones);
 ?>