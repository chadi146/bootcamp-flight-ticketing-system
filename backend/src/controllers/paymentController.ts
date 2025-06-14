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
};

// ✅ Get All Payments (no user filter)
// export const getPaymentsByUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const payments = await prisma.payment.findMany({
//       include: {
//         booking: true,
        
//       },
//       orderBy: { paymentDate: 'desc' },
//     });

//     res.json(payments);
//   } catch (error) {
//     console.error('Error fetching payments:', error);
//     res.status(500).json({ message: 'Failed to fetch payments' });
//   }
// };

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

export const getPaymentByBooking = async (req: Request, res: Response) => {
  const bookingId = Number(req.params.bookingId);
  try {
    const payment = await prisma.payment.findUnique({
      where: { bookingId },
      include: { booking: true },
    });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payment' });
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