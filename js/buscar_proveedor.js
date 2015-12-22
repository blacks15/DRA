$(document).ready(function(){
	   
   $("#war").hide();
   $("#mensajealta").hide();
   $("#delete").hide();

	jQuery("#proveedores").jqGrid({
		url:'../php/buscar_proveedores.php',
		datatype: 'json',
		mtype: 'POST',
		colNames:['ID','NOMBRE','CONTACTO','DIRECCIÓN','CIUDAD','ESTADO','TELEFONO','CELULAR','EMAIL'],
		colModel:[
			{name:'clave_proveedor', index:'clave_proveedor', width:80, resizable:false, align:"center",search:false,key:true},
			{name:'nombre', index:'nombre', width:190,resizable:false,search:true},
        	{name:'contacto', index:'contacto', width:200,search:true},
        	{name:'direccion', index:'direccion', width:380,search:false},
            {name:'city', index:'city', width:190,search:true},
            {name:'edo', index:'edo', width:190,search:true},
        	{name:'telefono', index:'telefono', width:130,search:false},
        	{name:'celular', index:'celular', width:190,search:false},
        	{name:'email', index:'email', width:200,search:false},
		],
		height: "100%",
		autowidth: true,
		pager: '#pager2',
        rowNum:10,
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

    $(window).on("resize", function () {
    var $grid = $("#proveedores"),
        newWidth = $grid.closest(".ui-jqgrid").parent().width();
    $grid.jqGrid("setGridWidth", newWidth, true);
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
            } else {
            //LIMPIAMOS LA SESSION
                sessionStorage.clear();
            //ASIGNAMOS LOS VALORES DE LA FILA A LA VARIABLE
                var data = $("#proveedores").getRowData(id_tipo);
            //CONVERTIMOS A JSON 
                sessionStorage.proveedor = JSON.stringify(data);
            //ENVIAMOS LA INFORMACION 
                window.location.href = "CrearProveedor.html";
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
