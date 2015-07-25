$(document).ready(function (){

	$("#nombre").focus();
	ocultar();
	$("#pag").keypress(validatenum);
	$("#btnUpdate").hide();

	$.ajax({
		cache: false,
		type: "POST",
		datatype: "json",
		url: "../php/combo_libro.php",
		success: function(opciones){
			$("#editorial").html(opciones.opcion_ed);
			$("#autor").html(opciones.opcion_aut);
			$("#genero").html(opciones.opcion_genero);
		},
		error: function(xhr,ajaxOptions,throwError){
			console.log(xhr);
		} 
	});

	$("#btnsave").click(function(){
		if (validar()) {
			var cadena = $("#form1").serialize();

			$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				data: {opc:"guardar_libro",cadena },
				url: "../php/libro.php",
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
				data: {opc:"modificar_libro",cadena },
				url: "../php/libro.php",
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

 	$('#bus').click(function(){
 	 	window.location.href = "../pages/BuscarLibro.html";
 	});

	$("#bu").autocomplete({
		minLength: 2,
        source: "../php/autocom_libro.php",
        autoFocus: true
    });

	$("#btnbus").click(function(){
		var bu = $("#bu").val();

		$.ajax({
			cache: false,
			datatype: "JSON",
			type: "POST",
			url: "../php/libro.php",
			data: {opc: "buscar_libro", bu:bu},
			success: function(respuesta){
				if (respuesta.noexiste == true) {
					$("#errornoex").show();
				} else {
					$("#codigo").val(respuesta.id);
					$("#nombre").val(respuesta.nombre);
					$("#isbn").val(respuesta.isbn);
					$("#genero").val(respuesta.genero).attr('selected', 'selected');
					$("#autor").val(respuesta.autor).attr('selected', 'selected');
					$("#editorial").val(respuesta.editorial).attr('selected', 'selected');
					$("#pag").val(respuesta.pag);
					$("#obs").val(respuesta.descripcion);
					$("#errornoex").hide();
					$("#btnUpdate").show();
					$("#btnsave").hide();
					$("#bu").val("");
				}
			},
			error: function(xhr,ajaxOptions,throwError){
				console.log(throwError);
			} 
		});
	});

	$("#reset").click(function(){
		$("#btnsave").show();
		$("#btnUpdate").hide();
	});

	function validar(){
		ocultar();
		var name = $("#nombre").val();
		var isbn = $("#isbn").val();
		var genero = $("#genero").val();
		var autor = $("#autor").val();
		var editorial = $("#editorial").val();
		var obs = $("#obs").val();
		if (name == "") {
			$("#nombre").focus();
			$("#errornom").show();
			return false;
		} else if (isbn == "") {
			$("#isbn").focus();
			$("#errorisbn").show();
			return false;
		} else if (genero == null || genero == 0) {
			$("#genero").focus();
			$("#errorgen").show();
			return false;
		} else 	if (autor == null || autor == 0) {
			$("#autor").focus();
			$("#errorautor").show();
			return false;
		} else if (editorial == 0 || editorial == null) {
			$("#editorial").focus();
			$("#erroredit").show();
			return false;
		} else if (obs == "") {
			$("#obs").focus();
			$("#errordes").show();
			return false;
		}
		ocultar();
		return true;
	}

	function ocultar(){
		$("#errornom").hide();
		$("#errorisbn").hide();
		$("#errorautor").hide();
		$("#erroredit").hide();
		$("#errordes").hide();
		$("#errorgen").hide();
		$("#error").hide();
		$("#mensajealta").hide();
		$("#numeros").hide();
		$("#letras").hide();
		$("#ng").hide();
		$("#upd").hide();
		$("#existe").hide();
		$("#errornoex").hide();
		$("#nu").hide();
	}

	function limpiar(){
		$("#codigo").val("");
		$("#nombre").val("");
		$("#isbn").val("");
		$("#pag").val("");
		$("#obs").val("");
		$("#genero").prop('selectedIndex', 0);
		$("#autor").prop('selectedIndex', 0);
		$("#editorial").prop('selectedIndex', 0);
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