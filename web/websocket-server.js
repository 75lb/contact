"use strict";
var http = require("http");
var l = console.log;

var server = http.createServer(function(req, res){
    l("connection");
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("ok");
});
server.on("upgrade", function(req, socket){
    var magicString = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
    var secWsKey = req.headers['sec-websocket-key'];
    var hash = require('crypto')
                 .createHash('SHA1')
                 .update(secWsKey + magicString)
                 .digest('base64'); 
    var handshake = "HTTP/1.1 101 Web Socket Protocol Handshake\r\n" +
                "Upgrade: WebSocket\r\n" +
                "Connection: Upgrade\r\n" +
                "Sec-WebSocket-Accept: " + hash + "\r\n" +
                "\r\n";

    socket.write(handshake);
    socket.on("data", function(msg){
        var decoded = decodeWebSocket(msg);
        l(decoded);
        var response = new Buffer(encodeWebSocket("get fucked with your " + decoded));
        l(response.toString());
        socket.write(response);
    });
});
server.listen(4444, function(){
    l("listening");    
});

function encodeWebSocket(bytesRaw){
    var bytesFormatted = new Array();
    bytesFormatted[0] = 129;
    if (bytesRaw.length <= 125) {
        bytesFormatted[1] = bytesRaw.length;
    } else if (bytesRaw.length >= 126 && bytesRaw.length <= 65535) {
        bytesFormatted[1] = 126;
        bytesFormatted[2] = ( bytesRaw.length >> 8 ) & 255;
        bytesFormatted[3] = ( bytesRaw.length      ) & 255;
    } else {
        bytesFormatted[1] = 127;
        bytesFormatted[2] = ( bytesRaw.length >> 56 ) & 255;
        bytesFormatted[3] = ( bytesRaw.length >> 48 ) & 255;
        bytesFormatted[4] = ( bytesRaw.length >> 40 ) & 255;
        bytesFormatted[5] = ( bytesRaw.length >> 32 ) & 255;
        bytesFormatted[6] = ( bytesRaw.length >> 24 ) & 255;
        bytesFormatted[7] = ( bytesRaw.length >> 16 ) & 255;
        bytesFormatted[8] = ( bytesRaw.length >>  8 ) & 255;
        bytesFormatted[9] = ( bytesRaw.length       ) & 255;
    }
    for (var i = 0; i < bytesRaw.length; i++){
        bytesFormatted.push(bytesRaw.charCodeAt(i));
    }
    return bytesFormatted;
}

function decodeWebSocket (data){
    var datalength = data[1] & 127;
    var indexFirstMask = 2;
    if (datalength == 126) {
        indexFirstMask = 4;
    } else if (datalength == 127) {
        indexFirstMask = 10;
    }
    var masks = data.slice(indexFirstMask,indexFirstMask + 4);
    var i = indexFirstMask + 4;
    var index = 0;
    var output = "";
    while (i < data.length) {
        output += String.fromCharCode(data[i++] ^ masks[index++ % 4]);
    }
    return output;
}
