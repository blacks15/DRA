$(document).ready(function(){
	   
       $("#war").hide();
       $("#mensajealta").hide();
       $("#delete").hide();

		jQuery("#clientes").jqGrid({
			url:'../php/buscar_clientes.php',
			datatype: 'json',
			mtype: 'POST',
			colNames:['ID','RFC','EMPRESA','CONTACTO','A. PATERNO','A. MATERNO','CALLE','NÚM','COLONIA','CIUDAD','ESTADO','TELÉFONO','CELULAR','EMAIL'],
			colModel:[
				{name:'matricula', index:'matricula', width:100, resizable:false, align:"center",search:false,key:true},
                {name:'rfc', index:'rfc', width:270,resizable:false,search:true},
				{name:'empresa', index:'empresa', width:270,resizable:false,search:true},
            	{name:'nombre_contacto', index:'nombre_contacto', width:220,search:true},
            	{name:'apellido_paterno', index:'apellido_paterno', width:200,search:false},
                {name:'apellido_materno', index:'apellido_materno', width:200,search:false},
                {name:'calle', index:'calle',search:false, width:190,},
                {name:'numero', index:'numero',search:false, width:120},
                {name:'colonia', index:'colonia',search:false, width:170},
                {name:'ciudad', index:'ciudad',search:true, width:170},
                {name:'estado', index:'estado',search:true, width:170},
                {name:'telefono', index:'telefono',search:false, width:200},
                {name:'celular', index:'celular',search:false, width:200},
            	{name:'email', index:'email', width:250,search:false},
			],
			height: "100%",
			autowidth: true,
			pager: '#pager2',
            rowNum:12,
	        rowList:[10,20],
    	    sortname: 'matricula',
            sortorder: 'desc',
            viewrecords: true,
            caption: 'CLIENTES',
            altRows: true,
            pagination:true,
            onSelectRow: function(ids) {
            var selr = jQuery('#clientes').jqGrid('getGridParam','selrow'); 
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
	jQuery("#clientes").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false,search:false},
         {height:280,reloadAfterSubmit:true},//opciones edit
         {}, //opciones add
         {}, //opciones del
         {multipleSearch:true,closeAfterSearch: true, closeOnEscape: true}//opciones search
         );

     $("#clientes").jqGrid('navButtonAdd','#pager2',{
                caption: "Modificar", 
                buttonicon :'ui-icon-pencil',
                onClickButton : function (){ 
                        modificar();
                } 
        }); 
    $("#clientes").jqGrid('navButtonAdd','#pager2',{
                caption: "Borrar", 
                buttonicon :'ui-icon-trash',
                onClickButton : function (){ 
                        borrar();
                } 
        }); 

    $(window).on("resize", function () {
        var $grid = $("#clientes"),
            newWidth = $grid.closest(".ui-jqgrid").parent().width();
        $grid.jqGrid("setGridWidth", newWidth, true);
         });
     jQuery("#clientes").jqGrid("filterToolbar");

            function modificar(){
                var id_tipo = $("#clientes").jqGrid('getGridParam','selrow'); 

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
                } else {
                //LIMPIAMOS LA SESSION
                    sessionStorage.clear();
                //ASIGNAMOS LOS VALORES DE LA FILA A LA VARIABLE
                    var data = $("#clientes").getRowData(id_tipo);
                //CONVERTIMOS A JSON 
                    sessionStorage.cliente = JSON.stringify(data);
                //ENVIAMOS LA INFORMACION 
                    window.location.href = "CrearClientes.html";
                }
                return false;
        }

        function borrar(){
            var matricula = $("#clientes").jqGrid('getGridParam','selrow'); 
 
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
                            url: "../php/cliente.php",
                            data: {opc:"baja_clientes", matricula:matricula},
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
                            $("#clientes").trigger("reloadGrid");
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