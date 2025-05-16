import express from 'express';
import cors from 'cors';
import adminTestRoutes from './routes/adminTest';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import flightRoutes from './routes/flightRoutes'
import paymentRoutes from './routes/paymentRoutes';
import bookingRoutes from './routes/bookingRoutes'; 
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
app.use('/bookings', bookingRoutes);
// After setting up middlewares like express.json()
app.use('/payments', paymentRoutes);


// other routes...

export default app;
