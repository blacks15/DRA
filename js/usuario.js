$(document).ready(function(){

	$("#codigo").focus();
	ocultar();

	$("#codigo").keypress(validatenum);

	$("#btnSave").click(function(){
		var cadena = $("#form1").serialize();

		if (validar() ) {
			$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				url: "../php/usuarios.php",
				data: {opc:"guardar_usuario", cadena: cadena },
				success: function(response){
					if(response.respuesta == true){				
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
						$("#errornopass").hide();
						$("#errorpass").hide();
						$("#errornom").hide();
					} else if (response.existe == true) {
							$("#existe").dialog({
							modal: true,
				            width: 270,
				            height: 170,
				            show: {effect : "fold" ,duration: 300},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
				        });
						} else if (response.fallo == true) { 
							$("#ng").dialog({
								modal: true,
					            width: 270,
					            height: 170,
					            show: {effect : "fold" ,duration: 300},
					            hide: {effect : "explode", duration: 300},
					            resizable: "false",
					            buttons: { "OK": function () { $(this).dialog("close"); } },   
					        });
							limpiar();
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
	            show: {effect : "fold" ,duration: 300},
	            hide: {effect : "explode", duration: 300},
	            resizable: "false",
	            buttons: { "OK": function () { $(this).dialog("close"); } },   
	        });
			}
    });

 	 $('#bus').click(function(){
 	 	window.location.href = "../pages/BuscarUsuario.html";
 	 });

	$("#usuario").focusout(function(){
		var user = $("#usuario").val();
		if (user != "") {
			$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				url: "../php/usuarios.php",
				data: {opc:"buscar_usuario", user: user },
				success: function(response){
					if (response.respuesta == true) {
						$("#nodisp").show("slow");
					} else {
						$("#disp").show("slow");
					}
				},
				error: function(xhr,ajaxOptions,throwError){
						console.log("Ocurrio un Error");
					}
			});
		}
	});

	function ocultar(){
		$("#mensajealta").hide();
		$("#errornopass").hide();
		$("#error").hide();
		$("#errorpass").hide();
		$("#errorrpass").hide();
		$("#errornom").hide();
		$("#errorcod").hide();
		$("#btnUpdate").hide();
		$("#numeros").hide();
		$("#disp").hide();
		$("#nodisp").hide();
		$("#ng").hide();
	}

	function validar(){
		var codigo = $("#codigo").val();
		var user = $("#usuario").val();
		var pass = $("#pass").val();
		var repite = $("#rpass").val();

		if (codigo == "") {
			$("#codigo").focus();
			$("#errorcod").show();
			return false;
		} else if (user == "") {
			$("#usuario").focus();
			$("#errornom").show();
			return false;
		} else if (pass != repite) {
			$("#errornopass").dialog({
				modal: true,
	            width: 270,
	            height: 170,
	            show: {effect : "fold" ,duration: 300},
	            hide: {effect : "explode", duration: 300},
	            resizable: "false",
	            buttons: { "OK": function () { $(this).dialog("close"); } },   
	        });
	        $("#pass").focus();
			return false;
		} else if (pass == "") {
			$("#pass").focus();
			$("#errorpass").show();
			return false;
		} else if (rpass == "") {
			$("#rpass").focus();
			$("#errorrpass").show();
			return false;
		}
		return true;
	}

	function limpiar(){
		$("#codigo").val("");
		$("#usuario").val("");
		$("#pass").val("");
		$("#rpass").val("");
		$("#status").val("");
	}

	function validatenum(event) {
		var key = window.event ? event.keyCode : event.which;
	
		if(event.keyCode > 47 && event.keyCode < 58){
			return true;
			} else {
				$("#numeros").dialog({
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