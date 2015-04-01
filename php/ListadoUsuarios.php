<html>
<head>
<title></title>
</head>
<body>
<? include("conexion.php");
$Sql="select * from usuarios";
if(!@$Resultado = mysql_query($Sql,$Link))
{
die("Error");
}

<table>
 <tr>
 <td> Modificar</td>
 <td> Eliminar</td>
 <td>Cédula</td>
 <td>Nombre</td>
 <td>Sexo</td>
 </tr>
 
<?
while($Row=mysql_fetch_array($Resultado)){
?>

<tr>
 <td ><a href=”ModificarAlumno.php?CedulaAlumno=<?
echo($Row[“CedulaAlumno”]);?>”>Modificar</a> </td>
 <td ><a href=”EliminarAlumno.php?CedulaAlumno=<?
echo($Row[“CedulaAlumno”]);?>”>Eliminar</a> </td>
 <td ><? echo($Row[“CedulaAlumno”]);?></td>
 <td ><? echo($Row["PrimerNombreAlumno"]);?></td>
 <td ><? echo($Row["SexoAlumno"]);?></td>
</tr>
<? }?>
</table>
<div><a href=AgregarUsuario.php>Agregar un Usuario nuevo</a></div>
</body>
</html>
<? mysql_close();?> 