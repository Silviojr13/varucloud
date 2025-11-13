import amqp from 'amqplib';

class EventPublisher {
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
      
      console.log('✅ Event publisher connected to RabbitMQ');
    } catch (error) {
      console.error('❌ Failed to connect to RabbitMQ:', error.message);
    }
  }

  async publish(exchange, routingKey, event) {
    if (!this.channel) {
      await this.connect();
    }

    try {
      const message = JSON.stringify(event);
      this.channel.publish(exchange, routingKey, Buffer.from(message));
      console.log(`✅ Event published: ${routingKey}`);
    } catch (error) {
      console.error('❌ Failed to publish event:', error.message);
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

export default new EventPublisher();