$(document).ready(function(){

		jQuery("#autores").jqGrid({
                    url:'../php/buscar_Autor.php',
                    datatype: 'json',
                    mtype: 'POST',
                    colNames:['ID','NOMBRE', 'APELLIDO','ESTADO'],
                    colModel:[
                        {name:'clave_autor', index:'clave_autor', width:80, resizable:false, align:"center"},
                        {name:'firstname_autor', index:'firstname_autor', width:190,resizable:true},
                        {name:'lastname_autor', index:'lastname_autor', width:200},
                        {name:'estado', index:'estado', width:100}
                    ],
                    height: 300,
                    autowidth: true,
                    pager: '#pager2',
                    rowNum:12,
                    rowList:[10,20],
                    sortname: 'clave_autor',
                    sortorder: 'asc',
                    viewrecords: true,
                    caption: 'AUTORES',
                    altRows: true,
                });
	jQuery("#autores").jqGrid('navGrid','#pager2',{edit:false,add:false,del:true},
         {},//opciones edit
         {}, //opciones add
         {}, //opciones del
         {multipleSearch:true,closeAfterSearch: true, closeOnEscape: true}//opciones search
         ).jqGrid("filterToolbar");

    for(var i=0;i<=mydata.length;i++)
        jQuery("#list").jqGrid('addRowData',i+1,mydata[i]);
        jQuery("#list").trigger("reloadGrid")
});