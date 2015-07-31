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

$result = mysql_query("select clave_autor,concat(nombre_autor,' ',apellido_autor) as nombre
                        from autores 
                        where estado = 'ACTIVO'  ");

    while ($datatmp = mysql_fetch_array($result)) {
        $data[] = array_merge($datatmp, array('clave_autor'));
    }
    $options = array(
        'shadeHeadingCol'=>array(0.6,0.6,0.5),
        'shadeCol'=>array(0.9,0.9,0.9),
        'xOrientation'=>'center',
        'width'=>400,
        'fontSize'=>8 ,
        'xPos'=>'center',
        'cols'=>array('clave_autor'=>array('justification'=>'center'),
                    'nombre'=>array('justification'=>'center'), )
    );  $titles = array('clave_autor'=>'<b>ID</b>',
                        'nombre'=>'<b>NOMBRE AUTOR</b>', );
$pdf->ezText("\n\n\n\n\n", 10);
$pdf->ezTable($data,$titles,'',$options);

//cabecera del pdf (objeto para todas las pÃ¡ginas)
$all = $pdf->openObject();
$pdf->saveState();
$pdf->line($pdf->ez['leftMargin'], $pdf->ez['bottomMargin']+10, $pdf->ez['pageWidth']-$pdf->ez['rightMargin'], $pdf->ez['bottomMargin']+10);//the bottom line

$pdf->addText(200,790,12,"<b>Distribuciones y Representaciones Arvizu </b>\n"); 
$pdf->addText(230,770,12,"<i>!Leer Aumenta el Saber! </i>\n"); 
$pdf->addText(200,740,12,"<b>Listado Autores </b>\n"); 

$pdf->ezText("\n\n\n", 10);
$pdf->addText(50,30,8,"<b>Fecha: </b>\n".date("d/m/Y")); 
$pdf->ezStartPageNumbers($pdf->ez['pageWidth']-($pdf->ez['rightMargin']-10), $pdf->ez['bottomMargin'],8, 'PAGINA', '{PAGENUM} de {TOTALPAGENUM}',1);
$pdf->addText(50,30,10);//bottom text
$pdf->restoreState();
$pdf->closeObject();
$pdf->addObject($all,'all');
$pdf->ezSetCmMargins(4,3,3,3);

ob_end_clean();
$pdf->ezStream();

 ?>