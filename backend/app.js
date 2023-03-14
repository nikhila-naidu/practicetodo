import express from 'express';
import * as dotenv from 'dotenv';
import { connectToDB } from './mongoose.js';
import cors from 'cors';
import todoRouter from './routes/todo-routes.js';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  }),
);

app.use(express.urlencoded({ extended: false }));
dotenv.config();

app.use('/api/todo', todoRouter);

const port = process.env.PORT;
app.listen(port, connectToDB);
