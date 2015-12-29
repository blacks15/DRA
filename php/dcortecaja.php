<?php 
	require_once('conexion.php');
	header('Content-Type: application/json');
	error_reporting(0);
	conectarse();

  $date = date("F d, Y, g:i "); 
  $fecha = date('Y-m-d',strtotime($date));
    //Creamos un arreglo con los datos que envia JqGrid
  $post = array(
    'limit'=>(isset($_REQUEST['rows']))?$_REQUEST['rows']:'',
    'page'=>(isset($_REQUEST['page']))?$_REQUEST['page']:'',
    'orderby'=>(isset($_REQUEST['sidx']))?$_REQUEST['sidx']:'',
    'orden'=>(isset($_REQUEST['sord']))?$_REQUEST['sord']:'',
    'search'=>(isset($_REQUEST['_search']))?$_REQUEST['_search']:'',
  );
      //Realizamos la consulta para saber el numero de filas que hay en la tabla con los filtros
  $query = mysql_query("select count(*) as t
   from ventas where status = 'PAGADA' and fecha = '".$fecha."'  ");
  if(!$query)
    echo mysql_error();
  $count = mysql_result($query,0);
  if( $count > 0 && $post['limit'] > 0) {
     //Calculamos el numero de paginas que tiene el sistema
    $total_pages = ceil($count/$post['limit']);
    if ($post['page'] > $total_pages) $post['page']=$total_pages;
     //calculamos el offset para la consulta mysql.
    $post['offset']=$post['limit']*$post['page'] - $post['limit'];
  } else {
    $total_pages = 0;
    $post['page'] = 0;
    $post['offset'] = 0;
  }
    $consulta = "select sum(retiro) as egreso from retiros where fecha = '".$fecha."' ";
    $res = mysql_query($consulta)or die(mysql_error());
    while ($rows = mysql_fetch_object($res) ) {
      $egreso = $rows->egreso;
    }
    $sql = "select fecha,sum(total) as ingreso
          from ventas
          where status = 'PAGADA' and fecha = '".$fecha."' 
           group by fecha  ";
    if( !empty($post['orden']) && !empty($post['orderby']))
     //Añadimos de una ves la parte de la consulta para ordenar el resultado
    $sql .= " ORDER BY $post[orderby] $post[orden] ";
  if($post['limit'] && $post['offset']) $sql.=" limit $post[offset], $post[limit]";
      //añadimos el limite para solamente sacar las filas de la pagina actual que el sistema esta consultando
    else if($post['limit']) $sql .=" limit 0,$post[limit]";
    $query = mysql_query($sql);
    
    if(!$query)
    echo mysql_error();
  $result = array();
  $i = 0;

     while($row = mysql_fetch_object($query)){
      $total = $row->ingreso - $egreso;
      $result[$i]['cell'] = array($row->fecha,$row->ingreso,$egreso,$total );
     $i++;
    }     
  //Asignamos todo esto en variables de json, para enviarlo al navegador.
  $json->rows = $result;
  $json->total = $total_pages;
  $json->page = $post['page'];
  $json->records = $count;
  echo json_encode($json);
 ?>