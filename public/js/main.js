var originURL = window.location.origin;
var currentURL = window.location.href;
var currentFilePath = currentURL.slice(originURL.length);
var sliceIndex = currentFilePath.lastIndexOf('/') + 1;
var socketPath = currentFilePath.slice(0, sliceIndex);

var socket = io.connect(originURL, {
    path: socketPath + 'socket.io/'
});

socket.on('connected', function(taskData){
    addTaskCards(taskData.data)
});

socket.on('tasks-sent', function(data){
    console.log('tasks sent post connection');
    console.log(data);
})

socket.on('getTaskCSVStuffSuccess', function(res){
    console.log(res);
});

socket.on('getTaskCSVStuffFailure', function(err,res){
    console.log(err);
});



//------------------

function addTaskCards(data){
    var container = $('#main');

    data.forEach(function(x){
        var card = `<div class="card tlsTask">
                        <div class="card-block">
                            <h5 class="card-title">Task `+ x.name +`</h5>
                            <p class="card-text">` + x['created_at'] + `</p>
                            <a href="#" class="btn btn-primary tlsTaskBtn" tlstaskdata="`+ x +`">Go somewhere</a>
                        </div>
                    </div>`

        container.append( card );
    })

    $('.tlsTaskBtn').on('click', function(){
        socket.emit('request-task', {'id': this.getAttribute('tlstaskdata')})
    })
}