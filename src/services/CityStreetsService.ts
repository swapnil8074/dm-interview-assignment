import lodash from "lodash";
import { StreetsService, city } from "../israeliStreets";
import streetProducer from "../producers/streetsProducer";
import streetsRepository from "../repository/streetsRepository";

export interface IStreet {
  streetId: string;
  name: string;
}
export class CityStreetsService {
  static async fetchStreetsAndPublish(city: city): Promise<void> {
    try {
      let { streets } = await StreetsService.getStreetsInCity(city);
      let streetsChunk = lodash.chunk(streets, 500);
      for (let i = 0; i < streetsChunk.length; i++) {
        await streetProducer.publish(streetsChunk[i]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  static async saveStreetsToDB(streets: IStreet[]): Promise<void> {
    let result = await streetsRepository.insertMany(streets);
    console.log(result);
  }
}

export default CityStreetsService;