module.exports = Connection;

function Connection(socket){
    this._socket = socket;
    this.createdDate = Date.now();
}
Connection.prototype.write = function(msg){
    if (this._socket.write){
        this._socket.write(msg);
    } else {
        this._socket.send(msg);
    }    
};
