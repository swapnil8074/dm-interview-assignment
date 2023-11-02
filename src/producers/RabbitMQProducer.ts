import amqp, { Channel, Connection } from "amqplib";

class RabbitMQProducer {
  private connectionUrl: string;
  private channel: Channel;
  private queue: string;
  private connection: Connection;

  constructor(connectionUrl: string, queue: string) {
    this.queue = queue;
    this.connectionUrl = connectionUrl;
    this.initialize();
  }

  private async initialize() {
    try {
      this.connection = await amqp.connect(this.connectionUrl);
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(this.queue, { durable: false });
    } catch (error) {
      console.error("Error during initialization:", error);
      throw error; // Propagate the error
    }
  }

  public async publish(message: string) {
    try {
      message = JSON.stringify(message);
      await this.channel.sendToQueue(this.queue, Buffer.from(message));
      console.log(`Published message: ${message}`);
    } catch (error) {
      console.error("Error publishing message:", error);
      throw error; // Propagate the error
    }
  }

  public async close() {
    try {
      await this.connection.close();
      console.log("Connection closed");
    } catch (error) {
      console.error("Error closing connection:", error);
      throw error; // Propagate the error
    }
  }
}

export default RabbitMQProducer;
