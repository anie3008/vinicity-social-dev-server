import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';


const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});