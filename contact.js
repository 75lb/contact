#!/usr/bin/env node
var net = require("net"),
    readline = require("readline"),
    rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    
var l = console.log,
    port = 6667;

if (process.argv[2] === "-l"){
    var server = net.createServer(function(c){
        l("client connected");
        c.on("end", function(){
            l("client disconnected");
        });
        c.on("data", function(data){
            rl.pause();
            l("\n" + data.toString());
            rl.prompt(true);
            rl.resume();
        });
        rl.prompt();
        rl.on("line", function(line){
            c.write(line);
            rl.prompt();
        });
        rl.on("close", function(){
            process.exit(0);
        });
    
    }).listen(port);
    
} else {
    var client = net.connect({ port: port, host: process.argv[2] }, function(){
        l("client connected");
        rl.prompt();
        rl.on("line", function(line){
            client.write(line);
            rl.prompt();
        });
        rl.on("close", function(){
            process.exit(0);
        });
    });

    client.on("data", function(data){
        rl.pause();
        l("\n" + data.toString());
        rl.prompt(true);
        rl.resume();
    });
    client.on("end", function(){
        l("client disconnected");
    });
}

