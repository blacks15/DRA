$(document).ready(function(){

	$("#nombre").focus();
		ocultar();
	$("#btnUpdate").hide();
		entrar();
	$("#numi").keypress(validatenum);
	$("#nume").keypress(validatenum);
	$("#telefono").keypress(validatenum);
	$("#celular").keypress(validatenum);

	$("#btnsave").click(function(){
		
		if( validar_datos() ){
		var cadena = $("#form1").serialize();
		
		$.ajax({
			cache: false,
			type: "POST",
			datatype: "json",
			url: "../php/proveedor.php",
			data: {opc:"guardar_proveedor",cadena},
			success: function(response){
				if (response.respuesta == false){
					alert("Proveedor No Registrado");
					limpiar();
				} else {
					$("#mensajealta").dialog({
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
			error: function(xhr,ajaxOption,throwError){
				console.log(xhr+","+ajaxOption+","+throwError);
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

	$("#btnUpdate").click(function(){
		var codigo = $("#codigo").val();
		var first_name = $("#nombre").val();
		var last_name = $("#apellido").val();
		var status = $("#status").val();

		if( validar_datos() ){
		var cadena = $("#form1").serialize();
		$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				url: "../php/proveedor.php",
				data: {opc:"modificar_proveedor", cadena },
				success: function(response){
					if(response.respuesta == false){
						alert("Proveedor No Modificado");
						limpiar();
					} else {				
						$("#upd").dialog({
							modal: true,
				            width: 270,
				            height: 170,
				            show: {effect : "fold", duration: 300},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
				        });
						limpiar();
						$("#btnUpdate").hide();
						$("#btnsave").show();
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
 	 	window.location.href = "../pages/BuscarProveedor.html";
 	});

	function validar_datos(){
		ocultar();
		var name = $("#nombre").val();
		var contacto = $("#c_name").val();
		var obs = $("#obs").val();
		var nume = $("#nume").val();
		var numi = $("#numi").val();
		var calle = $("#calle").val();
		var col = $("#colonia").val();
		var city = $("#city").val();
		var edo = $("#edo").val();
		var tel = $("#telefono").val();
		var cel = $("#celular").val();
		var email = $("#correo").val();
		var emailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

			  if (name == "") {
				$("#nombre").focus();
				$("#errornom").show();
				return false;
			} else if (contacto == "") {
				$("#nume").focus();
				$("#errornum").show();
				return false;
			} else if (nume == "") {
				$("#c_nombre").focus();
				$("#errorni").show();
				return false;
			} else if (calle == "") {
				$("#calle").focus();
				$("#errorcalle").show();
				return false;
			} else if (col == "") {
				$("#colonia").focus();
				$("#errorcol").show();
				return false;
			} else if (city == "") {
				$("#city").focus();
				$("#errorcity").show();
				return false;
			} else if (edo == "") {
				$("#edo").focus();
				$("#erroredo").show();
				return false;
			} else if (tel == "") {
				$("#telefono").focus();
				$("#errortel").show();
				return false;
			} else if (cel == "") {
				$("#celular").focus();
				$("#errorcel").show();
				return false;
			} else if (email == "") {
				$("#correo").focus();
				$("#erroremail").show();
				return false;
			} else if (!emailreg.test(email)) {
				$("#valemail").show();
				$("#correo").focus();
				return false;
			}
			return true;
		}

		function limpiar (){
			$("#codigo").val("");
			$("#nombre").val("");
			$("#c_name").val("");
			$("#obs").val("");
			$("#nume").val("");
			$("#numi").val("");
			$("#calle").val("");
			$("#colonia").val("");
			$("#city").val("");
			$("#edo").val("");
			$("#telefono").val("");
			$("#celular").val("");
			$("#correo").val("");
		}

		function ocultar(){
			$("#mensajealta").hide();
			$("#error").hide();
			$("#errornom").hide();
			$("#errorcon").hide();
			$("#errorcol").hide();
			$("#errortel").hide();
			$("#errorcel").hide();
			$("#erroremail").hide();
			$("#errorni").hide();
			$("#errorcalle").hide();
			$("#errorcity").hide();
			$("#erroredo").hide();
			$("#numeros").hide();
			$("#letras").hide();
			$("#valemail").hide();
			$("#upd").hide();
		}

		function entrar(){
			var id;
			if (sessionStorage.proveedor == undefined){
				
			} else {
				//RECUPERAMOS LOS VALORES ALMACENADOS EN SESSION 
				id = sessionStorage.key(0);
				res = sessionStorage.getItem('proveedor');
			//CONVERTIMOS EL JSON A UN OBJETO
				ob = JSON.parse(res);
			//ASGINAMOS VALORES A LOS INPUTS
				$("#codigo").val(ob.clave_proveedor);
				$("#nombre").val(ob.nombre);
				$("#c_name").val(ob.contacto);
				$("#obs").val(ob.observaciones);
				$("#nume").val(ob.nume);
				$("#numi").val(ob.numi);
				$("#calle").val(ob.calle);
				$("#colonia").val(ob.colonia);
				$("#city").val(ob.city);
				$("#edo").val(ob.edo);
				$("#telefono").val(ob.telefono);
				$("#celular").val(ob.celular);
				$("#correo").val(ob.email);
				$("#status").val(ob.estado);
			//OCULTAMOS BOTON GUARDAR Y MOSTRAMOS MODIFICAR
				$("#btnUpdate").show();
				$("#btnsave").hide();
			//VACIAMOS LA SESSION
				sessionStorage.clear();
			}
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