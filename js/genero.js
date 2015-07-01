$(document).ready(function(){
		
	$("#nombre").focus();
	$("#errornom").hide();
	$("#mensajealta").hide();
	$("#error").hide();

	$("#alta").click(function(){
		var name = $("#nombre").val();

			if (validar() ) {
			$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				data: {opc:"guardar_genero",name: name },
				url: "../php/genero.php",
				success: function(response) {
					if (response.respuesta == true){
						$("#mensajealta").dialog({
							modal:true,
							width: 270,
							height: 170,
							show: {effect : "fold" ,duration: 300},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
						});
						$("#nombre").val("");
					} else {
						alert("Genero No Registrado");
						$("#nombre").val("");
					}
				},	
				error: function (xhr,ajaxOptions,throwError) {
						alert(throwError);
					}
			});
		} else {
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

    function validar() {
    	if ($("#nombre").val() == "") {
    		$("#nombre").focus();
    		$("#errornom").show();
    		return false;
    	} else {
    		$("#errornom").hide();
    		return true;
    	}
    }

});