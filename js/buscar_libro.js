$(document).ready(function(){
	   $("#war").hide();
       $("#mensajealta").hide();
       $("#delete").hide();

		jQuery("#libros").jqGrid({
			url:'../php/buscar_libro.php',
			datatype: 'json',
			mtype: 'POST',
			colNames:['ID','NOMBRE','ISBN','GÉNERO','AUTOR','EDITORIAL','NÚM PÁG','STATUS'],
			colModel:[
				{name:'clave_libro', index:'clave_libro', width:80, resizable:false, align:"center",search:false,key:true},
				{name:'nombre_libro', index:'nombre_libro', width:450,resizable:false,search: true},
            	{name:'isbn', index:'isbn', width:200,search:false},
            	{name:'nombre_genero', index:'nombre_genero',search:true,width:170,search:true},
            	{name:'nombre_autor', index:'nombre_autor',search:false, width:190,search:true},
                {name:'nombre_editorial', index:'nombre_editorial',search:false, width:150,search:true},
            	{name:'pag', index:'pag',search:false, width:130},
                {name:'status', index:'status',search:true, width:110,search:false}
			],
			height: "100%",
			autowidth: true,
			pager: '#pager2',
            rowNum:10,
	        rowList:[10,20],
    	    sortname: 'clave_libro',
            sortorder: 'desc',
            viewrecords: true,
            caption: 'LIBROS',
            altRows: true,
            onSelectRow: function(ids) {
            var selr = jQuery('#libros').jqGrid('getGridParam','selrow'); 
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
	jQuery("#libros").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false,search:false},
         {},//opciones edit
         {}, //opciones add
         {}, //opciones del
         {closeAfterSearch: true, closeOnEscape: true}//opciones search
         );
    $("#libros").jqGrid('navButtonAdd','#pager2',{
        caption: "Modificar", 
        buttonicon :'ui-icon-pencil',
        onClickButton : function (){ 
                modificar();
        } 
        }); 
    $("#libros").jqGrid('navButtonAdd','#pager2',{
            caption: "Borrar", 
            buttonicon :'ui-icon-trash',
            onClickButton : function (){ 
                    borrar();
            } 
        }); 

    $(window).on("resize", function () {
        var $grid = $("#libros"),
        newWidth = $grid.closest(".ui-jqgrid").parent().width();
        $grid.jqGrid("setGridWidth", newWidth, true);
    });
    jQuery("#libros").jqGrid("filterToolbar");

    function modificar(){
        var id_tipo = $("#libros").jqGrid('getGridParam','selrow'); 

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
            var data = $("#libros").getRowData(id_tipo);
        //CONVERTIMOS A JSON 
            sessionStorage.libro = JSON.stringify(data);
        //ENVIAMOS LA INFORMACION 
            window.location.href = "CrearLibro.html";
        }
        return false;
    }

    function borrar(){
        var id = $("#libros").jqGrid('getGridParam','selrow'); 
        
        if( id == null ){
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
                        url: "../php/libro.php",
                        data: {opc:"baja_libro", matricula: matricula},
                        success: function(response) {
                            if(response.respuesta == false) {
                                alert("Libro No Eliminado");
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
                        $("#libros").trigger("reloadGrid");
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