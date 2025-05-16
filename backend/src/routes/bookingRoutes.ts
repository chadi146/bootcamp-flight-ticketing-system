import express from 'express';
import { authenticate } from '../middlewares/auth';
import { isAdmin } from '../middlewares/isAdmin';
import {
  getBookings,
  getUserBookings,
  createBooking,
  updateBookingStatus,
  deleteBooking,
} from '../controllers/bookingController';

const router = express.Router();

// Admin can get all bookings — no auth for testing
router.get('/', getBookings);

// User routes — no auth for testing
router.get('/my', getUserBookings);
router.post('/', createBooking);
router.put('/:id/status', updateBookingStatus);
router.delete('/:id', deleteBooking);

export default router;
