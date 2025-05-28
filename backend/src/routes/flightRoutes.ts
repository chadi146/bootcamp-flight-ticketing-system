import express from 'express';
import { createFlight, deleteFlight, updateFlight, getFlights, getFlightLocations, getFlightsCount} from '../controllers/flightController';
import { getFlightById } from '../controllers/flightController';

const router = express.Router();


router.get('/', getFlights); // all users can view flights
// router.get('/search', searchFlights);
router.get('/locations', getFlightLocations); // all users can view available origins/destinations
router.get('/count', getFlightsCount); // <-- move this above /:id



router.get('/:id', getFlightById); // <-- generic param route last

router.post('/', createFlight); // only admins can create
router.put('/:id', updateFlight); // only admins can update
router.delete('/:id', deleteFlight); // only admins can delete

export default router;
