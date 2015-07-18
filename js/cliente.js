$(document).ready(function(){

	ocultar();
	$("#empresa").focus();
	entrar();
	$("#num").keypress(validatenum);
	$("#telefono").keypress(validatenum);
	$("#celular").keypress(validatenum);

	$("#btnSave").click(function(){
		
		if (validar_datos() ) {
			var cadena = $("#form1").serialize();

			$.ajax({
				cache: false,
				type: "post",
				datatype: "json",
				url: "../php/cliente.php",
				data: {opc:"guardar_cliente",cadena },
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
	            show: {effect : "fold" ,duration: 400},
	            hide: {effect : "explode", duration: 300},
	            resizable: "false",
	            buttons: { "OK": function () { $(this).dialog("close"); } },   
	        });
		}
	});

	$("#btnUpdate").click(function(){
		
		if (validar_datos() ) {
			var cadena = $("#form1").serialize();
			
			$.ajax({
				cache: false,
				type: "post",
				datatype: "json",
				url: "../php/cliente.php",
				data: {opc:"modificar_cliente",cadena },
				success: function(response) {
					if(response.respuesta == false) {
						alert("Cliente No Modificado");
						limpiar();
					} else {
						$("#upd").dialog({
							modal: true,
				            width: 270,
				            height: 170,
				            show: {effect : "fold" ,duration: 350},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
				        });
						limpiar();
						$("#btnUpdate").hide();
						$("#btnSave").show();
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

 	$('#bus').click(function(){
 	 	window.location.href = "../pages/BuscarClientes.html";
 	});

	function entrar(){
		var id;
		if (sessionStorage.cliente == undefined){
			
		} else {
		//OCULTAMOS BOTON GUARDAR Y MOSTRAMOS MODIFICAR
			$("#btnUpdate").show();
			$("#btncliente").hide();
		//RECUPERAMOS LOS VALORES ALMACENADOS EN SESSION 
			id = sessionStorage.key(0);
			res = sessionStorage.getItem('cliente');
		//CONVERTIMOS EL JSON A UN OBJETO
			ob = JSON.parse(res);
		//ASGINAMOS VALORES A LOS INPUTS
			$("#codigo").val(ob.matricula);
			$("#empresa").val(ob.empresa);
			$("#nombre").val(ob.nombre_contacto);
			$("#apaterno").val(ob.apellido_paterno);
			$("#amaterno").val(ob.apellido_materno);
			$("#num").val(ob.numero);
			$("#calle").val(ob.calle);
			$("#colonia").val(ob.colonia);
			$("#ciudad").val(ob.ciudad);
			$("#edo").val(ob.estado);
			$("#telefono").val(ob.telefono);
			$("#celular").val(ob.celular);
			$("#correo").val(ob.email);
			$("#status").val(ob.status);
		//VACIAMOS LA SESSION
			sessionStorage.clear();
		}
	}

	function limpiar (){
		$("#codigo").val("");
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
		$("#status").val("");
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
		$("#mensajealta").hide();
		$("#errormail").hide();
		$("#letras").hide();
		$("#numeros").hide();
		$("#nomail").hide();
		$("#upd").hide();
		$("#btnUpdate").hide();
		$("#ng").hide();
		$("#existe").hide();
	}

	function validar_datos(){
		ocultar();
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
		var email = $("#correo").val();
		var emailreg =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
		
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
		} else if (!emailreg.test(email)) {
			$("#correo").focus();
			$("#nomail").show();
			return false
		}
		return true;
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