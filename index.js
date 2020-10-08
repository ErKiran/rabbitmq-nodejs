const amqp = require("amqplib/callback_api");
const axios = require("axios");

amqp.connect("amqp://localhost", async (err, connection) => {
  if (err) throw error;

  connection.createChannel(async (err, channel) => {
    if (err) throw err;
    const queue = "zegal";
    const quotes = await axios.get(
      "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json"
    );

    const msg = {
      message: quotes.data.quoteText.trim(),
      timestamp: new Date(),
      priority: Math.floor(Math.random() * 10),
    };

    channel.assertQueue(queue, {
      durable: false,
    });

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));

    console.log(" [x] Sent %s", msg);
  });
});
