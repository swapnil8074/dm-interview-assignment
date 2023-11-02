import yargs from "yargs";
import fs from "fs";
import { join } from "path";
import Config from "./config";
import CityStreetsService from "./services/CityStreetsService";
import { city } from "./israeliStreets";
import MongoDB from "./db";

// import cityStreetsDb from "./db/cityStreetDb";

const appEnv = Config.appEnv;

if (!appEnv) {
  console.error("APP_ENV not set in the environment.");
  process.exit(1);
}

process.on("uncaughtException", (err: Error) => {
  console.error(err, "Uncaught Exception thrown");
  process.exit(1);
});

class Application {
  static loadArgs() {
    return yargs
      .option("producer", {
        alias: "p",
        describe: "Run the producer",
      })
      .option("consumer", {
        alias: "c",
        describe: "Run the consumer",
      })
      .option("city", {
        alias: "C",
        describe: "City name for the producer",
        type: "string",
      })
      .check((args) => {
        if (!args.producer && !args.consumer) {
          console.log(
            "Run command example: npm run dev -- --producer --city=Telaviv"
          );
          throw new Error("Please specify either --producer or --consumer");
        }
        if (args.producer && !args.city) {
          throw new Error("City name is required for the producer.");
        }
        return true;
      })
      .help().argv;
  }

  static async loadDatabase() {
    const mongoDB = new MongoDB(Config.mongo.url);
    await mongoDB.connect(Config.mongo.database);

    // get all repositories from repositories folder and load them

    let list = fs.readdirSync(join(__dirname, "./repository"));
    console.log("Initializing Repositories...", list);
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      // item = item.toString().replace(/\.ts$/, '');
      let repository = await import(join(__dirname, "./repository", item));
      repository = repository.default;
      repository.initialize(mongoDB);
    }
  }

  static async run() {
    let argv = await this.loadArgs();

    if (argv.producer) {
      const city = argv.city as city;
      CityStreetsService.fetchStreetsAndPublish(city);
    }

    if (argv.consumer) {
      await this.loadDatabase();
      require("./consumers/streetsConsumer");
    }
  }
}

if (require.main === module) {
  Application.run();
}

export default Application;
