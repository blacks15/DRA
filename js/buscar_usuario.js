$(document).ready(function(){
	   
   $("#war").hide();
   $("#mensajealta").hide();
   $("#delete").hide();

	jQuery("#usuarios").jqGrid({
		url:'../php/buscar_usuario.php',
		datatype: 'json',
		mtype: 'POST',
		colNames:['ID','NOMBRE EMPLEADO','APELLIDOS','USERNAME','FECHA CREACIÓN','STATUS'],
		colModel:[
			{name:'matricula', index:'matricula', width:80, resizable:false, align:"center",search:false,key:true},
			{name:'nombre', index:'nombre', width:190,resizable:false,search:true},
      {name:'apellidos', index:'apellidos', width:200,search:true},
      {name:'username', index:'username', width:200,search:true},
      {name:'fecha_creacion', index:'fecha_creacion', width:200,search:false,formatter:'date',
             formatoptions: { srcformat: 'ISO8601Long',newformat: 'm/d/Y H:i',defaultValue:null}},
      {name:'status', index:'status', width:200,search:false}
		],
		height: "100%",
		autowidth: true,
		pager: '#pager2',
        rowNum:10,
        rowList:[10,20],
	    sortname: 'matricula',
        sortorder: 'desc',
        viewrecords: true,
        caption: 'USUARIOS',
        altRows: true,
        pagination:true,
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
         {height:280,reloadAfterSubmit:true},//opciones edit
         {}, //opciones add
         {}, //opciones del
         {multipleSearch:true,closeAfterSearch: true, closeOnEscape: true}//opciones search
         );

    $("#usuarios").jqGrid('navButtonAdd','#pager2',{
            caption: "Borrar", 
            buttonicon :'ui-icon-trash',
            onClickButton : function (){ 
                    borrar();
            } 
    }); 

    $(window).on("resize", function () {
    var $grid = $("#usuarios"),
        newWidth = $grid.closest(".ui-jqgrid").parent().width();
    $grid.jqGrid("setGridWidth", newWidth, true);
     });

    jQuery("#usuarios").jqGrid("filterToolbar");

    function borrar(){
        var matricula = $("#usuarios").jqGrid('getGridParam','selrow'); 

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
                        url: "../php/usuario.php",
                        data: {opc:"baja_usuario", matricula:matricula},
                        success: function(response)  {
                            if(response.respuesta == false)  {
                                alert("Usuario No Eliminado");
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