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

		case 'buscar_producto':
			buscar_producto();
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
		$actual = trim($_POST['actual']);
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
					('".$nom."','".$prov."','".$cprov."','".$actual."','".$minimo."','".$compra."',
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

	function buscar_producto(){
		$bu = trim($_POST['bu']);
		if (!empty($bu)) {
			$sql = "select clave_producto,nombre_producto,proveedor,codigo_proveedor,
					cantidad_actual,cantidad_minima,compra,venta
                from productos p
                inner join libros l on l.clave_libro = p.nombre_producto
        		WHERE nombre_libro LIKE '%".$bu."%'  and p.status = 'DISPONIBLE' ";
	        $resultado = mysql_query($sql) or die(mysql_error());
	        $contar = mysql_num_rows($resultado);
	        if($contar == 0){
	        	$noexiste = true;
		       	$noexisteJSON = array('noexiste' => $noexiste);
		       	print(json_encode($noexisteJSON));
	        } else {
	           while($row = mysql_fetch_array($resultado)){
              	$respuesta->id = $row['clave_producto'];
                $respuesta->nombre = $row['nombre_producto'];
                $respuesta->proveedor = $row['proveedor'];
                $respuesta->codigo_proveedor = $row['codigo_proveedor'];
                $respuesta->ca = $row['cantidad_actual'];
                $respuesta->cm = $row['cantidad_minima'];
                $respuesta->compra = $row['compra'];
                $respuesta->venta = $row['venta'];
              }
	        	print(json_encode($respuesta));
	         } 
		} else {
				echo json_encode("Vacio");
			}
	}

  	function modificar_producto(){
  		//RECIBIMOS EL SERIALIZE() Y LO ASIGNAMOS A VARIABLES
		parse_str($_POST["cadena"], $_POST);
		$codigo = trim($_POST['codigo']);
		$libro = trim($_POST['libro']);
		$prov = trim($_POST['prov']);
		$cprov = trim($_POST['cprov']);
		$minimo = trim($_POST['minimo']);
		$compra = trim($_POST['compra']);
		$venta = trim($_POST['venta']);
		$status = 'DISPONIBLE';
			//GENERAMOS LA CONSULTA
		$consulta = "update productos set clave_producto = '".$codigo."',nombre_producto = '".$libro."',
		proveedor = '".$prov."',codigo_proveedor = '".$cprov."',
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