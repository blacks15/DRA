<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1"/>
	
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" type="style.css" href="css/bootstrap.css">
	<link rel="stylesheet" type="style.css" href="css/style.css">
	<link rel="stylesheet" href="css/bootstrap-responsive.css">
	<link rel="stylesheet" href="jqueryui/jquery-ui.css">

 	<title>Inicio Sesión</title>
</head>
<body>
<div id="wrapper">
	<div id="login" class="animate form">
	 <form action=""method="post">
		<h2>Iniciar Sesión</h2>
		<figure>
			<img src="css/img/user.jpg" width="100" height="100">
		</figure>
		<input type="text" class="input-text" id="usuario" name="usuario" placeholder="Usuario" required>
		<div class="ui-widget" id="errornom">
	    	<div class="ui-corner-all" style="padding: 0 .2em;">
	        	<p>
	             <span class="ui-icon ui-icon-alert"></span><strong>ERROR: </strong>DEBE INGRESAR UN NOMBRE DE USUARIO.
	            </p>
	        </div>
     	</div>
		<input type="password" class="input-text" id="pass" name="pass" placeholder="Contraseña" required>
		<div class="ui-widget" id="errorpass">
	      <div class="ui-corner-all" style="padding: 0 .2em;">
	        <p>
	          <span class="ui-icon ui-icon-alert"></span><strong>ERROR: </strong>DEBE INGRESAR UNA CONTRASEÑA.
	        </p>
	      </div>
		</div>
		<br>
		<button type="button" class="btn btn-large btn-primary" name="inicio" id="inicio">Iniciar</button>
		<div class="ui-widget" id="error">
	      <div class="ui-corner-all" style="padding: 0 .2em;">
	        <p>
	          <span class="ui-icon ui-icon-alert"></span><strong>ERROR: </strong>USUARIO O CONTRASEÑA INCORRECTOS.
	        </p>
	      </div>
		</div>
	<div class="" id="errorval" title="Advertencia">
        <span class="ui-icon ui-icon-info" style: "float: left; margin-right: .2em;"></span>
        <center><strong>Debe Llenar Todos los Campos.</strong></center>
    </div>
	 </form>
	</div>
    </div>
     <script src="js/jquery.js"></script>
     <script src="js/login.js"></script>
     <script src="jqueryui/jquery-ui.min.js"></script>
</body>
</html>