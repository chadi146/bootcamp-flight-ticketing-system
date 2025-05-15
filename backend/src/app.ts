import express from 'express';
import cors from 'cors';
import adminTestRoutes from './routes/adminTest';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', adminTestRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Flight Booking API is running ✈️');
});

// other routes...

export default app;
