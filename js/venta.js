$(document).ready(function(){
	limpiar_grid();
	ocultar();
	$("#prod").focus();

	$("#prod").focusout(function(){
		var prod = $("#prod").val();

		$.ajax({
			cache: false,
			datatype: "JSON",
			type: "POST",
			url: "../php/venta.php",
			data: {opc: "buscar_producto", prod:prod},
			success: function(respuesta){
				if (respuesta.noexiste == true) {
					$("#errornoex").show();
				} else if (respuesta.vacio == true) {
					$("#vacio").dialog({
							modal: true,
				            width: 270,
				            height: 170,
				            show: {effect : "fold", duration: 300},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
				        });
				} else {
					$("#clave").val(respuesta.clave_producto);
					$("#precio").val(respuesta.precio);
				}
			},
			error: function(xhr,ajaxOptions,throwError){
				console.log(throwError);
			} 
		});
	});

	$.ajax({
		cache: false,
		type: "POST",
		datatype: "json",
		url: "../php/combo_venta.php",
		success: function(opciones){
			$("#usuario").html(opciones.opcion_user);
			$("#cliente").html(opciones.opcion_cliente);
		},
		error: function(xhr,ajaxOptions,throwError){
			console.log(throwError);
		} 
	});

	jQuery("#ventas").jqGrid({
        //url:'../php/buscar_Autor.php',
        datatype: 'json',
        mtype: 'POST',
        colNames:['CÓDIGO','DESCRIPCIÓN DEL PRODUCTO', 'CANTIDAD','PRECO','SUBTOTAL'],
        colModel:[
            {name:'codigo', index:'codigo',search:false,width:80,resizable:false, align:"center",key:true},
            {name:'producto', index:'producto', width:250,resizable:true,search:false},
            {name:'cantidad', index:'cantidad', width:150,search:false,align:"center",editable:true},
            {name:'precio', index:'precio', search:false, width:80, align:"center",formatter:'currency',formatoptions: {prefix:'$', suffix:'', thousandsSeparator:','} },
            {name:'subtotal', index:'subtotal', width:100,search:false, align:"center",formatter:'currency',formatoptions: {prefix:'$', suffix:'', thousandsSeparator:','} , sorttype: 'number'}
        ],
        height: "auto",
        autowidth: true,
        pager: '#pager2',
        sortname: 'codigo',
        sortorder: 'desc',
        caption: 'Detalle Venta',
        rownumbers: true,
        altRows: true,
        footerrow: true,
        gridComplete: function(){
            var sum =   $("#ventas").jqGrid('getCol', 'subtotal', false, 'sum');
             jQuery("#ventas").jqGrid('footerData', 'set', {codigo:'Total :', subtotal: sum} );
          }
    });
	jQuery("#ventas").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false,search:false,view:false,refresh:false},
         {height:280,reloadAfterSubmit:true},//opciones edit
         {}, //opciones add
         {}, //opciones del
         {closeAfterSearch: true, closeOnEscape: true}//opciones search
         );
    $("#ventas").jqGrid('navButtonAdd','#pager2',{
        caption: "Borrar", 
        autowidth: true,
        buttonicon :'ui-icon-trash',
        onClickButton : function (){ 
                borrar();
        } 
    }); 

    $(window).on("resize", function () {
        var $grid = $("#ventas"),
            newWidth = $grid.closest(".ui-jqgrid").parent().width();
        $grid.jqGrid("setGridWidth", newWidth, true);
         });
	$("#date").datepicker({
			dateFormat: "dd-mm-yy"
		});
	$("#date").datepicker('setDate', '+0');

	 $('#mas').click(function(){
 		var producto = $("#prod").val();
 		var codigo = $("#clave").val();
 		var cantidad = $("#cant").val();
 		var precio = $("#precio").val();
 		var subtotal = precio * cantidad;
	 		if (validar_grid()) {
		 		var data = {codigo,producto,cantidad,precio,subtotal};
		 		$("#ventas").jqGrid('addRowData',codigo,data,"last");
		 		limpiar_grid();
		 	} else {}
	 });

 	 $('#bus').click(function(){
 	 	window.location.href = "../pages/BuscarProducto.html";
 	 });

  	 $('#menos').click(function(){
  	 	var id = $("#ventas").jqGrid('getGridParam','selrow'); 
  	 	jQuery("#ventas").jqGrid('editRow',id,true);
  	 });
	 
	 function limpiar_grid(){
	 	$("#prod").val("");
	 	$("#clave").val("");
	 	$("#cant").val("");
	 	$("#precio").val("");
	 }
	 function validar_grid(){
	 	var producto = $("#prod").val();
	 	var codigo = $("#clave").val();
	 	var cantidad = $("#cant").val();
	 	var precio = $("#precio").val();
	 	var subtotal = $("#precio").val();

	 	if (producto == "") {
	 		return false;
	 	}else if (codigo == "") {
	 		return false;
	 	} else if (cantidad <= 0 || cantidad == "") {
	 		return false;
	 	} else if (precio == "") {
	 		return false;
	 	} else if (subtotal == "") {
	 		return false;
	 	} 
	 	return true;
	 }

	$("#prod").autocomplete({
		minLength: 3,
        source: "../php/buscar_venta.php",
        autoFocus: true
    });

	 function ocultar(){
	 	$("#errornoex").hide();
	 	$("#mensajealta").hide();
	 	$("#vacio").hide();
	 	$("#erroruser").hide();
	 	$("#errordate").hide();
	 	$("#ng").hide();
	 }

	 function validar_venta(){
	 	var user = $("#usuario").val();
	 	var date = $("#date").val();
	 	var cliente = $("#cliente").val();

	 	if (user == null || user == 0) {
	 		$("#usuario").focus();
	 		$("#erroruser").show();
	 		return false;
	 	} else if (date == null) {
	 		$("#date").focus();
	 		$("#errordate").show();
	 		return false;
	 	} else if (cliente == null || cliente == 0) {
	 		$("#cliente").focus();
	 		return false;
	 	}
	 	return true;
	 }
});