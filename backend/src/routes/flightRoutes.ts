import express from 'express';
import { authenticate } from '../middlewares/auth';
import { isAdmin } from '../middlewares/isAdmin';
import { createFlight, deleteFlight, updateFlight, getFlights } from '../controllers/flightController';

const router = express.Router();

router.get('/', authenticate, getFlights); // all users can view flights

router.post('/', authenticate, isAdmin, createFlight); // only admins can create
router.put('/:id', authenticate, isAdmin, updateFlight); // only admins can update
router.delete('/:id', authenticate, isAdmin, deleteFlight); // only admins can delete

export default router;
