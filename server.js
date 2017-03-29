"use strict";

const ASANA_PROJECT_ID = '196673359742158';

var tlsAsana = require('tls-asana');
var express = require('express');

var app = express();
//need to make an http server instance for our Socket.io server to 'integrate with or mount on'
var http = require('http').Server(app);
var io = require('socket.io')(http);


var tlsAsanaPromise = tlsAsana.connect(ASANA_PROJECT_ID);
tlsAsanaPromise.then(res=>{
    console.log('Asana connected');
    console.log(res.me.workspaces);
});

app.use(express.static('public'));

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(8004);

io.on('connection', function(socket){
    console.log('Successful socket connection -from the backend');
    
    tlsAsana.updateTasks().then(taskData=>{
        socket.emit('connected', taskData);
    })
       
    
    socket.on('request-task', (testParam) => {
        console.log('Client to server success: ' + testParam.id);

        //this will be a real task id in future, just a test one right now
        var testTaskID = 196674113316972;

        //TODO
        //may not actually need this....may not need a method in the tlsAsana lib that has to do anything 
        //with the CSV request...we may just be able to have all the info we need contained in the task
        //object tags (which we will need to request from the tlsAsana lib anyways and we don't need to wait
        //for a user to click and send data back and forth through the socket). We should just be able to have
        //a frontend function that runs that looks at the task object, makes a CSV, and then handles the CSV download
        //like we did with the color science app

        //socket can establish connection and send tasks originally, but CSV download can all be handled on frontend
        tlsAsana.getTaskCSVStuff( testTaskID ).then(res=>{
            console.log(res);
            socket.emit('getTaskCSVStuffSuccess', res);
        }).catch(err => {
            console.log(res);
            socket.emit('getTaskCSVStuffFailure', err, res);
        });
    })
});
