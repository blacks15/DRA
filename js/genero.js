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
					if(response.respuesta == true)
					{
						alert("Genero Registrado");
						$("#nombre").val("");
						$("#apellido").val("");
					}
					else
					{
						alert("Genero No Registrado");
					}
				},	
					error: function(xhr,ajaxOptions,throwError)
					{
						console.log(throwError);
					}
			});
    });

});