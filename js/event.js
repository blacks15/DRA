$(document).ready(function(){
	
	$("#inicio").click(function(){
		var usuario = $("#user_name").val();
		var clave = $("#pass").val();
	
		$.ajax({
			cache: false,
			type: "POST",
			datatype: "json",
			url: "php/usuarios.php",
			data: {opc:"inicio_sesion", usuario: usuario, clave: clave},
			success: function(response){
					if(response == true){
						if(usuario != $("#user_name").val(response.usuario))
						{
							alert("El usuario no existe");
						}
					}
				},
				error: function(xhr,ajaxOptions,thrownError)
				{
					console.log("Ocurrió un error");
				}
		});
		alert("Ingreso exitoso"); 
      	window.location.href = "menu.php"; 
	});

	$("#registrarse").click(function(){
		var usuario = $("#name").val();
		var clave = $("#pw").val();
		var repite = $("#c_pass").val();
		if(clave == repite)
		{
			$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				url: "php/usuarios.php",
				data: {opc:"grabar_usuario", usuario: usuario, clave: clave },
				success: function(response)
				{
					if(response.respuesta == false)
					{
						alert("Usuario Registrado");
						$("#name").val("");
						$("#pass").val("");
						$("#c_pass").val("");
					}
					else
					{
						alert("Usuario No Registrado");
						$("#name").val("");
						$("#pass").val("");
						$("#c_pass").val("");
					}
				},	
					error: function(xhr,ajaxOptions,throwError)
					{
						console.log("Ocurrio un Error");
					}
			});
		}
		else{
			alert("Las Contraseñas no son Iguales");
		}
    });
});


