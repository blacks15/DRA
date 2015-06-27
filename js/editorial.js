$(document).ready(function(){
	$("#nombre").focus();
	$("#lblnombre").hide();

	$("#altaeditorial").click(function(){
		var name = $("#nombre").val();

		if (validar() ) {
			$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				url: "../php/editorial.php",
				data: {opc:"guardar_editorial", name: name },
				success: function(response){
					if(response.respuesta == false){
						alert("Editorial No Registrado");
						$("#nombre").val("");
					} else {
						alert("Editorial Registrado");
						$("#nombre").val("");
					}
				},	
					error: function(xhr,ajaxOptions,throwError){
						console.log("Ocurrio un Error");
					}
			});
		} else {
			alert("Debe Ingresar Todos los Campos");
		}
    });

    function validar () {
    	if ($("#nombre").val() == "") {
    		$("#nombre").focus();
    		$("#lblnombre").show();
    		return false;
    	}
    	return true;
    }

});	