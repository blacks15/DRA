$(document).ready(function (){
	$.ajax({
		cache: false,
		type: "POST",
		datatype: "json",
		url: "../php/combo.php",
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
		alert("ok");
	});
});