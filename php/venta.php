<?php 
	
	require_once('conexion.php');
	header('Content-Type: application/json');
	error_reporting(0);
	conectarse();

	$opc = $_POST['opc'];
	switch ($opc) {
		case 'buscar_producto':
			buscar_producto();
		break;
	}

	function buscar_producto(){
		$prod = trim($_POST['prod']);
		if (!empty($prod)) {
			$consulta = "select clave_producto,nombre_libro,p.venta,p.cantidad_actual
						from productos p
			    		inner join libros l on l.clave_libro = p.nombre_producto
        				WHERE nombre_libro LIKE '%".$prod."%' and p.status = 'DISPONIBLE' ";

        $resultado = mysql_query($consulta) or die(mysql_error());
        $con = mysql_num_rows($resultado);
        if ($con !=0 ) {
        	while ($row = mysql_fetch_array($resultado)) {
        		$respuesta->clave_producto = $row['clave_producto'];
        		$respuesta->nombre_libro = $row['nombre_libro'];
        		$respuesta->precio = $row['venta'];
        		$respuesta->cantidad = $row['cantidad_actual'];
        	}
        	if ($respuesta->cantidad < 1) {
        		$vacio-> true;
	       	 	$salidaJSON = array('vacio' => $vacio);
	       	 	print(json_encode($salidaJSON));
        	}else {
        		print(json_encode($respuesta));
        	}
       	 } else {
       	 	$noexiste-> true;
       	 	$salidaJSON = array('noexiste' => $noexiste);
       	 	print(json_encode($salidaJSON));
       	 }
		} else {
			echo json_encode("Vacio");
		}
	}


 ?>