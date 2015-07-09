$(document).ready(function(){

    $("#war").hide();
    $("#mensajealta").hide();
    $("#delete").hide();
		jQuery("#editoriales").jqGrid({
            url:'../php/buscar_editorial.php',
            datatype: 'json',
            mtype: 'POST',
            colNames:['ID','NOMBRE','STATUS'],
            colModel:[
                {name:'clave_editorial', index:'clave_editorial',search:false,width:80,resizable:false, align:"center",key:true},
                {name:'nombre', index:'nombre', width:190,resizable:true,search:true},
                {name:'estado', index:'estado', search:false, width:100, align:"center" }
            ],
            height: "100%",
            autowidth: true,
            pager: '#pager2',
            rowNum:10,
            rowList:[10,20],
            sortname: 'clave_editorial',
            sortorder: 'desc',
            viewrecords: true,
            caption: 'EDITORIALES',
            altRows: true,
            pagination: true,
            onSelectRow: function(ids) {
                var selr = jQuery('#editoriales').jqGrid('getGridParam','selrow'); 
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
	jQuery("#editoriales").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false,search:false,view:false},
         {height:280,reloadAfterSubmit:true},//opciones edit
         {}, //opciones add
         {}, //opciones del
         {closeAfterSearch: true, closeOnEscape: true}//opciones search
         );
                $("#editoriales").jqGrid('navButtonAdd','#pager2',{
                caption: "Modificar", 
                autowidth: true,
                buttonicon :'ui-icon-pencil',
                onClickButton : function (){ 
                        modificar();
                } 
        }); 
        $("#editoriales").jqGrid('navButtonAdd','#pager2',{
                caption: "Borrar", 
                autowidth: true,
                buttonicon :'ui-icon-trash',
                onClickButton : function (){ 
                        borrar();
                } 
        }); 

        $(window).on("resize", function () {
            var $grid = $("#editoriales"),
                newWidth = $grid.closest(".ui-jqgrid").parent().width();
            $grid.jqGrid("setGridWidth", newWidth, true);
             });

    jQuery("#editoriales").jqGrid("filterToolbar");

            function modificar(){
                var id_tipo = $("#editoriales").jqGrid('getGridParam','selrow'); 

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
                }else {
                //LIMPIAMOS LA SESSION
                    sessionStorage.clear();
                //ASIGNAMOS LOS VALORES DE LA FILA A LA VARIABLE
                    var data = $("#editoriales").getRowData(id_tipo);
                //CONVERTIMOS A JSON 
                    sessionStorage.editorial = JSON.stringify(data);
                //ENVIAMOS LA INFORMACION 
                    window.location.href = "CrearEditorial.html";
                }
                return false;
        }

    function borrar(){
        var clave_editorial = $("#editoriales").jqGrid('getGridParam','selrow'); 

        if( clave_editorial == null ){
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
                    url: "../php/editorial.php",
                    data: {opc:"baja_editorial", clave_editorial: clave_editorial},
                    success: function(response)  {
                        if(response.respuesta == false)  {
                            alert("Editorial No Eliminado");
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
                        error: function(xhr,ajaxOptions,throwError){
                            console.log("Ocurrio un Error");
                        }
                    });
                    $( this ).dialog( "close" );
                    $("#editoriales").trigger("reloadGrid");
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