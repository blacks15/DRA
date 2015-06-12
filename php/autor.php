<?php

	include("conexion.php");
	conectarse();

	$opc = $_POST["opc"];
	switch ($opc) 
	{
		case 'guardar_autor':
			guardar_autor();
		break;
		
		case 'baja_autor':
			baja_autor();
		break;

		case 'consultar_autor':
			consultar_autor();
		break;

		case 'modificar_autor':
			modificar_autor();
		break;
	}

	function guardar_autor()
	{
		$first_name = $_POST['first_name'];
		$last_name = $_POST['last_name'];
		$estado = 'Activo';

		$consulta = "insert into autores (firstname_autor,lastname_autor,estado) values('".$first_name."','".$last_name."','".$estado."')";
		//ejecutar consulta
		$resultado = mysql_query($consulta) or die(mysql_error());
		$respuesta = false;

		if ($resultado)
		{
			$respuesta = true;
			$salidaJSON = array('respuesta' => $respuesta );
			print json_encode($salidaJSON);
			mysql_close($conecta);
		}else{
			echo "Ocurrio un Error";
		}
  	}
  	
  		$page = $_POST['page'];  // Almacena el numero de pagina actual
   		$limit = $_POST['rows']; // Almacena el numero de filas que se van a mostrar por pagina
   		$sidx = $_POST['sidx'];  // Almacena el indice por el cual se hará la ordenación de los datos
    	$sord = $_POST['sord'];  // Almacena el modo de ordenación
    	if(!$sidx) $sidx =1;
  		
  		// Se hace una consulta para saber cuantos registros se van a mostrar
   		 $result = mysql_query("SELECT COUNT(*) AS count FROM autores");

    // Se obtiene el resultado de la consulta
   		 $fila = $result->fetch_array();
   		 $count = $fila['count'];

    //En base al numero de registros se obtiene el numero de paginas
   		 if( $count >0 ) {
			$total_pages = ceil($count/$limit);
   		 } else {
			$total_pages = 0;
   		 }
   		 if ($page > $total_pages)
        	$page=$total_pages;

    //Almacena numero de registro donde se va a empezar a recuperar los registros para la pagina
   		 $start = $limit*$page - $limit; 

  			$consulta = "select clave_autor,firstname_autor,lastname_autor,estado from autores";
			$resultado = mysql_query($consulta) or die(mysql_error());
  		
  		// Se agregan los datos de la respuesta del servidor
    		 $respuesta->page = $page;
   			 $respuesta->total = $total_pages;
   			 $respuesta->records = $count;
   			 $i=0;
    		while( $fila = $result->fetch_assoc() ) {
       			 $respuesta->rows[$i]['id']=$fila["idCliente"];
       			 $respuesta->rows[$i]['cell']=array($fila["idCliente"],$fila["nombre"],$fila["direccion"],$fila["telefono"],$fila["email"]);
        		 $i++;
    		}

   	 // La respuesta se regresa como json
    		echo json_encode($respuesta);
  	
?>