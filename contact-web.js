var TransportWeb = require("./lib/TransportWeb"),
    ViewWeb = require("./lib/ViewWeb");

var transport = new TransportWeb(),
    view = new ViewWeb(),
    options = { 
        host: "localhost",
        port: 4444
    };

transport.connect(options, function(session){
    console.log("BOOM");
    session.on("incomingMsg", function(msg){
        view.showMessage(msg);
    });
    view.on("input", function(msg){
        session.send(msg);
    });
});


// function l(msg){ console.log(msg); }
// 
// function Connection(options){
//     this.onOpen = null;
//     this.onClose = null;
//     this.onData = null;
//     this.onError = null;
//     this.send = null;
// }
// 
// 
// 
// /**
// state machine:
// disconnected -> connected -> typing
// */
// function Session(options){
//     var self = this;
//     l("New Session with: " + options.with);
//     this.state = "disconnected";
//     this.with = options.with;
//     this.connection = null;
//     this.onIncoming = null;
// 
//     this.disconnect = function(){
//         l("session disconnected");
//         self.state = "disconnected";
//     };
//     this.send = function(msg){
//         this.connection.send(msg);
//     };
// 
//     options.transport.getConnection(this.with, function(connection){
//         self.state = "connected";
//         self.connection = connection;
//         connection.onData = function(msg){
//             self.onIncoming(msg);
//         }
//         options.onConnected(connection);
//     });
// }
// 
// var session = new Session({
//     with: "ws://localhost:4444",
//     transport: new TransportWeb(),
//     onConnected: function(connection){
//         l("connected", connection);
//     }
// });
// 
// 
// var view = new WebView();
// view.onInput = function(input){
//     session.send(input);
// };
// 
// session.onIncoming = function(msg){
//     view.write(msg);
// };
