import { Request, Response } from 'express';
import { PrismaClient} from '@prisma/client';
import { BookingStatus } from '@prisma/client';

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
  const user = (req as any).user;

  if (!user || !user.userId) {
    console.log('Decoded user in booking:', user);

    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const userId = user.userId;

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

    res.status(201).json({ id: booking.id });
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

// GET /bookings/my
export const getUserBookings = async (req: Request, res: Response): Promise<void> => {
  const user = (req as any).user;

  if (!user || !user.userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: user.userId },
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

// GET /bookings/:id
export const getBookingById = async (req: Request, res: Response): Promise<void> => {
  const bookingId = parseInt(req.params.id);
  const user = (req as any).user;

  if (!user || isNaN(bookingId)) {
    res.status(401).json({ message: 'Unauthorized or invalid booking ID' });
    return;
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        user: true,
        flight: true,
        payment: true,
      },
    });

    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    // Only admin or booking owner can view
    if (user.role !== 'admin' && booking.userId !== user.userId) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking by ID:', error);
    res.status(500).json({ message: 'Failed to fetch booking' });
  }
};
export const cancelBookingAndDeletePayment = async (req: Request, res: Response): Promise<void> => {
  const bookingId = parseInt(req.params.id);

  if (isNaN(bookingId)) {
    res.status(400).json({ message: 'Invalid booking ID' });
    return;
  }

  try {
    // Check if booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { payment: true },
    });

    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    // If there's a payment, delete it
    if (booking.payment) {
      await prisma.payment.delete({
        where: { bookingId },
      });
    }

    // Cancel the booking
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'cancelled' },
    });

    res.json({ message: 'Booking cancelled and payment deleted (if existed).' });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Failed to cancel booking' });
  }
};