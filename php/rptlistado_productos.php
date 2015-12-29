<?php 
  header('Content-Type: application/json');
  error_reporting(0);
  require_once('conexion.php');
  require_once('../ezpdf/Cezpdf.php');
 conectarse();
$pdf = new Cezpdf('a4');
$tmp = array(
 'b'=>'Helvetica-Bold'
 ,'i'=>'Helvetica-Oblique'
 ,'bi'=>'Helvetica-BoldOblique'
 ,'ib'=>'Helvetica-BoldOblique'
 ,'bb'=>'Times-Roman'
 );
$pdf->setFontFamily('helvetica',$tmp);

$pdf->selectFont('fonts/helvetica.afm');
$pdf->ezSetCmMargins(1,1,1.5,1.5);

//Data loading
$sql = "select p.clave_producto,l.nombre_libro,prov.nombre,p.codigo_proveedor,
    p.compra,p.venta
    from productos p
    inner join libros l on l.clave_libro = p.nombre_producto
    inner join proveedores prov on prov.clave_proveedor = p.proveedor 
    where p.status = 'DISPONIBLE' ORDER BY p.clave_producto ASC";
$rs = mysql_query($sql);
if (mysql_num_rows($rs)>0){
   $ixx = 0;
    while($datatmp = mysql_fetch_assoc($rs)) {
        $ixx = $ixx+1;
        $data[] = array_merge($datatmp, array('clave_producto'=>$ixx));
        }
    }
$titles = array(
                'clave_producto'=>'<b>Id</b>',
                'nombre_libro'=>'<b>Nombre Libro</b>',
                'nombre'=>'<b>Proveedor</b>',
                'codigo_proveedor'=>'<b>Cód. Proveedor</b>',
                'compra'=>'<b>Precio Compra</b>',
                'venta'=>'<b>Precio Venta</b>'
            );
$options = array(
                'shadeCol'=>array(0.9,0.9,0.9),
                'xOrientation'=>'center',
                'width'=>580,
                'shadeHeadingCol'=>array(0.6,0.6,0.5),
                'justification'=>'center',
                'cols'=>array('clave_producto'=>array('justification'=>'center'),
                    'nombre_libro'=>array('justification'=>'center'),
                    'nombre'=>array('justification'=>'center'),
                    'compra'=>array('justification'=>'center'),
                    'venta'=>array('justification'=>'center') ),
            );
$pdf->ezImage('../img/libro.jpg',0,60,'none','left');
$pdf->line($pdf->ez['leftMargin'], $pdf->ez['bottomMargin']+10, $pdf->ez['pageWidth']-$pdf->ez['rightMargin'], $pdf->ez['bottomMargin']+10);//the bottom line
$pdf->addText(200,790,12,"<b>Distribuciones y Representaciones Arvizu </b>\n"); 
$pdf->addText(250,770,12,"<i>!Leer Aumenta el Saber! </i>\n"); 
$pdf->ezText("Listado de Productos\n",16,array('left'=>'200'));
$pdf->ezTable($data, $titles, '', $options);
$pdf->ezText("\n\n\n", 10);
$pdf->addText(50,30,8,"<b>Fecha: </b>\n".date("d/m/Y")); 
$pdf->ezStartPageNumbers($pdf->ez['pageWidth']-($pdf->ez['rightMargin']-10), $pdf->ez['bottomMargin'],8, 'PAGINA', '{PAGENUM} de {TOTALPAGENUM}',1);
$pdf->addText(50,30,10);//bottom text
$pdf->ezStream();

 ?>