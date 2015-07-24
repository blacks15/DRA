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

		case 'buscar_proveedor':
			buscar_proveedor();
		break;

		case 'guardar_compra':
			guardar_compra();
		break;
	}

	function guardar_compra(){
		$anio = date('Y-m');
		$anio = str_replace("-","",$anio);
		$folio = $anio * 1000;
		$folio  = $folio;
		$id_prov = trim($_POST['id_prov']);
		$date = trim($_POST['date']);
		$fecha = date('Y-m-d',strtotime($date));
			//RECIBIMOS LAS VARIABLES PARA EL DETALLE DE VENTA
		$json = trim($_POST['detalle']);
		$detalle = json_decode($json,true);
			//CREAMOS EL CONSECUTIVO SINO EXISTE Y SI EXISTE SE LE INCREMENTA UNO
		$tfolio = "select * from folios where nombre = 'compras' and anio = '".date('Y')."' ";
		$r = mysql_query($tfolio) or die(mysql_errno());
		if (mysql_num_rows($r) == 0) {
			$folios = "insert into folios (nombre,anio,consecutivo) values('compras','".date('Y')."',1) ";
			$rf = mysql_query($folios) or die(mysql_error());
			$r = mysql_query($tfolio) or die(mysql_errno());
			while($rows = mysql_fetch_array($r)){
                    $con = $rows['consecutivo'];
              }
              $folio.= $con;
		} else {
			while($row = mysql_fetch_array($r)){
                    $respuesta = $row['consecutivo'];
              }
              if ($respuesta['consecutivo'] > 0) {
              	$respuesta['consecutivo'] = $respuesta['consecutivo'] + 1;
              	$uf = "update folios set consecutivo = '".$respuesta."' where nombre = 'compras' and anio = '".date('Y')."' ";
              	mysql_query($uf) or die(mysql_error());
              	$folio.= $respuesta;
              }
		}
			//SE INSERTA LA COMPRA Y SE RECUPERA EL FOLIO
		$insventa = "insert into compras (folio,fecha,proveedor,total) values ('".$folio."',
      		'".$fecha."','".$id_prov."',0) ";
		$rventa = mysql_query($insventa) or die(mysql_error());
		$recfol = "select folio from compras where folio = '".$folio."' ";
		$ref = mysql_query($recfol) or die(mysql_error());
		if (mysql_num_rows($ref) > 0) {			
			while($rows = mysql_fetch_array($ref) ) {
                    $vfolio = $rows['folio'];
              }
          }
                //SE INSERTA EL DETALLE DE LA COMPRA Y SE CALCULA EL TOTAL
          foreach ($detalle as $key => $value) {
			$total = $total + $value['subtotal'];
			$sql = "insert into detalle_compra (folio,clave_producto,cantidad,precio,subtotal)
			values('".$vfolio."','".$value['codigo']."','".$value['cantidad']."',
				'".$value['precio']."','".$value['subtotal']."' )  ";
			$resultado = mysql_query($sql) or die(mysql_error());
			}
			$t = "update compras set total = '".$total."' where folio = '".$vfolio."' ";
			mysql_query($t)or die(mysql_error());
			if ($resultado == true) {
				$res = true;
				$salidaJSON = array('respuesta' => $res );
				print json_encode($salidaJSON);
			} else {
				$fallo = true;
				$falloJSON = array('fallo' => $fallo);
				print(json_encode($falloJSON));
			}
	}


	function buscar_proveedor(){
		$prov = trim($_POST['prov']);
		if (!empty($prov)) {
			$sql = "select clave_proveedor,nombre,contacto
                	from proveedores 
        	WHERE nombre LIKE '%".$prov."%'  and status = 'ACTIVO' ";
	        $resultado = mysql_query($sql) or die(mysql_error());
	        $contar = mysql_num_rows($resultado);
	        if($contar > 0){
              while($row = mysql_fetch_array($resultado)){
              	$respuesta->id = $row['clave_proveedor'];
                $respuesta->nombre = $row['nombre'];
              }
	        	print(json_encode($respuesta));
	        } else {
	            $sql = "select clave_proveedor,nombre,contacto
	                  from proveedores 
	                  WHERE contacto LIKE '%".$prov."%' and status = 'ACTIVO' ";
	              $resultado = mysql_query($sql) or die(mysql_error());
	              $contar = mysql_num_rows($resultado);
	              if($contar > 0){
	                  while($row = mysql_fetch_array($resultado)){
	                  	$respuesta->id = $row['clave_proveedor'];
	                    $respuesta->contacto = $row['contacto'];
	                  }
		        	print(json_encode($respuesta));
	              } else {
	              	$noexiste = true;
		       	 	$noexisteJSON = array('noexiste' => $noexiste);
		       	 	print(json_encode($noexisteJSON));
	              }
	        }
		} else {
				echo json_encode("Vacio");
			}
	}

	function buscar_producto(){
		$prod = trim($_POST['prod']);
		if (!empty($prod)) {
			$consulta = "select clave_producto,nombre_libro,p.compra
						from productos p
			    		inner join libros l on l.clave_libro = p.nombre_producto
        				WHERE nombre_libro LIKE '%".$prod."%' and p.status = 'DISPONIBLE' ";

        $resultado = mysql_query($consulta) or die(mysql_error());
        $con = mysql_num_rows($resultado);
        if ($con == 0 ) {
        	$noexiste = true;
       	 	$noexisteJSON = array('noexiste' => $noexiste);
       	 	print(json_encode($noexisteJSON));
       		} else {
	       	 	while ($row = mysql_fetch_array($resultado)) {
	        		$respuesta->clave_producto = $row['clave_producto'];
	        		$respuesta->nombre_libro = $row['nombre_libro'];
	        		$respuesta->precio = $row['compra'];
	        	}
	        	  if (empty($respuesta->nombre_libro)) {
	        		$vacio = true;
		       	 	$salidaJSON = array('vacio' => $vacio);
		       	 	print(json_encode($salidaJSON));
	        	} else {
	        		print(json_encode($respuesta));
	        	}
			}
		} else {
				echo json_encode("Vacio");
			}
	}

 ?>