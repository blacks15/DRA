$(document).ready(function(){
		
	$("#altaeditorial").click(function(){
		var name = $("#nombre").val();

			$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				url: "../php/editorial.php",
				data: {opc:"guardar_editorial", name: name },
				success: function(response)
				{
					if(response.respuesta == true)
					{
						alert("Editorial Registrado");
						$("#nombre").val("");
						$("#apellido").val("");
					}
					else
					{
						alert("Editorial No Registrado");
						$("#nombre").val("");
						$("#apellido").val("");
					}
				},	
					error: function(xhr,ajaxOptions,throwError)
					{
						console.log(throwError);
					}
			});
    });

});