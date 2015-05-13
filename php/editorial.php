<?php
	$opc = $_POST['opc'];
	switch ($opc) 
	{
		case 'guardar_editorial':
			guardar_editorial();
		break;
		
		case 'baja_editorial':
			baja_editorial();
		break;

		case 'consultar_editorial':
			consultar_editorial();
		break;

		case 'modificar_editorial':
			modificar_editorial();
		break;
	}

	function guardar_editorial()
	{
		$conecta = mysql_connect("localhost","root","")or die(mysql_error());

		if (!is_resource($conecta)) {
			echo "Fallo la Conexión al Servidor";
		}
		else
		{
		$db = mysql_select_db("venta_libros",$conecta);
		if ($db == 0) {
			echo "Error al Conectar Base de Datos";
		}
		else {
		$name = $_POST['name'];
		$estado = 'Activo';

		$consulta = "insert into editorial (nombre_editorial,estado) values('".$name."','".$estado."')";
		//ejecutar consulta
		$resultado = mysql_query($consulta) or die(mysql_error());
		$respuesta = false;
		echo $name;
		if (mysql_affected_rows() > 0)
		{
			$respuesta = true;
			echo '<div class="alert alert-success">
						  <button type="button" class="close" data-dismiss="alert">X</button>
						  <strong>Autor '.$name.' </strong> Guardado con Exito
						</div>';
			$salidaJSON = array('respuesta' => $respuesta );
			print json_encode($salidaJSON);
			mysql_close($conecta);
		}
		else
		{
			echo "Error al Insertar Datos";
		}
	 }
	}
}