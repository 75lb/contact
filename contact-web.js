// (function(){

var $ = document.querySelector.bind(document);

function l(msg){ console.log(msg); }

function Connection(options){
    this.onOpen = null;
    this.onClose = null;
    this.onData = null;
    this.onError = null;
    this.send = null;
}

function WebTransport(){
    this.getConnection = function(withUri, callback){
        var connection = new Connection();
        connection.onOpen = function(){
            l("OPEN");
        };
        connection.onClose = function(){
            l("CLOSE");
        };
        connection.onData = function(data){
            l("DATA:" + data.data);
        };
        connection.onError = function(err){
            l("ERROR", err);
        };

        var socket = new WebSocket(withUri);
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
    this.connection = null;
    this.onIncoming = null;

    this.disconnect = function(){
        l("session disconnected");
        self.state = "disconnected";
    };
    this.send = function(msg){
        this.connection.send(msg);
    };

    options.transport.getConnection(this.with, function(connection){
        self.state = "connected";
        self.connection = connection;
        connection.onData = function(msg){
            self.onIncoming(msg);
        }
        options.onConnected(connection);
    });
}

function WebView(){
    this.onInput = null;

    var message = $("#message"),
        log = $("#log"),
        self = this;

    message.focus();

    $("#inputForm").addEventListener("submit", function(e){
        e.preventDefault();
        self.onInput(message.value);
        message.value = "";
    });

    this.write = function(msg){
        var li = document.createElement("li");
        li.textContent = msg;
        log.appendChild(li);
    };

    return this;
}

var session = new Session({
    with: "ws://localhost:4444",
    transport: new WebTransport(),
    onConnected: function(connection){
        l("connected", connection);
    }
});


var view = new WebView();
view.onInput = function(input){
    session.send(input);
};

session.onIncoming = function(msg){
    view.write(msg);
};

// })();