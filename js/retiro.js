$(document).ready(function(){
	$("#retiro").focus();
	$("#retiro").keypress(validatenum);
	ocultar();
	entrar();
	$("#btnUpdate").hide();
		//BOTÓN GUARDAR
	$("#btnSave").click(function() {
		var cadena = $("#form1").serialize();
		if (validar() ) {
			$.ajax({
				cache: false,
				type: "post",
				datatype: "json",
				url: "../php/retiro.php",
				data: {opc:"guardar_retiro",cadena },
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
					} else if (response.fallo == true) {
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
	            show: {effect : "fold", duration: 300},
	            hide: {effect : "explode", duration: 300},
	            resizable: "false",
	            buttons: { "OK": function () { $(this).dialog("close"); } },   
	        });
		}
	});

		//BOTÓN ACTUALIZAR
	$("#btnUpdate").click(function(){
		if( validar() ){
			var cadena = $("#form1").serialize();
		$.ajax({
			cache: false,
			type: "POST",
			datatype: "json",
			url: "../php/retiro.php",
			data: {opc:"modificar_retiro", cadena },
			success: function(response){
				if(response.respuesta == false){
					alert("Retiro No Modificado");
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
	            show: {effect : "fold" ,duration: 300},
	            hide: {effect : "explode", duration: 300},
	            resizable: "false",
	            buttons: { "OK": function () { $(this).dialog("close"); } },   
	        });
		}
	});
		//TRAER EL NOMBRE COMPLETO DEL USUARIO LOGUEADO
	$.ajax({
		cache: false,
		type: "POST",
		datatype: "json",
		url: "../php/combo_venta.php",
		success: function(opciones){
			$("#usuario").val(opciones.opcion_corte);
		},
		error: function(xhr,ajaxOptions,throwError){
			console.log(throwError);
		} 
	});
	
		//LLENAR CON LA FECHA ACTUAL	
	$("#date").datepicker({
			dateFormat: "dd-M-yy"
	});
	$("#date").datepicker('setDate', '+0');
		//FUNCIÓN PARA VALIDAR FORMULARIO
	function validar(){
		ocultar();
		var retiro =  $("#retiro").val();
		var obs = $("#obs").val();

		if (retiro == "") {
			$("#retiro").focus();
			$("#errorsueldo").show();
			return false;
		} else if (obs == "") {
			$("#retiro").focus();
			$("#errorobs").show();
			return false;
		} 
		return true;
	}

	 $("#ref").click(function(){
	 	window.location.reload();
	 });
		//FUNCIÓN PARA LIMPIAR LOS CAMPOS
	function limpiar(){
		$("#retiro").val("");
		$("#obs").val("");
	}
		//FUNCIÓN PARA OCULTAR MENSAJES
	function ocultar(){
		$("#mensajealta").hide();
		$("#upd").hide();
		$("#error").hide();
		$("#errorsueldo").hide();
		$("#errorobs").hide();
		$("#ng").hide();
	}
		//FUNCION PARA ACEPTAR SOLO NÚMEROS
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

	function entrar(){
		var id;
		if (sessionStorage.retiro == undefined){
			
		} else {
				//RECUPERAMOS LOS VALORES ALMACENADOS EN SESSION 
			id = sessionStorage.key(0);
			res = sessionStorage.getItem('retiro');
		//CONVERTIMOS EL JSON A UN OBJETO
			ob = JSON.parse(res);
		//ASGINAMOS VALORES A LOS INPUTS
			$("#codigo").val(ob.id_retiro);
			$("#date").val(ob.fecha);
			$("#empleado").val(ob.empleado);
			$("#retiro").val(ob.retiro);
			$("#obs").val(ob.observacion);
		//OCULTAMOS BOTON GUARDAR Y MOSTRAMOS MODIFICAR
			$("#btnUpdate").show();
			$("#btnSave").hide();
		//VACIAMOS LA SESSION
			sessionStorage.clear();
		}
	}
});