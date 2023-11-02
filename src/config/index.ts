"use strict";
import constants from "./constants";

class Config {
  static get appEnv() {
    return process.env.APP_ENV || constants.environments.DEVELOPMENT;
  }

  static get mongo() {
    return {
      name: "CITY_STREETS_DB",
      url: process.env.MONGO_DB || "mongodb://localhost:27017/city-streets-db",
      database: "city-streets-db",
    };
  }

  static get queues() {
    return {
      streetsQueue: {
        url: process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672",
        queueName: "streetQueue",
      },
    };
  }
}

export default Config;
