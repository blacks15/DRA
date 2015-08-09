$(document).ready(function(){

	ocultar();
	jQuery("#corte").jqGrid({
		url:'../php/dcortecaja.php',
        datatype: 'json',
        mtype: 'POST',
        colNames:['FECHA', 'INGRESO','EGRESO','TOTAL'],
        colModel:[
            {name:'fecha', index:'fecha', width:150,resizable:true,search:false},
            {name:'ingreso', index:'ingreso', width:150,search:false,align:"center",formatter:'currency',formatoptions: {prefix:'$', suffix:'', thousandsSeparator:','},key:true },
            {name:'egreso', index:'egreso', search:false, width:150, align:"center",formatter:'currency',formatoptions: {prefix:'$', suffix:'', thousandsSeparator:','} },
            {name:'total', index:'total', width:150,search:false, align:"center",formatter:'currency',formatoptions: {prefix:'$', suffix:'', thousandsSeparator:','} , sorttype: 'number'}
        ],
        height: "auto",
        autowidth: true,
        pager: '#pager2',
        sortname: 'fecha',
        sortorder: 'desc',
        rownumbers: true,
        caption: 'Corte de Caja',
        altRows: true,
    });
	jQuery("#corte").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false,search:false,view:false,refresh:false},
         {height:280,reloadAfterSubmit:true},//opciones edit
         {}, //opciones add
         {}, //opciones del
         {closeAfterSearch: true, closeOnEscape: true}//opciones search
         );

    $(window).on("resize", function () {
        var $grid = $("#corte"),
            newWidth = $grid.closest(".ui-jqgrid").parent().width();
        $grid.jqGrid("setGridWidth", newWidth, true);
    });

	$.ajax({
		cache: false,
		type: "POST",
		datatype: "json",
		url: "../php/combo_venta.php",
		success: function(opciones){
			$("#usuario").val(opciones.opcion_corte);
		},
		error: function(xhr,ajaxOptions,throwError){
			console.log(throwError);
		} 
	});

	$("#date").datepicker({
			dateFormat: "dd-M-yy"
	});
	$("#date").datepicker('setDate', '+0');

	$("#btnSave").click(function(){
	 	var user = $("#usuario").val();
	 	var date = $("#date").val();
 		var id = $("#corte").jqGrid('getGridParam','selrow'); 
 		var data = $("#corte").getRowData(id);
 		var detalle = JSON.stringify(data);

			$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				url: "../php/cortecaja.php",
				data: {opc:"guardar_corte", user: user, date: date,detalle  },
				success: function(response){
					if(response.respuesta == true){		
						$("#mensajealta").append('¿Desear Imprimir?');
						$("#mensajealta").dialog({
							modal: true,
				            width: 270,
				            height: 170,
				            show: {effect : "fold", duration: 300},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "Si": function () {
				           // 	window.location.href = "../php/rptventa.php?folio="+response.folio;
				            },
				            No: function() {$( this ).dialog( "close" );
                			} },   
				        });
				        $("#corte").jqGrid("clearGridData", true).trigger("reloadGrid");
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
					} else if (response.existe == true){ 
						$("#existe").dialog({
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
    });

	function ocultar(){
		$("#mensajealta").hide();
		$("#ng").hide();
		$("#existe").hide();
	}
});