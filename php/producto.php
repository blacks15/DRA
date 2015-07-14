<?php 

	require_once("conexion.php");
	header('Content-Type: application/json');
	error_reporting(0);

	conectarse();

	$opc = $_POST['opc'];
	switch ($opc) {
		case 'guardar_producto':
			guardar_producto();
		break;

		case 'baja_producto':
			baja_producto();
		break;

		case 'modificar_producto':
			modificar_producto();
		break;
	}

	function guardar_producto(){
		//RECIBIMOS EL SERIALIZE() Y LO ASIGNAMOS A VARIABLES
		parse_str($_POST["cadena"], $_POST);
		$nom = trim($_POST['libro']);
		$prov = trim($_POST['prov']);
		$cprov = trim($_POST['cprov']);
		$cantidad = trim($_POST['cantidad']);
		$minimo = trim($_POST['minimo']);
		$compra = trim($_POST['compra']);
		$venta = trim($_POST['venta']);
		$status = 'DISPONIBLE';

		$sql = "select * from productos where nombre_producto = '".$nom."' or 
		codigo_proveedor = '".$cprov."' ";
	 	$res = mysql_query($sql) or die(mysql_error());
	 	
	 	if (mysql_num_rows($res) > 0){
	 		$existe = true;
	 		$existeJson = array('existe' => $existe);
	 		print (json_encode($existeJson));
	 	} else {
				//GENERAMOS LA CONSULTA
			$consulta = "insert into productos (nombre_producto,proveedor,codigo_proveedor,cantidad_actual,
					cantidad_minima,compra,venta,status) values 
					('".$nom."','".$prov."','".$cprov."','".$cantidad."','".$minimo."','".$compra."',
					'".$venta."','".$status."')";
				//EJECUTAMOS LA CONSULTA
			$resultado = mysql_query($consulta) or die(mysql_error());
			$respuesta = false;

			if ($resultado == true) {
				$respuesta = true;
				$salidaJSON = array('respuesta' => $respuesta );
				print json_encode($salidaJSON);
			} else {
				$fallo = true;
				$falloJSON = array('fallo' => $fallo);
				print(json_encode($falloJSON));
			}	
		}		
	}

	function baja_producto(){}

  	function modificar_producto(){
  		//RECIBIMOS EL SERIALIZE() Y LO ASIGNAMOS A VARIABLES
		parse_str($_POST["cadena"], $_POST);
		$codigo = trim($_POST['codigo']);
		$libro = trim($_POST['libro']);
		$prov = trim($_POST['prov']);
		$cprov = trim($_POST['cprov']);
		$cantidad = trim($_POST['cantidad']);
		$minimo = trim($_POST['minimo']);
		$compra = trim($_POST['compra']);
		$venta = trim($_POST['venta']);
		$status = 'DISPONIBLE';
			//GENERAMOS LA CONSULTA
		$consulta = "update productos set clave_producto = '".$codigo."',nombre_producto = '".$libro."',
		proveedor = '".$prov."',codigo_proveedor = '".$cprov."',cantidad_actual = '".$cantidad."',
		cantidad_minima = '".$minimo."',compra = '".$compra."',venta = '".$venta."',
		status = '".$status."' where clave_producto = '".$codigo."' ";
		
		 	//EJECUTAMOS LA CONSULTA
		$resultado = mysql_query($consulta)or die(mysql_error());
		$respuesta = false;
		  
		if ($resultado == true) {
			$respuesta = true;
			$salidaJSON = array('respuesta' => $respuesta );
			print json_encode($salidaJSON);
		} else {
			$fallo = true;
			$falloJSON = array('fallo' => $fallo);
			print(json_encode($falloJSON));
		}
  	}

 ?>