<?php 
	
	require_once('conexion.php');
	header('Content-Type: application/json');
	error_reporting(0);
	conectarse();

	$buscar = trim($_GET['term']);

      if(!empty($buscar)) {
      	$sql = "select nombre,contacto
                	from proveedores 
        	WHERE nombre LIKE '%".$buscar."%'  and status = 'ACTIVO' ";
        $resultado = mysql_query($sql) or die(mysql_error());
        $contar = mysql_num_rows($resultado);
        if($contar > 0){
              while($row = mysql_fetch_array($resultado)){
                    $respuesta[] = $row['nombre'];
              }
              print(json_encode($respuesta));
        } else {
            $sql = "select nombre,contacto
                  from proveedores 
                  WHERE contacto LIKE '%".$buscar."%' and status = 'ACTIVO' ";
              $resultado = mysql_query($sql) or die(mysql_error());
              $contar = mysql_num_rows($resultado);
              if($contar > 0){
                  while($row = mysql_fetch_array($resultado)){
                    $respuesta[] = $row['contacto'];
                  }
                  print(json_encode($respuesta));
              }
        }
	}

 ?>