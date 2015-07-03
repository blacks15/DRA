$(document).ready(function(){

	ocultar();
	$("#nombre").focus();

	$("#nombre").keypress(validatetext);

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
						$("#nombre").val("");
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
				        $("#nombre").val("");
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


