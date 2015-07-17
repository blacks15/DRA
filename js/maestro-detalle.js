$(document).ready(function(){

  jQuery("#ventas").jqGrid({
      url:'../php/maestro.php',
      datatype: "json",
      colNames:['FOLIO','FECHA VENTA','ATENDIO', 'CLIENTE','TOTAL'],
      colModel:[
        {name:'folio',index:'folio', width:100,key:true},
        {name:'fecha',index:'fecha', width:100,formatter:'date',
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

  jQuery("#ventas").jqGrid('navGrid','#pager',{add:false,edit:false,del:false});

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
      {name:'codigo',index:'codigo', width:55},
      {name:'producto',index:'producto', width:250},
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
    caption:"DETALLE VENTA"
  }).navGrid('#pager2',{add:false,edit:false,del:false});

   $(window).on("resize", function () {
      var $grid = $("#ventas"),
          newWidth = $grid.closest(".ui-jqgrid").parent().width();
      $grid.jqGrid("setGridWidth", newWidth, true);
    });

});