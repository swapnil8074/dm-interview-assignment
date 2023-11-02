import {
  Collection,
  Filter,
  InsertOneResult,
  UpdateResult,
  DeleteResult,
  InsertManyResult,
  OptionalUnlessRequiredId,
} from "mongodb";
import MongoDB from ".";

abstract class RepositoryBase<T> {
  protected collection: Collection<T>;
  protected abstract collectionName: string;

  initialize(mongoDbInstance: MongoDB) {
    this.collection = mongoDbInstance.getCollection<T>(this.collectionName);
  }

  async findOne(filter: Filter<T>): Promise<T | null> {
    return this.collection.findOne(filter) as Promise<T | null>;
  }

  async findMany(filter: Filter<T>): Promise<T[]> {
    return this.collection.find(filter).toArray() as Promise<T[]>;
  }

  async insertOne(
    document: OptionalUnlessRequiredId<T>
  ): Promise<InsertOneResult<T>> {
    return this.collection.insertOne(document);
  }

  async insertMany(
    documents: OptionalUnlessRequiredId<T>[]
  ): Promise<InsertManyResult<T>> {
    return this.collection.insertMany(documents);
  }

  async updateOne(
    filter: Filter<T>,
    update: Partial<T>
  ): Promise<UpdateResult> {
    return this.collection.updateOne(filter, { $set: update });
  }

  async deleteOne(filter: Filter<T>): Promise<DeleteResult> {
    return this.collection.deleteOne(filter);
  }
}

export default RepositoryBase;
