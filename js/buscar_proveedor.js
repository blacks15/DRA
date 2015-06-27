$(document).ready(function(){
	
		jQuery("#proveedores").jqGrid({
						url:'../php/buscar_proveedores.php',
						datatype: 'json',
						mtype: 'POST',
						colNames:['ID','NOMBRE','CONTACTO','OBSERVACIONES','DIRECCION','COLONIA','TELEFONO','CELULAR','EMAIL'],
						colModel:[
							{name:'clave_proveedor', index:'clave_proveedor', width:80, resizable:false, align:"center"},
							{name:'nombre', index:'nombre', width:190,resizable:false},
                        	{name:'contacto', index:'contacto', width:200},
                        	{name:'observaciones', index:'observaciones', width:150},
                        	{name:'direccion', index:'direccion', width:190},
                        	{name:'colonia', index:'colonia', width:200},
                        	{name:'telefono', index:'telefono', width:100},
                        	{name:'celular', index:'celular', width:190},
                        	{name:'email', index:'email', width:200}
						],
						autoheight: true,
						autowidth: true,
						pager: '#pager2',
        	            rowNum:12,
            	        rowList:[10,20],
                	    sortname: 'clave_proveedor',
                    sortorder: 'desc',
                    viewrecords: true,
                    caption: 'PROVEEDORES',
                    altRows: true,
                });
	jQuery("#proveedores").jqGrid('navGrid','#pager2',{edit:false,add:false,del:true},
         {},//opciones edit
         {}, //opciones add
         {}, //opciones del
         {multipleSearch:true,closeAfterSearch: true, closeOnEscape: true}//opciones search
         );
         });
