$(document).ready(function(){
		jQuery("#autores").jqGrid({
                    url:'../php/buscar_Autor.php',
                    datatype: 'json',
                    mtype: 'POST',
                    colNames:['ID','NOMBRE', 'APELLIDO','ESTADO'],
                    colModel:[
                        {name:'clave_autor', index:'clave_autor', width:50, resizable:false, align:"center"},
                        {name:'firstname_autor', index:'firstname_autor', width:160,resizable:true},
                        {name:'lastname_autor', index:'lastname_autor', width:150},
                        {name:'estado', index:'estado', width:70},
                    ],
                    pager: '#pager2',
                    rowNum:10,
                    rowList:[10,20],
                    sortname: 'clave_autor',
                    sortorder: 'asc',
                    viewrecords: true,
                    caption: 'AUTORES'
                });
	jQuery("#autores").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false});
});