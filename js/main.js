var originURL = window.location.origin;
var currentURL = window.location.href;
var currentFilePath = currentURL.slice(originURL.length);
var sliceIndex = currentFilePath.lastIndexOf('/') + 1;
var socketPath = currentFilePath.slice(0, sliceIndex);

var socket = io.connect(originURL, {
    path: socketPath + 'socket.io/'
});

socket.on('connected', function(data){
    console.log(data);
})