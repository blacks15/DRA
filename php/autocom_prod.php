<?php 
	
	require_once('conexion.php');
	header('Content-Type: application/json');
	error_reporting(0);
	conectarse();

	$buscar = trim($_GET['term']);

      if(!empty($buscar)) {
      	$sql = "select nombre_libro
                	from libros 
        	WHERE nombre_libro LIKE '%".$buscar."%' ";
        $resultado = mysql_query($sql) or die(mysql_error());
        $contar = mysql_num_rows($resultado);
        if($contar > 0){
              while($row = mysql_fetch_array($resultado)){
                    $respuesta[] = $row['nombre_libro'];
              }
              print(json_encode($respuesta));
        }
	}

 ?>