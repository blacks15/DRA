<?
Include(“conexion.php”):
$Sql=”insert into usuarios
(CedulaAlumno,PrimerNombreAlumno)values($_POST[“CedulaAlumno”],
$_POST[“PrimerNombreAlumno”])”;
If($Resultado=mysql_query($Sql,$Link))
{
 Header(“location:ListadoAlumno.php”);
}
else
{
Echo(“Error al tratar de guardar”);
}
?> 
