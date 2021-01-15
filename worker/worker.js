const amqp = require('amqplib');
const winston = require('winston');
const delay = (s) => new Promise((r) => setTimeout(r, 1000 * s));
(async () => {
    try {
        const connection = await amqp.connect(process.env.MESSAGE_QUEUE);
        const channel = await connection.createChannel();
        await channel.assertQueue('job', { durable: true });
        await channel.prefetch(1);

        winston.info('Waiting tasks...');

        channel.consume('job', async (message) => {
            winston.info('receve a job');
            console.log(' [x] Received %s', message.content.toString());
            const secs = message.content.toString().split('.').length - 1;
            await delay(secs);

            channel.ack(message);

            winston.info(`job duration ${secs}s`);
        }, {
            noAck: false
        });
    } catch (error) {
        winston.error(error);
    }

})();