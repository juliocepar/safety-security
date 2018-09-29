var audio_context,
    recorder,
    volume,
    volumeLevel = 0,
    currentEditedSoundIndex;

function startUserMedia(stream) {
  var input = audio_context.createMediaStreamSource(stream);
  console.log('Media stream created.');

  volume = audio_context.createGain();
  volume.gain.value = volumeLevel;
  input.connect(volume);
  volume.connect(audio_context.destination);
  console.log('Input connected to audio context destination.');
  
  recorder = new Recorder(input);
  console.log('Recorder initialised.');
}

function changeVolume(value) {
  if (!volume) return;
  volumeLevel = value;
  volume.gain.value = value;
}

function startRecording() {
  recorder && recorder.record();
  console.log('Recording...');
}

function stopRecording() {
  recorder && recorder.stop();
  console.log('Stopped recording.');
  // create WAV download link using audio data blob
  createDownloadLink();
  
  recorder.clear();
}

function createDownloadLink() {
  console.log("Entro al metodo createDownloadLink");
  currentEditedSoundIndex = -1;
  recorder && recorder.exportWAV(handleWAV.bind(this));
}

function handleWAV(blob) {
  console.log("Entro al metodo handleWAV");
  var tableRef = document.getElementById('recordingslist');
  if (currentEditedSoundIndex !== -1) {
    $('#recordingslist tr:nth-child(' + (currentEditedSoundIndex + 1) + ')').remove();
  }

  var url = URL.createObjectURL(blob);
  var newRow   = tableRef.insertRow(currentEditedSoundIndex);
  newRow.className = 'soundBite';
  var audioElement = document.createElement('audio');
  var downloadAnchor = document.createElement('a');
  //var editButton = document.createElement('button');
  
  audioElement.controls = true;
  audioElement.src = url;

  downloadAnchor.href = url;
  downloadAnchor.download = new Date().toISOString() + '.wav';
  downloadAnchor.innerHTML = 'Descargar Audio';
  downloadAnchor.className = 'btn btn-primary';

  /* Boton editar, en comentario ya que no se esta utilizando
    editButton.onclick = function(e) {
    $('.recorder.container').addClass('hide');
    $('.editor.container').removeClass('invisible');

    currentEditedSoundIndex = $(e.target).closest('tr').index();
    
    var f = new FileReader();
    f.onload = function(e) {
        audio_context.decodeAudioData(e.target.result, function(buffer) {
          console.warn(buffer);
          $('#audioLayerControl')[0].handleAudio(buffer);
        }, function(e) {
          console.warn(e);
        });
    };
    f.readAsArrayBuffer(blob);
  };
  editButton.innerHTML = 'Edit';
  editButton.className = 'btn btn-primary';
*/
  var newCell = newRow.insertCell(-1);
  newCell.appendChild(audioElement);
  newCell = newRow.insertCell(-1);
  newCell.appendChild(downloadAnchor);
  newCell = newRow.insertCell(-1);
 // newCell.appendChild(editButton);

  /* Esto tampoco se usa
  newCell = newRow.insertCell(-1);
  var toggler;
  for (var i = 0, l = 8; i < l; i++) {
    toggler = document.createElement('input');
    $(toggler).attr('type', 'checkbox');
    newCell.appendChild(toggler);
  }*/
}

window.onload = function init() {
  try {
    // webkit shim
    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.mozURL;
    
    audio_context = new AudioContext();
    console.log('Audio context set up.');
    console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
  } catch (e) {
    console.warn('No web audio support in this browser!');
  }
  
  navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
    console.warn('No live audio input: ' + e);
  });
};