import express from 'express';
import { createFlight, deleteFlight, updateFlight, getFlights, getFlightLocations } from '../controllers/flightController';
import { getFlightById } from '../controllers/flightController';

const router = express.Router();

router.get('/', getFlights); // all users can view flights
router.get('/locations',  getFlightLocations); // all users can view available origins/destinations
router.get('/:id', getFlightById);

router.post('/',  createFlight); // only admins can create
router.put('/:id',  updateFlight); // only admins can update
router.delete('/:id', deleteFlight); // only admins can delete


export default router;
