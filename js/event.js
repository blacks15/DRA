$(document).ready(function(){
	
	//alert("ok");
	
	$("#inicio").click(function(){
		var user = $("#user_name").val();
		var pass = $("#pass").val();
	
		$.ajax({
			cache: false,
			type: "POST",
			datatype: "json",
			url: "php/usuarios.php",
			data: {opc:"inicio_sesion", usuario:"user", clave:"pass"},
			success: function(response){
					if(response == true){
						if(usuario != $("#user_name").val(response.usuario))
						{
							alert("El usuario no existe");
						}
					} else {
						alert("error");
					}
				},
				error: function(xhr,ajaxOptions,thrownError)
				{
					alert('error2');
					//console.log("Ocurrió un error");
				}
		});
	});
	//  $("#name").keypress(function (tecla){
	// 	if(tecla.which == 13) //Enter
	// 	{
	// 		var usuario = $("#name").val();
	// 			$.ajax({
	// 			cache: false,
	// 			type: "POST",
	// 			dataType: "json",
	// 			url: "php/usuarios.php",
	// 			data: {opc: "buscausuario",usuario:"usuario"},
	// 			success: function(response){
	// 				if(response.respuesta == true)
	// 				{
	// 					if(usuario == $("#name").val(response.usuario))
	// 					{
	// 						alert("El usuario ya existe");
	// 					}
	// 				}
	// 			},
	// 			error: function(xhr,ajaxOptions,thrownError)
	// 			{
	// 				console.log("Ocurrió un error");
	// 			}
	// 		});
	// 	}
	// });
	$("#registrarse").click(function(){
		var user = $("#name").val();
		var pass = $("#pass").val();
		var repite_cont = $("#c_pass").val();

		if(pass == repite_cont)
		{
			$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				url: "php/usuarios.php",
				data: {opc:"grabar_usuario", usuario:"user", clave:"pass"},
				success: function(response)
				{
					if(response.respuesta == true)
					{
						alert("ar");
						$(".mensajealta").html("Usuario Registrado");
						$("#name").val("");
						$("#pass").val("");
					}
					else
					{
						$(".mensajealta").html("Usuario No Registrado");
					}
				},	
					error: function(xhr,ajaxOptions,throwError)
					{
						console.log("Ocurrio un Error");
					}
			});
		}
		else
		{
			alert("Las Contraseñas no Coinciden");
		}
    });
});


