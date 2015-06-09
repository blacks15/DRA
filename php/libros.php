<?php 
	header('Content-Type: application/json');
	error_reporting(0);

	mostrar_editorial();
	mostrar_autor();

	function mostrar_editorial()
	{
		$conecta = mysql_connect("localhost","root","123") or die(mysql_error());

		if (!is_resource($conecta)) {
			echo "Fallo la Conexion al Servidor";
		} else {
		$db = mysql_select_db("venta_libros",$conecta);
		if ($db == 0) {
			echo "Error al Conectar en la Base de Datos";
		} else {
			$consulta = "select clave_editorial, nombre from editoriales";
			$opcion_ed = '<option value="0">SELECCIONE</option>';
			$resultado = mysql_query($consulta) or die(mysql_error());
			 while ($fila = mysql_fetch_array($resultado)) {
			 	$opcion_ed .= '<option value = "'.$fila["clave_editorial"].'">'.$fila["nombre"].'</option>';
			 	
			 }
			 $salidaJSON = array('opcion_ed' => $opcion_ed );
			 print json_encode($salidaJSON);
		    }
	    }
	}
	
	function mostrar_autor()
	{
		$conecta = mysql_connect("localhost","root","123") or die(mysql_error());

		if (!is_resource($conecta)) {
			echo "Fallo la Conexion al Servidor";
		} else {
		$db = mysql_select_db("venta_libros",$conecta);
		if ($db == 0) {
			echo "Error al Conectar en la Base de Datos";
		} else {
			$consulta = "select clave_autor,concat(firstname_autor,' ',lastname_autor) as nombre from autores";
			$opcion_au = '<option value="0">SELECCIONE</option>';
			$resultado = mysql_query($consulta) or die(mysql_error());
			 while ($fila = mysql_fetch_array($resultado)) {
			 	$opcion_au .= '<option value = "'.$fila["clave_autor"].'">'.$fila["nombre"].'</option>';
			 	
			 }
			 $autorJSON = array('opcion_au' => $opcion_au );
			 print json_encode($autorJSON);
		    }
	    }
	}
	?>