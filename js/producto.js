$(document).ready(function(){
	
	ocultar();
	$("#nom").focus();

	$("#cantidad").keypress(validatenum);
	$("#minimo").keypress(validatenum);
	$("#costo").keypress(validatenum);
	$("#venta").keypress(validatenum);

	$.ajax({
		cache: false,
		type: "POST",
		datatype: "json",
		url: "../php/combo_producto.php",
		success: function(opciones){
			$("#prov").html(opciones.opcion_proveedor);
			//$("#autor").html(opciones.opcion_aut);
		},
		error: function(xhr,ajaxOptions,throwError){
			console.log(xhr);
		} 
	});

	$("#btnenviar").click(function(){
		if (validar()) {
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

	function limpiar(){
		$("#nom").length == 0;
		$("#prov").length == 0;
		$("#cprov").val("");
		$("#cantidad").val("");
		$("#minimo").val("");
		$("#costo").val("");
		$("#venta").val("");
	}

	function ocultar(){
		$("#mensajealta").hide();
		$("#error").hide();
		$("#letras").hide();
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
		var name = $("#nom").val("");
		var cprov = $("#cprov").val("");
		var cant = $("#cantidad").val("");
		var min = $("#minimo").val("");
		var cost = $("#costo").val("");
		var sell = $("#venta").val("");
		if (name == 0 || name == null) {
			$("#nom").focus();
			$("#errornom").show();
			return false;
		}else if (prov == 0 || prov == null ) {
			$("#prov").focus();
			$("#errorprov").show();
			return false
		} else if (cprov == "" || cprov.length > 3){
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
			$("#costo").focus();
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