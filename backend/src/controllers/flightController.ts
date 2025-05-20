import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getFlights = async (req: Request, res: Response) => {
  const flights = await prisma.flight.findMany();
  res.json(flights);
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


export const getFlightLocations = async (req: Request, res: Response) => {
  try {
    const origins = await prisma.flight.findMany({
      distinct: ['origin'],
      select: { origin: true },
    });

    const destinations = await prisma.flight.findMany({
      distinct: ['destination'],
      select: { destination: true },
    });

    const uniqueOrigins = origins.map((o: { origin: string }) => o.origin);
    const uniqueDestinations = destinations.map((d: { destination: string }) => d.destination);

    res.json({
      origins: uniqueOrigins,
      destinations: uniqueDestinations,
    });
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
