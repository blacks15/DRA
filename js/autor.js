$(document).ready(function(){
		
	$("#alta").click(function(){
		var first_name = $("#nombre").val();
		var last_name = $("#apellido").val();

			$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				url: "../php/autor.php",
				data: {opc:"guardar_autor", first_name: first_name, last_name: last_name },
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