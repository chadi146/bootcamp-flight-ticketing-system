import express from 'express';
import cors from 'cors';
import adminTestRoutes from './routes/adminTest';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import flightRoutes from './routes/flightRoutes'
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Flight Booking API is running ✈️');
});

//  Register the routes
app.use('/api', adminTestRoutes);
app.use('/api/users', userRoutes);
app.use('/api/flights', flightRoutes);


// other routes...

export default app;
