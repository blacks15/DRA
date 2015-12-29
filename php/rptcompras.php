<?php 
  header('Content-Type: application/json');
  error_reporting(0);
  require_once('conexion.php');
  require_once('../ezpdf/Cezpdf.php');
 conectarse();

$pdf = new Cezpdf('a4');
	$tmp = array(
		'b'=>'Helvetica-Bold'
		,'i'=>'Courier-Oblique'
		,'bi'=>'Helvetica-BoldOblique'
		,'ib'=>'Helvetica-BoldOblique'
		,'bb'=>'Times-Roman'
	);

$pdf->setFontFamily('Helvetica',$tmp);
$pdf->selectFont('fonts/Helvetica.afm');

$pdf->ezSetCmMargins(1.5,1,2,3);
$pdf->addJpegFromFile("../img/libro.jpg",50,750,60);  
$folio = trim($_GET['folio']);

$result = mysql_query("select folio,fecha,p.nombre as nombre,total,
	concat(calle,' ',num_ext,' ',num_int,' ',colonia) as direccion,telefono, celular,email
						from compras c
						inner join proveedores p on p.clave_proveedor = c.proveedor
						where  folio = '".$folio."' ");

while ($datatmp = mysql_fetch_array($result)) {
	$datos = $datatmp['nombre'];
	$total = $datatmp['total'];
	$dir = $datatmp['direccion'];
	$tel = $datatmp['telefono'];
	$cel = $datatmp['celular'];
	$email = $datatmp['email'];
    $data[] = array_merge($datatmp, array('folio'));
}
	$options = array(
		'shadeHeadingCol'=>array(0.6,0.6,0.5),
		'shadeCol'=>array(0.9,0.9,0.9),
		'xOrientation'=>'right',
		'width'=>70,
		'fontSize'=>8 ,
		'xPos'=>480,
	);	$titlef = array('folio'=>'<b>Folio</b>',);
		$titles = array('fecha'=>'<b>Fecha</b>',);
		$titlet = array('total'=>'<b>Total</b>',);

$pdf->ezText("\n", 10);
$pdf->ezTable($data,$titlef,'',$options);
$pdf->ezText("\n", 10);
$pdf->ezTable($data,$titles,'',$options);
$pdf->ezText("\n", 10);

$pdf->addText(50,700,12,"<b>Proveedor: </b>\n"); 
$pdf->addText(130,700,12,$datos); 
$pdf->addText(50,680,12,"<b>Dirección: </b>\n"); 
$pdf->addText(130,680,12,$dir); 
$pdf->addText(50,660,12,"<b>Teléfono: </b>\n"); 
$pdf->addText(130,660,12,$tel); 
$pdf->addText(220,660,12,"<b>Celular: </b>\n"); 
$pdf->addText(270,660,12,$cel); 
$pdf->addText(50,640,12,"<b>E-mail: </b>\n"); 
$pdf->addText(130,640,12,$email); 

		//RECUPERANDO DETALLE DE VENTA
 $sql = mysql_query( "select dv.cantidad,l.nombre_libro,dv.precio,dv.subtotal 
 		from detalle_compra dv
 		inner join productos p on p.clave_producto = dv.clave_producto 
 		inner join libros l on l.clave_libro = p.nombre_producto 
 		where folio = '".$folio."' ");

	 while ($row = mysql_fetch_array($sql)) {
	 	$dat[] = array_merge($row);
	 }

 	$optionsdv = array(
		'shadeHeadingCol'=>array(0.6,0.6,0.5),
		'shadeCol'=>array(0.9,0.9,0.9),
		'xOrientation'=>'center',
		'width'=>500,
		'fontSize'=>10 ,
		'xPos'=>'center',
		'cols'=>array('cantidad'=>array('justification'=>'center'),
			'nombre_libro'=>array('justification'=>'center'),
			'precio'=>array('justification'=>'center'),
			'subtotal'=>array('justification'=>'center') ),
	);	$titledv = array('cantidad'=>'<b>Cantidad</b>',
						  'nombre_libro'=>'<b>Descripción</b>',
						  'precio'=>'<b>Precio</b>',
						  'subtotal'=>'<b>SubTotal</b>',);
$pdf->ezText("\n\n\n\n", 10);
$pdf->ezTable($dat,$titledv,'',$optionsdv);
$pdf->ezText("\n", 10);
$pdf->ezTable($data,$titlet,'',$options);

//cabecera del pdf (objeto para todas las pÃ¡ginas)
$all = $pdf->openObject();
$pdf->saveState();

$pdf->addText(200,790,12,"<b>Distribuciones y Representaciones Arvizu </b>\n"); 
$pdf->addText(230,770,12,"<i>!Leer Aumenta el Saber! </i>\n"); 

$pdf->restoreState();
$pdf->closeObject();
$pdf->addObject($all,'all');
$pdf->ezSetCmMargins(4,3,3,3);

ob_end_clean();
$pdf->ezStream();

 ?>