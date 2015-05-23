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
		}else{
		$db = mysql_select_db("venta_libros",$conecta);
		if ($db == 0) {
			echo "Error al Conectar Base de Datos";
		}else {
		$first_name = $_POST['first_name'];
		$last_name = $_POST['last_name'];
		$estado = 'Activo';

		$valid = "select * from autores where firstname_autor = '".$first_name."' and lastname_autor = '".$last_name."'" ;
		//$res = mysql_query($valid);
		if ($res) {
			echo "El Autor ya Existe";
		}else{

		$consulta = "insert into autores (firstname_autor,lastname_autor,estado) values('".$first_name."','".$last_name."','".$estado."')";
		//ejecutar consulta
		$resultado = mysql_query($consulta) or die(mysql_error());
		$respuesta = false;

		if ($resultado)
		{
			$respuesta = true;
			$salidaJSON = array('respuesta' => $respuesta );
			print json_encode($salidaJSON);
			mysql_close($conecta);
		}else{
			echo "Ocurrio un Error";
		}
	 }
	}
  }
 }
?>