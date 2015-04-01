<?
if(!@$Link=mysql_connect("localhost","usuario","contraseña"))
{
die("Error Al Tratar De Conectar");
}
if(!@mysql_select_db("BDVentaLibros	"))
{	
die ("Error Al Tratar De Conectar Con La Base De Datos");
} 