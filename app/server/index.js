var express = require("express"); //cargar express
var app = express();
var server = require("http").Server(app); //cargar el servidor http, esta variable server debe enviarse a socket.io
var io = require("socket.io")(server); //pasamos la variable server a socket.io

app.use(express.static("app/client")); //uso de middleware de express para cargar archivos

app.get("/hola-mundo", function (req, res) {
  res.status(200).send("jelou world desde la route");
}); //prueba de crear una ruta

//array para los mensajes
var messages = [
  {
    id: 1,
    text: "Chat privado de socket.io y NodeJS",
    nickname: "jg-bot",
  },
];
io.on("connection", function (socket) {
  console.log(
    "El cliente con IP " + socket.handshake.address + " se ha conectado"
  );
  socket.emit("messages", messages);

  socket.on("add-message", (data) => {
    messages.push(data);

    io.sockets.emit(
      "messages",
      messages
    ); /*emitir a todos los clientes conectados el array
    de mensajes actualizado*/
  }); //recoge un evento y guarda el nuevo mensaje en el array messages
});

server.listen(6677, function () {
  console.log("Servidor working en http://localhost:6677");
}); //crear servidor con express
