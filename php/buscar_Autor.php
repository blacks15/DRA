<?php 
  include('conexion.php');
  header('Content-Type: application/json');
  error_reporting(0);
  
  conectarse();

      $page = $_POST['page'];  // Almacena el numero de pagina actual
      $limit = $_POST['rows']; // Almacena el numero de filas que se van a mostrar por pagina
      $sidx = $_POST['sidx'];  // Almacena el indice por el cual se hará la ordenación de los datos
      $sord = $_POST['sord'];  // Almacena el modo de ordenación
      if(!$sidx){ 
        $sidx = 1;
      }
      // Se hace una consulta para saber cuantos registros se van a mostrar
       $result = mysql_query("select COUNT(*) AS count FROM autores");
  
    // Se obtiene el resultado de la consulta
       $row = mysql_fetch_array($result,MYSQL_ASSOC);
       $count = $row['count'];

    //En base al numero de registros se obtiene el numero de paginas
       if( $count > 0 ) {
          $total_pages = ceil($count / $limit);
       } else {
          $total_pages = 0;
       }
      if ($page > $total_pages){
          $page = $total_pages;
        }
          $start = $limit * $page - $limit;

        $consulta = "select clave_autor,firstname_autor,lastname_autor,estado from autores ORDER BY $sidx $sord";
        $resultado = mysql_query($consulta) or die(mysql_error());

      // Se agregan los datos de la respuesta del servidor
         $responce ->page = $page;
         $responce ->total = $total_pages;
         $responce ->records = $count;
         $i=0;

        while($row = mysql_fetch_array($resultado,MYSQL_ASSOC)) {
         $responce->rows[$i]['clave_autor'] = $row['clave_autor'];
         $responce->rows[$i]['cell'] = array($row[clave_autor],$row[firstname_autor],$row[lastname_autor],$row[estado]);
         $i++;
        }      

        echo json_encode($responce);
 ?>