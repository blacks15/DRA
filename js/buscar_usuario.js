$(document).ready(function(){
	   $("#war").hide();
       $("#mensajealta").hide();
       $("#delete").hide();

		jQuery("#usuarios").jqGrid({
						url:'../php/buscar_usuarios.php',
						datatype: 'json',
						mtype: 'POST',
						colNames:['ID','NOMBRE','APELLIDO PATERNO','APELLIDO MATERNO','USUARIO','CALLE','NÚMERO','COLONIA','CIUDAD','ESTADO','TELÉFONO','CELULAR','SUELDO','TIPO'],
						colModel:[
							{name:'clave_usuario', index:'clave_usuario', width:80, resizable:false, align:"center",search:false,key:true},
							{name:'nombre', index:'nombre', width:190,resizable:false},
                        	{name:'apellido_paterno', index:'apellido_paterno', width:330,search:true},
                        	{name:'apellido_materno', index:'apellido_materno',search:true,width:330},
                            {name:'usuario', index:'usuario',search:false, width:190},
                        	{name:'calle', index:'calle',search:false, width:190,},
                            {name:'numero', index:'numero',search:false, width:150},
                        	{name:'colonia', index:'colonia',search:false, width:180},
                            {name:'ciudad', index:'ciudad',search:true, width:180},
                            {name:'estado', index:'estado',search:true, width:190},
                        	{name:'telefono', index:'telefono',search:false, width:200},
                        	{name:'celular', index:'celular',search:false, width:200},
                        	{name:'sueldo', index:'sueldo',search:false, width:150},
                            {name:'tipo', index:'tipo',search:false, width:100}
						],
						height: "100%",
						autowidth: true,
						pager: '#pager2',
        	            rowNum:10,
            	        rowList:[10,20],
                	    sortname: 'clave_usuario',
                        sortorder: 'desc',
                        viewrecords: true,
                        caption: 'EMPLEADOS',
                        altRows: true,
                        onSelectRow: function(ids) {
                        var selr = jQuery('#usuarios').jqGrid('getGridParam','selrow'); 
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
	jQuery("#usuarios").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false,search:false},
         {},//opciones edit
         {}, //opciones add
         {}, //opciones del
         {closeAfterSearch: true, closeOnEscape: true}//opciones search
         );
         $("#usuarios").jqGrid('navButtonAdd','#pager2',{
                caption: "Modificar", 
                buttonicon :'ui-icon-pencil',
                onClickButton : function (){ 
                        modificar();
                } 
        }); 
        $("#usuarios").jqGrid('navButtonAdd','#pager2',{
                caption: "Borrar", 
                buttonicon :'ui-icon-trash',
                onClickButton : function (){ 
                        borrar();
                } 
        }); 
        jQuery("#usuarios").jqGrid("filterToolbar");

            function modificar(){
                var id_tipo = $("#usuarios").jqGrid('getGridParam','selrow'); 

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
            var clave_usuario = $("#usuarios").jqGrid('getGridParam','selrow'); 
            
            if( clave_usuario == null ){
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
                            url: "../php/user.php",
                            data: {opc:"baja_usuario", clave_usuario:clave_usuario},
                            success: function(response) {
                                if(response.respuesta == false) {
                                    alert("Usuario No Eliminado");
                                } else {
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
                                error: function(xhr,ajaxOptions,throwError) {
                                    console.log("Ocurrio un Error");
                                }
                        });
                            $( this ).dialog( "close" );
                            $("#usuarios").trigger("reloadGrid");
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