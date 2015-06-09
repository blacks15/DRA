$(document).ready(function (){

	$.ajax({
		cache: false,
		type: "POST",
		datatype: "json",
		url: "../php/libros.php",
		success: function(response){
			$("#editorial").html(response.opcion_ed);
			$("#autor").html(response.opcion_au);
		},
		error: function(xhr,ajaxOption,throwError){
				console.log(xhr+", "+ajaxOptions+", "+throwError);
			} 
	});
	$("#btnsave").click(function(){
		alert("ok");
	});
});