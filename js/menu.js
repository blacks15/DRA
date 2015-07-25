$(function(){
	$(".dropdown-menu > li > a.trigger").on("mouseover",function(e){
		var current = $(this).next();
		var grandparent = $(this).parent().parent();
		if($(this).hasClass('left-caret') || $(this).hasClass('right-caret'))
			$(this).toggleClass('right-caret left-caret');
		grandparent.find('.left-caret').not(this).toggleClass('right-caret left-caret');
		grandparent.find(".sub-menu:visible").not(current).hide();
		current.toggle();
		e.stopPropagation();
	});

	$(".dropdown-menu > li > a:not(.trigger)").on("click",function(){
		var root = $(this).closest('.dropdown');
		root.find('.left-caret').toggleClass('right-caret left-caret');
		root.find('.sub-menu:visible').hide();
	});

	$.ajax({
		cache: false,
		type: "POST",
		datatype: "json",
		url: "../php/login.php",
		success: function(opciones){
			$("#editorial").html(opciones.opcion_ed);
			$("#autor").html(opciones.opcion_aut);
			$("#genero").html(opciones.opcion_genero);
		},
		error: function(xhr,ajaxOptions,throwError){
			console.log(xhr);
		} 
	});

});