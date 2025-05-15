import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getFlights = async (req: Request, res: Response) => {
  const flights = await prisma.flight.findMany();
  res.json(flights);
};

export const createFlight = async (req: Request, res: Response) => {
  const { flightNumber, origin, destination, departureTime, durationMinutes, price, seats } = req.body;
  try {
    const flight = await prisma.flight.create({
      data: {
        flightNumber,
        origin,
        destination,
        departureTime: new Date(departureTime),
        durationMinutes,
        price,
        seats,
      },
    });
    res.status(201).json(flight);
  } catch (err) {
    res.status(400).json({ message: 'Error creating flight', error: err });
  }
};

export const updateFlight = async (req: Request, res: Response) => {
  const flightId = parseInt(req.params.id);
  const { flightNumber, origin, destination, departureTime, durationMinutes, price, seats } = req.body;

  try {
    const updatedFlight = await prisma.flight.update({
      where: { id: flightId },
      data: {
        flightNumber,
        origin,
        destination,
        departureTime: new Date(departureTime),
        durationMinutes,
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
