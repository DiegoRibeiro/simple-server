const WebSocket = require("ws");

function setup(port, callback) {
    const wss = new WebSocket.Server({port: port}); // wss = websocket server

    wss.on('connection', function connection(socket) {
        console.log("got connection from client");

        socket.on('message', function(message) {
            //console.log("received %s.", message);
            var parsed = JSON.parse(message);

            callback(socket, parsed);
        });

        socket.on('close', function() {
            console.log("closed connection");
        });

        socket.on('error', function(err) {
            console.log(err);
        });
    
        socket.send(JSON.stringify({ack:true}));
    });
}

exports.setup = setup;

