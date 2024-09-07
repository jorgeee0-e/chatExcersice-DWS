var socket = io.connect("https://wp5f4x-6677.csb.app", {
  forceNew: true,
}); /*el socket funcionara a nivel de red local, por eso usamos el ip local, pero como estoy
usando sandbox, uso el url de ejecucion de la aplicacion*/

socket.on("messages", function (data) {
  console.log(data);
  render(data);
});

//funcion para que se muestren los mensajes en el div del chat
function render(data) {
  var html = data
    .map((message, index) => {
      return ` <div class="message">
          <strong>${message.nickname}</strong> dice:
          <p>${message.text}</p>
        </div>
      `;
    })
    .join("");
  var div_msgs = document.getElementById("messages");
  div_msgs.innerHTML = html;
  div_msgs.scrollTop = div_msgs.scrollHeight; // pone el foco en el ultimo mensaje enviado
}

//Funcion que recibe el evento submit
function addMessage(e) {
  e.preventDefault();
  dcoument;
  var message = {
    nickname: document.getElementById("nickname").value,
    text: document.getElementById("text").value,
  };
  document.getElementById("nickname").style.display = "none";
  socket.emit("add-message", message);
  //limpia el textarea despues de enviado el mensaje
  document.getElementById("text").value = "";
  return false;
}
