import { MongoClient, Db, Collection, MongoClientOptions } from 'mongodb';

class MongoDB {
  private client: MongoClient;
  private db: Db;

  constructor(url: string, options?: MongoClientOptions) {
    this.client = new MongoClient(url, options);
  }

  async connect(databaseName: string): Promise<void> {
    await this.client.connect();
    this.db = this.client.db(databaseName);
  }

  getCollection<T>(collectionName: string): Collection<T> {
    return this.db.collection<T>(collectionName);
  }

  async close(): Promise<void> {
    await this.client.close();
  }
}


export default MongoDB;
