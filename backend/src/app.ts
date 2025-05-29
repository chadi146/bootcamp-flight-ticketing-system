import express from 'express';
import cors from 'cors';
import adminTestRoutes from './routes/adminTest';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import flightRoutes from './routes/flightRoutes';
import paymentRoutes from './routes/paymentRoutes';
import bookingRoutes from './routes/bookingRoutes';

dotenv.config();
const app = express();

const allowedOrigins = ['http://localhost:4200', 'http://localhost:4300'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('Not allowed by CORS'), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Flight Booking API is running ✈️');
});

// Register routes
app.use('/api', adminTestRoutes);
app.use('/api/users', userRoutes);
app.use('/api/flights', flightRoutes);
app.use('/bookings', bookingRoutes);
app.use('/payments', paymentRoutes);

export default app;
