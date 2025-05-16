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

// Admin can get all bookings
router.get('/', authenticate, isAdmin, getBookings);

// User routes
router.get('/my', authenticate, getUserBookings);
router.post('/', authenticate, createBooking);

router.put('/:id/status', authenticate, updateBookingStatus);
router.delete('/:id', authenticate, deleteBooking);

export default router;
