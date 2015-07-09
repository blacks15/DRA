$(document).ready(function(){
	
	ocultar();
	$("#nombre").focus();

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
	$("#sueldo").keypress(validatenum);

	$("#alta").click(function(){
			
		if ( validar_datos() ) {
		var cadena = $("#form1").serialize();

			$.ajax({
				cache: false,
				type: "post",
				datatype: "json",
				url: "../php/user.php",
				data: {opc:"guardar_usuario",cadena },
				success: function(response) {
					if(response.respuesta == false) {
						alert("Empleado No Registrado");
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
			            show: {effect : "fold" ,duration: 350},
			            hide: {effect : "explode", duration: 300},
			            resizable: "false",
			            buttons: { "OK": function () { $(this).dialog("close"); } },   
			        });
				}
    });

		function validar_datos(){
			var name = $("#nombre").val();
			var apaterno = $("#apaterno").val();
			var amaterno = $("#amaterno").val();
			var user = $("#usuario").val();
			var pass = $("#pass").val();
			var repite = $("#rpass").val();
			var estado = $("#edo").val();
			var city = $("#ciudad").val();
			var calle = $("#calle").val();
			var num = $("#num").val();
			var col = $("#colonia").val();
			var tel = $("#telefono").val();
			var cel = $("#celular").val();
			var sueldo = $("#sueldo").val();
			var tipo = $("tipo").val();
			var seleccionado = false;

			if (name == "") {
				$("#nombre").focus();
				$("#errornom").show();
				return false
			}  else if ( !$("#form1 input[name='tipo']:radio").is(':checked') ) {
				$("#tipo").focus();
				$("#errortipo").show();
				return false;
			} 	else if (apaterno ==""){
				$("#apaterno").focus();
				$("#errorapp").show();
				return false
			} else if (amaterno == ""){
				$("#amaterno").focus();
				$("#errorapm").show();
				return false
			} else if (pass != repite) {
				$("#errorpass").dialog({
						modal: true,
			            width: 270,
			            height: 170,
			            show: {effect : "fold" ,duration: 350},
			            hide: {effect : "explode", duration: 300},
			            resizable: "false",
			            buttons: { "OK": function () { $(this).dialog("close"); } },   
			        });
				alert(pass+','+repite);
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
			} else if (sueldo == ""){
				$("#sueldo").focus();
				$("#errorsueldo").show();
				return false
			}
			ocultar();
			return true;
		}

		function limpiar (){
			$("#nombre").val("");
			$("#apaterno").val("");
			$("#amaterno").val("");
			$("#usuario").val("");
			$("#pass").val("");
			$("#rpass").val("");
			$("#edo").val("");
			$("#ciudad").val("");
			$("#calle").val("");
			$("#num").val("");
			$("#colonia").val("");
			$("#telefono").val("");
			$("#celular").val("");
			$("#sueldo").val("");
			$('input:radio[name = tipo]').attr('checked',false);
		}

		function ocultar() {
			$("#vc").hide();
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
			$("#errorpass").hide();
			$("#errorsueldo").hide();
			$("#errortipo").hide();
			$("#mensajealta").hide();
			$("#letras").hide();
			$("#numeros").hide();
		}

	function validatetext(event) {
		var key = window.event ? event.keyCode : event.which; 

		if ((event.keyCode > 65 && event.keyCode < 90) || (event.keyCode > 97 && event.keyCode < 122) && (event.keyCode > 160 || event.keyCode < 166)) {
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
	
		if((event.keyCode > 47 && event.keyCode < 58) || event.keyCode == 46 ){
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