$(document).ready(function(){

	ocultar();
	entrar();

	$("#nombre").focus();

	$("#alta").click(function(){
		var first_name = $("#nombre").val();
		var last_name = $("#apellido").val();

		if (validar() ) {
			$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				url: "../php/autor.php",
				data: {opc:"guardar_autor", first_name: first_name, last_name: last_name },
				success: function(response){
					if(response.respuesta == true){				
						$("#mensajealta").dialog({
							modal: true,
				            width: 270,
				            height: 170,
				            show: {effect : "fold", duration: 300},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
				        });
						limpiar();
						$("#errornom").hide();
						$("#errorap").hide();
					} else if (response.existe == true) {
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


	$("#btnUpdate").click(function(){
		var codigo = $("#codigo").val();
		var first_name = $("#nombre").val();
		var last_name = $("#apellido").val();
		var status = $("#status").val();

		if (validar) {
		$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				url: "../php/autor.php",
				data: {opc:"modificar_autor", codigo: codigo,first_name: first_name, last_name: last_name, status: status },
				success: function(response){
					if(response.respuesta == false){
						alert("Autor No Modificado");
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
						$("#alta").show();
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


    function validar(){

    	ocultar();
    	var first_name = $("#nombre").val();
		var last_name = $("#apellido").val();

		if(first_name == ""){
			$("#nombre").focus();
			$("#errornom").show();
			return false;
		} else if (last_name == "") {
			$("#apellido").focus();
			$("#errorap").show();
			return false;
		}

		return true;
    }

    function limpiar (){
    	$("#codigo").val("");
    	$("#nombre").val("");
		$("#apellido").val("");
		$("#status").val("");
    }

    function ocultar(){
    	$("#errornom").hide();
		$("#errorap").hide();
		$("#mensajealta").hide();
		$("#error").hide();
		$("#letras").hide();
		$("#btnUpdate").hide();
		$("#upd").hide();
		$("#existe").hide();
		$("#ng").hide();
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
				$("#alta").hide();
			//VACIAMOS LA SESSION
				sessionStorage.clear();
			}
		}

});