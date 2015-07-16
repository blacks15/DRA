$(document).ready(function(){
	   
       $("#war").hide();
       $("#mensajealta").hide();
       $("#delete").hide();

		jQuery("#productos").jqGrid({
				url:'../php/buscar_producto.php',
				datatype: 'json',
				mtype: 'POST',
				colNames:['ID','NOMBRE','PROVEEDOR','CÓDIGO DEL PROVEEDOR','CANTIDAD ACTUAL','CANTIDAD MINIMA','PRECIO VENTA', 'STATUS'],
				colModel:[
					{name:'clave_producto', index:'clave_producto', width:90, resizable:false, align:"center",search:false,key:true},
					{name:'nombre_libro', index:'nombre_libro', width:200,resizable:false,search:true},
                    {name:'proveedor', index:'proveedor', width:200,search:true},
                	{name:'codigo_proveedor', index:'codigo_proveedor', width:320,search:true},
                	{name:'cantidad_actual', index:'cantidad_actual', width:250,search:false},
                    {name:'cantidad_minima', index:'cantidad_minima',search:false, width:250,},
                    {name:'precio_venta', index:'precio_venta',formatter:'currency',formatoptions: {prefix:'$', suffix:'', thousandsSeparator:','},search:false, width:180},
                    {name:'status', index:'status',search:false, width:180},
				],
				height: "100%",
				autowidth: true,
				pager: '#pager2',
	            rowNum:10,
    	        rowList:[10,20],
        	    sortname: 'clave_producto',
                sortorder: 'desc',
                viewrecords: true,
                caption: 'PRODUCTOS',
                altRows: true,
                pagination:true,
                onSelectRow: function(ids) {
                var selr = jQuery('#productos').jqGrid('getGridParam','selrow'); 
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
	jQuery("#productos").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false,search:false},
         {height:280,reloadAfterSubmit:true},//opciones edit
         {}, //opciones add
         {}, //opciones del
         {multipleSearch:true,closeAfterSearch: true, closeOnEscape: true}//opciones search
         );

     $("#productos").jqGrid('navButtonAdd','#pager2',{
                caption: "Modificar", 
                buttonicon :'ui-icon-pencil',
                onClickButton : function (){ 
                        modificar();
                } 
        }); 
        $("#productos").jqGrid('navButtonAdd','#pager2',{
                caption: "Borrar", 
                buttonicon :'ui-icon-trash',
                onClickButton : function (){ 
                        borrar();
                } 
        }); 

    $(window).on("resize", function () {
        var $grid = $("#productos"),
            newWidth = $grid.closest(".ui-jqgrid").parent().width();
        $grid.jqGrid("setGridWidth", newWidth, true);
         });
     jQuery("#productos").jqGrid("filterToolbar");

            function modificar(){
                var id_tipo = $("#productos").jqGrid('getGridParam','selrow'); 

                if( id_tipo == null ){
                        $("#war").dialog({
                            modal: true,
                            width: 270,
                            height: 170,
                            show: {effect : "fold" ,duration: 300},
                            hide: {effect : "explode", duration: 300},
                            resizable: "false",
                            buttons: { "OK": function () { $(this).dialog("close"); } },   
                        });
                }else{
                        
                }
                return false;
        }

        function borrar(){
            var matricula = $("#productos").jqGrid('getGridParam','selrow'); 
 
            if( matricula == null ){
                $("#war").dialog({
                    modal: true,
                    width: 270,
                    height: 170,
                    show: {effect : "fold" ,duration: 300},
                    hide: {effect : "explode", duration: 300},
                    resizable: "false",
                    buttons: { "OK": function () { $(this).dialog("close"); } },   
                });
            }else {
                $( "#delete" ).dialog({
                      resizable: false,
                      height: 170,
                      modal: true,
                      show: {effect : "fold" ,duration: 300},
                      hide: {effect : "explode", duration: 300},
                      buttons: {
                        "Eliminar": function() {
                          $.ajax({
                            cache: false,
                            type: "POST",
                            datatype: "json",
                            url: "../php/producto.php",
                            data: {opc:"baja_producto", clave_producto:clave_producto},
                            success: function(response)  {
                                if(response.respuesta == false)  {
                                    alert("Productos No Eliminado");
                                }
                                else{
                                    $("#mensajealta").dialog({
                                        modal: true,
                                        width: 270,
                                        height: 170,
                                        show: {effect : "fold" ,duration: 300},
                                        hide: {effect : "explode", duration: 300},
                                        resizable: "false",
                                        buttons: { "OK": function () { $(this).dialog("close"); } },   
                                    });
                            }
                        },  
                            error: function(xhr,ajaxOptions,throwError){
                                console.log("Ocurrio un Error");
                            }
                         });
                            $( this ).dialog( "close" );
                            $("#productos").trigger("reloadGrid");
                        },
                        Cancelar: function() {
                          $( this ).dialog( "close" );
                        }
                      }
                    });
        }
        return false;
}

});