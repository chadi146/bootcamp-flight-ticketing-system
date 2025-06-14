import express from 'express';
import cors from 'cors';
// import adminTestRoutes from './routes/adminTest';
import dotenv from 'dotenv';
// import userRoutes from './routes/userRoutes';
import flightRoutes from './routes/flightRoutes';
import paymentRoutes from './routes/paymentRoutes';
import bookingRoutes from './routes/bookingRoutes';
import authRoutes from './routes/auth.routes';
import { authenticateJWT, authorizeAdmin } from './middlewares/auth.middleware';
import userRoutes from './routes/userRoutes';
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
  allowedHeaders: ['Content-Type', 'Authorization'], // Add this line
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Flight Booking API is running ✈️');
});

// Register routes
// app.use('/api', adminTestRoutes);
 app.use('/api/users', userRoutes);
app.use("/auth", authRoutes);
app.use('/api/flights', flightRoutes);
app.use('/bookings',authenticateJWT, bookingRoutes);
app.use('/payments',authenticateJWT,paymentRoutes);

export default app;
