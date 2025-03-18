import express from 'express';
import userRouter from './routes/user.route.js';
import pinRouter from './routes/pin.route.js';
import commentRouter from './routes/comment.route.js';
import boardRouter from './routes/board.route.js';
import connectDB from './utils/connectDB.js';

const app = express();

// app.use('/api/test', (req, res) => {
//   return res.json('Hello from backend');
// });

const port = process.env.PORT;

app.use('/api/users', userRouter);
app.use('/api/pins', userRouter);
app.use('/api/comments', userRouter);
app.use('/api/boards', userRouter);

app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
