require("dotenv").config();
const express = require("express");
const http = require("http");
const socket = require("socket.io");
require("./publish");
const { sendEvent } = require("./receive");

const app = express();
const server = http.createServer(app);

const io = socket({
  origins: "*:*",
});

io.attach(server);

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

server.listen(PORT, () => {
  console.log({
    message: `Server is running on the PORT ${PORT}`,
  });
});

io.on("connection", (socket) => {
  console.log(`Socket Connected ${socket.id}`);
  sendEvent(socket);
});

module.exports = {
  io,
};
