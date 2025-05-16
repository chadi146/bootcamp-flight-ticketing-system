import express from 'express';
import {
  createPayment,
  deletePayment,
  getPaymentById,
  getPaymentsByUser,
  updatePaymentStatus,
} from '../controllers/paymentController';

const router = express.Router();

// 🔓 No token-based authentication

router.post('/', createPayment);
router.get('/', getPaymentsByUser);
router.get('/:id', getPaymentById);
router.put('/:id/status', updatePaymentStatus);
router.delete('/:id', deletePayment);

export default router;
