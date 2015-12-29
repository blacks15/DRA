$(document).ready(function(){

    $("#war").hide();
    $("#mensajealta").hide();
    $("#delete").hide();
		jQuery("#generos").jqGrid({
            url:'../php/buscar_genero.php',
            datatype: 'json',
            mtype: 'POST',
            colNames:['ID','NOMBRE','STATUS'],
            colModel:[
                {name:'clave_genero', index:'clave_genero',search:false,width:80,resizable:false, align:"center",key:true},
                {name:'nombre_genero', index:'nombre_genero', width:190,resizable:true,search:true},
                {name:'estado', index:'estado', search:false, width:100, align:"center" }
            ],
            height: "100%",
            autowidth: true,
            pager: '#pager2',
            rowNum:10,
            rowList:[10,20],
            sortname: 'clave_genero',
            sortorder: 'desc',
            viewrecords: true,
            caption: 'GÉNEROS LITERARIOS',
            altRows: true,
            pagination: true,
            onSelectRow: function(ids) {
                var selr = jQuery('#generos').jqGrid('getGridParam','selrow'); 
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
	jQuery("#generos").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false,search:false,view:false},
         {height:280,reloadAfterSubmit:true},//opciones edit
         {}, //opciones add
         {}, //opciones del
         {closeAfterSearch: true, closeOnEscape: true}//opciones search
         );

        $("#generos").jqGrid('navButtonAdd','#pager2',{
            caption: "Modificar", 
            autowidth: true,
            buttonicon :'ui-icon-pencil',
            onClickButton : function (){ 
                    modificar();
            } 
        }); 
        $("#generos").jqGrid('navButtonAdd','#pager2',{
                caption: "Borrar", 
                autowidth: true,
                buttonicon :'ui-icon-trash',
                onClickButton : function (){ 
                        borrar();
                } 
        }); 
        $("#generos").jqGrid('navButtonAdd','#pager2',{
            caption: "", 
            autowidth: true,
            buttonicon :'ui-icon-print',
            onClickButton : function (){ 
                    printer();
            } 
        }); 
        $(window).on("resize", function () {
            var $grid = $("#generos"),
                newWidth = $grid.closest(".ui-jqgrid").parent().width();
            $grid.jqGrid("setGridWidth", newWidth, true);
             });

    jQuery("#generos").jqGrid("filterToolbar");

            function modificar(){
                var id_tipo = $("#generos").jqGrid('getGridParam','selrow'); 

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
                    var data = $("#generos").getRowData(id_tipo);
                //CONVERTIMOS A JSON 
                    sessionStorage.genero = JSON.stringify(data);
                //ENVIAMOS LA INFORMACION 
                    window.location.href = "CrearGenero.html";
                }
                return false;
        }
    function printer(){
      var folio = $("#generos").jqGrid('getGridParam','selrow'); 
      if( folio == null ){
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
          window.location.href = "../php/rptgenero_libro.php?folio="+folio;
      }
      return false;
  }

    function borrar(){
        var clave_genero = $("#generos").jqGrid('getGridParam','selrow'); 

        if( clave_genero == null ){
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
                        url: "../php/genero.php",
                        data: {opc:"baja_genero", clave_genero: clave_genero},
                        success: function(response)  {
                            if(response.respuesta == false)  {
                                alert("Género No Eliminado");
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
                        $("#generos").trigger("reloadGrid");
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