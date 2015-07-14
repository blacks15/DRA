$(document).ready(function(){

	$("#prod").focus();

	$( "#prod" ).autocomplete({
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
			url: "../php/venta.php",
			data: {opc: "buscar_producto", prod:prod},
			success: function(respuesta){
				$("#clave").val(respuesta.clave_producto);
				$("#precio").val(respuesta.precio);
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
            {name:'descripcion_del_producto', index:'descripcion_del_producto', width:250,resizable:true,search:false},
            {name:'cantidad', index:'cantidad', width:150,search:false},
            {name:'precio', index:'precio', search:false, width:80, align:"center",formatter:'currency',formatoptions: {prefix:'$', suffix:'', thousandsSeparator:','} },
            {name:'subtotal', index:'subtotal', width:100,search:false, align:"center",formatter:'currency',formatoptions: {prefix:'$', suffix:'', thousandsSeparator:','}}
        ],
        height: "100%",
        autowidth: true,
        pager: '#pager2',
        sortname: 'codigo',
        sortorder: 'desc',
        caption: 'Productos',
        altRows: true,
        onSelectRow: function(ids) {
            var selr = jQuery('#ventas').jqGrid('getGridParam','selrow'); 
                if(!selr){
                     $("#war").dialog({
                            modal: true,
                            width: 270,
                            height: 170,
                            show: {effect : "fold" ,duration: 300},
                            hide: {effect : "explode", duration: 300},
                            resizable: "false",
                            buttons: { "OK": function () { $(this).dialog("close"); } },   
                        });
                }  
                return false; 
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

	 $('#mas').button({ 
        icons: { 
           primary: 'ui-icon-circle-plus' 
	    }, 
	    text: false
	 }); 

 	 $('#bus').button({ 
	    icons: { 
	       primary: 'ui-icon-search' 
	    }, 
	    text: false
	 }); 

  	 $('#menos').button({ 
	    icons: { 
	       primary: 'ui-icon-circle-minus' 
	    }, 
	    text: false
	 }); 
	 
});