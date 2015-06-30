$(document).ready(function(){

    $("#war").hide();
    $("#mensajealta").hide();

		jQuery("#autores").jqGrid({
                    url:'../php/buscar_Autor.php',
                    datatype: 'json',
                    mtype: 'POST',
                    colNames:['ID','NOMBRE', 'APELLIDO','ESTADO'],
                    colModel:[
                        {name:'clave_autor', index:'clave_autor',search:false,width:80,resizable:false, align:"center",key:true},
                        {name:'firstname_autor', index:'firstname_autor', width:190,resizable:true,search:true},
                        {name:'lastname_autor', index:'lastname_autor', width:200,search:true},
                        {name:'estado', index:'estado', search:false,width:100}
                    ],
                    height: "100%",
                    autowidth: true,
                    pager: '#pager2',
                    rowNum:10,
                    rowList:[10,20],
                    sortname: 'clave_autor',
                    sortorder: 'desc',
                    viewrecords: true,
                    caption: 'AUTORES',
                    altRows: true,
                    pagination: true,
                    onSelectRow: function(ids) {
                        var selr = jQuery('#autores').jqGrid('getGridParam','selrow'); 
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
	jQuery("#autores").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false,search:false,view:false},
         {height:280,reloadAfterSubmit:true},//opciones edit
         {}, //opciones add
         {}, //opciones del
         {closeAfterSearch: true, closeOnEscape: true}//opciones search
         );
                $("#autores").jqGrid('navButtonAdd','#pager2',{
                caption: "Modificar", 
                buttonicon :'ui-icon-pencil',
                onClickButton : function (){ 
                        modificar();
                } 
        }); 
        $("#autores").jqGrid('navButtonAdd','#pager2',{
                caption: "Borrar", 
                buttonicon :'ui-icon-trash',
                onClickButton : function (){ 
                        borrar();
                } 
        }); 

       

    jQuery("#autores").jqGrid("filterToolbar");

            function modificar(){
                var id_tipo = $("#autores").jqGrid('getGridParam','selrow'); 

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
                        $.get("../php/autor.php?opc=modificar_autor&id="+id_tipo, function(data){
                                crear_modal(300,250,data);
                        });
                }
                return false;
        }

        function borrar(){
            var clave_autor = $("#autores").jqGrid('getGridParam','selrow'); 

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
                if(!confirm("¿Está seguro de que desea eliminar el registro seleccionado?"))
                        exit(); 

                $.ajax({
                cache: false,
                type: "POST",
                datatype: "json",
                url: "../php/autor.php",
                data: {opc:"baja_autor", clave_autor:clave_autor},
                success: function(response)  {
                    if(response.respuesta == false)  {
                        alert("Autor No Eliminado");
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
        }
        return false;
}

});

      