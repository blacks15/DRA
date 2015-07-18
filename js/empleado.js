$(document).ready(function(){
	
	ocultar();
	$("#nombre").focus();
	entrar();

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
				url: "../php/empleado.php",
				data: {opc:"guardar_empleado",cadena },
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
						console.log(throwError);
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

	$("#btnUpdate").click(function(){
			
		if ( validar_datos() ) {
		var cadena = $("#form1").serialize();
		alert(cadena);
			$.ajax({
				cache: false,
				type: "post",
				datatype: "json",
				url: "../php/empleado.php",
				data: {opc:"modificar_empleado",cadena },
				success: function(response) {
					if(response.respuesta == true) {
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
						$("#btnSave").show();
						$("#btnUpdate").hide();
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
						console.log(throwError);
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

 	$('#bus').click(function(){
 	 	window.location.href = "../pages/BuscarEmpleado.html";
 	});

	$("#ref").click(function(){
	 	window.location.reload();
	 });

	function entrar(){
		var id;
		if (sessionStorage.empleado == undefined){
			
		} else {
			//RECUPERAMOS LOS VALORES ALMACENADOS EN SESSION 
			id = sessionStorage.key(0);
			res = sessionStorage.getItem('empleado');
		//CONVERTIMOS EL JSON A UN OBJETO
			ob = JSON.parse(res);
			tipo = ob.tipo;
		//ASGINAMOS VALORES A LOS INPUTS
			$("#codigo").val(ob.matricula);
			$("#nombre").val(ob.nombre);
			$("#apaterno").val(ob.apellido_paterno);
			$("#amaterno").val(ob.apellido_materno);
			$("#calle").val(ob.calle);
			$("#num").val(ob.numero);
			$("#colonia").val(ob.colonia);
			$("#ciudad").val(ob.ciudad);
			$("#edo").val(ob.estado);
			$("#telefono").val(ob.telefono);
			$("#celular").val(ob.celular);
			$("#sueldo").val(ob.sueldo);
			$("#status").val(ob.status);
				//ASIGNAMOS EL VALOR AL RADIO BUTTON
			if (tipo == 'admin') {
				$("#admin").attr('checked',true);
			} else if (tipo == 'vent') {
				$("#venta").attr('checked',true);
			} else {
				$("#cajero").attr('checked',true);
			}
			//alert($("input:radio[name='tipo']:checked").val());
		//OCULTAMOS BOTON GUARDAR Y MOSTRAMOS MODIFICAR
			$("#btnUpdate").show();
			$("#btnSave").hide();
		//VACIAMOS LA SESSION
			sessionStorage.clear();
		}
	}

	function validar_datos(){
		var name = $("#nombre").val();
		var apaterno = $("#apaterno").val();
		var amaterno = $("#amaterno").val();
		var calle = $("#calle").val();
		var num = $("#num").val();
		var col = $("#colonia").val();
		var city = $("#ciudad").val();
		var estado = $("#edo").val();
		var tel = $("#telefono").val();
		var cel = $("#celular").val();
		var sueldo = $("#sueldo").val();
		var tipo = $("tipo").val();

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
		$("#codigo").val("");
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