$(document).ready(function(){
	
	ocultar();
	$("#nom").focus();
	$("#btnUpdate").hide();
	$("#minimo").keypress(validatenum);
	$("#costo").keypress(validatenum);
	$("#venta").keypress(validatenum);

	$("#btnSave").click(function(){
		if (validar()) {
			var cadena = $("#form1").serialize();

			$.ajax({
				cache: false,
				type: "post",
				datatype: "json",
				url: "../php/producto.php",
				data: {opc:"guardar_producto",cadena },
				success: function(response) {
					if(response.respuesta == true) {
						$("#mensajealta").dialog({
							modal: true,
				            width: 270,
				            height: 170,
				            show: {effect : "fold" ,duration: 350},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
				        });
						limpiar();	
					} else if (response.existe == true) {
						$("#existe").dialog({
							modal: true,
				            width: 270,
				            height: 170,
				            show: {effect : "fold" ,duration: 350},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
				        });
					} else if (response.fallo == true) {
						$("#ng").dialog({
							modal: true,
				            width: 270,
				            height: 170,
				            show: {effect : "fold" ,duration: 350},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
				        });
						limpiar();
					}
				},	
					error: function(xhr,ajaxOptions,throwError){
						console.log(throwError);
					}
			});
				} else {
					$("#error").dialog({
						modal: true,
			            width: 270,
			            height: 170,
			            show: {effect : "fold" ,duration: 350},
			            hide: {effect : "explode", duration: 300},
			            resizable: "false",
			            buttons: { "OK": function () { $(this).dialog("close"); } },   
			        });
				}
    });

	$("#btnUpdate").click(function(){
		if (validar()) {
			var cadena = $("#form1").serialize();

			$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				data: {opc:"modificar_producto",cadena },
				url: "../php/producto.php",
				success: function(response) {
					if(response.respuesta == true) {
						$("#upd").dialog({
							modal: true,
				            width: 270,
				            height: 170,
				            show: {effect : "fold" ,duration: 350},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
				        });
						limpiar();	
					} else if (response.fallo == true) {
						$("#nu").dialog({
							modal: true,
				            width: 270,
				            height: 170,
				            show: {effect : "fold" ,duration: 350},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
				        });
						limpiar();
					}
				},	
				error: function(xhr,ajaxOptions,throwError){
					console.log(throwError);
				} 
			});
		} else {
			$("#error").dialog({
				modal: true,
	            width: 270,
	            height: 170,
	            show: {effect : "fold" ,duration: 350},
	            hide: {effect : "explode", duration: 300},
	            resizable: "false",
	            buttons: { "OK": function () { $(this).dialog("close"); } },   
	        });
		}
	});


	$.ajax({
		cache: false,
		type: "POST",
		datatype: "json",
		url: "../php/combo_producto.php",
		success: function(opciones){
			$("#prov").html(opciones.opcion_proveedor);
			$("#libro").html(opciones.opcion_libro);
		},
		error: function(xhr,ajaxOptions,throwError){
			console.log(xhr);
		} 
	});

 	$('#bus').click(function(){
 	 	window.location.href = "../pages/BuscarProducto.html";
 	});

	$("#bu").autocomplete({
		minLength: 2,
        source: "../php/autocom_prod.php",
        autoFocus: true
    });

	$("#btnbus").click(function(){
		var bu = $("#bu").val();

		$.ajax({
			cache: false,
			datatype: "JSON",
			type: "POST",
			url: "../php/producto.php",
			data: {opc: "buscar_producto", bu:bu},
			success: function(respuesta){
				if (respuesta.noexiste == true) {
					$("#errornoex").show();
				} else {
					$("#codigo").val(respuesta.id);
					$("#libro").val(respuesta.nombre).attr('selected', 'selected');
					$("#prov").val(respuesta.proveedor).attr('selected', 'selected');
					$("#cprov").val(respuesta.codigo_proveedor);
					$("#minimo").val(respuesta.cm);
					$("#compra").val(respuesta.compra);
					$("#venta").val(respuesta.venta);
					$("#errornoex").hide();
					$("#btnUpdate").show();
					$("#btnSave").hide();
					$("#bu").val("");
				}
			},
			error: function(xhr,ajaxOptions,throwError){
				console.log(throwError);
			} 
		});
	});

	$("#reset").click(function(){
		$("#btnSave").show();
		$("#btnUpdate").hide();
	});

	function limpiar(){
		$("#codigo").val("");
		$("#libro").prop('selectedIndex', 0);
		$("#prov").val("");
		$("#cprov").val("");
		$("#compra").val("");
		$("#minimo").val("");
		$("#costo").val("");
		$("#venta").val("");
	}

	function ocultar(){
		$("#mensajealta").hide();
		$("#error").hide();
		$("#upd").hide();
		$("#existe").hide();
		$("#ng").hide();
		$("#nu").hide();
		$("#numeros").hide();
		$("#errornom").hide();
		$("#errorprov").hide();
		$("#errorcpp").hide();
		$("#errorcmin").hide();
		$("#errorpcompra").hide();
		$("#errorpventa").hide();
	}

	function validar(){
		var prov = $("#prov").val();
		var name = $("#libro").val();
		var cprov = $("#cprov").val();
		var min = $("#minimo").val();
		var cost = $("#costo").val();
		var sell = $("#venta").val();
		if (name == 0 || name == null) {
			$("#libro").focus();
			$("#errornom").show();
			return false;
		}else if (prov == 0 || prov == null ) {
			$("#prov").focus();
			$("#errorprov").show();
			return false
		} else if (cprov == "" ){
			$("#cprov").focus();
			$("#errorcpp").show();
			return false;
		} else if (min == "" || min == 0) {
			$("#minimo").focus();
			$("#errorcmin").show();
			return false;
		} else if (cost == "" || cost == 0){
			$("#compra").focus();
			$("#errorpcompra").show();
			return false;
		} else if (sell == "" || sell == 0) {
			$("#venta").focus();
			$("#errorpventa").show();
			return false;
		}
		ocultar();
		return true;
	}

	function validatenum(event) {
		var key = window.event ? event.keyCode : event.which;
	
		if((event.keyCode > 47 && event.keyCode < 58) || event.keyCode == 46){
			return true;
			} else {
				$("#numeros").dialog({
				modal: true,
	            width: 270,
	            height: 170,
	            show: {effect : "fold" ,duration: 300},
	            hide: {effect : "explode", duration: 300},
	            resizable: "false",
	            buttons: { "OK": function () { $(this).dialog("close"); } },   
	        });
			return false;
			}
	}


  (function( $ ) {
    $.widget( "custom.combobox", {
      _create: function() {
        this.wrapper = $( "<span>" )
          .addClass( "custom-combobox" )
          .insertAfter( this.element );
 
        this.element.hide();
        this._createAutocomplete();
        this._createShowAllButton();
      },
 
      _createAutocomplete: function() {
        var selected = this.element.children( ":selected" ),
          value = selected.val() ? selected.text() : "";
 
        this.input = $( "<input>" )
          .appendTo( this.wrapper )
          .val( value )
          .attr( "title", "" )
          .addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
          .autocomplete({
            delay: 0,
            minLength: 0,
            source: $.proxy( this, "_source" )
          })
          .tooltip({
            tooltipClass: "ui-state-highlight"
          });
 
        this._on( this.input, {
          autocompleteselect: function( event, ui ) {
            ui.item.option.selected = true;
            this._trigger( "select", event, {
              item: ui.item.option
            });
          },
 
          autocompletechange: "_removeIfInvalid"
        });
      },
 
      _createShowAllButton: function() {
        var input = this.input,
          wasOpen = false;
 
        $( "<a>" )
          .attr( "tabIndex", -1 )
          .attr( "title", "Mostrar Todo" )
          .tooltip()
          .appendTo( this.wrapper )
          .button({
            icons: {
              primary: "ui-icon-triangle-1-s"
            },
            text: false
          })
          .removeClass( "ui-corner-all" )
          .addClass( "custom-combobox-toggle ui-corner-right" )
          .mousedown(function() {
            wasOpen = input.autocomplete( "widget" ).is( ":visible" );
          })
          .click(function() {
            input.focus();
 
            // Close if already visible
            if ( wasOpen ) {
              return;
            }
 
            // Pass empty string as value to search for, displaying all results
            input.autocomplete( "search", "" );
          });
      },
 
      _source: function( request, response ) {
        var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
        response( this.element.children( "option" ).map(function() {
          var text = $( this ).text();
          if ( this.value && ( !request.term || matcher.test(text) ) )
            return {
              label: text,
              value: text,
              option: this
            };
        }) );
      },
 
      _removeIfInvalid: function( event, ui ) {
 
        // Selected an item, nothing to do
        if ( ui.item ) {
          return;
        }
 
        // Search for a match (case-insensitive)
        var value = this.input.val(),
          valueLowerCase = value.toLowerCase(),
          valid = false;
        this.element.children( "option" ).each(function() {
          if ( $( this ).text().toLowerCase() === valueLowerCase ) {
            this.selected = valid = true;
            return false;
          }
        });
 
        // Found a match, nothing to do
        if ( valid ) {
          return;
        }
 
        // Remove invalid value
        this.input
          .val( "" )
          .attr( "title", value + " No se Encontro Proveedor" )
          .tooltip( "open" );
        this.element.val( "" );
        this._delay(function() {
          this.input.tooltip( "close" ).attr( "title", "" );
        }, 2500 );
        this.input.autocomplete( "instance" ).term = "";
      },
 
      _destroy: function() {
        this.wrapper.remove();
        this.element.show();
      }
    });
  })( jQuery );
 
$(function() {
  $( "#prov" ).combobox();
  $( "#toggle" ).click(function() {
     $( "#prov" ).toggle();
  });
});

$(function() {
	$( "#libro" ).combobox();
	$( "#toggle" ).click(function() {
	  $( "#libro" ).toggle();
	});
});

});