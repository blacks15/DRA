<?php 
  require_once('conexion.php');
  header('Content-Type: application/json');
  error_reporting(0);
  
  conectarse();

//Creamos un arreglo con los datos que envia JqGrid
  $post = array(
    'limit'=>(isset($_REQUEST['rows']))?$_REQUEST['rows']:'',
    'page'=>(isset($_REQUEST['page']))?$_REQUEST['page']:'',
    'orderby'=>(isset($_REQUEST['sidx']))?$_REQUEST['sidx']:'',
    'orden'=>(isset($_REQUEST['sord']))?$_REQUEST['sord']:'',
    'search'=>(isset($_REQUEST['_search']))?$_REQUEST['_search']:'',
  );
  $se ="";
  //creamos la consulta de busqueda. 
  if($post['search'] == 'true'){
    $b = array();
    //Usamos la funci{on elements para crear un arreglo con los datos que van a ser para buscar por like
    $search['like']=elements(array('nombre_empleado','username'),$_REQUEST);
    //haciendo un recorrido sobre ellos vamos creando la consulta.
    foreach($search['like'] as $key => $value){
      if($value != false) $b[]="$key like '%$value%'";
    }
    //Usamos la funcion elements para crear un arreglo con los datos que van a ser para buscar por like
    $search['where'] = elements(array('nombre_empleado','username'),$_REQUEST);
    //haciendo un recorrido sobre ellos vamos creando al consulta.
    foreach($search['where'] as $key => $value){
      if($value != false) $b[]="$key = '$value'";
    }
    //Creamos la consulta where
    $se=" where ".implode(' or ',$b );   
     
  }
  //Realizamos la consulta para saber el numero de filas que hay en la tabla con los filtros
  if (!$se) {
    $query = mysql_query("select count(*) as t from usuarios ");
  if(!$query)
    echo mysql_error();
  $count = mysql_result($query,0);
  if( $count > 0 && $post['limit'] > 0) {
    //Calculamos el numero de paginas que tiene el sistema
    $total_pages = ceil($count/$post['limit']);
    if ($post['page'] > $total_pages) $post['page'] = $total_pages;
    //calculamos el offset para la consulta mysql.
    $post['offset'] = $post['limit'] * $post['page'] - $post['limit'];
  } else {
    $total_pages = 0;
    $post['page'] = 0;
    $post['offset'] = 0;
  }
  }
  $query = mysql_query("select count(*) as t from usuarios".$se);
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
    $post['page']=0;
    $post['offset']=0;
  }
  if (!$se) {
    $estado = 'activo';
    $sql = "select u.matricula,e.nombre as 'nombre_empleado',
      concat(e.apellido_paterno,' ',e.apellido_materno) as apellidos,u.nombre_usuario as 'username',
      u.fecha_creacion as fecha_creacion,u.status 
      from usuarios u 
      inner join empleados e on e.matricula = u.matricula ";
    if( !empty($post['orden']) && !empty($post['orderby']))
    //Añadimos de una ves la parte de la consulta para ordenar el resultado
    $sql .= " ORDER BY $post[orderby] $post[orden] ";
  if($post['limit'] && $post['offset']) $sql.=" limit $post[offset], $post[limit]";
    //añadimos el limite para solamente sacar las filas de la apgina actual que el sistema esta consultando
    elseif($post['limit']) $sql .=" limit 0,$post[limit]";
    $query = mysql_query($sql);
    
    if(!$query)
    echo mysql_error();
  } else {
  //Creamos la consulta que va a ser enviada de una ves con la parte de filtrado
  $sql = "select u.matricula,e.nombre as 'nombre_empleado',
    concat(e.apellido_paterno,' ',e.apellido_materno) as apellidos,u.nombre_usuario as 'username',
    u.fecha_creacion as fecha_creacion,u.status 
      from usuarios u 
      inner join empleados e on e.matricula = u.matricula ".$se;
    if( !empty($post['orden']) && !empty($post['orderby']))
    //Añadimos de una ves la parte de la consulta para ordenar el resultado
    $sql .= " ORDER BY $post[orderby] $post[orden] ";
  if($post['limit'] && $post['offset']) $sql.=" limit $post[offset], $post[limit]";
    //añadimos el limite para solamente sacar las filas de la apgina actual que el sistema esta consultando
    elseif($post['limit']) $sql .=" limit 0,$post[limit]";
  $query = mysql_query($sql);
  if(!$query)
    echo mysql_error();
}
  $result = array();
  $i = 0;

    while($row = mysql_fetch_object($query)){
      $result[$i]['matricula']=$row->matricula;
      $result[$i]['cell'] = array($row->matricula,$row->nombre_empleado,$row->apellidos,$row->username,
      $row->fecha_creacion,$row->status);
      $i++;    
  }   
  //Asignamos todo esto en variables de json, para enviarlo al navegador.
  $json->rows = $result;
  $json->total = $total_pages;
  $json->page = $post['page'];
  $json->records = $count;
  echo json_encode($json);

 function elements($items, $array, $default = FALSE) {
    $return = array();
    if ( ! is_array($items)){
      $items = array($items);
    }
    foreach ($items as $item){
      if (isset($array[$item])){
        $return[$item] = $array[$item];
      }else{
        $return[$item] = $default;
      }
    }
    return $return;
  }
 ?>