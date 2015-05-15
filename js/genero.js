$(document).ready(function(){
		
	$("#alta").click(function(){
		var name = $("#nombre").val();
			
			$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				url: "../php/genero.php",
				data: {opc:"guardar_genero", name: name },
				success: function(response)
				{
					if(response.respuesta == false)
					{
						alert("Genero No Registrado");
						$("#nombre").val("");
					}
					else
					{
						alert("Genero Registrado");
						$("#nombre").val("");
					}
				},	
					error: function(xhr,ajaxOptions,throwError)
					{
						console.log("Ocurrio un Error");
					}
			});
    });

});