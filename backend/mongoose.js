import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;
const uri = process.env.MONGODB_URI;
export const connectToDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log(`connect to database with port ${port} `);
  } catch (error) {
    console.log(error);
  }
};
