$(document).ready(function(){
    $("#enviar").click(function(){
        var formulario = $("#frminformacion").serializeArray();
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: "guardar.php",
            data: formulario,
        }).done(function(respuesta){
            $("#mensaje").html(respuesta.mensaje);
        });
    });
 
    function limpiarformulario(formulario){
 
    $(formulario).find('input').each(function() {
        switch(this.type) {
            case 'password':
            case 'text':
                $(this).val('');
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
            }
        });
 
        $(formulario).find('select').each(function() {
            $("#"+this.id + " option[value=0]").attr("selected",true);
 
    });
    }
});