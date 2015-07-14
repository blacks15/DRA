$(document).ready(function(){
	   $("#war").hide();
       $("#mensajealta").hide();
       $("#delete").hide();

		jQuery("#empleados").jqGrid({
			url:'../php/buscar_empleados.php',
			datatype: 'json',
			mtype: 'POST',
			colNames:['ID','NOMBRE','APELLIDO PATERNO','APELLIDO MATERNO','CALLE','NÚMERO','COLONIA','CIUDAD','ESTADO','TELÉFONO','CELULAR','SUELDO','TIPO','STATUS'],
			colModel:[
				{name:'matricula', index:'matricula', width:80, resizable:false, align:"center",search:false,key:true},
				{name:'nombre', index:'nombre', width:190,resizable:false},
            	{name:'apellido_paterno', index:'apellido_paterno', width:330,search:true},
            	{name:'apellido_materno', index:'apellido_materno',search:true,width:330},
            	{name:'calle', index:'calle',search:false, width:190,},
                {name:'numero', index:'numero',search:false, width:150},
            	{name:'colonia', index:'colonia',search:false, width:180},
                {name:'ciudad', index:'ciudad',search:true, width:180},
                {name:'estado', index:'estado',search:true, width:190},
            	{name:'telefono', index:'telefono',search:false, width:200},
            	{name:'celular', index:'celular',search:false, width:200},
            	{name:'sueldo', index:'sueldo',search:false, width:150,formatter:'currency',formatoptions: {prefix:'$', suffix:'', thousandsSeparator:','}},
                {name:'tipo', index:'tipo',search:false, width:100},
                {name:'status', index:'status',search:false, width:190}
			],
			height: "100%",
			autowidth: true,
			pager: '#pager2',
            rowNum:10,
	        rowList:[10,20],
    	    sortname: 'matricula',
            sortorder: 'desc',
            viewrecords: true,
            caption: 'EMPLEADOS',
            altRows: true,
            onSelectRow: function(ids) {
            var selr = jQuery('#empleados').jqGrid('getGridParam','selrow'); 
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
	jQuery("#empleados").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false,search:false},
         {},//opciones edit
         {}, //opciones add
         {}, //opciones del
         {closeAfterSearch: true, closeOnEscape: true}//opciones search
         );
    $("#empleados").jqGrid('navButtonAdd','#pager2',{
        caption: "Modificar", 
        buttonicon :'ui-icon-pencil',
        onClickButton : function (){ 
                modificar();
        } 
        }); 
    $("#empleados").jqGrid('navButtonAdd','#pager2',{
            caption: "Borrar", 
            buttonicon :'ui-icon-trash',
            onClickButton : function (){ 
                    borrar();
            } 
        }); 

    $(window).on("resize", function () {
        var $grid = $("#empleados"),
        newWidth = $grid.closest(".ui-jqgrid").parent().width();
        $grid.jqGrid("setGridWidth", newWidth, true);
    });
    jQuery("#empleados").jqGrid("filterToolbar");

    function modificar(){
        var id_tipo = $("#empleados").jqGrid('getGridParam','selrow'); 

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
            var data = $("#empleados").getRowData(id_tipo);
        //CONVERTIMOS A JSON 
            sessionStorage.empleado = JSON.stringify(data);
        //ENVIAMOS LA INFORMACION 
            window.location.href = "CrearEmpleado.html";
        }
        return false;
    }

    function borrar(){
        var matricula = $("#empleados").jqGrid('getGridParam','selrow'); 
        
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
                        url: "../php/empleado.php",
                        data: {opc:"baja_empleado", matricula: matricula},
                        success: function(response) {
                            if(response.respuesta == false) {
                                alert("Empleado No Eliminado");
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
                        $("#empleados").trigger("reloadGrid");
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