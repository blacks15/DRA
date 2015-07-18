$(document).ready(function(){
	$("#prov").focus();
	ocultar();

	$("#ref").click(function(){
	 	window.location.reload();
	 });

	$("#date").datepicker({
		dateFormat: "dd-M-yy"
	});
	$("#date").datepicker('setDate', '+0');

	$("#btnSave").click(function(){
	 	var prov = $("#prov").val();
	 	var date = $("#date").val();
	 	var id_prov = $("#id_prov").val();
 		var id = $("#compras").jqGrid('getGridParam','selrow'); 
 		var data = $("#compras").getRowData(id);
 		var detalle = JSON.stringify(data);

		if (validar_compra() && id == null ) {
			$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				url: "../php/compra.php",
				data: {opc:"guardar_compra", prov: prov, date: date, id_prov: id_prov, detalle  },
				success: function(response){
					if(response.respuesta == true){				
						$("#mensajealta").dialog({
							modal: true,
				            width: 270,
				            height: 170,
				            show: {effect : "fold", duration: 300},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
				        });
				        $("#compras").jqGrid("clearGridData", true).trigger("reloadGrid");
						limpiar();
					} else if (response.fallo == true){ 
						$("#ng").dialog({
							modal: true,
				            width: 270,
				            height: 200,
				            show: {effect : "fold" ,duration: 300},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
				        });
					} 
				},	
					error: function(xhr,ajaxOptions,throwError){
						console.log(throwError);
					}
			});
		} else {
			$("#error").dialog({
				modal: true,
	            width: 270,
	            height: 170,
	            show: {effect : "fold" ,duration: 400},
	            hide: {effect : "explode", duration: 300},
	            resizable: "false",
	            buttons: { "OK": function () { $(this).dialog("close"); } },   
	        });
			}
    });

	$("#prod").autocomplete({
		minLength: 3,
        source: "../php/buscar_venta.php",
        autoFocus: true
    });

	$("#prod").focusout(function(){
		var prod = $("#prod").val();

		$.ajax({
			cache: false,
			datatype: "JSON",
			type: "POST",
			url: "../php/compra.php",
			data: {opc: "buscar_producto", prod:prod},
			success: function(respuesta){
				if (respuesta.noexiste == true) {
					$("#errornopro").show();
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
					$("#prod").val("");
				} else {
					$("#clave").val(respuesta.clave_producto);
					$("#precio").val(respuesta.precio);
					$("#errornopr").hide();
				}
			},
			error: function(xhr,ajaxOptions,throwError){
				console.log(throwError);
			} 
		});
	});

    $("#prov").autocomplete({
		minLength: 2,
        source: "../php/autocom_prov.php",
        autoFocus: true
    });

	$("#prov").focusout(function(){
		var prov = $("#prov").val();

		$.ajax({
			cache: false,
			datatype: "JSON",
			type: "POST",
			url: "../php/compra.php",
			data: {opc: "buscar_proveedor", prov:prov},
			success: function(respuesta){
				if (respuesta.noexiste == true) {
					$("#errornoex").append(prov);
					$("#errornoex").dialog({
						modal: true,
			            width: 270,
			            height: 170,
			            show: {effect : "fold", duration: 300},
			            hide: {effect : "explode", duration: 300},
			            resizable: "false",
			            buttons: { "OK": function () { $(this).dialog("close"); } },   
			        });
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
					$("#prod").val("");
				} else {
					$("#id_prov").val(respuesta.id);
					$("#errornoex").hide();
				}
			},
			error: function(xhr,ajaxOptions,throwError){
				console.log(throwError);
			} 
		});
	});

	$('#bus').click(function(){
 	 	window.location.href = "../pages/BuscarProducto.html";
 	});

 	$('#mas').click(function(){
 		var producto = $("#prod").val();
 		var codigo = $("#clave").val();
 		var cantidad = $("#cant").val();
 		var precio = $("#precio").val();
 		var subtotal = precio * cantidad;
	 		if (validar_grid()) {
		 		var data = {codigo,producto,cantidad,precio,subtotal};
		 		$("#compras").jqGrid('addRowData',codigo,data,"last");
		 		limpiar_grid();
		 	}
	 });

  	$('#menos').click(function(){
  	 	var codigo = $("#compras").jqGrid('getGridParam','selrow'); 
  	 	var p = $("#compras").getRowData(codigo);
  	 	data = JSON.stringify(p);
  	 	ob = JSON.parse(data);
  	 	var producto = ob.producto;
  	 	var col = ob.cantidad
  	 	var precio = ob.precio
  	 	var cantidad = col - 1;
  	 	var subtotal = cantidad * precio;

  	 	var data = {codigo,producto,cantidad,precio,subtotal};
  	 	jQuery("#compras").jqGrid('delRowData',codigo);
  	 	if (cantidad == 0) {
  	 		jQuery("#compras").jqGrid('delRowData',codigo);
  	 	} else {
			$("#compras").jqGrid('addRowData',codigo,data,"last");
		}
  	});

	 function limpiar_grid(){
	 	$("#prod").val("");
	 	$("#clave").val("");
	 	$("#cant").val("");
	 	$("#precio").val("");
	 }

	function ocultar(){
	 	$("#errornoex").hide();
	 	$("#errornopro").hide();
	 	$("#mensajealta").hide();
	 	$("#vacio").hide();
	 	$("#errordate").hide();
	 	$("#ng").hide();
	 	$("#error").hide();
	 	$("#errorprov").hide();
	 	$("#errorgrid").hide();
	 }

	jQuery("#compras").jqGrid({
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
        caption: 'Detalle Compra',
        rownumbers: true,
        altRows: true,
        footerrow: true,
        gridComplete: function(){
            var sum =   $("#compras").jqGrid('getCol', 'subtotal', false, 'sum');
             jQuery("#compras").jqGrid('footerData', 'set', {codigo:'Total :', subtotal: sum} );
          }
    });
	jQuery("#compras").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false,search:false,view:false,refresh:false},
         {height:280,reloadAfterSubmit:true},//opciones edit
         {}, //opciones add
         {}, //opciones del
         {closeAfterSearch: true, closeOnEscape: true}//opciones search
         );
    $("#compras").jqGrid('navButtonAdd','#pager2',{
        caption: "Borrar", 
        autowidth: true,
        buttonicon :'ui-icon-trash',
        onClickButton : function (){ 
                borrar();
        } 
    }); 
    function borrar(){
    	var id = $("#compras").jqGrid('getGridParam','selrow'); 
    	jQuery("#compras").jqGrid('delRowData',id);
    }

    $(window).on("resize", function () {
        var $grid = $("#compras"),
            newWidth = $grid.closest(".ui-jqgrid").parent().width();
        $grid.jqGrid("setGridWidth", newWidth, true);
         });

	function limpiar_grid(){
	 	$("#prod").val("");
	 	$("#clave").val("");
	 	$("#cant").val("");
	 	$("#precio").val("");
	}

	function limpiar(){
		$("#id_prov").val("");
	 	$("#prov").val("");
	 	$("#date").val("");
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

	function validar_compra(){
	 	ocultar();
	 	var grid = $("#compras").jqGrid('getCol','codigo'); 
	 	var prov = $("#prov").val();
	 	var date = $("#date").val();
	 	var id = $("#id_prov").val();

	 	if (prov == "") {
	 		$("#prov").focus();
	 		$("#errorprov").show();
	 		return false;
	 	} else if (date == null || date == "") {
	 		$("#date").focus();
	 		$("#errordate").show();
	 		return false;
	 	} else if (id == "" || id == 0) {
	 		$("#prov").focus();
	 		return false;
	 	} else if (grid == null ) {
	 		$("#errorgrid").dialog({
				modal: true,
	            width: 270,
	            height: 170,
	            show: {effect : "fold", duration: 100},
	            hide: {effect : "explode", duration: 300},
	            resizable: "false",
	            buttons: { "OK": function () { $(this).dialog("close"); } },   
	        });
	        $("#prov").focus();
	 		return false;
	 	}
	 	return true;
	}

});