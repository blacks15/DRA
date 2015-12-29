<?php 
	header('Content-Type: text/html');
	header('Content-Type: application/pdf');

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

	$date = trim($_GET['date']);
	$dateb = trim($_GET['dateb']);
	$fecha = date('Y-m-d',strtotime($date));
	$fecha2 = date('Y-m-d',strtotime($dateb));

	if (empty($dateb)) {
		$result = mysql_query("select folio,fecha,total
					from ventas v
					inner join clientes c on c.matricula = v.cliente
					where v.status = 'PAGADA' and fecha = '".$fecha."'  
					order by fecha asc ");

		while ($datatmp = mysql_fetch_assoc($result)) {
			$data[] = array_merge($datatmp, array('folio'));
		}
	} else {
		$result = mysql_query("select folio,fecha,total
					from ventas v
					inner join clientes c on c.matricula = v.cliente
					where v.status = 'PAGADA' and 
						fecha between '".$fecha."' and '".$fecha2."'
					order by fecha asc ");

		while ($datatmp = mysql_fetch_assoc($result)) {
			$data[] = array_merge($datatmp, array('folio'));
		}
	}

	$options = array(
		'shadeHeadingCol'=>array(0.6,0.6,0.5),
		'shadeCol'=>array(0.9,0.9,0.9),
		'xOrientation'=>'center',
		'width'=>550,
		'fontSize'=>8 ,
		'xPos'=>'center',
	);	
	$titles = array('folio'=>'<b>FOLIO</b>',
					'fecha'=>'<b>FECHA</b>',
					'total'=>'<b>TOTAL</b>' );
	

		//cabecera del pdf (objeto para todas las páginas)
	$all = $pdf->openObject();
	$pdf->saveState();
	$pdf->line($pdf->ez['leftMargin'], $pdf->ez['bottomMargin']+10, $pdf->ez['pageWidth']-$pdf->ez['rightMargin'], $pdf->ez['bottomMargin']+10);//the bottom line

	$pdf->addJpegFromFile("../img/libro.jpg",50,750,60);  

	$pdf->addText(200,800,12,"<b>Distribuciones y Representaciones Arvizu </b>\n"); 
	$pdf->addText(230,780,12,"<i>!Leer Aumenta el Saber! </i>\n"); 
	$pdf->addText(260,760,12,"<b>Reporte de Ventas</b>\n"); 
	
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