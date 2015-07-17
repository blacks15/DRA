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

		case 'guardar_venta':
			guardar_venta();
		break;
	}

	function guardar_venta(){
			//creamos folio apartir del año actual
		$anio = date('Y-m');
		$anio = str_replace("-","",$anio);
		$folio = $anio * 1000;
		$folio  = $folio;
		$user = trim($_POST['user']);
		$cliente = trim($_POST['cliente']);
			//RECIBIMOS LAS VARIABLES PARA EL DETALLE DE VENTA
		$json = trim($_POST['detalle']);
		$detalle = json_decode($json,true);
			//CONSULTAR SI HAY PRODUCTOS SUFICIENTES PARA REALIZAR LA VENTA LA VENTA
		 foreach ($detalle as $key => $value) {
				$p = "select cantidad_actual from productos where clave_producto = '".$value['codigo']."' ";
				$ca = mysql_query($p) or die(mysql_error());
				while ($row = mysql_fetch_array($ca)) {
					if ($row['cantidad_actual'] - $value['cantidad'] <= 0) {
						$name = $value['producto'];
						$ins = true;
						$salidaJSON = array('ins' => $ins,
											'name' => $name);
		       	 		print(json_encode($salidaJSON));
					}
				}
			}
			//CREAMOS EL CONSECUTIVO SINO EXISTE Y SI EXISTE SE LE INCREMENTA UNO
		$tfolio = "select * from folios where nombre = 'ventas' and anio = '".date('Y')."' ";
		$r = mysql_query($tfolio) or die(mysql_errno());
		if (mysql_num_rows($r) == 0) {
			$folios = "insert into folios (id,nombre,anio,consecutivo) values(1,'ventas','".date('Y')."',1) ";
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
              	$uf = "update folios set consecutivo = '".$respuesta."' where nombre = 'ventas' and anio = '".date('Y')."' ";
              	mysql_query($uf) or die(mysql_error());
              	$folio.= $respuesta;
              }
		}
			//SE RECIBE LA FECHA Y SE DA FORMATO MYSQL Y SE HACE LA INSERCION DE VENTA
		$date = trim($_POST['date']);
		$fecha = date('Y-m-d',strtotime($date));
      	$insventa = "insert into ventas (folio,fecha,empleado,cliente,total) values ('".$folio."',
      		'".$fecha."','".$user."','".$cliente."',0) ";
		$rventa = mysql_query($insventa) or die(mysql_error());
		$recfol = "select folio from ventas where folio = '".$folio."' ";
		$ref = mysql_query($recfol) or die(mysql_error());
		if (mysql_num_rows($ref) > 0) {			
			while($rows = mysql_fetch_array($ref) ) {
                    $vfolio = $rows['folio'];
              }
          } 
          //SE INSERTA EL DETALLE DE LA VENTA Y SE CALCULA EL TOTAL
              foreach ($detalle as $key => $value) {
				$total = $total + $value['subtotal'];
				$sql = "insert into detalle_venta (folio,clave_producto,cantidad,precio,subtotal)
				values('".$vfolio."','".$value['codigo']."','".$value['cantidad']."',
					'".$value['precio']."','".$value['subtotal']."' )  ";
				echo $sql;
				$resultado = mysql_query($sql) or die(mysql_error());
				}
				$t = "update ventas set total = '".$total."' where folio = '".$vfolio."' ";
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

	function buscar_producto(){
		$prod = trim($_POST['prod']);
		if (!empty($prod)) {
			$consulta = "select clave_producto,nombre_libro,p.venta,p.cantidad_actual
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
	        		$respuesta->precio = $row['venta'];
	        		$respuesta->cantidad = $row['cantidad_actual'];
	        	}
	        	  if ($respuesta->cantidad < 1) {
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