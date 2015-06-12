<?php 
	header('Content-Type: application/json');
	error_reporting(0);
	include("conexion.php");
	conectarse();

	$opciones = null;
	$opciones->opcion_aut = '';
	$opciones->opcion_ed = '';
	$opciones->opcion_genero = '';
	
	mostrar_editorial();
	mostrar_autor();
	mostrar_genero();


	function mostrar_autor()
	{
			global $opciones;
			$consulta = "select clave_autor,concat(firstname_autor,' ',lastname_autor) as nombre from autores";
			$opciones_aut = '<option value="0">SELECCIONE </option>';
			$resultado = mysql_query($consulta) or die(mysql_error());
			 while ($fila = mysql_fetch_array($resultado)) {
			 	$opciones_aut .= '<option value = "'.$fila["clave_autor"].'">'.$fila["nombre"].' </option>';
			 }
			 mysql_free_result($resultado);
			 $opciones->opcion_aut = $opciones_aut;
			 //print json_encode($opciones);
	}
	function mostrar_editorial()
	{
			global $opciones;
			$consulta = "select clave_editorial, nombre from editoriales";
			$opcion_ed = '<option value="0">SELECCIONE</option>';
			$resultado = mysql_query($consulta) or die(mysql_error());
			 while ($fila = mysql_fetch_array($resultado)) {
			 	$opcion_ed .= '<option value = "'.$fila["clave_editorial"].'">'.$fila["nombre"].'</option>';
			 }
			 mysql_free_result($resultado);
			 $opciones->opcion_ed = $opcion_ed;
			 //print json_encode($opciones);
	}		
	
	function mostrar_genero()
	{
			global $opciones;
			$consulta = "select clave_genero,nombre from generos";
			$opcion_genero = '<option value="0">SELECCIONE </option>';
			$resultado = mysql_query($consulta) or die(mysql_error());
			 while ($fila = mysql_fetch_array($resultado)) {
			 	$opcion_genero .= '<option value = "'.$fila["clave_genero"].'">'.$fila["nombre"].' </option>';
			 }
			 mysql_free_result($resultado);
			 $opciones->opcion_genero = $opcion_genero;
			 //print json_encode($opciones);
	}
	print json_encode($opciones);
 ?>