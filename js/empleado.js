$(document).ready(function(){
	
	ocultar();
	$("#nombre").focus();

	$("#num").keypress(validatenum);
	$("#telefono").keypress(validatenum);
	$("#celular").keypress(validatenum);
	$("#sueldo").keypress(validatenum);

	$("#btnSave").click(function(){
			
		if ( validar_datos() ) {
		var cadena = $("#form1").serialize();

			$.ajax({
				cache: false,
				type: "post",
				datatype: "json",
				url: "../php/user.php",
				data: {opc:"guardar_usuario",cadena },
				success: function(response) {
					if(response.respuesta == true) {
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
					} else if (response.existe == true) {
						$("#existe").dialog({
							modal: true,
				            width: 270,
				            height: 170,
				            show: {effect : "fold" ,duration: 350},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
				        });
					} else {
						$("#ng").dialog({
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
			$("#errortipo").hide();
			$("#mensajealta").hide();
			$("#letras").hide();
			$("#numeros").hide();
			$("#btnUpdate").hide();
			$("#upd").hide();
			$("#ng").hide();
			$("#existe").hide();
		}

$(".letras").keypress(function (key) {

    if ((key.charCode < 97 || key.charCode > 122) //letras mayusculas
        && (key.charCode < 65 || key.charCode > 90) //letras minusculas
        && (key.charCode != 45) //retroceso
        && (key.charCode != 241) //ñ
         && (key.charCode != 209) //Ñ
         && (key.charCode != 32) //espacio
         && (key.charCode != 225) //á
         && (key.charCode != 233) //é
         && (key.charCode != 237) //í
         && (key.charCode != 243) //ó
         && (key.charCode != 250) //ú
         && (key.charCode != 193) //Á
         && (key.charCode != 201) //É
         && (key.charCode != 205) //Í
         && (key.charCode != 211) //Ó
         && (key.charCode != 218) //Ú
        )  {
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
    } else {
    	return true
    } 
});
            

	function entrar(){
		var id;
		if (sessionStorage.empleado == undefined){
			
		} else {
			//RECUPERAMOS LOS VALORES ALMACENADOS EN SESSION 
			id = sessionStorage.key(0);
			res = sessionStorage.getItem('autor');
		//CONVERTIMOS EL JSON A UN OBJETO
			ob = JSON.parse(res);
		//ASGINAMOS VALORES A LOS INPUTS
			$("#codigo").val(ob.clave_autor);
			$("#nombre").val(ob.firstname_autor);
			$("#apellido").val(ob.lastname_autor);
			$("#status").val(ob.estado);
		//OCULTAMOS BOTON GUARDAR Y MOSTRAMOS MODIFICAR
			$("#btnUpdate").show();
			$("#btnSave").hide();
		//VACIAMOS LA SESSION
			sessionStorage.clear();
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