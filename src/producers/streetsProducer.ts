import Config from "../config";
import RabbitMQProducer from "./RabbitMQProducer";

class StreetProducer extends RabbitMQProducer {
  // extended functionalities goes here
}

// Create a single instance of the consumer
const streetProducer = new StreetProducer(
  Config.queues.streetsQueue.url,
  Config.queues.streetsQueue.queueName
);

export default streetProducer;
