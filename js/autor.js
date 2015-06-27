$(document).ready(function(){

	$("#nombre").focus();
	$("#lblnombre").hide();
	$("#lblapellido").hide();

	$("#alta").click(function(){
		var first_name = $("#nombre").val();
		var last_name = $("#apellido").val();

		if (validar() ) {
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
						limpiar();
					}
					else
					{
						alert("Autor Registrado");
						$("#mensajealta").show();
						limpiar();
					}
				},	
					error: function(xhr,ajaxOptions,throwError)
					{
						console.log("Ocurrio un Error");
					}
			});
		} else{
			alert("Debe Llenar Todos los Campos.");
		}
    });

    function validar(){
    	var first_name = $("#nombre").val();
		var last_name = $("#apellido").val();

		if(first_name == ""){
			$("#nombre").focus();
			$("#lblnombre").show();
			return false;
		} else if (last_name == "") {
			$("#apellido").focus();
			$("#lblapellido").show();
			return false;
		}
		return true;
    }

    function limpiar (){
    	$("#nombre").val("");
		$("#apellido").val("");
    }

});