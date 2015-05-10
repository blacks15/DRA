<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1"/>
	
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" type="style.css" href="css/bootstrap.css">
	<link rel="stylesheet" type="style.css" href="css/style.css">
	<link rel="stylesheet" type="style.css" href="css/animate-custom.css">
 	<title>Inicio Sesión</title>
</head>
<body>
<a class="hiddenanchor" id="toregister"></a>
<a class="hiddenanchor" id="tologin"></a>
<div id="wrapper">
	<div id="login" class="animate form">
	 <form method="post">
		<h2>Iniciar Sesión</h2>
		<figure>
			<img src="css/img/user.jpg" width="100" height="100">
		</figure>
		<input type="text" class="input-text" name="user_name" id="user_name" placeholder="Usuario">
		<input type="password" class="input-text" name="pass" id="pass" placeholder="Contraseña"><br>
		<button type="submit" class="btn btn-large btn-primary" name="inicio" id="inicio">Iniciar</button></br>
		<p class="change_link">
		<a href="#toregister">Registrarse</a>
		</p>
	 </form>
	</div>
	<div id="register" class="animate form">
        <form method="POST">
           <h1>Registrarse </h1> 
           <p> 
           <label>Usuario</label>
           <input id="user_name" name="user_name" required="required" type="text"/>
           </p>
           <p> 
            <label>Contraseña: </label>
            <input id="pass" name="pass" required="required" type="password"/>
           </p>
           <p> 
            <label>Confirmar Contraseña: </label>
            <input id="c_pass" name="c_pass" required="required" type="password"/>
           </p>
           <p class="signin button"> 
			<input type="submit" class="btn btn-primary btn-large" name="registrarse" id="registrarse" value="Registrarse"/> 
		   </p>
           <p class="change_link">  
			<a href="#tologin">Iniciar Sesión</a>
		   </p>
       </form>
     </div>
     </div>
     <script src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
     <script src="js/event.js"></script>
</body>
</html>