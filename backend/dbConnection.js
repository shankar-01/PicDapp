import mongodb from 'mongodb'
const connectionURI ="mongodb://127.0.0.1:27017/";
const client = mongodb.MongoClient;
const db = client.connect(connectionURI)
export default (await db).db("pictureDapp");