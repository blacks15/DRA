$(document).ready(function(){
	   
     $("#war").hide();
     $("#mensajealta").hide();
     $("#delete").hide();
     var rowsToColor = [];
  
		jQuery("#productos").jqGrid({
				url:'../php/buscar_producto.php',
				datatype: 'json',
				mtype: 'POST',
				colNames:['ID','NOMBRE','PROVEEDOR','CÓDIGO DEL PROVEEDOR','CANTIDAD ACTUAL','PRECIO VENTA', 'STATUS'],
				colModel:[
					{name:'clave_producto', index:'clave_producto', width:90, resizable:false, align:"center",search:false,key:true},
					{name:'nombre_libro', index:'nombre_libro', width:400,resizable:false,search:true},
          {name:'nombre', index:'nombre', width:200,search:true},
          {name:'codigo_proveedor', index:'codigo_proveedor', width:270,search:true},
          {name:'cantidad_actual', index:'cantidad_actual', width:230,search:false, align:"center",formatter:rowcolor},
          {name:'precio_venta', index:'precio_venta',formatter:'currency',formatoptions: {prefix:'$', suffix:'', thousandsSeparator:','},search:false, width:180, align:"center"},
          {name:'status', index:'status',search:false, width:180},
				],
				height: "100%",
				autowidth: true,
				pager: '#pager2',
	      rowNum:15,
    	  rowList:[15,30,45,60],
        sortname: 'clave_producto',
        sortorder: 'desc',
        viewrecords: true,
        caption: 'PRODUCTOS',
        altRows: true,
        gridview : true,
        pagination:true,
        loadComplete: function(data){
          estado();
          for (var i = 0; i < rowsToColor.length; i++) {
                $("#" + rowsToColor[i]).find("td").css("background-color", "#ff0000");
                $("#" + rowsToColor[i]).find("td").css("color", "white");
          }//END FOR
        },
    });
	
  jQuery("#productos").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false,search:false},
   {height:280,reloadAfterSubmit:true},//opciones edit
   {}, //opciones add
   {}, //opciones del
   {multipleSearch:true,closeAfterSearch: true, closeOnEscape: true}//opciones search
  );

  function rowcolor(cellValue, options, rowObject) {
      if (cellValue == 0)
          rowsToColor[rowsToColor.length] = options.rowId;
      return cellValue;
  }

  $("#productos").jqGrid('navButtonAdd','#pager2',{
    caption: "Borrar", 
    buttonicon :'ui-icon-trash',
    onClickButton : function (){ 
            borrar();
    } 
  }); 

  $(window).on("resize", function () {
    var $grid = $("#productos"),
        newWidth = $grid.closest(".ui-jqgrid").parent().width();
    $grid.jqGrid("setGridWidth", newWidth, true);
  });

  jQuery("#productos").jqGrid("filterToolbar");

  function borrar(){
      var clave_producto = $("#productos").jqGrid('getGridParam','selrow'); 

      if( clave_producto == null ){
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
          $("#delete" ).dialog({
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
                      url: "../php/producto.php",
                      data: {opc:"baja_producto", clave_producto:clave_producto},
                      success: function(response)  {
                          if(response.respuesta == false)  {
                              alert("Productos No Eliminado");
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
                  $("#productos").trigger("reloadGrid");
                },
                Cancelar: function() {
                  $( this ).dialog( "close" );
                }
              }
            });
  }
    return false;
  }
    
  function estado(){
        var id = $("#productos").jqGrid('getGridParam','selrow'); 
        var data = $("#productos").getRowData(id);
        var detalle = JSON.stringify(data);

      $.ajax({
        cache: false,
        type: "POST",
        dataType: "json",
        url: "../php/estado_producto.php",
        data: {detalle: detalle},
        success: function(msg){
          if (msg.respuesta == true) {
            console.log("");
          } else {
            console.log("error");
          }
        },
        error: function(xhr,ajaxOptions,throwError){
          console.log(throwError);
        } 
      });
      $("#productos").trigger("reloadGrid");
  }
});