import amqp from 'amqplib';

let channel;

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect('amqp://guest:guest@localhost:5672');
  channel = await connection.createChannel();
  await channel.assertQueue('cms.documents');
  console.log('RabbitMQ connected (CMS Producer)');
};

export const publishCMSEvent = async (event) => {
  if (!channel) throw new Error('RabbitMQ channel is not initialized');
  channel.sendToQueue('cms.documents', Buffer.from(JSON.stringify(event)));
  console.log('Event published to cms.documents:', event);
};
