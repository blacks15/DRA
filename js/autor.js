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
					if(response.respuesta == false)
					{
						alert("Autor No Registrado");
						$("#nombre").val("");
						$("#apellido").val("");
					}
					else
					{
						alert("Autor Registrado");
						$("#nombre").val("");
						$("#apellido").val("");
					}
				},	
					error: function(xhr,ajaxOptions,throwError)
					{
						console.log("Ocurrio un Error");
					}
			});
    });

});