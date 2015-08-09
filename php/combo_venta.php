<?php 
	header('Content-Type: application/json');
	error_reporting(0);
	include("conexion.php");
	conectarse();
		session_start();
	$opciones = null;
	$opciones->opcion_user = '';
	$opciones->opcion_cliente = '';
	$opciones->opcion_corte = '';
	
	mostrar_cliente();
	mostrar_empleado();
	corte();
	function mostrar_empleado(){
			global $opciones;
			$usuario = $_SESSION['username'];
			$consulta = "select matricula,concat(nombre,' ',apellido_paterno) as nombre
			from empleados where status = 'ACTIVO' and matricula = '".$_SESSION['id']."' ";
			$resultado = mysql_query($consulta) or die(mysql_error());
			 while ($fila = mysql_fetch_array($resultado)) {
			 	$opciones_user .= '<option value = "'.$fila["matricula"].'">'.$fila["nombre"].' </option>';
			 }
			 mysql_free_result($resultado);
			 $opciones->opcion_user = $opciones_user;
	}
	function mostrar_cliente(){
			global $opciones;
			$consulta = "select matricula,empresa from clientes where status = 'ACTIVO'";
			$resultado = mysql_query($consulta) or die(mysql_error());
			 while ($fila = mysql_fetch_array($resultado)) {
			 	$opcion_cliente .= '<option value = "'.$fila["matricula"].'">'.$fila["empresa"].'</option>';
			 }
			 mysql_free_result($resultado);
			 $opciones->opcion_cliente = $opcion_cliente;
	}	
	function corte(){
			global $opciones;
			$usuario = $_SESSION['username'];
			$consulta = "select matricula,concat(nombre,' ',apellido_paterno,' ',apellido_materno) as nombre
			from empleados where status = 'ACTIVO' and matricula = '".$_SESSION['id']."' ";
			$resultado = mysql_query($consulta) or die(mysql_error());
			 while ($fila = mysql_fetch_array($resultado)) {
			 	$opciones_corte = $fila['nombre'];
			 }
			 mysql_free_result($resultado);
			 $opciones->opcion_corte = $opciones_corte;
	}	
	print json_encode($opciones);
 ?>