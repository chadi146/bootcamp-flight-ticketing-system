import { Request, Response } from 'express';
<<<<<<< HEAD
import { PrismaClient} from '@prisma/client';
import { BookingStatus, PaymentStatus } from '@prisma/client';
=======
import prisma from '../config/prisma';
import { BookingStatus } from '@prisma/client';
>>>>>>> 08314671e44caa86ac704763ee98f310c7e8c22e

const prisma = new PrismaClient();

// Get all bookings (admin)
export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: true,
        flight: true,
        payment: true,
      },
    });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

export const createBooking = async (req: Request, res: Response): Promise<void> => {
  // Use default userId = 1 if no token/user found (for testing without auth)
  const userId = (req as any).user?.id || 1;  
  const { flightId } = req.body;

  if (!flightId) {
    res.status(400).json({ message: 'flightId is required' });
    return;
  }

  try {
    const flight = await prisma.flight.findUnique({ where: { id: flightId } });
    if (!flight) {
      res.status(404).json({ message: 'Flight not found' });
      return;
    }

    // Count confirmed bookings for this flight
    const confirmedCount = await prisma.booking.count({
      where: {
        flightId,
        status: BookingStatus.confirmed,
      },
    });

    if (confirmedCount >= flight.seats) {
      res.status(400).json({ message: 'No seats available' });
      return;
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        flightId,
        status: BookingStatus.confirmed,
      },
      include: {
        flight: true,
        user: true,
      },
    });

    res.status(201).json({ message: 'Booking confirmed', booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Failed to create booking' });
  }
};

// Update booking status (e.g., cancel a booking)
export const updateBookingStatus = async (req: Request, res: Response): Promise<void> => {
  const bookingId = parseInt(req.params.id);
  const { status } = req.body;

  if (!Object.values(BookingStatus).includes(status)) {
    res.status(400).json({ message: 'Invalid booking status' });
    return;
  }

  try {
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
      include: {
        flight: true,
        user: true,
      },
    });

    res.json({ message: 'Booking status updated', updatedBooking });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(404).json({ message: 'Booking not found or error updating' });
  }
};

export const getUserBookings = async (req: Request, res: Response): Promise<void> => {
  // Use default userId = 1 if no token/user found (for testing without auth)
  const userId = (req as any).user?.id || 1;

  try {
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        flight: true,
        payment: true,
      },
      orderBy: { bookingDate: 'desc' },
    });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ message: 'Failed to fetch user bookings' });
  }
};

// Delete a booking
export const deleteBooking = async (req: Request, res: Response) => {
  const bookingId = parseInt(req.params.id);

  try {
    await prisma.booking.delete({
      where: { id: bookingId },
    });

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(404).json({ message: 'Booking not found or error deleting' });
  }
};
