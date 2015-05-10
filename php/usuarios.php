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
		$usuario = trim($_POST["usuario"]);
		$clave = trim($_POST["clave"]);
		$response = true;

		$conecta   = mysql_connect("localhost","root","");
		mysql_select_db("venta_libros");
		
		$usuario = stripslashes($usuario);
		$clave = stripslashes($clave);
		$usuario = mysql_real_escape_string($usuario);
		$clave = mysql_real_escape_string($clave);
		
		$consulta = "select nombre_usuario from usuarios WHERE nombre_usuario = '".$usuario."' and contraseña = '".$clave."'";
		mysql_query($consulta);

		if ($dato = mysql_fetch_array($consulta))
		 {
			$_SESSION['user_name'] = $dato['nombre_usuario'];
			//header('location:menu.html');
		 }
		 else
		 {
		 	//echo "<div>Usuario  y Contraseña Incorrecto</div>";
		 }
		 
		 print json_encode($response);
	}

	
	function grabar_usuario()
	{
		$usuario = $_POST["user"];
		$clave = $_POST["pass"];
		$estado = 'Activo';
		$conecta = mysql_connect("localhost","root","");
		mysql_select_db("venta_libros");

		$usuario = stripslashes($usuario);
		$clave = stripslashes($clave);
		$usuario = mysql_real_escape_string($usuario);
		$clave = mysql_real_escape_string($clave);
		
		$consulta = "insert into usuarios values('".$usuario."','".md5($clave)."','".$estado."')";

		//ejecutar consulta
		mysql_query($consulta);
		$respuesta = false;
		if (mysql_affected_rows() > 0)
		{
			$respuesta = true;
		}
		$salidaJSON = array('respuesta' => $respuesta );
		print json_encode($salidaJSON);
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