var WebSocket = require('faye-websocket'),
        fs = require('fs'),
        http      = require('http');


var server = http.createServer();

server.listen(3007,function(){
    console.log("websocket server start");
    // 连接服务端socket
    var url3 = 'ws://localhost:3008';
    var ws = new WebSocket.Client(url3);

    ws.on('open', function(event) {
        console.log("连接上服务器");
        setTimeout(function(){
            console.log("==> send hello world");
            ws.send("hello world");
            // 传输一张图片过去
            setTimeout(function(){
                console.log("==> send img");
                ws.send(fs.readFileSync(__dirname + "/images/0.jpg"));
            },3000);
        },3000);
    });

    ws.on('message', function(event) {
        if(typeof event.data === "string") {
            console.log(event.data);
        }else{

        }
    });

    ws.on('close', function(event) {
        console.log('close');
        console.log("websocket 断开连接");
        ws = null;
    });
});