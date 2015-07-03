$(document).ready(function(){
		
	ocultar();
	$("#nombre").focus();

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

    function ocultar(){
    	$("#errornom").hide();
		$("#mensajealta").hide();
		$("#error").hide();
		$("#letras").hide();
    }

    function validatetext(event) {
		var key = window.event ? event.keyCode : event.which;
		//alert(key);
		if ((event.keyCode > 65) && (event.keyCode < 90)|| (event.keyCode > 97) && (event.keyCode < 122)){
			return true;
			} else {
				$("#letras").dialog({
				modal: true,
	            width: 270,
	            height: 170,
	            show: {effect : "fold" ,duration: 300},
	            hide: {effect : "explode", duration: 300},
	            resizable: "false",
	            buttons: { "OK": function () { $(this).dialog("close"); } },   
	        });
			return false;
			}
		}

});