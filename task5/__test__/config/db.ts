import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;

export async function mockMongoServer() {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
}

export async function closeMongoServer() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop()
}