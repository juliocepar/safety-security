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
    autosize(document.querySelectorAll('textarea'));

    $('#selAlertaOrganismos').change(function () {
        if ($(this).val() == 'S') {
            $('#selConcurrida').parent().parent().removeClass('invisible');
        } else {
            $('#selConcurrida').parent().parent().addClass('invisible');
        }
        $('#selConcurrida').selectpicker('refresh');
    });

    $('#btnEnviarEmergencia').click(function () {
        swal('Reporte de Emergencia enviado exitosamente', '', 'success');
    });  

});

// Agrega un nuevo campo en la lista de Personas Afectadas
function agregarOpcion() {
    var nuevoItemPersona = `<div class="row">
                                <div class="col-lg-auto col-md-2 col-sm-auto pr-0 pt-4">
                                    <button type="button" class="btn btn-sm btn-danger" onclick="removerOpcion(this)">Remover</button>
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-9">
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="txtDatosPersona-1" placeholder="Nombre y apellido de la persona afectada">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 pt-3">
                                    <select class="form-control show-tick selectpicker" id="selPersonaAfectada-1" title="-- Seleccionar Afeccion --">
                                        <option value="10">Fallecido</option>
                                        <option value="20">Lesionado Grave</option>
                                        <option value="30">Lesionado Leve</option>
                                        <option value="40">Evacuado</option>
                                    </select>
                                </div>    
                            </div>`;
    $('#listaPersonas').append(nuevoItemPersona); 
    $(".selectpicker").selectpicker('refresh'); // Refresca el selector para que pueda visualizarse
}

// Remueve un campo de la lista de Personas Afectadas
function removerOpcion(boton) {
    $(boton).parent().parent().remove();
}

