const amqp = require("amqplib/callback_api");

const { QUEUE_NAME, RABBIT_URL } = process.env;

function sendEvent(socket) {
  amqp.connect(RABBIT_URL, (err, connection) => {
    if (err) throw err;

    connection.createChannel((err, channel) => {
      if (err) throw err;
      const queue = QUEUE_NAME;
      channel.assertQueue(queue, {
        durable: false,
      });

      channel.consume(
        queue,
        (msg) => {
          const message = JSON.parse(msg.content.toString());
          if (message.priority >= 7) {
            socket.emit("fetchMessage",message);
          }
        },
        {
          noAck: true,
        }
      );
    });
  });
}

module.exports = {
  sendEvent,
};
