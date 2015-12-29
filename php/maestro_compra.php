<?php 
	header('Content-Type: application/json');
	error_reporting(0);

	require_once('conexion.php');
	conectarse();

		$page = $_GET['page']; // get the requested page
		$limit = $_GET['rows']; // get how many rows we want to have into the grid
		$sidx = $_GET['sidx']; // get index row - i.e. user click to sort
		$sord = $_GET['sord']; // get the direction
		if (!$sidx) $sidx = 1;

		$result = mysql_query("select COUNT(*) AS count FROM compras ");
		$row = mysql_fetch_array($result,MYSQL_ASSOC);
		$count = $row['count'];

		if( $count >0 ) {
			$total_pages = ceil($count/$limit);
		} else {
			$total_pages = 0;
		}
		if ($page > $total_pages) $page=$total_pages;
		$start = $limit*$page - $limit; // do not put $limit*($page - 1)
		$SQL = "select c.folio,c.fecha,p.nombre,c.total
				from compras c
				inner join proveedores p on p.clave_proveedor = c.proveedor
				where c.status = 'PAGADA'
				ORDER BY $sidx $sord LIMIT $start , $limit";
		$result = mysql_query( $SQL ) or die("Couldn t execute query.".mysql_error());

		$responce->page = $page;
		$responce->total = $total_pages;
		$responce->records = $count;
		$i = 0;
		while($row = mysql_fetch_array($result,MYSQL_ASSOC)) {
		    $responce->rows[$i]['folio'] = $row['folio'];
		    $responce->rows[$i]['cell'] = array($row['folio'],$row['fecha'],$row['nombre'],$row['total'] );
		    $i++;
		}        
		echo json_encode($responce);



 ?>