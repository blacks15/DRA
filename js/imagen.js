$(document).ready(function(){
	$("#file").on("change", function(){

		var form = new formdata($("#form")[0]);
		var ruta = "imagenes";

		$.ajax({
			url: ruta,
			type: "post"
			data: formdata
			contenType: false,
			porcessData: false,
			success: function(datos){
				$("#respuesta").html(datos);
			}
		});
	});
});