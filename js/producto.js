$(document).ready(function(){
	
	ocultar();
	$("#nom").focus();
	$("#btnUpdate").hide();
	$("#cantidad").keypress(validatenum);
	$("#minimo").keypress(validatenum);
	$("#costo").keypress(validatenum);
	$("#venta").keypress(validatenum);

	$("#btnSave").click(function(){
		if (validar()) {
			var cadena = $("#form1").serialize();

			$.ajax({
				cache: false,
				type: "post",
				datatype: "json",
				url: "../php/producto.php",
				data: {opc:"guardar_producto",cadena },
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

	$.ajax({
		cache: false,
		type: "POST",
		datatype: "json",
		url: "../php/combo_producto.php",
		success: function(opciones){
			$("#prov").html(opciones.opcion_proveedor);
			$("#libro").html(opciones.opcion_libro);
		},
		error: function(xhr,ajaxOptions,throwError){
			console.log(xhr);
		} 
	});

	function limpiar(){
		$("#codigo").val("");
		$("#libro").prop('selectedIndex', 0);
		$("#prov").prop('selectedIndex', 0);
		$("#cprov").val("");
		$("#cantidad").val("");
		$("#minimo").val("");
		$("#costo").val("");
		$("#venta").val("");
	}

	function ocultar(){
		$("#mensajealta").hide();
		$("#error").hide();
		$("#upd").hide();
		$("#existe").hide();
		$("#ng").hide();
		$("#numeros").hide();
		$("#errornom").hide();
		$("#errorprov").hide();
		$("#errorcpp").hide();
		$("#errorcac").hide();
		$("#errorcmin").hide();
		$("#errorpcompra").hide();
		$("#errorpventa").hide();
	}

	function validar(){
		var prov = $("#prov").val();
		var name = $("#libro").val();
		var cprov = $("#cprov").val();
		var cant = $("#cantidad").val();
		var min = $("#minimo").val();
		var cost = $("#costo").val();
		var sell = $("#venta").val();
		if (name == 0 || name == null) {
			$("#libro").focus();
			$("#errornom").show();
			return false;
		}else if (prov == 0 || prov == null ) {
			$("#prov").focus();
			$("#errorprov").show();
			return false
		} else if (cprov == "" ){
			$("#cprov").focus();
			$("#errorcpp").show();
			return false;
		} else if (cant == "" || min == 0 ) {
			$("#cantidad").focus();
			$("#errorcac").show();
			return false;
		} else if (min == "" || min == 0) {
			$("#minimo").focus();
			$("#errorcmin").show();
			return false;
		} else if (cost == "" || cost == 0){
			$("#compra").focus();
			$("#errorpcompra").show();
			return false;
		} else if (sell == "" || sell == 0) {
			$("#venta").focus();
			$("#errorpventa").show();
			return false;
		}
		ocultar();
		return true;
	}

	function validatenum(event) {
		var key = window.event ? event.keyCode : event.which;
	
		if((event.keyCode > 47 && event.keyCode < 58) || event.keyCode == 46){
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