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

});