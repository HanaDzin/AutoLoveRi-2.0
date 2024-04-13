import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cors from 'cors'

import connectDB from './config/db.js';

// Uvoz ruta:
import CarsRoutes from './routes/CarsRoutes.js';
import UserRoutes from './routes/UserRoutes.js'
import OrderRoutes from './routes/OrderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js';
import reviewRoutes from './routes/ReviewRoutes.js'

const port = process.env.PORT || 5000;

connectDB();

const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//cookie parser middleware:
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  credentials: true,
}));



app.use('/api', CarsRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/upload', uploadRoutes);
app.use ('/api/reviews', reviewRoutes);

//paypal
app.get('/api/config/paypal', (req, res) => res.send({ clientId: procces.env.PAYPAL_CLIENT_ID}));

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use('/uploads', express.static('/var/data/uploads'));
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
);

} else {
  const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}






 
//kreirani middleware za potencijalne pogreške:
app.use(notFound);
app.use(errorHandler);



app.listen(port, () => console.log(`Server port ${port}`));
