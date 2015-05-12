<?php
	$opc = $_POST["opc"];
	switch ($opc) 
	{
		case 'guardar_autor':
			guardar_autor();
		break;
		
		case 'baja_autor':
			baja_autor();
		break;

		case 'consultar_autor':
			consultar_autor();
		break;

		case 'modificar_autor':
			modificar_autor();
		break;
	}

	function guardar_autor()
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
		$first_name = $_POST['f_autor'];
		$last_name = $_POST['l_autor'];
		$estado = 'Activo';

		$consulta = "insert into autores (firstname_autor,lastname_autor,estado) values('".$first_name."','".$last_name."','".$estado."')";
		//ejecutar consulta
		$resultado = mysql_query($consulta) or die(mysql_error());
		$respuesta = false;

		if (mysql_affected_rows() > 0)
		{
			$respuesta = true;
			echo "Autor Gurardado Correctamente";
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