const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const path = require("path");

app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", (socket) => {
  // console.log(socket)
  socket.emit("your id", socket.id);
  socket.on("send message", (body) => {
    io.emit("message", body);
  });
});

const port = 8000;

server.listen(port, () => console.log(`server is running on port ${port}`));
