import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import pinRouter from './routes/pin.route.js';
import commentRouter from './routes/comment.route.js';
import boardRouter from './routes/board.route.js';
import connectDB from './utils/connectDB.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

const app = express();
app.use(express.json());

const clientURL =
  process.env.NODE_ENV == 'production'
    ? process.env.CLIENT_URL_PROD
    : process.env.CLIENT_URL_DEV;

app.use(cors({ origin: clientURL, credentials: true }));
app.use(cookieParser());
app.use(fileUpload());

app.use('/api/users', userRouter);
app.use('/api/pins', pinRouter);
app.use('/api/comments', commentRouter);
app.use('/api/boards', boardRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);

  res.json({
    message: error.message || 'Something went wrong!',
    status: error.status,
    stack: error.stack,
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectDB();
  console.log('Server is running!');
});
