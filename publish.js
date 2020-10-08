const amqp = require("amqplib/callback_api");
const faker = require("faker");

const { QUEUE_NAME, RABBIT_URL } = process.env;

amqp.connect(RABBIT_URL, (err, connection) => {
  if (err) throw error;
  setInterval(
    () =>
      connection.createChannel((err, channel) => {
        if (err) throw err;
        const queue = QUEUE_NAME;

        const msg = {
          message: faker.hacker.phrase(),
          timestamp: new Date(),
          priority: Math.floor(Math.random() * 10),
        };

        channel.assertQueue(queue, {
          durable: false,
        });

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
      }),
    50
  );
});
