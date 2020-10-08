const express = require("express");
const http = require("http");
const socket = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socket({
  origins: "*:*",
});

io.attach(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log({
    message: `Server is running on the PORT ${PORT}`,
  });
});

module.exports = {
  io,
};
