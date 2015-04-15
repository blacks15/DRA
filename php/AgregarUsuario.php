<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Cliente</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">

	<link href="../css/bootstrap.css" rel="stylesheet">
    <link href="../css/bootstrap-responsive.css" rel="stylesheet">
	<link href="../css/style.css" rel="stylesheet" >
	<link href="../js/google-code-prettify/prettify.css" rel="stylesheet">

    <script src="../js/jquery.js"></script>
    <script src="../js/bootstrap-transition.js"></script>
    <script src="../js/bootstrap-alert.js"></script>
    <script src="../js/bootstrap-modal.js"></script>
    <script src="../js/bootstrap-dropdown.js"></script>
    <script src="../js/bootstrap-scrollspy.js"></script>
    <script src="../js/bootstrap-tab.js"></script>
    <script src="../js/bootstrap-tooltip.js"></script>
    <script src="../js/bootstrap-popover.js"></script>
    <script src="../js/bootstrap-button.js"></script>
    <script src="../js/bootstrap-collapse.js"></script>
    <script src="../js/bootstrap-carousel.js"></script>
    <script src="../js/bootstrap-typeahead.js"></script>
    <script src="../js/bootstrap-affix.js"></script>
    <script src="../js/holder/holder.js"></script>
    <script src="../js/google-code-prettify/prettify.js"></script>
    <script src="../js/application.js"></script>
	
</head>
<body data-spy="scroll" data-target=".bs-docs-sidebar">
	<table width="100%">
 		<tr>
 		<td>
    	 <div class="btn-group" data-toggle="buttons-checkbox">
        	<button type="button" class="btn btn-primary" onClick="window.location='PDFclientes.php'">Reporte PDF</button>
        	<button type="button" class="btn btn-primary" onClick="window.location='crear_clientes.php'">Ingresar Nuevo</button>
     	 </div>
 		</td>
 	 	<td>
 	<div>
 	<form method="post" action="" enctype="multipart/form-data" name="form1" id="form1">
 	   <div class="input-append">
          <input name="bus" type="text" class="span2" size="60" list="characters" placeholder="Buscar" autocomplete="off">
            <datalist id="characters">
              <?php
                $buscar=$_POST['bus'];
                $can=mysql_query("SELECT * FROM usuarios");	
                while($dato=mysql_fetch_array($can)){
                    echo '<option value="'.$dato['nom'].'">';
                    echo '<option value="'.$dato['ced'].'">';
                }
              ?>
          	</datalist>
           <button class="btn" type="submit">Buscar por Nombre!</button>
     	 </div>
   	   </form>
  	</div>
   </td>
  </tr>
</table>
<div align="center">
<table class="table" width="80%">
 <tr class="info">
  <td colspan="6"><center><strong>Listado de Clientes / Usuarios Registrados</strong></center></td>
 </tr>
  <tr>
    <td width="16%"><strong>Documento</strong></td>
    <td width="30%"><strong>Nombre y Apellido</strong></td>
    <td width="7%"><strong>Estado</strong></td>
    <td width="13%"><strong>Telefono</strong></td>
    <td width="14%"><strong>Celular</strong></td>
    <td width="20%"><strong>Tipo Usuario</strong></td>
  </tr>
    <?php 
	if(empty($_POST['bus'])){
		$can=mysql_query("SELECT * FROM usuarios");
	}else{
		$buscar=$_POST['bus'];
		$can=mysql_query("SELECT * FROM usuarios where nom LIKE '$buscar%' or ced LIKE '$buscar%'");
	}	
	while($dato=mysql_fetch_array($can)){
		if($dato['tipo']=='a'){ 
			$clase='Administrador'; 
		}elseif($dato['tipo']=='cl'){
			$clase='Cliente';
		}else{
				$clase='Cajero/a';
		}
		if($dato['estado']=="n"){
			$estado='<span class="label label-important">Inactivo</span>';
		}else{
			$estado='<span class="label label-success">Activo</span>';
		}				
	?>
  <tr>
    <td><?php echo $dato['ced']; ?></td>
    <td>
    	<?php if($tipo_usu=='ca' and $dato['tipo']<>'a'){ ?>
    		<a href="crear_clientes.php?codigo=<?php echo $dato['ced']; ?>"><?php echo $dato['nom']; ?></a>
        <?php }elseif($tipo_usu=='a'){ ?>
        	<a href="crear_clientes.php?codigo=<?php echo $dato['ced']; ?>"><?php echo $dato['nom']; ?></a>
        <?php }else{ echo $dato['nom']; } ?>
    </td>
    <td><a href="php_estado_cliente.php?id=<?php echo $dato['ced']; ?>"><?php echo $estado; ?></a></td>
    <td><?php echo $dato['tel']; ?></td>
    <td><?php echo $dato['cel']; ?></td>
    <td><?php echo $clase; ?></td>
    </tr>
    <?php } ?>
</table>
</div>
</form>
</body>
</html> 