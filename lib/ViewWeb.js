module.exports = ViewWeb;

function ViewWeb(){
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
