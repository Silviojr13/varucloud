import amqp from 'amqplib';

class EventConsumer {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    try {
      // In a real implementation, you would use environment variables for the connection string
      this.connection = await amqp.connect('amqp://localhost');
      this.channel = await this.connection.createChannel();
      
      // Assert exchange for events
      await this.channel.assertExchange('varu.events', 'topic', { durable: true });
      
      console.log('✅ Event consumer connected to RabbitMQ');
    } catch (error) {
      console.error('❌ Failed to connect to RabbitMQ:', error.message);
    }
  }

  async subscribe(exchange, routingKeyPattern, handler) {
    if (!this.channel) {
      await this.connect();
    }

    try {
      // Create a temporary queue for this consumer
      const queue = await this.channel.assertQueue('', { exclusive: true });
      
      // Bind the queue to the exchange with the routing key pattern
      await this.channel.bindQueue(queue.queue, exchange, routingKeyPattern);
      
      // Consume messages from the queue
      this.channel.consume(queue.queue, async (msg) => {
        if (msg !== null) {
          try {
            const event = JSON.parse(msg.content.toString());
            await handler(event);
            this.channel.ack(msg);
          } catch (error) {
            console.error('❌ Error processing event:', error.message);
            this.channel.nack(msg);
          }
        }
      });
      
      console.log(`✅ Subscribed to events: ${routingKeyPattern}`);
    } catch (error) {
      console.error('❌ Failed to subscribe to events:', error.message);
    }
  }

  async close() {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }
}

export default new EventConsumer();