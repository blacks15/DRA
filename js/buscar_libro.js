$(document).ready(function(){
	   $("#war").hide();
       $("#mensajealta").hide();
       $("#delete").hide();

		jQuery("#libros").jqGrid({
			url:'../php/buscar_libro.php',
			datatype: 'JSON',
			mtype: 'POST',
			colNames:['ID','NOMBRE LIBRO','AUTOR'],
			colModel:[
				{name:'clave_libro', index:'clave_libro', width:150, resizable:false, align:"center",search:true,key:true},
				{name:'nombre_libro', index:'nombre_libro', width:450,resizable:false,search:true},
        {name:'nombre_autor', index:'nombre_autor', width:450,resizable:false,search:true}
			],
			height: "100%",
			autowidth: true,
			pager: '#pager2',
      rowNum: 15,
      rowList:[15,30,45],
	    sortname: 'clave_libro',
      sortorder: 'desc',
      viewrecords: true,
      gridview: true,
      caption: 'LIBROS',
      altRows: true,
      pagination:true,
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