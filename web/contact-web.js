// (function(){

var $ = document.querySelector.bind(document);

function l(msg){ console.log(msg); }

function Connection(options){
    this.onOpen = options.onOpen;
    this.onClose = options.onClose;
    this.onData = options.onData;
    this.onError = options.onError;
    this.send = null;
}

function WebTransport(){
    this.getConnection = function(with, callback){
        var connection = new Connection({
            onOpen: function(){
                l("OPEN");
            },
            onClose: function(){
                l("CLOSE");
            },
            onData: function(data){
                l("DATA", data)
            },
            onError: function(err){
                l("ERROR", err);
            }
        });
        
        var socket = new WebSocket(with);
        socket.onopen = connection.onOpen;
        socket.onclose = connection.onClose;
        socket.onmessage = connection.onData;
        socket.onerror = connection.onError;

        connection.send = function(msg){
            socket.send(msg);
        }
        callback(connection);
    }
}

/**
state machine: 
disconnected -> connected -> typing
*/
function Session(options){
    var self = this;
    l("New Session with: " + options.with);
    this.state = "disconnected";
    this.with = options.with;

    this.disconnect = function(){ 
        l("session disconnected");
        self.state = "disconnected";
    };
    this.send = function(msg){
        this.connection.send(msg);
    };
    this.incomingMsg = function(msg){
        this.emit("incomingMsg", msg);
    };
    
    options.transport.getConnection(this.with, function(connection){
        self.state = "connected";
        options.onConnected(connection);
    });
}

function WebView(onInput){
    var message = $("#message"),
        log = $("#log");
        
    message.focus();
    
    $("#inputForm").addEventListener("submit", function(e){
        e.preventDefault();
        onInput(message.value);
        message.value = "";
    });
    
    this.write = function(msg){
        var li = document.createElement("li");
        li.textContent = msg;
        log.appendChild(li);
    };
}

var session = new Session({
    with: "ws://localhost:4444",
    transport: new WebTransport(),
    onConnected: function(connection){
        l("connected", connection);
    }
});


var view = new WebView(function(input){
    l(input);
});

// })();