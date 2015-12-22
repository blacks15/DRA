$(document).ready(function(){
	ocultar();

	$("#btndate").click(function(){
		var date =  $("#date").val();
		var dateb =  $("#dateb").val();

		if (validar() ) {
		    window.location.href = "../php/rptventasFecha.php?date="+date+"&dateb="+dateb;
		} else {
			$("#error").dialog({
				modal: true,
	            width: 270,
	            height: 170,
	            show: {effect : "fold" ,duration: 300},
	            hide: {effect : "explode", duration: 300},
	            resizable: "false",
	            buttons: { "OK": function () { $(this).dialog("close"); } },   
	        });
		}
	});

	$("#date").datepicker({
		dateFormat: "dd-M-yy"
	});

	$("#dateb").datepicker({
		dateFormat: "dd-M-yy"
	});

	$("#date").datepicker('setDate', '+0');

	function validar() {
		var date =  $("#date").val();
		var dateb =  $("#dateb").val();

		if (date == "") {
			$("#date").focus();
			$("#errordate").show();
			return false;
		} else{
			return true;
		}
	}

	function ocultar(){
		$("#error").hide();
		$("#errordate").hide();
		$("#errordateb").hide();
		$("#loadingImage").hide();
	}
});