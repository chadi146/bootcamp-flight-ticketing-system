// paymentRoutes.ts
import express from 'express';
import {
  createPayment,
  createPaymentUser,
  deletePayment,
  getPaymentById,
  getPaymentsWithUsers,
  getPaymentsCount,
  updatePaymentStatus,
 // ✅ this must match the export exactly
} from '../controllers/paymentController'
import { authenticateJWT, authorizeAdmin } from '../middlewares/auth.middleware';

const router = express.Router();

// ✅ This must come BEFORE the dynamic `/:id` route

router.post('/userpayment',createPaymentUser)
router.post('/', createPayment);
 router.get('/with-user', getPaymentsWithUsers);
router.get('/count', getPaymentsCount);
router.get('/:id', getPaymentById);
router.put('/:id/status', updatePaymentStatus);
router.delete('/:id', deletePayment);

export default router;
