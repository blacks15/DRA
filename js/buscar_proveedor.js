$(document).ready(function(){
	   
       $("#war").hide();
       $("#mensajealta").hide();
       $("#delete").hide();

		jQuery("#proveedores").jqGrid({
						url:'../php/buscar_proveedores.php',
						datatype: 'json',
						mtype: 'POST',
						colNames:['ID','NOMBRE','CONTACTO','OBSERVACIONES','DIRECCION','COLONIA','TELEFONO','CELULAR','EMAIL'],
						colModel:[
							{name:'clave_proveedor', index:'clave_proveedor', width:80, resizable:false, align:"center",search:false,key:true},
							{name:'nombre', index:'nombre', width:190,resizable:false,search:true},
                        	{name:'contacto', index:'contacto', width:200,search:true},
                        	{name:'observaciones', index:'observaciones', width:150,search:false},
                        	{name:'direccion', index:'direccion', width:190,search:false},
                        	{name:'colonia', index:'colonia', width:200,search:false},
                        	{name:'telefono', index:'telefono', width:100,search:false},
                        	{name:'celular', index:'celular', width:190,search:false},
                        	{name:'email', index:'email', width:200,search:false}
						],
						height: "100%",
						autowidth: true,
						pager: '#pager2',
        	            rowNum:12,
            	        rowList:[10,20],
                	    sortname: 'clave_proveedor',
                        sortorder: 'desc',
                        viewrecords: true,
                        caption: 'PROVEEDORES',
                        altRows: true,
                        pagination:true,
                        onSelectRow: function(ids) {
                        var selr = jQuery('#proveedores').jqGrid('getGridParam','selrow'); 
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
	jQuery("#proveedores").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false,search:false},
         {height:280,reloadAfterSubmit:true},//opciones edit
         {}, //opciones add
         {}, //opciones del
         {multipleSearch:true,closeAfterSearch: true, closeOnEscape: true}//opciones search
         );

     $("#proveedores").jqGrid('navButtonAdd','#pager2',{
                caption: "Modificar", 
                buttonicon :'ui-icon-pencil',
                onClickButton : function (){ 
                        modificar();
                } 
        }); 
        $("#proveedores").jqGrid('navButtonAdd','#pager2',{
                caption: "Borrar", 
                buttonicon :'ui-icon-trash',
                onClickButton : function (){ 
                        borrar();
                } 
        }); 
     jQuery("#proveedores").jqGrid("filterToolbar");

            function modificar(){
                var id_tipo = $("#proveedores").jqGrid('getGridParam','selrow'); 

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
                        $.get("../php/autor.php?opc=modificar_autor&id="+id_tipo, function(data){
                                crear_modal(300,250,data);
                        });
                }
                return false;
        }

        function borrar(){
            var clave_proveedor = $("#proveedores").jqGrid('getGridParam','selrow'); 
 
            if( clave_proveedor == null ){
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
<<<<<<< HEAD
                      height: 170,
=======
                      height:170,
>>>>>>> origin/local
                      modal: true,
                      show: {effect : "fold" ,duration: 300},
                      hide: {effect : "explode", duration: 300},
                      buttons: {
                        "Eliminar": function() {
                          $.ajax({
                            cache: false,
                            type: "POST",
                            datatype: "json",
                            url: "../php/proveedor.php",
                            data: {opc:"baja_proveedor", clave_proveedor:clave_proveedor},
                            success: function(response)  {
                                if(response.respuesta == false)  {
                                    alert("Proveedor No Eliminado");
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
                            $("#proveedores").trigger("reloadGrid");
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
