<?php
require('mysql_table.php');
require_once('conexion.php');
conectarse();

class PDF extends PDF_MySQL_Table{
function Header(){
    //Title
    $this->SetFont('Arial','',18);
    $this->Cell(0,6,'LISTADO CLIENTES',0,1,'C');
    $this->Ln(10);
    //Ensure table header is output
    parent::Header();
}
}

$pdf=new PDF();
$pdf->AddPage();
$pdf->Table("select matricula as id,empresa,concat(nombre_contacto,' ',apellido_paterno,' ',apellido_materno) as nombre,concat(calle,' ',numero,' ',colonia) as direccion,ciudad,estado,telefono,celular,email from clientes where status = 'ACTIVO' order by matricula desc ");
$pdf->Output(); 
?>