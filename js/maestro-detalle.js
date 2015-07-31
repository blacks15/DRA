$(document).ready(function(){

  $("#mensajealta").hide();
  $("#war").hide();
  $("#delete").hide();
  $("#fallo").hide();

  jQuery("#ventas").jqGrid({
      url:'../php/maestro.php',
      datatype: "json",
      colNames:['FOLIO','FECHA VENTA','ATENDIO', 'CLIENTE','TOTAL'],
      colModel:[
        {name:'folio',index:'folio', width:100,key:true,align:"center"},
        {name:'fecha',index:'fecha', width:100,align: "center",formatter:'date',
             formatoptions: { srcformat: 'ISO8601Long',newformat: 'm/d/Y',defaultValue:null}},
        {name:'atendio',index:'atendio', width:100},
        {name:'cliente',index:'cliente', width:100, align:"left"}, 
        {name:'total',index:'total', width:80,align:"center",formatter:'currency',formatoptions: {prefix:'$', suffix:'', thousandsSeparator:','}},    
      ],
      rowNum:10,
      rowList:[10,20,30],
      height: "100%",
      autowidth: true,
      altRows: true,
      pager: '#pager',
      sortname: 'folio',
      viewrecords: true,
      sortorder: "desc",
      multiselect: false,
      caption: "VENTAS",
      onSelectRow: function(ids) {
      if(ids == null) {
        ids = 0;
        if (jQuery("#dv").jqGrid('getGridParam','records') > 0 ){
           jQuery("#dv").jqGrid('setGridParam',{url:"../php/subgrid.php?q=1&id="+ids,page:1});
           jQuery("#dv").jqGrid('setCaption',"DETALLE VENTA: "+ids)
           .trigger('reloadGrid');
        }
      } else {
        jQuery("#dv").jqGrid('setGridParam',{url:"../php/subgrid.php?q=1&id="+ids,page:1});
        jQuery("#dv").jqGrid('setCaption',"DETALLE VENTA: "+ids)
        .trigger('reloadGrid');     
      }
    }
  });

  jQuery("#ventas").jqGrid('navGrid','#pager',{add:false,edit:false,del:false,search:false});

    $("#ventas").jqGrid('navButtonAdd','#pager',{
        caption: "Cancelar", 
        buttonicon :'ui-icon-trash',
        onClickButton : function (){ 
                borrar();
        } 
    }); 

    $("#ventas").jqGrid('navButtonAdd','#pager',{
        caption: "", 
        autowidth: true,
        buttonicon :'ui-icon-print',
        onClickButton : function (){ 
                printer();
        } 
    }); 

   $(window).on("resize", function () {
      var $grid = $("#ventas"),
          newWidth = $grid.closest(".ui-jqgrid").parent().width();
      $grid.jqGrid("setGridWidth", newWidth, true);
    });

  jQuery("#dv").jqGrid({
    height: "100%",
    url:'../php/subgrid.php?q=1&id=0',
    datatype: "json",
    colNames:['CÓDIGO','PRODUCTO','CANTIDAD', 'PRECIO','SUBTOTAL'],
    colModel:[
      {name:'codigo',index:'codigo', width:80, align:"center"},
      {name:'producto',index:'producto', width:250, align:"center"},
      {name:'cantidad',index:'cantidad', width:80, align:"center"},
      {name:'precio',index:'precio', width:80, align:"center",formatter:'currency',formatoptions: {prefix:'$', suffix:'', thousandsSeparator:','} },    
      {name:'subtotal',index:'subtotal', width:80,align:"center", sortable:false, search:false,formatter:'currency',formatoptions: {prefix:'$', suffix:'', thousandsSeparator:','}}
    ],
    rowNum:5,
    autowidth: true,
    altRows: true,
    pager: '#pager2',
    sortname: 'codigo',
    viewrecords: false,
    sortorder: "asc",
    multiselect: false,
    caption:"DETALLE VENTA"
  }).navGrid('#pager2',{add:false,edit:false,del:false,refresh:false,search:false});

   $(window).on("resize", function () {
      var $grid = $("#dv"),
          newWidth = $grid.closest(".ui-jqgrid").parent().width();
      $grid.jqGrid("setGridWidth", newWidth, true);
    });

    function printer(){
      var folio = $("#ventas").jqGrid('getGridParam','selrow'); 
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
          window.location.href = "../php/rptventa.php?folio="+folio;
      }
      return false;
  }

  function borrar(){
    var folio = $("#ventas").jqGrid('getGridParam','selrow'); 

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
                      url: "../php/venta.php",
                      data: {opc:"cancelar_venta", folio:folio},
                      success: function(response)  {
                          if(response.respuesta == true)  {
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
                          else if (response.fallo == true) {
                            $("#fallo").append(response.folio);
                             $("#fallo").dialog({
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
                      $("#ventas").trigger('reloadGrid');
                      $("#dv").trigger('reloadGrid');
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