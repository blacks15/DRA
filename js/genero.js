$(document).ready(function(){
		
	ocultar();
	entrar();
	$("#nombre").focus();

	$("#alta").click(function(){
		var name = $("#nombre").val();

			if (validar() ) {
			$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				data: {opc:"guardar_genero",name: name },
				url: "../php/genero.php",
				success: function(response) {
					if (response.respuesta == true){
						$("#mensajealta").dialog({
							modal:true,
							width: 270,
							height: 170,
							show: {effect : "fold" ,duration: 300},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
						});
						limpiar();
					} else {
						if (response.existe == true) {
							$("#existe").dialog({
								modal: true,
					            width: 270,
					            height: 170,
					            show: {effect : "fold" ,duration: 300},
					            hide: {effect : "explode", duration: 300},
					            resizable: "false",
					            buttons: { "OK": function () { $(this).dialog("close"); } },   
					        });
						} else {
							alert("Genero No Registrado");
							limpiar();
						}
					}
				},	
				error: function (xhr,ajaxOptions,throwError) {
						alert(throwError);
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
			var name = $("#nombre").val();
			var status = $("#status").val();

			if (validar() ) {
			$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				data: {opc:"modificar_genero",name: name, codigo: codigo, status: status },
				url: "../php/genero.php",
				success: function(response) {
					if (response.respuesta == true){
						$("#upd").dialog({
							modal:true,
							width: 270,
							height: 170,
							show: {effect : "fold" ,duration: 300},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
						});
						limpiar();
					} else {
						$("#ng").dialog({
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
				error: function (xhr,ajaxOptions,throwError) {
						alert(throwError);
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
 	 	window.location.href = "../pages/BuscarGenero.html";
 	});

    function validar() {
    	if ($("#nombre").val() == "") {
    		$("#nombre").focus();
    		$("#errornom").show();
    		return false;
    	} else {
    		$("#errornom").hide();
    		return true;
    	}
    }

    function ocultar(){
    	$("#errornom").hide();
		$("#mensajealta").hide();
		$("#error").hide();
		$("#letras").hide();
		$("#upd").hide();
		$("#btnUpdate").hide();
		$("#ng").hide();
		$("#existe").hide();
    }

    function limpiar(){
    	$("#codigo").val("");
    	$("#nombre").val("");
    	$("#status").val("");
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
			if (sessionStorage.genero == undefined){
				
			} else {
				//RECUPERAMOS LOS VALORES ALMACENADOS EN SESSION 
				id = sessionStorage.key(0);
				res = sessionStorage.getItem('genero');
			//CONVERTIMOS EL JSON A UN OBJETO
				ob = JSON.parse(res);
			//ASGINAMOS VALORES A LOS INPUTS
				$("#codigo").val(ob.clave_genero);
				$("#nombre").val(ob.nombre);
				$("#status").val(ob.estado);
			//OCULTAMOS BOTON GUARDAR Y MOSTRAMOS MODIFICAR
				$("#btnUpdate").show();
				$("#alta").hide();
			//VACIAMOS LA SESSION
				sessionStorage.clear();
			}
		}

});