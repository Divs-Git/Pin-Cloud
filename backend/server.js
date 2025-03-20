import express from 'express';
import userRouter from './routes/user.route.js';
import pinRouter from './routes/pin.route.js';
import commentRouter from './routes/comment.route.js';
import boardRouter from './routes/board.route.js';
import connectDB from './utils/connectDB.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// app.use('/api/test', (req, res) => {
//   return res.json('Hello from backend');
// });

const port = process.env.PORT;

app.use('/api/users', userRouter);
app.use('/api/pins', pinRouter);
app.use('/api/comments', commentRouter);
app.use('/api/boards', boardRouter);

app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
