$(document).ready(function(){
	
	ocultar();
	$("#nom").focus();
	$("#btnUpdate").hide();
	$("#minimo").keypress(validatenum);
	$("#costo").keypress(validatenum);
	$("#venta").keypress(validatenum);

	$('.chosen').chosen({
		allow_single_deselect: true,
		placeholder_text_single: "SELECCIONE",
		no_results_text: "!No Hay Resultados!"
	});

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

	$("#btnUpdate").click(function(){
		if (validar()) {
			var cadena = $("#form1").serialize();

			$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				data: {opc:"modificar_producto",cadena },
				url: "../php/producto.php",
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
					} else if (response.fallo == true) {
						$("#nu").dialog({
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
			$('.chosen').trigger('chosen:updated');
		},
		error: function(xhr,ajaxOptions,throwError){
			console.log(xhr);
		} 
	});

 	$('#bus').click(function(){
 	 	window.location.href = "../pages/BuscarProducto.html";
 	});

	$("#bu").autocomplete({
		minLength: 2,
        source: "../php/autocom_prod.php",
        autoFocus: true
    });

	$("#btnbus").click(function(){
		var bu = $("#bu").val();

		$.ajax({
			cache: false,
			datatype: "JSON",
			type: "POST",
			url: "../php/producto.php",
			data: {opc: "buscar_producto", bu:bu},
			success: function(respuesta){
				if (respuesta.noexiste == true) {
					$("#errornoex").show();
				} else {
					console.log(respuesta);
					$("#codigo").val(respuesta.id);
					$("#libro").val(respuesta.nombre).attr('selected', 'selected');
					$("#prov").val(respuesta.proveedor).attr('selected', 'selected');
					$("#cprov").val(respuesta.codigo_proveedor);
					$("#minimo").val(respuesta.cm);
					$("#actual").val(respuesta.ca);
					$("#compra").val(respuesta.compra);
					$("#venta").val(respuesta.venta);
					$("#errornoex").hide();
					$("#btnUpdate").show();
					$("#btnSave").hide();
					$("#bu").val("");
					$('.chosen').trigger('chosen:updated');
				}
			},
			error: function(xhr,ajaxOptions,throwError){
				console.log(throwError);
			} 
		});
	});

	$("#reset").click(function(){
		$("#btnSave").show();
		$("#btnUpdate").hide();
		$('.chosen').trigger('chosen:updated');
	});

	function limpiar(){
		$("#codigo").val("");
		$("#libro").prop('selectedIndex', 0);
		$("#prov").prop('selectedIndex', 0);
		$("#cprov").val("");
		$("#compra").val("");
		$("#minimo").val("");
		$("#costo").val("");
		$("#venta").val("");
		$('.chosen').trigger('chosen:updated');
	}

	function ocultar(){
		$("#mensajealta").hide();
		$("#error").hide();
		$("#upd").hide();
		$("#existe").hide();
		$("#ng").hide();
		$("#nu").hide();
		$("#numeros").hide();
		$("#erroractual").hide();
		$("#errornom").hide();
		$("#errorprov").hide();
		$("#errorcpp").hide();
		$("#errorcmin").hide();
		$("#errorpcompra").hide();
		$("#errorpventa").hide();
	}

	function validar(){
		var prov = $("#prov").val();
		var name = $("#libro").val();
		var cprov = $("#cprov").val();
		var act = $("#actual").val();
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
		} else if (act == "") {
			$("#actual").focus();
			$("#erroractual").hide();
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