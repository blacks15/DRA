$(document).ready(function(){

	$("#nombre").focus();
	$("#errornom").hide();
	$("#mensajealta").hide();
	$("#error").hide();

	$("#altaeditorial").click(function(){
		var name = $("#nombre").val();

		if (validar () ) {
			$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				url: "../php/editorial.php",
				data: {opc:"guardar_editorial", name: name },
				success: function(response) {
					if(response.respuesta == false) {
						alert("Editorial No Registrado");
					} else {				
						$("#mensajealta").dialog({
							modal: true,
				            width: 270,
				            height: 170,
				            show: {effect : "fold", duration: 300},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } }
				        });
					}
				},	
					error: function(xhr,ajaxOptions,throwError){
						console.log("Ocurrio un Error");
					}
			});
		} else {
			$("#error").dialog({
				modal: true,
	            width: 270,
	            height: 170,
	            show: {effect : "fold", duration: 300},
	            hide: {effect : "explode", duration: 300},
	            resizable: "false",
	            buttons: { "OK": function () { $(this).dialog("close"); } },   
	        });
		}
    });

    function validar () {
    	if ($("#nombre").val() == "") {
    		$("#nombre").focus();
    		$("#errornom").show();
    		return false;
    	}
    	$("#errornom").hide();
    	return true;
    }

});	


