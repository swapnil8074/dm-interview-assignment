import Config from "../config";
import CityStreetsService from "../services/CityStreetsService";
import RabbitMQConsumer from "./RabbitMQConsumer";

class StreetsConsumer extends RabbitMQConsumer {
  // extended functionalities goes here
  protected async handler(message: any) {
    await CityStreetsService.saveStreetsToDB(message);
  }
}

// Create a single instance of the consumer
const streetsConsumer = new StreetsConsumer(
  Config.queues.streetsQueue.url,
  Config.queues.streetsQueue.queueName
);

export default streetsConsumer;
module.exports = streetsConsumer;
