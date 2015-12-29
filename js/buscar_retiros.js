$(document).ready(function(){

    $("#war").hide();
    $("#mensajealta").hide();
    $("#delete").hide();
		jQuery("#retiros").jqGrid({
            url:'../php/buscar_retiro.php',
            datatype: 'json',
            mtype: 'POST',
            colNames:['ID','FECHA','EMPLEADO','RETIRO','OBSERVACIÓN'],
            colModel:[
                {name:'id_retiro', index:'id_retiro',search:false,width:80,resizable:false, align:"center",key:true},
                {name:'fecha', index:'fecha', width:190,resizable:true,search:false,formatter:'date',
                    formatoptions: { srcformat: 'ISO8601Long',newformat: 'm/d/Y',defaultValue:null}},
                {name:'empleado', index:'empleado', width:280,search:true},
                {name:'retiro', index:'retiro', search:false, width:100, align:"center",
                    formatter:'currency',formatoptions: {prefix:'$', suffix:'', thousandsSeparator:','} },
                {name:'observacion', index:'observacion', search:true, width:250 }
            ],
            height: "100%",
            autowidth: true,
            pager: '#pager2',
            rowNum:10,
            rowList:[10,20],
            sortname: 'id_retiro',
            sortorder: 'desc',
            viewrecords: true,
            caption: 'RETIROS',
            altRows: true,
            pagination: true,
            onSelectRow: function(ids) {
                var selr = jQuery('#retiros').jqGrid('getGridParam','selrow'); 
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
	jQuery("#retiros").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false,search:false,view:false},
         {height:280,reloadAfterSubmit:true},//opciones edit
         {}, //opciones add
         {}, //opciones del
         {closeAfterSearch: true, closeOnEscape: true}//opciones search
         );

        $("#retiros").jqGrid('navButtonAdd','#pager2',{
        caption: "Modificar", 
        autowidth: true,
        buttonicon :'ui-icon-pencil',
        onClickButton : function (){ 
                modificar();
        } 
        }); 

        $("#retiros").jqGrid('navButtonAdd','#pager2',{
                caption: "Borrar", 
                autowidth: true,
                buttonicon :'ui-icon-trash',
                onClickButton : function (){ 
                        borrar();
                } 
        }); 

        $(window).on("resize", function () {
            var $grid = $("#retiros"),
                newWidth = $grid.closest(".ui-jqgrid").parent().width();
            $grid.jqGrid("setGridWidth", newWidth, true);
        });

    jQuery("#retiros").jqGrid("filterToolbar");

    function modificar(){
        var id_tipo = $("#retiros").jqGrid('getGridParam','selrow'); 

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
                var data = $("#retiros").getRowData(id_tipo);
            //CONVERTIMOS A JSON 
                sessionStorage.retiro = JSON.stringify(data);
            //ENVIAMOS LA INFORMACION 
                window.location.href = "Retiros.html";
            }
            return false;
    }

        function borrar(){
            var clave_autor = $("#retiros").jqGrid('getGridParam','selrow'); 

            if( clave_autor == null ){
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
                            url: "../php/.php",
                            data: {opc:"", clave_autor:clave_autor},
                            success: function(response)  {
                                if(response.respuesta == false)  {
                                    alert("Retiro No Eliminado");
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
                            $("#retiros").trigger("reloadGrid");
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