const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3001;

app.get("/", function (req, res) {
  res.send("<h1>Test</h1>");
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const io = require("./config/socket").init(server);

io.on("connection", (socket) => {
  console.log(`socket id: ${socket.id} made a connection`);
  //   socket.emit("welcome", "Welcome to my first socket.io app");
  socket.broadcast.emit("join", "Someone joined the chat");
//   io.emit(
//     "usercount",
//     `${socket.conn.server.clientCount} users are in the room`
//   );
  socket.on("new message", (data) => {
    socket.broadcast.emit("incoming message", data);
  });
});
