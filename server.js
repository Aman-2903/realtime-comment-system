const express = require("express");
const app = express();
const path = require("path");
const dbConnect = require("./db");
const Comment = require("./model/comment");

//database Connection
dbConnect();

const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

// Routes
app.post("/api/comments", (req, res) => {
  const comment = new Comment({
    username: req.body.username,
    comment: req.body.comment,
  });
  comment.save().then((response) => {
    res.send(response);
  });
});

app.get("/api/comments", (req, res) => {
  Comment.find().then(function (comments) {
    res.send(comments);
  });
});

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

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
