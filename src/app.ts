import express, { Application, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import userRoutes from './routes/userRoute';
import taskRoutes from './routes/taskRoute';
import mongoose from 'mongoose';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(process.env.MONGODB_URI || DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.log(err));

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('/*', (req, res) => {
    console.log('path.resolve == ' + path.resolve(__dirname, 'client', 'build', 'index.html'));

    let ret = path
      .resolve(__dirname, 'client', 'build', 'index.html')
      .replace('/dist-server', '')
      .replace('\\dist-server', '');
    res.sendFile(ret);

    console.log('path.resolve ret== ' + ret);
  });
}

export default app;
