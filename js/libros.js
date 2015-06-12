$(document).ready(function (){
	alert("xDd");
	$.ajax({
		cache: false,
		type: "POST",
		datatype: "json",
		url: "../php/combo.php",
		success: function(opciones){
			//alert(opciones.opcion_ed);
			//alert(opciones.opcion_genero);
			//alert(opciones.opcion_aut);
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