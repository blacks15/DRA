<?php 
	require_once('conexion.php');
	header('Content-Type: application/json');
	error_reporting(0);
	conectarse();

	$opc = $_POST["opc"];
	switch ($opc) {
		case 'guardar_corte':
			guardar_corte();
		break;
	}

	function guardar_corte(){
				//creamos folio apartir del año actual
		$anio = date('Y-m');
		$anio = str_replace("-","",$anio);
		$folio = $anio * 1000;
		$folio  = $folio;
		$user = trim($_POST['user']);
		$date = trim($_POST['date']);
		$fe = date('Y-m-d',strtotime($date));
					//RECIBIMOS LAS VARIABLES PARA EL DETALLE DE VENTA
		$json = trim($_POST['detalle']);
		$detalle = json_decode($json,true);
		$corte = mysql_query("select * from cortecaja where fecha = '".$fe."' ");
		if (mysql_num_rows($corte) == 0) {
					//CREAMOS EL CONSECUTIVO SINO EXISTE Y SI EXISTE SE LE INCREMENTA UNO
		$tfolio = "select consecutivo from folios where nombre = 'cortecaja' and anio = '".date('Y')."' ";
		$r = mysql_query($tfolio) or die(mysql_errno());
		if (mysql_num_rows($r) == 0) {
			$folios = "insert into folios (id,nombre,anio,consecutivo) values(3,'cortecaja','".date('Y')."',1) ";
			$rf = mysql_query($folios) or die(mysql_error());
			$r = mysql_query($tfolio) or die(mysql_errno());
			while($rows = mysql_fetch_array($r)){
                    $con = $rows['consecutivo'];
              }
              $folio.= $con;
		} else {
			while($rows = mysql_fetch_array($r)){
                    $respuesta = $rows['consecutivo'];
              }
              	$respuesta = $respuesta + 1;
              	$uf = "update folios set consecutivo = '".$respuesta."' where nombre = 'cortecaja' and anio = '".date('Y')."' ";
              	mysql_query($uf) or die(mysql_error());
              	$folio.= $respuesta;
		}          //SE INSERTA EL DETALLE DE LA VENTA Y SE CALCULA EL TOTAL
              foreach ($detalle as $key => $value) {
				$sql = "insert into cortecaja (folio,fecha,empleado,ingreso,egreso,total)
				values('".$folio."','".$value['fecha']."','".$user."',
					'".$value['ingreso']."','".$value['egreso']."','".$value['total']."' )  ";
				$resultado = mysql_query($sql) or die(mysql_error());
				}
				if ($resultado == true) {
					$res = true;
					$salidaJSON = array('respuesta' => $res);
					print json_encode($salidaJSON);
				} else {
					$fallo = true;
					$falloJSON = array('fallo' => $fallo);
					print(json_encode($falloJSON));
				}
		} else {
			$existe = true;
			$existeJSON = array('existe' =>$existe);
			print(json_encode($existeJSON));
		}
	}

 ?>