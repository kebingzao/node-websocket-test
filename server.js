var WebSocket = require('faye-websocket'),
        fs = require('fs'),
        http      = require('http');


var server = http.createServer();

// 等待客户端连接上来
server.on('upgrade', function(request, socket, body) {
    if (WebSocket.isWebSocket(request)) {
        var ws = new WebSocket(request, socket, body);

        ws.on('open', function(event) {
            console.log("已经有客户端连接上来");
            ws.send('I am the server and I\'m listening!');
        });

        ws.on('message', function(event) {
            if(typeof event.data === "string") {
                ws.send(event.data);
            }else{
                console.log("二进制传过来");
            }
        });

        ws.on('close', function(event) {
            console.log('close', event.code, event.reason);
            console.log("websocket 断开连接");
            ws = null;
        });
    }
});

server.listen(3008,function(){
    console.log("websocket server start")
});