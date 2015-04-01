<?
Include(“Conex.php”):
$Sql=”delete from TAlumno where
CedulaAlumno=’”.$_POST[“CedulaAlumno”].”’”;
If($Resultado=mysql_query($Sql,$Link)){
 Header(“location:ListadoAlumno.php”);
}else{
Echo(“Error al eliminar el registro”);
}
?>