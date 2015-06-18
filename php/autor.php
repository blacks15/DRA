<?php

	include("conexion.php");
	conectarse();

	$opc = $_POST["opc"];
	switch ($opc) 
	{
		case 'guardar_autor':
			guardar_autor();
		break;
		
		case 'baja_autor':
			baja_autor();
		break;

		case 'modificar_autor':
			modificar_autor();
		break;
	}

	function guardar_autor()
	{
		$first_name = $_POST['first_name'];
		$last_name = $_POST['last_name'];
		$estado = 'Activo';

		$consulta = "insert into autores (firstname_autor,lastname_autor,estado) values('".$first_name."','".$last_name."','".$estado."')";
		//ejecutar consulta
		$resultado = mysql_query($consulta) or die(mysql_error());
		$respuesta = false;

		if ($resultado)
		{
			$respuesta = true;
			$salidaJSON = array('respuesta' => $respuesta );
			print json_encode($salidaJSON);
		}else{
			echo "Ocurrio un Error";
		}
  	}

  	function baja_autor(){
  		$clave_autor = trim($_POST['clave_autor']);
  		$estado = 'Baja';

  		$consulta = "update autores set estado='".$estado."'where clave_autor = '".$clave_autor."'";
  		
  		$resultado = mysql_query($consulta) or die(mysql_error());
		$respuesta = false;

		if ($resultado)
		{
			$respuesta = true;
			$salidaJSON = array('respuesta' => $respuesta );
			print json_encode($salidaJSON);
		}else{
			echo "Ocurrio un Error";
		}
  	}
  	
?>