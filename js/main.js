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

socket.on('getTaskCSVStuffSuccess', function(res){
    console.log(res);
});

socket.on('getTaskCSVStuffFailure', function(err,res){
    console.log(err);
});



//------------------

$(function(){
    var tempTaskArr = [1,2,3,4,5];
    var container = $('#main');

    tempTaskArr.forEach(function(x){
        var card = `<div class="card tlsTask float-left" style="width: 20rem;">
                        <div class="card-block">
                            <h4 class="card-title">Task `+ x +`</h4>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="btn btn-primary tlsTaskBtn" tlstaskdata="`+ x +`">Go somewhere</a>
                        </div>
                    </div>`

        container.append( card );
    })

    $('.tlsTaskBtn').on('click', function(){
        socket.emit('request-task', {'id': this.getAttribute('tlstaskdata')})
    })
}());