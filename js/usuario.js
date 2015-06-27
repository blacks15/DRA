$(document).ready(function(){
	$("#vc").hide();
	$("#nombre").
	$("#alta").click(function(){
			
	//	if ( validar_datos() ) {
		var cadena = $("#form1").serialize();
			alert(cadena);

			$.ajax({
				cache: false,
				type: "post",
				datatype: "json",
				url: "../php/user.php",
				data: {opc:"guardar_usuario",cadena },
				success: function(response)
				{
					if(response.respuesta == false)
					{
						alert("Empleado No Registrado");
						//limpiar();
					}
					else
					{
						alert("Empleado Registrado");
						//limpiar();
					}
				},	
					error: function(xhr,ajaxOptions,throwError)
					{
						console.log("Ocurrio un Error");
					}
			});
				//} else{
				//	alert("Favor de llenar todos los campos");
				//}
			
    });

		function validar_datos(){
			var name = $("#nombre").val();
			var apaterno = $("#apaterno").val();
			var amaterno = $("#amaterno").val();
			var user = $("#usuario").val();
			var pass = $("#pass").val();
			var repite = $("#rpass").val();
			var estado = $("#edo").val();
			var city = $("#ciudad").val();
			var calle = $("#calle").val();
			var num = $("#num").val();
			var col = $("#colonia").val();
			var tel = $("#telefono").val();
			var cel = $("#celular").val();
			var sueldo = $("#sueldo").val();
			var tipo = $("tipo").val();
			
			if (name == "") {
				$("#nombre").focus();
				return false
			} else if (apaterno ==""){
				$("#apaterno").focus();
				return false
			} else if (amaterno == ""){
				$("#amaterno").focus();
				return false
			} else if (estado == ""){
				$("#edo").focus();
				return false
			} else if (city == ""){
				$("#ciudad").focus();
				return false
			} else if (calle == ""){
				$("#calle").focus();
				return false
			} else if (num == ""){
				$("#num").focus();
				return false
			} else if (col == ""){
				$("#colonia").focus();
				return false
			} else if (tel == ""){
				$("#telefono").focus();
				return false
			} else if (cel == ""){
				$("#celular").focus();
				return false
			} else if (sueldo == ""){
				$("#sueldo").focus();
				return false
			}

			return true;
		}

		function limpiar (){
			$("#nombre").val("");
			$("#apaterno").val("");
			$("#amaterno").val("");
			$("#usuario").val("");
			$("#pass").val("");
			$("#rpass").val("");
			$("#edo").val("");
			$("#ciudad").val("");
			$("#calle").val("");
			$("#num").val("");
			$("#colonia").val("");
			$("#telefono").val("");
			$("#celular").val("");
			$("#sueldo").val("");
			$("tipo").val("");
		}
		
});