"use strict";

const express = require('express');
const tlsAsana = require('tls-asana');

const ASANA_PROJECT_ID = '245703302055184';

let app = express();

//need to make an http server instance here to pass to Socket.io 
//(otherwise we would be good with the express instance)
let server = require('http').Server(app);
let io = require('socket.io')(server);

let tlsAsanaPromise = tlsAsana.connect(ASANA_PROJECT_ID);
tlsAsanaPromise.then(()=>{
    console.log('Asana connected');
});

app.use(express.static(__dirname));
server.listen(8004);

io.on('connection', function(socket){
    console.log('Successful socket connection -from the backend');
    socket.emit('connected', "Backend connection response");

    socket.on('request-task', (testParam) => {
        console.log('Client to server success: ' + testParam);
    })
});