$(document).ready(function () {
    var hoy = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    var dia = (hoy.getDate() < 10) ? '0' + hoy.getDate() : hoy.getDate();
    var mes = (hoy.getMonth() + 1 < 10) ? '0' + (hoy.getMonth() + 1) : hoy.getMonth() + 1;
    var anno = hoy.getFullYear();
    var hoyStr = dia + '/' + mes + '/' + anno;

    $('#dtpFecha').datepicker({
        locale: 'es-es',
        format: 'dd/mm/yyyy',
        maxDate: hoyStr,
        modal: true
    });
    $('#dtpHora').timepicker({
        locale: 'es-es',
        format: 'HH:MM',
        modal: true
    });

    $('.selectpicker').selectpicker();

    autosize($('textarea'));

    $('#selAlertaOrganismos').change(function () {
        if ($(this).val() == 'S') {
            $('#selConcurrida').parent().parent().removeClass('invisible');
        } else {
            $('#selConcurrida').parent().parent().addClass('invisible');
        }
        $('#selConcurrida').selectpicker('refresh');
    });

    $('#btnEnviarIncidente').click(function () {
        swal('Incidente enviado exitosamente', '', 'success');
    });

    artyom.redirectRecognizedTextOutput(function (text, isFinal) {
        var texto = $('#txaDescripcionIncidente');
        if (isFinal) {
            texto.val(text);
        } else {

        }
    });

});

//inicializamos la libreria Artyom
function startArtyom() {
    $('#btnVozATexto').attr('onclick', 'stopArtyom()');
    $('#btnVozATexto').removeClass('btn-light');
    $('#btnVozATexto').addClass('btn-danger');
    artyom.initialize({
        lang: "es-ES",
        continuous: true,// Reconoce 1 solo comando y para de escuchar
        listen: true, // Iniciar !
        debug: true, // Muestra un informe en la consola
        speed: 1 // Habla normalmente
    });
};

// Stop libreria;
function stopArtyom() {
    $('#btnVozATexto').attr('onclick', 'startArtyom()');
    $('#btnVozATexto').removeClass('btn-danger');
    $('#btnVozATexto').addClass('btn-light');
    artyom.fatality();// Detener cualquier instancia previa
};