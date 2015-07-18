$(document).ready(function(){

  jQuery("#compras").jqGrid({
      url:'../php/maestro_compra.php',
      datatype: "json",
      colNames:['FOLIO','FECHA COMPRA','PROVEEDOR','TOTAL'],
      colModel:[
        {name:'folio',index:'folio', width:100,key:true,align:"center"},
        {name:'fecha',index:'fecha', width:100,align:"center",formatter:'date',
             formatoptions: { srcformat: 'ISO8601Long',newformat: 'm/d/Y',defaultValue:null}},
        {name:'proveedor',index:'proveedor', width:100,align:"center"},
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
      caption: "COMPRAS",
      onSelectRow: function(ids) {
      if(ids == null) {
        ids = 0;
        if (jQuery("#dc").jqGrid('getGridParam','records') > 0 ){
           jQuery("#dc").jqGrid('setGridParam',{url:"../php/subgrid_c.php?q=1&id="+ids,page:1});
           jQuery("#dc").jqGrid('setCaption',"DETALLE COMPRA: "+ids)
           .trigger('reloadGrid');
        }
      } else {
        jQuery("#dc").jqGrid('setGridParam',{url:"../php/subgrid_c.php?q=1&id="+ids,page:1});
        jQuery("#dc").jqGrid('setCaption',"DETALLE COMPRA: "+ids)
        .trigger('reloadGrid');     
      }
    }
  });

  jQuery("#compras").jqGrid('navGrid','#pager',{add:false,edit:false,del:false});

   $(window).on("resize", function () {
      var $grid = $("#compras"),
          newWidth = $grid.closest(".ui-jqgrid").parent().width();
      $grid.jqGrid("setGridWidth", newWidth, true);
    });

  jQuery("#dc").jqGrid({
    height: "100%",
    url:'../php/subgrid_c.php?q=1&id=0',
    datatype: "json",
    colNames:['CÓDIGO','PRODUCTO','CANTIDAD','PRECIO','SUBTOTAL'],
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
    rowList:[5,10,20],
    pager: '#pager2',
    sortname: 'codigo',
    viewrecords: true,
    sortorder: "asc",
    multiselect: false,
    caption:"DETALLE COMPRA"
  }).navGrid('#pager2',{add:false,edit:false,del:false});

   $(window).on("resize", function () {
      var $grid = $("#dc"),
          newWidth = $grid.closest(".ui-jqgrid").parent().width();
      $grid.jqGrid("setGridWidth", newWidth, true);
    });

});