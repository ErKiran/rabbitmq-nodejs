const { io } = require("../server");
const {sendEvent} = require('../publish') 

io.on("connection", (socket) => {
  sendEvent(socket);
});
