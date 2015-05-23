$(document).ready(function(){
		
	$("#alta").click(function(){
		var name = $("#nombre").val();
			alert('name: ' + name);
			$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				url: "../php/genero2.php",
				data: {opc:"guardar_genero", name: name },
				success: function(response)
				{
					//alert(response);
					if(response == false)
					{
						//alert(response.opc + ', ' + response.name);
						alert("Genero No Registrado");
						$("#nombre").val("");
					}
					else
					{
						alert(response.opc + ', ' + response.name + ' , ' + response.respuesta);
						alert("Genero Registrado");
						$("#nombre").val("");
					}
				},	
				error: function(xhr,ajaxOptions,throwError)
				{
					console.log(xhr+", "+ajaxOptions+", "+throwError);
				}
			});
    });

});