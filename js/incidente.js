Dropzone.autoDiscover = false;

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
        var salto = "\n";
        if (isFinal) {
            if(texto.val() == "") {
                salto = "";
            }
            texto.val(texto.val() + salto + text);
            autosize.update(texto);
        } else {

        }
    });

    // Now fake the file upload, since GitHub does not handle file uploads
    // and returns a 404

    var dropzone = new Dropzone('#frmImagenes', {
        parallelUploads: 2,
        thumbnailHeight: 120,
        thumbnailWidth: 120,
        maxFilesize: 3,
        filesizeBase: 1000,
        uploadMultiple: true,
        acceptedFiles: 'image/*',
        addRemoveLinks: true,
        thumbnail: function (file, dataUrl) {
            if (file.previewElement) {
                file.previewElement.classList.remove("dz-file-preview");
                var images = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
                for (var i = 0; i < images.length; i++) {
                    var thumbnailElement = images[i];
                    thumbnailElement.alt = file.name;
                    thumbnailElement.src = dataUrl;
                }
                setTimeout(function () { file.previewElement.classList.add("dz-image-preview"); }, 1);
            }
        }

    });

    var minSteps = 6,
        maxSteps = 60,
        timeBetweenSteps = 100,
        bytesPerStep = 100000;

    dropzone.uploadFiles = function (files) {
        var self = this;

        for (var i = 0; i < files.length; i++) {

            var file = files[i];
            totalSteps = Math.round(Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep)));

            for (var step = 0; step < totalSteps; step++) {
                var duration = timeBetweenSteps * (step + 1);
                setTimeout(function (file, totalSteps, step) {
                    return function () {
                        file.upload = {
                            progress: 100 * (step + 1) / totalSteps,
                            total: file.size,
                            bytesSent: (step + 1) * file.size / totalSteps
                        };

                        self.emit('uploadprogress', file, file.upload.progress, file.upload.bytesSent);
                        if (file.upload.progress == 100) {
                            file.status = Dropzone.SUCCESS;
                            self.emit("success", file, 'success', null);
                            self.emit("complete", file);
                            self.processQueue();
                        }
                    };
                }(file, totalSteps, step), duration);
            }
        }
    }

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
        debug: false, // Muestra un informe en la consola
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