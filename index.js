import express from 'express';
import { MongoClient } from 'mongodb';
import { mentorRouter } from './routes/Mentor.js';
import { studentRouter } from './routes/Student.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const MONGO_CONNECT = process.env.MONGO_CONNECT;

//mongo connection
async function createConnection() {
  const client = new MongoClient(MONGO_CONNECT);
  await client.connect();
  console.log('Connected to Mongo');
  return client;
}

export const client = await createConnection();

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ webapp: '' });
});

app.use('/students', studentRouter);
app.use('/mentors', mentorRouter);

app.listen(PORT, () => console.log(`App has started in ${PORT}`));
