$(document).ready(function(){

	$("#nombre").focus();
	$("#errornom").hide();
	$("#errorap").hide();
	$("#mensajealta").hide();
	$("#error").hide();

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
					} else {				
						$("#mensajealta").dialog({
							modal: true,
				            width: 270,
				            height: 170,
				            show: {effect : "fold", duration: 300},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
				        });
						limpiar();
						$("#errornom").hide();
						$("#errorap").hide();
					}
				},	
					error: function(xhr,ajaxOptions,throwError){
						console.log("Ocurrio un Error");
					}
			});
		} else{
			$("#error").dialog({
				modal: true,
	            width: 270,
	            height: 170,
	            show: {effect : "fold" ,duration: 300},
	            hide: {effect : "explode", duration: 300},
	            resizable: "false",
	            buttons: { "OK": function () { $(this).dialog("close"); } },   
	        });
		}
    });

    function validar(){
    	var first_name = $("#nombre").val();
		var last_name = $("#apellido").val();

		if(first_name == ""){
			$("#nombre").focus();
			$("#errornom").show();
			return false;
		} else if (last_name == "") {
			$("#apellido").focus();
			$("#errorap").show();
			return false;
		}
		$("#errornom").hide();
		$("#errorap").hide();
		return true;
    }

    function limpiar (){
    	$("#nombre").val("");
		$("#apellido").val("");
    }

});