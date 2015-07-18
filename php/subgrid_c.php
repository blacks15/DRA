<?php
	header('Content-Type: application/json');
	error_reporting(0);

	require_once('conexion.php');
	conectarse();

	$examp = $_GET["q"]; //query number

	$page = $_GET['page']; // get the requested page
	$limit = $_GET['rows']; // get how many rows we want to have into the grid
	$sidx = $_GET['sidx']; // get index row - i.e. user click to sort
	$sord = $_GET['sord']; // get the direction
	$id = $_GET['id'];
	if(!$sidx) $sidx =1;

switch ($examp) {
    case 1:
		$result = mysql_query("select COUNT(*) AS count FROM compras WHERE id=".$id);
		$row = mysql_fetch_array($result,MYSQL_ASSOC);
		$count = $row['count'];

		if( $count >0 ) {
			$total_pages = ceil($count/$limit);
		} else {
			$total_pages = 0;
		}
        if ($page > $total_pages) 
        	$page = $total_pages;
		$start = $limit * $page - $limit; // do not put $limit*($page - 1)
		if ($start < 0) $start = 0;
        $SQL = "select dc.clave_producto as codigo,l.nombre_libro as producto,dc.cantidad,dc.precio,
        		dc.subtotal 
        		from detalle_compra dc
        		inner join productos p on p.clave_producto = dc.clave_producto
        		INNER JOIN libros l on l.clave_libro = p.nombre_producto
        		WHERE folio=".$id."
        		ORDER BY $sidx $sord LIMIT $start , $limit";
		$result = mysql_query( $SQL ) or die("Couldnt execute query.".mysql_error());
        $responce->page = $page;
        $responce->total = $total_pages;
        $responce->records = $count;
        $i=0;
		while($row = mysql_fetch_array($result,MYSQL_ASSOC)) {
			$responce->rows[$i]['codigo'] = $row['codigo'];
            $responce->rows[$i]['cell'] = array($row['codigo'],$row['producto'],$row['cantidad'],$row['precio'],$row['subtotal'] );
            $i++;
		}        
        echo json_encode($responce);
           
        break;
}

?>