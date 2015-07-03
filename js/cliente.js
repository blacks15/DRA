$(document).ready(function(){

	ocultar();
	$("#empresa").focus();

	$("#empresa").keypress(validatetext);
	$("#nombre").keypress(validatetext);
	$("#apaterno").keypress(validatetext);
	$("#amaterno").keypress(validatetext);
	$("#edo").keypress(validatetext);
	$("#ciudad").keypress(validatetext);
	$("#calle").keypress(validatetext);
	$("#num").keypress(validatenum);
	$("#colonia").keypress(validatetext);
	$("#telefono").keypress(validatenum);
	$("#celular").keypress(validatenum);

	$("#btncliente").click(function(){
		
		if (validar_datos() ) {
			var cadena = $("#form1").serialize();

			$.ajax({
				cache: false,
				type: "post",
				datatype: "json",
				url: "../php/cliente.php",
				data: {opc:"guardar_cliente",cadena },
				success: function(response) {
					if(response.respuesta == false) {
						alert("Cliente No Registrado");
						limpiar();
					} else {
						$("#mensajealta").dialog({
							modal: true,
				            width: 270,
				            height: 170,
				            show: {effect : "fold" ,duration: 350},
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
	            show: {effect : "fold" ,duration: 400},
	            hide: {effect : "explode", duration: 300},
	            resizable: "false",
	            buttons: { "OK": function () { $(this).dialog("close"); } },   
	        });
		}
	});

	function limpiar (){
		$("#empresa").val("");
		$("#nombre").val("");
		$("#apaterno").val("");
		$("#amaterno").val("");
		$("#edo").val("");
		$("#ciudad").val("");
		$("#calle").val("");
		$("#num").val("");
		$("#colonia").val("");
		$("#telefono").val("");
		$("#celular").val("");
		$("#correo").val("");
	}

	function ocultar(){
		$("#error").hide();
		$("#errornom").hide();
		$("#errorapp").hide();
		$("#errorapm").hide();
		$("#erroredo").hide();
		$("#errorcity").hide();
		$("#errorcalle").hide();
		$("#errornum").hide();
		$("#errorcol").hide();
		$("#errortel").hide();
		$("#errorcel").hide();
		$("#errorsueldo").hide();
		$("#mensajealta").hide();
		$("#errormail").hide();
		$("#letras").hide();
		$("#numeros").hide();
		$("#nomail").hide();
	}

	function validar_datos(){
		var name = $("#nombre").val();
		var apaterno = $("#apaterno").val();
		var amaterno = $("#amaterno").val();
		var estado = $("#edo").val();
		var city = $("#ciudad").val();
		var calle = $("#calle").val();
		var num = $("#num").val();
		var col = $("#colonia").val();
		var tel = $("#telefono").val();
		var cel = $("#celular").val();
		var email = $("correo").val();
		var emailReg = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		
		if (name == "") {
			$("#nombre").focus();
			$("#errornom").show();
			return false
		} else if (apaterno ==""){
			$("#apaterno").focus();
			$("#errorapp").show();
			return false
		} else if (amaterno == ""){
			$("#amaterno").focus();
			$("#errorapm").show();
			return false
		} else if (estado == ""){
			$("#edo").focus();
			$("#erroredo").show();
			return false
		} else if (city == ""){
			$("#ciudad").focus();
			$("#errorcity").show();
			return false
		} else if (calle == ""){
			$("#calle").focus();
			$("#errorcalle").show();
			return false
		} else if (num == ""){
			$("#num").focus();
			$("#errornum").show();
			return false
		} else if (col == ""){
			$("#colonia").focus();
			$("#errorcol").show();
			return false
		} else if (tel == ""){
			$("#telefono").focus();
			$("#errortel").show();
			return false
		} else if (cel == ""){
			$("#celular").focus();
			$("#errorcel").show();
			return false
		} else if (email == ""){
			$("#correo").focus();
			$("#errormail").show();
			return false
		// } else if (!emailReg.test(email)){
		// 	$("#correo").focus();
		// 	$("#nomail").show();
		// 	return false
		}
		ocultar();
		return true;
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