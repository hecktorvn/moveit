import { MongoClient, Db } from 'mongodb';
import url from 'url';

let cachedDb: Db = null;

async function connectToDatabase() {
    if ( cachedDb ) {
        return cachedDb;
    }

    const uri = process.env.MONGODB_URI;
    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const dbname = url.parse(uri).pathname.substr(1);
    const db = client.db(dbname);

    cachedDb = db;
    return db;
}

export default connectToDatabase;