import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db'
import authRoutes from './routes/authroute'
import productRoutes from './routes/productRoute';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/product',productRoutes)


app.use(errorHandler);
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
