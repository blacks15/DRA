$(document).ready(function(){
		
	$("#alta").click(function(){
		var f_autor = $("#nombre").val();
		var l_autor = $("#apellido").val();
		
			$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				url: "../php/autor.php",
				data: {opc:"guardar_autor", first_name: f_autor, last_name: l_autor },
				success: function(response)
				{
					if(response.respuesta == true)
					{
						$(".mensajealta").html("Autor Registrado");
						$("#nombre").val("");
						$("#apellido").val("");
					}
					else
					{
						$(".mensajealta").html("Autor No Registrado");
					}
				},	
					error: function(xhr,ajaxOptions,throwError)
					{
						console.log("Ocurrio un Error");
					}
			});
    });

});