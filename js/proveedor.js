$(document).ready(function(){

	$("#btnsave").click(function(){
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
				alert("ok");
				if (response.respuesta == false)
				{
					alert("Proveedor Guardado con Exito");
					$("#nombre").val("");
		    		$("#c_name").val("");
					$("#obs").val("");
					$("#direccion").val("");
					$("#colonia").val("");
					$("#telefono").val("");
					$("#celular").val("");
					$("#correo").val("");
				} else {
					alert("Proveedor No Registrado ");
					$("#nombre").val("");
		    		$("#c_name").val("");
					$("#obs").val("");
					$("#direccion").val("");
					$("#colonia").val("");
					$("#telefono").val("");
					$("#celular").val("");
					$("#correo").val("");
				}
			},
			error: function(xhr,ajaxOption,throwError){
				console.log(xhr+", "+ajaxOptions+", "+throwError);
			}
		});
	});
});