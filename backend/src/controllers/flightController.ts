import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { startOfDay, endOfDay } from 'date-fns';


// export const getFlights = async (req: Request, res: Response) => {
//   try {
//     const { from, to, date } = req.query;

//     const flights = await prisma.flight.findMany({
//       where: {
//         ...(from && { from: String(from) }),
//         ...(to && { to: String(to) }),
//         ...(date && { date: String(date) })
//       }
//     });

//     res.json(flights);
//   } catch (err) {
//     console.error('Error fetching flights:', err);
//     res.status(500).json({ message: 'Server error fetching flights' });
//   }
// };

export const getFlights = async (req: Request, res: Response) => {
  try {
    const { from, to, date } = req.query;

    const filters: any = {};

    if (from) filters.origin = String(from);
    if (to) filters.destination = String(to);

    if (date) {
      const day = new Date(String(date));
      filters.date = {
        gte: startOfDay(day),
        lte: endOfDay(day),
      };
    }

    // Fetch flights matching filters
    const flights = await prisma.flight.findMany({ where: filters });

    // Combine date + time into departureTime
    const flightsWithDepartureTime = flights.map((flight) => {
      // flight.date is a Date object, flight.time is 'HH:mm'
      // Construct ISO string like 'YYYY-MM-DDTHH:mm:00Z'
      const dateStr = flight.date.toISOString().split('T')[0]; // e.g. '2025-06-05'
      const departureTimeStr = `${dateStr}T${flight.time}:00Z`;  // e.g. '2025-06-05T14:30:00Z'

      return {
        ...flight,
        departureTime: new Date(departureTimeStr),
      };
    });

    res.json(flightsWithDepartureTime);
  } catch (err) {
    console.error('Error fetching flights:', err);
    res.status(500).json({ message: 'Server error fetching flights' });
  }
};

export const getFlightsCount = async (req: Request, res: Response) => {
  try {
    const count = await prisma.flight.count();
    res.json({ count });
  } catch (error) {
    console.error('Error counting flights:', error);
    res.status(500).json({ message: 'Failed to count flights' });
  }
};


export const createFlight = async (req: Request, res: Response) => {
  const { flightNumber, origin, destination, date, time, duration, price, seats } = req.body;

  try {
    const flight = await prisma.flight.create({
      data: {
        flightNumber,
        origin,
        destination,
        date: new Date(date), // Ensure this is a valid ISO string or timestamp
        time,
        duration,
        price,
        seats,
      },
    });
    res.status(201).json(flight);
  } catch (err) {
    console.error('Error creating flight:', err);
    res.status(400).json({ message: 'Error creating flight', error: err });
  }
};


export const updateFlight = async (req: Request, res: Response) => {
  const flightId = parseInt(req.params.id);
  const { flightNumber, origin, destination, date, time, duration, price, seats } = req.body;

  try {
    const updatedFlight = await prisma.flight.update({
      where: { id: flightId },
      data: {
        flightNumber,
        origin,
        destination,
        date: new Date(date),
        time,
        duration,
        price,
        seats,
      },
    });
    res.json(updatedFlight);
  } catch (err) {
    res.status(404).json({ message: 'Flight not found or error updating', error: err });
  }
};



export const deleteFlight = async (req: Request, res: Response) => {
  const flightId = parseInt(req.params.id);

  try {
    await prisma.flight.delete({
      where: { id: flightId },
    });
    res.json({ message: 'Flight deleted successfully' });
  } catch (err) {
    res.status(404).json({ message: 'Flight not found or error deleting', error: err });
  }
};

interface Origin {
  origin: string;
}

interface Destination {
  destination: string;
}

export const getFlightLocations = async (req: Request, res: Response) => {
  try {
    // Fetch distinct origins
    const originRows: Origin[] = await prisma.flight.findMany({
      distinct: ['origin'],
      select: { origin: true },
    });

    // Fetch distinct destinations
    const destinationRows: Destination[] = await prisma.flight.findMany({
      distinct: ['destination'],
      select: { destination: true },
    });

    // Extract strings
    const origins = originRows.map(o => o.origin);
    const destinations = destinationRows.map(d => d.destination);

    res.json({ origins, destinations });
  } catch (error) {
    console.error('Error fetching flight locations:', error);
    res.status(500).json({ error: 'Failed to fetch flight locations' });
  }
};

export const getFlightById = async (req: Request, res: Response): Promise<void> => {
  const flightId = parseInt(req.params.id);

  try {
    const flight = await prisma.flight.findUnique({
      where: { id: flightId },
    });

    if (!flight) {
      res.status(404).json({ message: 'Flight not found' });
      return;
    }

    res.json(flight);
  } catch (error) {
    console.error('Error fetching flight by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// flightsController.js

export const searchFlights = async (req: Request, res: Response) => {
  try {
    const from = req.query.from as string | undefined;
    const to = req.query.to as string | undefined;
    const date = req.query.date as string | undefined;

    if (!from || !to || !date) {
      return res.status(400).json({ message: 'Missing search parameters' });
    }

    const searchDate = new Date(date);
    if (isNaN(searchDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    const formattedDate = searchDate.toISOString().split('T')[0];

    const flights = await prisma.flight.findMany({
      where: {
        origin: { equals: from, mode: 'insensitive' },
        destination: { equals: to, mode: 'insensitive' },
        date: formattedDate,
      },
    });

    return res.json(flights);
  } catch (error) {
    console.error('Error searching flights:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};



