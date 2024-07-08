const express = require("express");
const app = express();
const path = require("path");

const port = process.env.PORT || 3000;

app.use(express.static("public"));

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log(`New Connection : ${socket.id}`);

  //receive event

  socket.on("comment", (data) => {
    data.time = Date();
    socket.broadcast.emit("comment", data);
  });
});
