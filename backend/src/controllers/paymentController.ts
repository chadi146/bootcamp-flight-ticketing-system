import { Request, Response } from 'express';
import prisma from '../config/prisma';
 import { PaymentStatus } from '@prisma/client';  // Import enum from Prisma client

// ✅ Create Payment - no token required
export const createPayment = async (req: Request, res: Response): Promise<void> => {
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
};

// ✅ Get All Payments (no user filter)
export const getPaymentsByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        booking: true,
      },
      orderBy: { paymentDate: 'desc' },
    });

    res.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Failed to fetch payments' });
  }
};

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

// ✅ Delete Payment
export const deletePayment = async (req: Request, res: Response): Promise<void> => {
  const paymentId = parseInt(req.params.id);

  try {
    await prisma.payment.delete({ where: { id: paymentId } });
    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error('Error deleting payment:', error);
    res.status(404).json({ message: 'Payment not found or error deleting' });
  }
};
