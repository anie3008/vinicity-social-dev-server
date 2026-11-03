import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';


const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
const connectClient = await connectToMongoDB();
const db = connectClient.db('vinicity-social-dev');
const eventsCollection = db.collection('events');

app.post ('/events', async(req, res) =>{
    const eventsData = req.body;
    const result = await eventsCollection.insertOne(eventsData);
    res.send(result)
})

app.get('/events', async(req, res) => {
    const result = await eventsCollection.find(). toArray();
    res.send(result);
})

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});