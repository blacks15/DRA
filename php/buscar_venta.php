<?php 
	
	require_once('conexion.php');
	header('Content-Type: application/json');
	error_reporting(0);
	conectarse();

	$buscar = trim($_GET['term']);

      if(!empty($buscar)) {
      	$sql = "select nombre_libro
                	from productos p
			    inner join libros l on l.clave_libro = p.nombre_producto
        	WHERE nombre_libro LIKE '%".$buscar."%' and p.status = 'DISPONIBLE' ";
        $resultado = mysql_query($sql) or die(mysql_error());
        $contar = mysql_num_rows($resultado);

        if($contar == 0){
              
        }else{
              while($row = mysql_fetch_array($resultado)){
                    $respuesta[] = $row['nombre_libro'];
              }
              print(json_encode($respuesta));
        }
	}

 ?>