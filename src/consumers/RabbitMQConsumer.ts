import amqp, { Channel, Connection, Message } from "amqplib";

class RabbitMQConsumer {
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
      console.log(`Initializing consumer for queue: ${this.queue}`);
      this.connection = await amqp.connect(this.connectionUrl);
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(this.queue, { durable: false });
      this.consume();
    } catch (error) {
      console.error("Error during initialization:", error);
      throw error; // Propagate the error
    }
  }

  private async consume() {
    try {
      console.log(`Consuming messages from queue: ${this.queue}`);
      await this.channel.consume(this.queue, async (msg) => {
        if (msg) {
          await this.handler(JSON.parse(msg.content.toString()));
          await this.channel.ack(msg); // Acknowledge the message to delete it from the queue
        }
      });
    } catch (error) {
      console.error("Error consuming messages:", error);
      throw error; // Propagate the error
    }
  }

  protected handler(msg: Message | null): Promise<void> {
    throw new Error("Handler method not implemented");
  }

  private async close() {
    try {
      await this.connection.close();
      console.log("Connection closed");
    } catch (error) {
      console.error("Error closing connection:", error);
      throw error; // Propagate the error
    }
  }
}

export default RabbitMQConsumer;
