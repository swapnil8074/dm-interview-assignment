import { Collection } from "mongodb";
import RepositoryBase from "../db/RepositoryBase";

export interface Street {
  _id?: string;
  streetId: string;
  name: string;
}

class StreetsRepository extends RepositoryBase<Street> {
  protected collection: Collection<Street>;
  protected collectionName = "streets";
  // Additional methods specific to streets repository can be added here
}

const streetsRepository = new StreetsRepository();

export default streetsRepository;
module.exports = streetsRepository;
