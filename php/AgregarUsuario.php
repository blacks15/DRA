<html>
<head>
<link rel="stylesheet" type=style.css" href="estilos/style.css">
<meta charset="utf-8">
<title> Datos de Empleados</title>
</head>
<body>
<div id="body">
<form name="DatosEmpleado" method="post" action="GuardarAlumno.php">
<table>
 <tr>
 <td>Nombre</td>
 <td><input type="text" size="10" maxlenght="15" name="NombreUsuario"></td>
 <td>Segundo Nombre</td>
 <td><input type="text" size="10" maxlenght="15" name="SegundoNombreUsuario"></td>
</tr>
 <tr>
 <td>Apellido Paterno</td>
 <td><input type="text" size="10" maxlenght="20" name="ApellidoPaterno"></td>
 <td>Apellido Materno</td>
 <td><input type="text" size="10" maxlenght="15" name="ApellidoMaterno"></td>
</tr>
<tr>
<td>Fecha Nacimiento:</td>
<td><input type = "text" name = "FechaNacimiento" ></td>
<td>Sexo:</td>
<td><select name = "Sexo">
<option>Hombre</option>
<option>Mujer</option>
</select>
</td>
<td> Teléfono : </td>
<td><input type = "text" size="10" maxlenght="15" name = "telefono" ><td>
</tr>
<tr>
<td> <label for = "NumeroInt">Número Int.: </td>
<td><input type = "text" size="5" maxlenght="15"name = "NumeroInt" ></td>
<td> Número Ext. : </td>
<td><input type = "text" size="6" maxlenght="15" name = "NumeroExt" ><td>
</tr>
<tr>
<td>Calle :</td>
<td><input type = "text" size="10" maxlenght="15" name = "Calle" ></td>
<td> Colonia : </td>
<td><input type = "text" size="10" maxlenght="30" name = "Colonia" ><td>
</tr>
<tr>
<td> Ciudad : </td>
<td><input type = "text" size="10" maxlenght="30" name = "Ciudad"></td>
<td>Estado :</td>
<td><input type = "text" size="10" maxlenght="30" name = "Estado" ></td>
</tr>
 <tr>
 <td><input type="submit" value="Guardar">
 <input type = "reset"></td>
</tr>
</table>
</form>
</div>
</body>
</html> 