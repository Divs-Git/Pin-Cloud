import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('CONNNECTED TO DB');
  } catch (error) {
    console.log('MONGO CONNECTION ERROR');
  }
};

export default connectDB;
