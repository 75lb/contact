module.exports = Message;

function Message(user){
    this.user = user;
    this.msg = "<msg>";
    this.system = null;
    this.date = Date.now();
}
