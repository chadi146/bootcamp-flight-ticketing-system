import { Request, Response } from 'express';
import prisma from '../config/prisma';
 import { PaymentStatus } from '@prisma/client';  // Import enum from Prisma client

// ✅ Create Payment - no token required
export const createPaymentUser = async (req: Request, res: Response): Promise<void> => {
  
  const { userId, bookingId, amount, status } = req.body;

  if (!userId || !bookingId || !amount || !status) {
    res.status(400).json({ message: 'userId, bookingId, amount, and status are required' });
    return;
  }

  if (!Object.values(PaymentStatus).includes(status)) {
    res.status(400).json({ message: 'Invalid payment status' });
    return;
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    // ❌ Skipping booking-user match check since token is not used

    const payment = await prisma.payment.create({
      data: {
        bookingId,
        amount,
        status,
      },
      include: {
        booking: true,
      },
    });

    res.status(201).json({ message: 'Payment recorded', payment });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ message: 'Failed to create payment' });
  }
};5

// ✅ Get Payment by ID
export const getPaymentById = async (req: Request, res: Response): Promise<void> => {
  const paymentId = parseInt(req.params.id);

  try {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        booking: true,
      },
    });

    if (!payment) {
      res.status(404).json({ message: 'Payment not found' });
      return;
    }

    res.json(payment);
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({ message: 'Failed to fetch payment' });
  }
};
// ✅ Update Payment Status
export const updatePaymentStatus = async (req: Request, res: Response): Promise<void> => {
  const paymentId = parseInt(req.params.id);
  const { status } = req.body;

  if (!Object.values(PaymentStatus).includes(status)) {
    res.status(400).json({ message: 'Invalid payment status' });
    return;
  }

  try {
    const updatedPayment = await prisma.payment.update({
      where: { id: paymentId },
      data: { status },
      include: {
        booking: true,
      },
    });

    res.json({ message: 'Payment status updated', updatedPayment });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(404).json({ message: 'Payment not found or error updating' });
  }
};

// ✅ Get total number of payments
export const getPaymentsCount = async (req: Request, res: Response): Promise<void> => {
  try {
    const count = await prisma.payment.count(); // ✔ Correct Prisma method
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error getting payment count:', error);
    res.status(500).json({ message: 'Error getting payment count', error });
  }
};
// paymentController.ts

export const createPayment = async (req: Request, res: Response) => {
  const { bookingId, amount } = req.body;

  try {
    const payment = await prisma.payment.create({
      data: {
        bookingId,
        amount,
        status: 'accepted', // or whatever initial status you prefer
      },
    });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payment' });
  }
};

export const getPaymentsWithUsers = async (req: Request, res: Response) => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        booking: {
          include: {
            user: true,
            flight: true
          }
        }
      }
    });

    const formatted = payments.map(payment => ({
      paymentId: payment.id,
      amount: payment.amount,
      status: payment.status,
      paymentDate: payment.paymentDate,
      user: {
        id: payment.booking.user.id,
        name: payment.booking.user.name,
        email: payment.booking.user.email
      },
      flight: {
        flightNumber: payment.booking.flight.flightNumber,
        origin: payment.booking.flight.origin,
        destination: payment.booking.flight.destination
      }
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Error fetching payments', error });
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
