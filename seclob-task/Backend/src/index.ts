import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db'
import authRoutes from './routes/authroute'
import productRoutes from './routes/productRoute';
import wishListRoutes from './routes/wishListRoutes';
import { errorHandler } from './middlewares/errorHandler';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import cors from 'cors'


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/product',productRoutes)
app.use('/api/wishlist',wishListRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(errorHandler);
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
