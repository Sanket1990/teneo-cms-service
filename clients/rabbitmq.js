import amqp from 'amqplib';

let channel;

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect('amqp://guest:guest@localhost:5672');
  channel = await connection.createChannel();
  await channel.assertQueue('cms.blogs');
  console.log('RabbitMQ connected (CMS Producer)');
};

export const publishBlogEvent = async (event) => {
  if (!channel) throw new Error('RabbitMQ channel is not initialized');
  channel.sendToQueue('cms.blogs', Buffer.from(JSON.stringify(event)));
  console.log('Event published to cms.blogs:', event);
};
