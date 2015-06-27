$(document).ready(function(){
		
	$("#nombre").focus();
	$("#lblnombre").hide();

	$("#alta").click(function(){
		var name = $("#nombre").val();
			
			$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				url: "../php/genero.php",
				data: {opc:"guardar_genero",name: name },
				success: function(response) {
					if(response.respuesta == false){
						alert("Genero No Registrado");
						$("#nombre").val("");
					} else {
						alert("Genero Registrado");
						$("#nombre").val("");
					}
				},	
				error: function(xhr,ajaxOptions,throwError) {
					console.log(xhr+", "+ajaxOptions+", "+throwError);
				}
			});
    });

    function validar(){
    	if ($("#nombre").val() == "") {
    		$("#nombre").focus();
    		$("#lblnombre").show();
    	}
    }

});