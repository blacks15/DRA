<?php
	$opc = $_POST["opc"];
	switch ($opc) 
	{
		case 'inicio_sesion':
			inicio_sesion();
		break;
		
		case 'grabar_usuario':
			grabar_usuario();
		break;

		// case 'buscausuario':
		// 	buscausuario();
		// break;
	}

	function inicio_sesion()
	{
		$usuario = trim($_POST['usuario']);
		$clave = trim($_POST['clave']);
		$response = true;

		$conecta   = mysql_connect("localhost","root","123");
		mysql_select_db("venta_libros")or die(mysql_error());
		
		$consulta = "select nombre_usuario from usuarios WHERE nombre_usuario = '".$usuario."' and password = '".$clave."'";
		$resultado = mysql_query($consulta) or die(mysql_error());
		$respuesta = false;
		$row=mysql_fetch_object($resultado);
		$nr = mysql_num_rows($resultado);

		if($nr == 1){
		echo "No ingreso";
		}
		else if($nr == 0) {
			$respuesta = true;
		}
		 print json_encode($response);
	}

	
	function grabar_usuario()
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
		$usuario = $_POST['usuario'];
		$clave = $_POST['clave'];
		$estado = 'Activo';

		$consulta = "insert into usuarios (nombre_usuario,password,estado) values('".$usuario."','".md5($clave)."','".$estado."')";
		//ejecutar consulta
		$resultado = mysql_query($consulta) or die(mysql_error());
		$respuesta = false;

		if (mysql_affected_rows() > 0)
		{
			$respuesta = true;
			echo "Usuario Gurardado Correctamente";
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

	// function buscausuario()
	// {
	// 	$respuesta = false;
	// 	$usuario   = $_POST["usuario"];
	// 	$conecta   = mysql_connect("localhost","root","");
	// 	mysql_select_db("venta_libros");
	// 	$clave   = "";
	// 	$nombre  = "";
	// 	$status = "";
	// 	$e="";
	// 	$consulta = "select * from usuarios where usuario='".$usuario."'";
	// 	$resultado = mysql_query($consulta);
	// 	if($registro = mysql_fetch_array($resultado))
	// 	{
	// 		$respuesta = true;
	// 		$clave = $registro["id_usuario"];
	// 		$nombre   = $registro["nombre_usuario"];
	// 		$status      = $registro["estado"];
	// 		switch ($status) 
	// 		{
	// 			case 'Activo':
	// 				$e = "Activo";
	// 				break;
	// 			case 'Baja':
	// 				$e = "Baja";
	// 				break;
	// 		}
	// 	}
	// 	$salidaJSON = array('respuesta' => $respuesta,
	// 						'id_usuario'     => $clave,
	// 						'nombre_usuario'   => $nombre,
	// 						'estado'      => $e);
	// 	print json_encode($salidaJSON);
	// }
	
?>