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
    $search['like']=elements(array('firstname_autor','lastname_autor'),$_REQUEST);
    //haciendo un recorrido sobre ellos vamos creando la consulta.
    foreach($search['like'] as $key => $value){
      if($value != false) $b[]="$key like '%$value%'";
    }
    //Usamos la funcion elements para crear un arreglo con los datos que van a ser para buscar por like
    $search['where'] = elements(array('firstname_autor','lastname_autor'),$_REQUEST);
    //haciendo un recorrido sobre ellos vamos creando al consulta.
    foreach($search['where'] as $key => $value){
      if($value != false) $b[]="$key = '$value'";
    }
    //Creamos la consulta where
    $se=" where estado = 'Activo' and ".implode(' and ',$b );   
     
  }
  //Realizamos la consulta para saber el numero de filas que hay en la tabla con los filtros
  $query = mysql_query("select count(*) as t from autores".$se);
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
    $sql = "select clave_autor,firstname_autor,lastname_autor,estado from autores where  estado = 'Activo'";
    $query = mysql_query($sql);
    
    if(!$query)
    echo mysql_error();
  } else {
  //Creamos la consulta que va a ser enviada de una ves con la parte de filtrado
  $sql = "select clave_autor,firstname_autor,lastname_autor,estado from autores".$se;
    
  $query = mysql_query($sql);
  if(!$query)
    echo mysql_error();
}
  $result = array();
  $i = 0;

    while($row = mysql_fetch_object($query)){
      $result[$i]['clave_autor']=$row->clave_autor;
      $result[$i]['cell']=array($row->clave_autor,$row->firstname_autor,$row->lastname_autor,$row->estado);
      $i++;    
  }   
  //Asignamos todo esto en variables de json, para enviarlo al navegador.
  $json->rows = $result;
  $json->total = $total_pages;
  $json->page = $post['page'];
  $json->records = $count;
  echo json_encode($json);

 function elements($items, $array, $default = FALSE)
  {
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