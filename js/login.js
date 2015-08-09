$(document).ready(function(){
	
	$("#usuario").focus();
	ocultar();

	$("#inicio").click(function(){
		var usuario = $("#usuario").val();
		var pass = $("#pass").val();

		if (validar()) {
			$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				url: "php/usuarios.php",
				data: {opc:"inicio_sesion", usuario: usuario, pass: pass},
				success: function(response){
						if(response.respuesta == true){
							if(response.usuario != usuario ){
								$("#errorval").dialog({
									modal: true,
						            width: 270,
						            height: 170,
						            show: {effect : "fold" ,duration: 300},
						            hide: {effect : "explode", duration: 300},
						            resizable: "false",
						            buttons: { "OK": function () { $(this).dialog("close"); } },   
						        });
							}
							window.location.href = "menu.php"; 

						} else  if (response.fallo == true) {
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
					},
					error: function(xhr,ajaxOptions,thrownError){
						console.log(thrownError);
					}
			});		
		} else {
			$("#errorval").dialog({
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

	function limpiar(){
		$("#user").val("");
		$("#pass").val("");
	}

	function validar(){
		var usuario = $("#usuario").val();
		var clave = $("#pass").val();

		if (usuario == "") {
			$("#user").focus();
			$("#errornom").show();
			return false;
		} else if (clave == "") {
			$("#pass").focus();
			$("#errorpass").show();
			return false;
		}
		return true;
	}

	function ocultar(){
		$("#errornom").hide();
		$("#errorpass").hide();
		$("#error").hide();
		$("#errorval").hide();
	}
});


