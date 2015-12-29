<?php 
	header('Content-Type: text/html');
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

	$pdf->ezSetCmMargins(1.5,1,2,1.5);
	$pdf->setFontFamily('Helvetica',$tmp);
	$pdf->selectFont('fonts/Helvetica.afm');

	$result = mysql_query("select l.clave_libro as isbn,nombre_libro,
		nombre_autor,e.nombre_editorial
			from lb l
			inner join autor a on a.clave_libro = l.clave_libro
			inner join editorial e on e.clave_libro = l.clave_libro ");
	$i = 0;
	while ($datatmp = mysql_fetch_assoc($result)) {
		$datatmp['nombre_libro'] = utf8_encode($datatmp['nombre_libro']);
		$datatmp['nombre_autor'] = utf8_encode($datatmp['nombre_autor']);
		$datatmp['nombre_editorial'] = utf8_encode($datatmp['nombre_editorial']);
		$data[]=$datatmp;
	    $i++ ;
	}
	$options = array(
		'shadeHeadingCol'=>array(0.6,0.6,0.5),
		'shadeCol'=>array(0.9,0.9,0.9),
		'xOrientation'=>'center',
		'width'=>550,
		'fontSize'=>8 ,
		'xPos'=>'center',
	);	
	$titles = array('isbn'=>'<b>ISBN</b>',
					'nombre_libro'=>'<b>NOMBRE LIBRO</b>',
					'nombre_autor'=>'<b>NOMBRE AUTOR</b>',
					'nombre_editorial'=>'<b>NOMBRE EDITORIAL</b>' );
	

		//cabecera del pdf (objeto para todas las páginas)
	$all = $pdf->openObject();
	$pdf->saveState();
	$pdf->line($pdf->ez['leftMargin'], $pdf->ez['bottomMargin']+10, $pdf->ez['pageWidth']-$pdf->ez['rightMargin'], $pdf->ez['bottomMargin']+10);//the bottom line

	$pdf->addJpegFromFile("../img/libro.jpg",50,750,60);  

	$pdf->addText(200,800,12,"<b>Distribuciones y Representaciones Arvizu </b>\n"); 
	$pdf->addText(230,780,12,"<i>!Leer Aumenta el Saber! </i>\n"); 
	$pdf->addText(250,760,12,"<b>Listado Libros </b>\n"); 
	
	$pdf->ezText("\n\n", 10);
	$pdf->addText(50,30,8,"<b>Fecha: </b>\n".date("d/m/Y")); 
	$pdf->ezStartPageNumbers($pdf->ez['pageWidth']-($pdf->ez['rightMargin']-10), $pdf->ez['bottomMargin'],8, 'PAGINA', '{PAGENUM} de {TOTALPAGENUM}');

	$pdf->restoreState();
	$pdf->closeObject();
	$pdf->addObject($all,'all');
	$pdf->ezSetCmMargins(4,3,3,3);

	$pdf->ezText("\n\n", 10);
	$pdf->ezTable($data,$titles,'',$options);
	
	ob_end_clean();
	$pdf->ezStream();

?>