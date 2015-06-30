$(document).ready(function(){

	$("#nombre").focus();
		ocultar();
	$("#btnsave").click(function(){
		
		if( validar_datos() ){
		var name= $("#nombre").val();
		var contacto= $("#c_name").val();
		var obs = $("#obs").val();
		var dir= $("#direccion").val();
		var col = $("#colonia").val();
		var tel = $("#telefono").val();
		var cel = $("#celular").val();
		var email = $("#correo").val();
		
		$.ajax({
			cache: false,
			type: "POST",
			datatype: "json",
			url: "../php/proveedor.php",
			data: {opc:"guardar_proveedor",name: name,contacto: contacto,obs: obs,dir: dir,col: col,tel: tel,cel: cel,email: email},
			success: function(response){
				if (response.respuesta == false){
					alert("Proveedor No Registrado");
					limpiar();
				} else {
					alert("Proveedor Registrado ");
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
					ocultar();
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

	function validar_datos(){
		var name = $("#nombre").val();
		var contacto = $("#c_name").val();
		var obs = $("#obs").val();
		var dir= $("#direccion").val();
		var col = $("#colonia").val();
		var tel = $("#telefono").val();
		var cel = $("#celular").val();
		var email = $("#correo").val();
		var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;	
			if (name == "") {
				$("#nombre").focus();
				$("#errornom").show();
				return false
			} else if (contacto ==""){
				$("#c_name").focus();
				$("#errorcon").show();
				return false
			} else if (dir == ""){
				$("#direccion").focus();
				$("#errordir").show();
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
			} else if (!regex.test($('#correo').val().trim() ) || email == "") {
				$("#correo").focus();
				$("#erroremail").show();
				 return false;
			}			
			ocultar();
			return true;
		}

		function limpiar (){
			var name= $("#nombre").val();
			var contacto= $("#c_name").val();
			var obs = $("#obs").val();
			var dir= $("#direccion").val();
			var col = $("#colonia").val();
			var tel = $("#telefono").val();
			var cel = $("#celular").val();
			var email = $("#correo").val();
		}

		function ocultar(){
			$("#mensajealta").hide();
			$("#error").hide();
			$("#errornom").hide();
			$("#errorcon").hide();
			$("#errordir").hide();
			$("#errorcol").hide();
			$("#errortel").hide();
			$("#errorcel").hide();
			$("#erroremail").hide();
		}
});