const amqp = require('amqplib');
const winston = require('winston');
let channel;
module.exports.init = async () => {
  const connection = await amqp.connect(process.env.MESSAGE_QUEUE);

  channel = await connection.createChannel();
  await channel.assertQueue('job', { durable: true });
}
module.exports.start = async (payload) => {
  try {
    await channel.sendToQueue('job', Buffer.from(JSON.stringify(payload)), {
      persistent: true
    });

    winston.info(`Task ${payload.message} sent!`);
  } catch (error) {
    winston.info(error);
  }

};